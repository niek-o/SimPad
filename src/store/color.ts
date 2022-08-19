import { defineStore } from "pinia";
import { RGBColor }    from "../utils/types";

export const useColorStore = defineStore("Color", {
	state: (): RGBColor => ({
		r: 0,
		g: 100,
		b: 50,
	})
});
