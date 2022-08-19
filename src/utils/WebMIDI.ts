import { WebMidi }       from "webmidi";
import { hslToRgb }      from "./convertHSLToRGB";
import { Input, Output } from "webmidi";
import { useGridStore }            from "../store/grid";
import { HSLColor, useColorStore } from "../store/color";

export class WebMIDI {
	private webmidi = WebMidi;
	declare private mySynth: Input;
	declare private output: Output;
	private grid    = useGridStore().grid;
	private colorStore = useColorStore();
	
	constructor() {
		this.webmidi.enable({ sysex: true })
			.then(() => {
				if (WebMidi.inputs.length < 1) {
					document.body.innerHTML += "No device detected.";
				}
			
				this.mySynth = WebMidi.getInputByName("MIDIIN2 (3- Launchpad Pro)");
				this.output  = WebMidi.getOutputByName("MIDIOUT2 (3- Launchpad Pro)");
			
				this.grid.forEach((row) => {
					row.forEach(cell => {
						this.changeColor(cell.HSLColor, cell.cc);
					});
				});
			
				this.mySynth.channels[1].addListener("noteon", e => {
					const ccValue = e.message.dataBytes[0];
					
					// const index1 = this.grid.findIndex(row => row.find(cell => cell.cc === ccValue));
					// const index2 = this.grid[index1].findIndex(cell => cell.cc === ccValue);
					//
					// this.changeColor(this.colorStore, ccValue);
				});
			})
			.catch(err => alert(err));
	}
	
	changeColor(HSL: HSLColor, cc: number) {
		this.output.sendSysex(0x00, [
			32,
			41,
			2,
			16,
			11,
			cc,
			Math.floor(HSL.r / 2),
			Math.floor(HSL.g / 2),
			Math.floor(HSL.b / 2),
		]);
	}
}
