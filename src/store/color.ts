import { defineStore } from "pinia";
import { cellType }    from "../utils/types";
import { getCC }       from "../utils/getNote";
import { reactive }    from "vue";

export const useColorStore = defineStore("Color", {
	state: (): HSLColor => ({
		r: 0,
		g: 100,
		b: 50,
	})
});

export interface HSLColor {
	r: number,
	g: number,
	b: number,
}
