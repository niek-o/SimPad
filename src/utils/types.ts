import { HSLColor } from "../store/color";

export interface cellType extends MIDINotes {
	row: number;
	col: number;
	HSLColor: HSLColor;
}

export interface MIDINotes {
	cc: number;
}
