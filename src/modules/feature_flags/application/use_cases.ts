import { type RedisClientType, createClient } from "redis";
import { REDIS_URL } from "../../../config/constants";
import type {
	IFeatureFlagRepository,
	IFeatureFlagUseCase,
} from "../domain/interfaces";

class CachedFeatureFlagUseCase implements IFeatureFlagUseCase {
	private readonly cache: ReturnType<typeof createClient>;
	constructor(private readonly featureFlagUseCase: IFeatureFlagUseCase) {
		this.cache = createClient({
			url: REDIS_URL,
		});
		this.initCache();
	}

	private async initCache() {
		try {
			await this.cache.connect();
		} catch (error) {
			console.error("Error al conectar a Redis:", error);
		}
	}

	async isFeatureEnabled(
		featureFlagName: string,
		distinctId: string,
		ttl = 3600,
	): Promise<boolean> {
		try {
			const cache_key = `feature_flags:${featureFlagName}:${distinctId}`;
			const cached_value = await this.cache.get(cache_key);
			if (cached_value) {
				console.log("Cache hit for ", cache_key, "value: ", cached_value);
				return cached_value === "true";
			}
			const value = await this.featureFlagUseCase.isFeatureEnabled(
				featureFlagName,
				distinctId,
			);
			await this.cache.set(cache_key, value ? "true" : "false", {
				EX: ttl,
			});
			return value;
		} catch (error) {
			console.error(
				`Error al verificar feature flag (${featureFlagName}):`,
				error,
			);
			return this.featureFlagUseCase.isFeatureEnabled(
				featureFlagName,
				distinctId,
			);
		}
	}
}

export function cachedFeatureFlagUseCaseFactory(
	featureFlagUseCase: IFeatureFlagUseCase,
): IFeatureFlagUseCase {
	return new CachedFeatureFlagUseCase(featureFlagUseCase);
}

class FeatureFlagUseCase {
	constructor(private readonly featureFlagRepository: IFeatureFlagRepository) {}

	async isFeatureEnabled(
		featureFlagName: string,
		distinctId: string,
	): Promise<boolean> {
		return this.featureFlagRepository.isFeatureEnabled(
			featureFlagName,
			distinctId,
		);
	}
}

export function featureFlagUseCaseFactory(
	featureFlagRepository: IFeatureFlagRepository,
): FeatureFlagUseCase {
	return new FeatureFlagUseCase(featureFlagRepository);
}
