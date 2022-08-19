import { defineStore }        from "pinia";
import { cellType, RGBColor } from "../utils/types";
import { getCC }              from "../utils/getNote";
import { reactive }           from "vue";

export const useGridStore = defineStore("Grid", {
	state:   (): { grid: cellType[][] } => ({
		grid: reactive([])
	}),
	actions: {
		setColor(cell: cellType, color: RGBColor) {
			this.grid[cell.row][cell.col].RGB = color;
		},
		setColorByCC(cc: number, color: RGBColor) {
			const index1 = this.grid.findIndex(row => row.find(cell => cell.cc === cc));
			const index2 = this.grid[index1].findIndex(cell => cell.cc === cc);
			
			this.grid[index1][index2].RGB = color;
		},
		init() {
			this.grid = [];
			
			for (let row = 0; row < 8; row++) {
				const cells: cellType[] = [];
				
				for (let col = 0; col < 8; col++) {
					cells.push({
						row:      row,
						col:      col,
						cc:       getCC(row, col),
						RGB: {
							r: 0,
							g: 0,
							b: 0,
						},
					});
				}
				
				this.grid.push(cells);
			}
		}
	}
});

