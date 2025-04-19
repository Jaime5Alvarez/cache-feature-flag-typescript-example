import { PostHog } from "posthog-node";
import { POSTHOG_API_KEY } from "../../../config/constants";
import type { IFeatureFlagRepository } from "../domain/interfaces";
export class PostHogFeatureFlagRepository implements IFeatureFlagRepository {
	private readonly client: PostHog;
	constructor() {
		this.client = new PostHog(POSTHOG_API_KEY, {
			host: "https://eu.i.posthog.com",
		});
	}

	async isFeatureEnabled(
		featureFlagName: string,
		distinctId: string,
	): Promise<boolean> {
		try {
			console.log(
				`Checking feature flag ${featureFlagName} for distinct_id ${distinctId}`,
			);

			const featureEnabled = await this.client.isFeatureEnabled(
				featureFlagName,
				distinctId,
			);
			console.log("Feature enabled: ", featureEnabled);
			if (featureEnabled === undefined) {
				return false;
			}
			return featureEnabled;
		} catch (error) {
			console.error("Error checking feature flag: ", error);
			return false;
		}
	}
}
