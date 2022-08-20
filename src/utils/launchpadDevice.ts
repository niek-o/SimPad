import { WebMidi }       from "webmidi";
import { Input, Output } from "webmidi";
import { useGridStore }  from "../store/grid";
import { RGBColor }      from "./types";

export class LaunchpadDevice {
	public readonly Launchpad = WebMidi;
	
	declare private _input: Input;
	declare private _output: Output;
	
	private _gridStore = useGridStore();
	
	constructor() {
		this.Launchpad.enable({ sysex: true })
			.then(() => {
				if (WebMidi.inputs.length < 1) {
					document.body.innerHTML += "No device detected.";
				}
			
				this._input  = WebMidi.getInputByName("MIDIIN2 (3- Launchpad Pro)");
				this._output = WebMidi.getOutputByName("MIDIOUT2 (3- Launchpad Pro)");
			
				this._gridStore.grid.forEach((row) => {
					row.forEach(cell => {
						this.changeColor(cell.RGB, cell.cc);
					});
				});
			
				// Switch to standalone mode
				this._output.sendSysex(0x00, [
					32,
					41,
					2,
					16,
					33,
					0x01
				]);
			
				// Switch to programmer mode
				this._output.sendSysex(0x00, [
					32,
					41,
					2,
					16,
					44,
					0x03
				]);
			
				this._input.channels[1].addListener("noteon", () => {
					// const ccValue = e.message.dataBytes[0];
				
					// const index1 = this._gridStore.findIndex(row => row.find(cell => cell.cc === ccValue));
					// const index2 = this._gridStore[index1].findIndex(cell => cell.cc === ccValue);
					//
					// this.changeColor(this.colorStore, ccValue);
				});
			})
			.catch(err => alert(err));
	}
	
	changeColor(RGB: RGBColor, cc: number) {
		this._gridStore.setColorByCC(cc, RGB);
		
		this._output.sendSysex(0x00, [
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
