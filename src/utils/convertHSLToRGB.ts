export function hslToRgb(hue: number, saturation: number, lightness: number) {
	let t1,
		t2,
		r,
		g,
		b;
	hue = hue / 60;
	if (lightness <= 0.5) {
		t2 = lightness * (saturation + 1);
	}
	else {
		t2 = lightness + saturation - (lightness * saturation);
	}
	t1 = lightness * 2 - t2;
	r  = hueToRgb(t1, t2, hue + 2) * 255;
	g  = hueToRgb(t1, t2, hue) * 255;
	b  = hueToRgb(t1, t2, hue - 2) * 255;
	return { r: r, g: g, b: b };
}

function hueToRgb(t1: number, t2: number, hue: number) {
	if (hue < 0) hue += 6;
	if (hue >= 6) hue -= 6;
	if (hue < 1) {
		return (t2 - t1) * hue + t1;
	}
	else if (hue < 3) {
		return t2;
	}
	else if (hue < 4) {
		return (t2 - t1) * (4 - hue) + t1;
	}
	else {
		return t1;
	}
}
