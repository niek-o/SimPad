import { defineStore } from "pinia";
import { cellType }    from "../utils/types";
import { getCC }       from "../utils/getNote";
import { reactive }    from "vue";
import { HSLColor }    from "./color";

export const useGridStore = defineStore("Grid", {
	state:   (): { grid: cellType[][] } => ({
		grid: reactive([])
	}),
	actions: {
		setColor(cell: cellType, color: HSLColor) {
			this.grid[cell.row][cell.col].HSLColor = color;
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
						HSLColor: {
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

