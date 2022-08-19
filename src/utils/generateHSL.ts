export function generateHSL(hue: number, saturation: number, lightness: number) {
	return `hsl(${hue},${saturation}%,${lightness}%)`
}
