import { defineStore }     from "pinia";
import { LaunchpadDevice } from "../utils/launchpadDevice";

export const useLaunchpadStore = defineStore("Launchpad", {
	state: (): { launchpad: LaunchpadDevice } => ({
		launchpad: new LaunchpadDevice()
	})
});
