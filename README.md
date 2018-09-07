# ch-calendar

#### [Demo]()

# Install
```npm install сh-calendar --save```

# Use
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
## Props

Common props you may want to specify include:

* `autoFocus` - focus the control when it mounts
* `className` - apply a className to the control
* `isDisabled` - disable the control
* `isMulti` - allow the user to select multiple values
* `isSearchable` - allow the user to search for matching options
* `name` - generate an HTML input with this name, containing the current value
* `onChange` - subscribe to change events
* `options` - specify the options the user can select from
* `placeholder` - change the text displayed when no option is selected
* `value` - control the current value

