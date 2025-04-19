export interface IFeatureFlagUseCase {
	isFeatureEnabled(
		featureFlagName: string,
		distinctId: string,
	): Promise<boolean>;

	close?(): Promise<void>;
}

export interface IFeatureFlagRepository {
	isFeatureEnabled(
		featureFlagName: string,
		distinctId: string,
	): Promise<boolean>;
}
