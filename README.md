# ch-calendar

#### [Demo]()

# Install
```npm install сh-calendar --save```

# Use
Modal and Button active:
```js
import { Calendar } from 'ch-calendar'
import React, { Component } from 'react';
import 'ch-calendar/dist/ch-calendar.css'

class App extends Component {  
  render() {
    const date = new Date();
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Test Input Field</h1>
        </header>
        <div className='App-intro'>
          <Calendar isModal isButtonActive date={date} onSelect={(date) => { console.log(date) }} /> 
        </div>
      </div>
    );
  }
}
export default App;
```

Modal and active use code:
```js
import React, { Component } from 'react';
import { Calendar } from 'ch-calendar'
import 'ch-calendar/dist/ch-calendar.css'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      isActive: false
    }
  }
  render() {
    return (
      <div className="App">
        <button onClick={() => this.setState({ isActive: true })} >Press is active</button>
        <Calendar
          isModal
          style={{backgroundColor: "rgba(0,0,0,0.3)"}}
          isActive={this.state.isActive}
          isCloseEmptyClick
          onEmptyClick={() => this.setState({ isActive: false })}
          date={this.state.date}
          onSelect={(date) => {
            console.log(date)
            this.setState({ isActive: false, date })
          }} />
      </div>
    );
  }
}

export default App;
```
## Props

Common props you may want to specify include:

* `isModal` - [boolean] If 'true' open a modal window
* `isButtonActive` - [boolean] If 'true' show 'open' button. If False, the opens is through isActive = 'true'
* `isActive` - [boolean] If 'true' show window
* `isMonth` - [boolean] If 'true' select a month, else select a day
* `isClose` - [boolean] If set 'true' close a modal window
* `isCloseEmptyClick` - [boolean] If set 'true' close a modal window with empty click.
* `date` - [Date] Date for mark in the calendar. If undefined, will marked today.
* `onSelect` - [function] The selected date will be passed in the function in the parameter 'date'
* `onEmptyClick` - [function] Call of if empty click.

