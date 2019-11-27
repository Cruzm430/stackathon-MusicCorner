import React, { Component } from 'react';
import Tone from 'tone'
import {Card, CardContent, Grid, Button, Typography, TextField} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const synth = new Tone.Synth();
synth.oscillator.type = 'sine';
synth.toMaster()

const noteKeys = ['q','2','w','3','e','r','5','t','6','y','7','u','z','s','x','d','c','v','g','b','h','n','j','m']
const drumKeys = ['i','9','o','p']
const notes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5']
const others = ['a','g','f','d','c']

const kick = new Tone.MembraneSynth().toMaster();

const snare = new Tone.NoiseSynth({
  volume:'25',
  noise: {
    type: 'brown',
    playbackRate: 3,
  },
  envelope: {
    attack: 0.001,
    decay: 0.13,
    sustain: 0,
    release: 0.03,
  },
}
).toMaster()

const low = new Tone.Filter({
  frequency : 14000,
}).toMaster()

const openHat = new Tone.NoiseSynth({
  volume : -10,
  filter : {
    Q : 1
  },
  envelope : {
    attack : 0.015,
    decay : 0.3
  },
  filterEnvelope : {
    attack : 0.01,
    decay : 0.03,
    baseFrequency : 4000,
    octaves : -2.5,
    exponent : 4,
  }
}).connect(low);

const closedHat = new Tone.NoiseSynth({
  volume : -10,
  filter : {
    Q : 1
  },
  envelope : {
    attack : 0.01,
    decay : 0.15
  },
  filterEnvelope : {
    attack : 0.01,
    decay : 0.03,
    baseFrequency : 4000,
    octaves : -2.5,
    exponent : 4,
  }
}).connect(low);

const drums = ['closedHat', 'openHat', 'kick', 'snare']

