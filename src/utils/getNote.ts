export function getCC(row: number, col: number) {
	return noteArray[row][col];
}

const noteArray: Array<Array<number>> = []

for (let row = 8; row >= 1; row--) {
	noteArray.push([]);
	for (let col = 1; col <= 8; col++) {
		noteArray[noteArray.length-1].push(row * 10 + col);
	}
}
