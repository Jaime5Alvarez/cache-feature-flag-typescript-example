import { MockUsers } from "./src/config/mock-users";
import {
	cachedFeatureFlagUseCaseFactory,
	featureFlagUseCaseFactory,
} from "./src/modules/feature_flags/application/use_cases";
import { FeatureFlagName } from "./src/modules/feature_flags/domain/enums";
import { PostHogFeatureFlagRepository } from "./src/modules/feature_flags/infraestructure/repository";

async function main() {
	console.time("main");
	const featureFlagUseCase = cachedFeatureFlagUseCaseFactory(
		featureFlagUseCaseFactory(new PostHogFeatureFlagRepository()),
	);

	try {
		if (
			await featureFlagUseCase.isFeatureEnabled(
				FeatureFlagName.ADMIN_ACCESS,
				MockUsers.USER_5,
			)
		) {
			console.log("Feature is enabled");
		} else {
			console.log("Feature is disabled");
		}
	} catch (error) {
		console.error("Error en la aplicación:", error);
	} finally {
		console.timeEnd("main");
		process.exit(0);
	}
}
main();
