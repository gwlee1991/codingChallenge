import React from 'react';
import ReactDOM from 'react-dom';

class Root extends React.Component {
  constructor(){
    super();
    this.time = new Date();
    this.hours = this.time.getHours() > 12 ? this.time.getHours() - 12 : this.time.getHours()
    this.minutes = this.time.getMinutes();
    this.seconds = this.time.getSeconds();
    
    if (this.time.getHours() > 12) {
      this.am = false;
    } else {
      this.am = true;
    }

    this.state = {
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
      am: this.am
    }
    this.tick();
  }

  componentWillUnmount(){
    clearInterval(this.id);
  }

  tick(){
    this.id = setInterval(() => {
      let seconds = this.state.seconds;
      let minutes = this.state.minutes;
      let hours = this.state.hours;
      let am = this.state.am
      seconds += 1;
      if (seconds > 60) {
        seconds = 0;
        minutes += 1

        if (minutes > 60) {
          minutes = 0
          hours += 1

          if (hours > 12) {
            hours = hours - 12
            am = !am
          }
        }
      }
      this.setState({
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        am: am
      })
    }, 1000);
  }
  
  displayClock(){
    let seconds = this.state.seconds < 10 ? `0${this.state.seconds}` : `${this.state.seconds}`;
    let minutes = this.state.minutes < 10 ? `0${this.state.minutes}` : `${this.state.minutes}`;
    let hours = this.state.hours < 10 ? `0${this.state.hours}` : `${this.state.hours}`;
    let am = this.am ? "AM" : "PM";
    return (
      <div className="clock">
        {hours}:{minutes}:{seconds} {am}
      </div>
    )
  }

  render() {
    return(
      <div>
        {this.displayClock()}
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('main'));
});
