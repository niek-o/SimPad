import { WebMidi }       from "webmidi";
import { Input, Output } from "webmidi";
import { useGridStore }  from "../store/grid";
import { RGBColor }      from "./types";

export class WebMIDI {
	private webmidi    = WebMidi;
	declare private mySynth: Input;
	declare private output: Output;
	private gridStore  = useGridStore();
	
	constructor() {
		this.webmidi.enable({ sysex: true })
			.then(() => {
				if (WebMidi.inputs.length < 1) {
					document.body.innerHTML += "No device detected.";
				}
			
				this.mySynth = WebMidi.getInputByName("MIDIIN2 (3- Launchpad Pro)");
				this.output  = WebMidi.getOutputByName("MIDIOUT2 (3- Launchpad Pro)");
			
				this.gridStore.grid.forEach((row) => {
					row.forEach(cell => {
						this.changeColor(cell.RGB, cell.cc);
					});
				});
			
				this.mySynth.channels[1].addListener("noteon", () => {
					// const ccValue = e.message.dataBytes[0];
				
					// const index1 = this.gridStore.findIndex(row => row.find(cell => cell.cc === ccValue));
					// const index2 = this.gridStore[index1].findIndex(cell => cell.cc === ccValue);
					//
					// this.changeColor(this.colorStore, ccValue);
				});
			})
			.catch(err => alert(err));
	}
	
	changeColor(RGB: RGBColor, cc: number) {
		this.gridStore.setColorByCC(cc, RGB);
		
		this.output.sendSysex(0x00, [
			32,
			41,
			2,
			16,
			11,
			cc,
			Math.floor(RGB.r / 4),
			Math.floor(RGB.g / 4),
			Math.floor(RGB.b / 4),
		]);
	}
}
