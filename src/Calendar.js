import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import './Calendar.css'

moment.locale('ru');

const matrixArray = (row, col) => {
  var arr = new Array(row);
  for (var i = 0; i < row; i++) {
    arr[i] = new Array(col);
  }
  return arr;
}

class Calendar extends Component {

  constructor(props) {
    super(props)
    var data = moment(props.data, ["DD-MM-YYYY"], 'ru');
    
    this.state = {
      calendar: {
        year: moment(data).year(),
        month: moment(data).month(),
        monthArray: [],
      },
      data,
      openModalSelectYear: false,
      openModalSelectMonth: false,
      isActive: props.isActive || true,
      toClose: (props.toClose === undefined) ? true : props.toClose,
    }
    this._fillDayArray = this._fillDayArray.bind(this);
    this._upMonth = this._upMonth.bind(this);
    //console.log(moment(props.data).day())
  }

  _ref = (e) => {

  }

  _fillDayArray = () => {
    var month = moment({ year: this.state.calendar.year, month: this.state.calendar.month });
    var monthArray = matrixArray(6, 7);
    var current = false;
    for (var week = 0; week <= 5; week++) {
      for (var day = 0; day <= 6; day++) {
        current = moment(month).weekday((week * 7) + (day)).isSame(moment(), 'day')
        //console.log(moment(month).weekday((week * 7) + (day)).date())
        monthArray[week][day] = {
          data: moment(month).weekday((week * 7) + (day)),
          day: moment(month).weekday((week * 7) + (day)).date(),
          month: moment(month).weekday((week * 7) + (day)).month(),
          current: current,
        }
      }
    }
    return monthArray;
  }

  _fillMonthArray = () => {
    var monthArray = matrixArray(4, 3)
    var current = false;
    for (var p = 0; p <= 3; p++) {
      for (var m = 0; m <= 2; m++) {
        current = (moment().month((p * 3) + m).isSame(moment(), 'month') && moment().year(this.state.calendar.year).isSame(moment(), 'year'))

        monthArray[p][m] = {
          current,
          month: moment().month((p * 3) + m).format('MMM'),
          m: (p * 3) + m
        }
        //console.log(month);
      }
    }
    return monthArray;
  }

  _getWeekOfDay = (day) => Math.ceil(day / 7) - 1;

  _upMonth = () => {
    var month = this.state.calendar.month;
    var year = this.state.calendar.year;
    if (this.state.openModalSelectMonth) year++
    else {
      if (month === 11) {
        month = 0;
        year++;
      }
      else month++;
    }
    this.setState({
      calendar: {
        ...this.state.calendar,
        month,
        year,
      }
    })
  }

  _downMonth = () => {
    var month = this.state.calendar.month;
    var year = this.state.calendar.year;
    if (this.state.openModalSelectMonth) year--
    else {
      if (month === 0) {
        month = 11;
        year--;
      }
      else month--;
    }
    this.setState({
      calendar: {
        ...this.state.calendar,
        month,
        year,
      }
    })
  }

  componentWillMount() {
    //this._fillMonthArray()
    //console.log(monthArray);
  }

  componentDidUpdate(prevProps) {

  }

  dayweek = () => {
    var dayweek = [];
    for (var i = 0; i <= 6; i++) {
      dayweek[i] = moment().day(i + 1).format('dd');
    }
    return (
      <div style={{ justifyContent: 'space-between', textTransform: 'capitalize' }} className='flex-row' >
        {
          dayweek.map((day, i) => <span key={i} style={{ height: 32, width: 32, margin: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }} >{day}</span>)
        }
      </div>)
  }

  _onClick = (data) => {
    //event.preventDefault();
    var toClose = this.state.toClose;
    this.setState({
      data,
      isActive: toClose ? false : true,
    })

    if (this.props.onSelect) this.props.onSelect(new Date(data.format()))
  }

