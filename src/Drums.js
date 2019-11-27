import React, {Component} from 'react'
import Tone from 'tone'

const kick = new Tone.MembraneSynth().toMaster();

const snare = new Tone.NoiseSynth({
  volume:'-22',
  noise: {
    type: 'pink',
    playbackRate: 3,
  },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    release: 0.01,
  },
}
).toMaster()

const low = new Tone.Filter({
  "frequency" : 14000,
}).toMaster()

const openHat = new Tone.NoiseSynth({
  "volume" : -10,
  "filter" : {
    "Q" : 1
  },
  "envelope" : {
    "attack" : 0.015,
    "decay" : 0.3
  },
  "filterEnvelope" : {
    "attack" : 0.01,
    "decay" : 0.03,
    "baseFrequency" : 4000,
    "octaves" : -2.5,
    "exponent" : 4,
  }
}).connect(low);

const closedHat = new Tone.NoiseSynth({
  "volume" : -10,
  "filter" : {
    "Q" : 1
  },
  "envelope" : {
    "attack" : 0.01,
    "decay" : 0.15
  },
  "filterEnvelope" : {
    "attack" : 0.01,
    "decay" : 0.03,
    "baseFrequency" : 4000,
    "octaves" : -2.5,
    "exponent" : 4,
  }
}).connect(low);

const drums = ['kick', 'snare', 'closedHat', 'openHat']

class Drums extends Component{
  constructor(){
    super()
  }
  onKeyDown(e){
    switch(e.key){
      case 'o':
        return kick.triggerAttack('8n')
      case 'p':
        return snare.triggerAttackRelease('8n')
      case 'i':
        return closedHat.triggerAttackRelease('8n')
      case '9':
        return openHat.triggerAttackRelease('8n')
    }
  }
  onKeyUp(e){
    switch(e.key){
      case 'o':
        return kick.triggerRelease()
      case 'p':
        return snare.triggerRelease()
      case 'i':
        return closedHat.triggerRelease()
      case '9':
        return openHat.triggerRelease()
    }
  }
  mouseDown(e){
    switch(e.name){
      case 'kick':
        return kick.triggerAttack('8n');
      case 'snare':
        return snare.triggerAttackRelease('8n');
      case 'closedHat':
        return closedHat.triggerAttackRelease('8n')
        case 'openHat':
        return openHat.triggerAttackRelease('8n')
    }
  }
  mouseUp(e){
    switch(e.name){
      case 'kick':
        return kick.triggerRelease();
      case 'snare':
        return snare.triggerRelease()
      case 'closedHat':
        return closedHat.triggerRelease()
      case 'openHat':
        return openHat.triggerRelease()
    }
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
          drums.map((drum,idx)=><button key={idx} name={drum}>{drum}</button>)
        }
      </div>
    )
  }
}

export default Drums