import { defineStore }     from "pinia";
import { LaunchpadDevice } from "../utils/LaunchpadDevice";
import { RGBColor }        from "../utils/types";

export const useLaunchpadStore = defineStore("Launchpad", {
	state:   (): ILaunchpadDevice => ({
		Launchpad: new LaunchpadDevice()
	}),
	actions: {
		changeColor(RGB: RGBColor, cc: number) {
			this.Launchpad.changeColor(RGB, cc);
		}
	}
});

interface ILaunchpadDevice {
	Launchpad: LaunchpadDevice;
}
