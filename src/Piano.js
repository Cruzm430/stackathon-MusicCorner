import React, {Component} from 'react'
import Tone from 'tone'

const synth = new Tone.Synth();

synth.oscillator.type = 'sine';

synth.toMaster()

const notes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5']

class Piano extends Component{
  onKeyDown(e){
    switch(e.key){
      case 'q':
        return synth.triggerAttack('C4');
      case '2':
        return synth.triggerAttack('C#4');
      case 'w':
        return synth.triggerAttack('D4');
      case '3':
        return synth.triggerAttack('D#4');
      case 'e':
        return synth.triggerAttack('E4');
      case 'r':
        return synth.triggerAttack('F4');
      case '5':
        return synth.triggerAttack('F#4');
      case 't':
        return synth.triggerAttack('G4');
      case '6':
        return synth.triggerAttack('G#4');
      case 'y':
        return synth.triggerAttack('A4');
      case '7':
        return synth.triggerAttack('A#4');
      case 'u':
        return synth.triggerAttack('B4');
      case 'z':
        return synth.triggerAttack('C5');
      case 's':
        return synth.triggerAttack('C#5');
      case 'x':
        return synth.triggerAttack('D5');
      case 'd':
        return synth.triggerAttack('D#5');
      case 'c':
        return synth.triggerAttack('E5');
      case 'v':
        return synth.triggerAttack('F5');
      case 'g':
        return synth.triggerAttack('F#5');
      case 'b':
        return synth.triggerAttack('G5');
      case 'h':
        return synth.triggerAttack('G#5');
      case 'n':
        return synth.triggerAttack('A5');
      case 'j':
        return synth.triggerAttack('A#5');
      case 'm':
        return synth.triggerAttack('B5');
    }
  }
  onKeyUp(e){
    switch(e.key){
      case 'q':
      case '2':
      case 'w':
      case '3':
      case 'e':
      case 'r':
      case '5':
      case 't':
      case '6':
      case 'y':
      case '7':
      case 'u':
      case 'z':
      case 's':
      case 'x':
      case 'd':
      case 'c':
      case 'v':
      case 'g':
      case 'b':
      case 'h':
      case 'n':
      case 'j':
      case 'm':
        synth.triggerRelease()
    }
  }
  mouseDown(e){
    synth.triggerAttack(e.target.dataset.note)
  }
  mouseUp(e){
    synth.triggerRelease()
  }
  render(){
    return(
      <div
      onKeyDown={(e)=>this.onKeyDown(e)}
      onKeyUp={(e)=>this.onKeyUp(e)}
      onMouseDown={(e)=>this.mouseDown(e)}
      onMouseUp={(e)=>this.mouseUp(e)}
      tabIndex='0'>
        {
          notes.map((note,idx)=><button key={idx} data-note={note}>{note}</button>)
        }
      </div>
    )
  }
}

export default Piano