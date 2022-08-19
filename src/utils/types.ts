export interface cellType extends MIDINotes {
	row: number;
	col: number;
	RGB: RGBColor;
}

export interface RGBColor {
	r: number,
	g: number,
	b: number,
}


export interface MIDINotes {
	cc: number;
}