  _onClickMonth = (month) => {
    //event.preventDefault();
    var calendar = this.state.calendar;
    var openModalSelectMonth = !this.state.openModalSelectMonth
    calendar.month = month;
    this.setState({
      openModalSelectMonth,
      calendar,
    })
    console.log()

  }

  _fillSelectYear = (year) => {
    return [
      year - 2,
      year - 1,
      year,
      year + 1
    ]
  }

  _fillSelectMonth = () => {
    var arrayMonth = [];
    for (var m = 0; m <= 11; m++) {
      arrayMonth.push(moment().month(m).format('MMMM'));
    }
    return arrayMonth;
  }

  modalSelectYear = () => {
    return (
      <div >
        <div style={this.state.openModalSelectYear ? {
          position: 'fixed',
          background: 'transparen',
          opacity: '0.00',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          zIndex: '999',
        } : null}
          onClick={() => {
            this.setState({ openModalSelectYear: false })
          }} />
        <div id='modal1' className='modal-dropdown' style={this.state.openModalSelectYear ? {
          display: 'block',
          opacity: '1',
          padding: '8px 0px'
        } : null} >
          <div className='dropdown-menu' >
            {this._fillSelectYear(this.state.calendar.year).map(year => <a className='dropdown-item' onClick={() => {
              this.setState({
                openModalSelectYear: false,
                calendar: {
                  ...this.state.calendar,
                  year
                }
              })

            }} >{year}</a>)}
          </div>

        </div>
      </div>
    )
  }

  modalSelectMonth = () => {
    return (
      <div >
        <div style={this.state.openModalSelectMonth ? {
          position: 'fixed',
          background: 'transparen',
          opacity: '0.00',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          zIndex: '999',
        } : null}
          onClick={() => {
            this.setState({ openModalSelectMonth: false })
          }} />
        <div id='modal1' className='modal-dropdown' style={this.state.openModalSelectMonth ? {
          display: 'block',
          opacity: '1',
          padding: '8px 0px'
        } : null} >
          <div className='dropdown-menu' style={{ height: 200, overflow: 'auto' }} >
            {this._fillSelectMonth().map((month, m) => <a className='dropdown-item' onClick={() => {
              this.setState({
                openModalSelectMonth: false,
                calendar: {
                  ...this.state.calendar,
                  month: m
                }
              })

            }} >{month}</a>)}
          </div>

        </div>
      </div>
    )
  }