const styles = theme =>({
  keys:{
    padding:'3em 0 0 3em,',
    position:'relative',
    background:'white'
  },
  key:{
    margin:0,
    padding:0,
    listStyle:'none',
    position:'relative',
    float:'left'
  },
  white:{
    height:'17em',
    width:'2em',
    zIndex:1,
    borderLeft:'1px solid black',
    borderBottom:'1px solid black',
    borderRight:'1px solid black',
    background:'white',
    color:'black'
  },
  black:{
    height:'8em',
    width:'20px',
    margin:'0 -32px 0 -32px',
    zIndex:2,
    border:'1px solid white',
    background:'black',
    color:'white'
  },
  others:{
    margin:'0 0 0 -1px'
  },
  text:{
    color:'white'
  },
  topCard:{
    color:'white',
    height:'60%',
    background:'blue',
    display:'flex',
    justifyContent:'center'
  },
  musicCard:{
    color:'white',
    width:'40%',
    background:'lightBlue',
    display:'flex',
    justifyContent:'left'
  },
  title:{
    color:'white',
    display:'flex',
    justifyContent:'center',
    width:'100%',
    fontSize:'20px',
    textDecoration:'black underline'
  }
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      deviceId: '',
      loggedIn: false,
      error: '',
      trackName: 'Song',
      artistName: 'Artist',
      albumName: 'Album',
      albumImage: '',
      playing: false,
      position: 0,
      duration: 1,
    };
    this.playerCheckInterval = null;
  }
  onStateChanged(state) {
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration,
      } = state.track_window;
      console.log(currentTrack)
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists[0].name
      const albumImage = currentTrack.album.images[0].url
      const playing = !state.paused;
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        albumImage,
        playing
      });
    }
  }
  handleLogin() {
    if (this.state.token !== "") {
      this.setState({ loggedIn: true });
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }
  }
  checks() {
    this.player.on('player_state_changed', state => this.onStateChanged(state));
    this.player.on('ready', async data => {
      let { device_id } = data;
      console.log("mounted!");
      await this.setState({ deviceId: device_id });
      this.transferPlaybackHere();
    });
  }
  onKeyDown(e){
    switch(e.key){
      case 'o':
        return kick.triggerAttackRelease('C1','8n')
      case 'p':
        return snare.triggerAttackRelease('8n')
      case 'i':
        return closedHat.triggerAttackRelease('8n')
      case '9':
        return openHat.triggerAttackRelease('8n')
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
      case '.':
        this.player.togglePlay()
        break;
      case ',':
        this.player.previousTrack()
      case '/':
        this.player.nextTrack()
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
    switch (e.target.name){
      case 'closedHat':
        return closedHat.triggerAttackRelease('8n')
      case 'openHat':
        return openHat.triggerAttackRelease('8n')
      case 'kick':
        return kick.triggerAttackRelease('C1','8n')
      case 'snare':
        return snare.triggerAttackRelease('8n')
      default:
      synth.triggerAttack(e.target.dataset.note)
    }
  }
  mouseUp(e){
    switch(e.target.name){
      case 'closedHat':
        return closedHat.triggerRelease();
      case 'openHat':
        return openHat.triggerRelease();
      case 'kick':
        return kick.triggerRelease();
      case 'snare':
        return snare.triggerRelease();
      default:
        synth.triggerRelease()
    }
  }
  checkForPlayer() {
    const { token } = this.state;
    if (window.Spotify !== null) {
      clearInterval(this.playerCheckInterval);
      this.player = new window.Spotify.Player({
        name: "The Workspace",
        getOAuthToken: cb => { cb(token); },
        volume: 0.1
      });
      this.checks();
      this.player.connect();
    }
  }
  onPrevClick() {
    this.player.previousTrack();
  }
  onPlayClick() {
    this.player.togglePlay();
  }
  onNextClick() {
    this.player.nextTrack();
  }
  transferPlaybackHere() {
    const { deviceId, token } = this.state;
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "device_ids": [ deviceId ],
        "play": true,
      }),
    });
  }
  render() {
    const {token, loggedIn, trackName, artistName, albumName, playing, albumImage} = this.state;
    const {classes} = this.props
    const img = albumImage
    return (
      <div style={{boxSizing:'border-box', height:'100%'}} >
        <Card style={{background:'dodgerBlue', display:'flex', flexDirection:'column', flexWrap:'wrap'}}>
          <Typography component='h4' className={classes.title} style={{paddingBottom:'20px'}}>Music Corner</Typography>
        {loggedIn ?
        (<Card className={classes.musicCard}>
          <CardContent>
            {
              img !== '' ? <img src={img} style={{height:'151px', width:'151px'}}/> : ''
            }
          <Typography className={classes.text}>
            Artist: {artistName} <br/>
            Track: {trackName} <br/>
            Album: {albumName}
          </Typography>
            <Button onClick={() => this.onPrevClick()}>Previous</Button>
            <Button onClick={() => this.onPlayClick()}>{playing ? 'Pause' : 'Play'}</Button>
            <Button onClick={() => this.onNextClick()}>Next</Button>
            </CardContent>
        </Card>)
        :  
        (<Card className={classes.topCard} style={{backgroundColor:'lightBlue'}}>
          <CardContent>
           <Typography>
            What's that? You'd like to play along with a song? </Typography>
            {/* <Button href='/login'>Login with Spotify</Button> */}
              <Button href="https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/#authenticating-with-spotify">
                Open this in a new window and get your Spotify token...
            </Button>
            <Typography>Then paste it below!</Typography>
            <div>
                <TextField type="text" label='Token' value={token} onChange={e => this.setState({ token: e.target.value })} />
            </div>
            <Button style={{color:'white'}} onClick={() => this.handleLogin()}>Start Spotify Player</Button>
          </CardContent>
        </Card>
        )
        }
        
        <Card
          style={{background:'darkGray', marginTop:'50px'}}
          onKeyDown={(e)=>this.onKeyDown(e)}
          onKeyUp={(e)=>this.onKeyUp(e)}
          onMouseDown={(e)=>this.mouseDown(e)}
          onMouseUp={(e)=>this.mouseUp(e)}
          tabIndex='0'
          >
          
        <Typography className={classes.title} style={{color:'tomato', fontweight:'bold', background:'gray'}}>Drums</Typography>
        <Card style={{ display:'flex', justifyContent:'space-around', background:'lightGray', paddingBottom:'100px'}}>
        {
          drums.map((drum,idx)=><Button name={drum} key={idx} style={{height:'50px', width:'15%', background:'gray', color:'white'}}>
              {drum} ({drumKeys[idx]})
          </Button>)
        }
        </Card>

        
        <Typography className={classes.title} style={{color:'tomato', fontWeight:'bold'}}>Piano</Typography>
        <Card className={classes.keys} style={{background:'gray', display:'flex', justifyContent:'center'}}>
        {
          notes.map((note,idx)=> note.includes('#') ? <Button key={idx} data-note={note}
            className={` ${classes.key} ${classes.black}`}>
            {note} ({noteKeys[idx]})
            </Button> : others.includes(note) ? <Button key={idx} data-note={note} className={`${classes.key} ${classes.white} ${classes.others}`}>{note} ({noteKeys[idx]})</Button>: <Button key={idx} data-note={note}
            className={`${classes.key} ${classes.white}`}>
            {note} ({noteKeys[idx]})
            </Button>)
        }
        </Card>
        </Card>
        </Card>
      </div>
    );
  }
}

export default (withStyles(styles)(App));
