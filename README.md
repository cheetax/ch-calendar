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

* `isModal` - 
* `isButtonActive` - 
* `isActive` - 
* `isMonth` - 
* `date` - 
* `onSelect` - 