  _selectYear = (year) => <div className={(this.state.openModalSelectMonth) ? 'flex-row not-year' : 'flex-row select-year'} >
    <div
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        margin: 1
      }} >
      {year}
    </div>
    <div style={{ position: 'relative' }} >
      <a
        className='btn-select-day'
        onClick={() => this.setState({ openModalSelectYear: true })}
        style={{
          height: 32,
          width: 32,
          margin: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          //fontSize: 20,
        }} >
        <svg xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={(this.state.openModalSelectYear) ? "icon-down-arrow dropdown-active" : "icon-down-arrow"}>
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </a>
      {this.modalSelectYear(this)}
    </div>
  </div>


  _selectMonth = (calendar) => {
    return (<div className="flex-row"
      style={{
        display: 'flex',
        flex: 3,
        justifyContent: 'space-between',
        alignItems: 'center'
      }} >
      <a
        className='btn-select-day'
        onClick={this._downMonth}
        style={{
          height: 32,
          width: 32,
          margin: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
          //fontSize: 20,
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='icon-svg' >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </a>
      <div className='flex-row' style={{ flex: 'auto' }} >
        <div style={
          {
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'stretch',
            alignItems: 'center',
            margin: 1,
            cursor: 'arrow',
            userSelect: 'none'
          }} >
          {(this.state.openModalSelectMonth) ? calendar.year : moment().month(calendar.month).format('MMMM') + ' ' + calendar.year}
        </div>
        {(!this.state.openModalSelectMonth) ? <div style={{ position: 'relative', alignSelf: 'flex-end' }} >
          <a
            className='btn-select-day'
            onClick={() => this.setState({ openModalSelectMonth: !this.state.openModalSelectMonth })}
            style={{
              height: 32,
              width: 32,
              margin: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              //fontSize: 20,
            }} >
            <svg xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={(this.state.openModalSelectMonth) ? "icon-down-arrow dropdown-active" : "icon-down-arrow"}>
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </a>
          {/* {this.modalSelectMonth(this)} */}
        </div> : null}
      </div>

      <a
        className='btn-select-day'
        onClick={this._upMonth}
        style={{
          height: 32,
          width: 32,
          margin: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          //fontSize: 20,
        }} >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='icon-svg' >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </a>
    </div>)
  }

  _selectDay = (calendar, arr, data) => <div style={{ overflow: 'hidden' }} className={(this.state.openModalSelectMonth) ? 'off-select-day' : 'on-select-day'}>
    <div className='flex-column' >
      {this.dayweek()}
      {arr.map((week, wi) => <div key={wi} style={{ justifyContent: 'space-between' }} className='flex-row' >
        {week.map((day, di) =>
          <a key={di}
            className={(moment(data).isSame(day.data)) ? day.month !== calendar.month ? 'btn-select-day no-current-month active' : 'btn-select-day active' : (day.current) ? 'btn-select-day current' : day.month !== calendar.month ? 'btn-select-day no-current-month' : 'btn-select-day'}
            onClick={() => this._onClick(day.data)}
            style={{
              height: 32,
              width: 32,
              margin: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              //fontSize: 20,
              //opacity: day.month !== calendar.month ? '.4' : '1'
            }} >
            {day.day}
          </a>
        )}</div>
      )}
    </div>

  </div>

  _selectMonths = (arr, month) => <div style={{ overflow: 'hidden' }} className={(this.state.openModalSelectMonth) ? 'on-select-month' : 'off-select-month'}>
    <div className='flex-column' >
      {arr.map((row, ri) => <div key={ri} style={{ justifyContent: 'space-around' }} className='flex-row' >
        {row.map((col, ci) =>
          <a key={ci}
            className={(moment(month).isSame(col.m)) ? 'btn-select-day active' : (col.current) ? 'btn-select-day current' : 'btn-select-day'}
            onClick={() => this._onClickMonth(col.m)}
            style={{
              margin: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              //flex: '1',
              height: 57.5,
              width: 57.5,
              //fontSize: 20,
              //opacity: day.month !== calendar.month ? '.4' : '1'
            }} >
            {col.month}
          </a>
        )}</div>
      )}
    </div>
  </div>



  render() {
    const calendar = this.state.calendar;
    //const arr = calendar.monthArray;
    const arrDay = this._fillDayArray();
    const arrMonth = this._fillMonthArray();
    const data = this.state.data;
    const isActive = this.state.isActive;

    return (
      <div ref={this._ref} style={{
        display: (isActive) ? 'block' : 'none'
      }}  >
        <div  style={{
          justifyContent: 'space-between',
          //fontSize: 20,
          border: '1px solid #e0e0e0'
        }}
          className="flex-column">
          <div style={{ borderBottom: '1px solid #e0e0e0', alignItems: 'center', textTransform: 'capitalize' }} className="flex-row">

            {this._selectMonth(calendar)}
            {/* {this._selectYear(calendar.year)} */}
          </div>
          <div style={{ height: 238, overflow: 'hidden' }} >
            {this._selectMonths(arrMonth, calendar.month)}
            {this._selectDay(calendar, arrDay, data)}
          </div>

        </div>
      </div>

    );
    // return (
    //   <div style={{ width: 170, position: 'relative', overflow: 'hidden' }} className='flex-row' >
    //     <div style={{ width: '100%', display: 'flex', background: 'green' }} >
    //       <div style={{ height: 50 }} />
    //     </div>
    //     <div className='test2' style={{ }} >
    //       <div className='test' style={{ width: 50, height: 50, background: 'red'  }} />
    //     </div>
    //   </div>

    // )
  }
}
//export default connect(mapStateToProps)(LoginPage);
export default Calendar;