
import { startOfDay, getMonth, getYear, setDay, isToday, getDate, format, setMonth, isThisMonth, isSameDay } from 'date-fns'
import { locales } from './locales'
import { Btn } from './Btn'
import { SvgArrowDown, SvgArrowLeft, SvgArrowRight, SvgCenterFocus } from './Svg'
import React, { Component } from 'react';
import './CalendarCore.css';

const matrixArray = (row, col) => {
  var arr = new Array(row);
  for (var i = 0; i < row; i++) {
    arr[i] = new Array(col);
  }
  return arr;
}

class CalendarCore extends Component {

  constructor(props) {
    super(props)
    var date = !!props.date && startOfDay(props.date) || new Date()
    this.state = {
      calendar: {
        year: getYear(date),
        month: getMonth(date),
      },
      date,
      openModalSelectMonth: props.isMonth || false,
      button: 32,
      bigButton: 59.5,
      height: 262,
    }
  }

  _fillDayArray = () => {
    var month = new Date(this.state.calendar.year, this.state.calendar.month, 1);
    var monthArray = matrixArray(6, 7);
    var current = false;
    var date = null;
    for (var week = 0; week <= 5; week++) {
      for (var day = 1; day <= 7; day++) {
        date = setDay(month, (week * 7) + (day))
        current = isToday(date)
        monthArray[week][day] = {
          date,
          day: getDate(date),
          month: getMonth(date),
          current,
        }
      }
    }
    return monthArray;
  }

  _fillMonthArray = () => {
    var monthArray = matrixArray(4, 3)
    var month = null;
    for (var p = 0; p <= 3; p++) {
      for (var m = 0; m <= 2; m++) {
        month = setMonth(new Date(), (p * 3) + m)
        monthArray[p][m] = {
          current: isThisMonth(month),
          month: format(month, 'MMM', { locale: locales[navigator.browserLanguage || navigator.language || navigator.userLanguage] }),
          m: (p * 3) + m
        }
        //console.log(month);
      }
    }
    return monthArray;
  }

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
        month,
        year,
      }
    })
  }

  _currentDay = () => {
    var currentDate = startOfDay(new Date());
    var month = getMonth(currentDate);
    var year = getYear(currentDate);
    this.setState({
      calendar: {
        year,
        month,
      },
      date: currentDate,
      currentValue: format(currentDate, 'DD-MM-YYYY', { locale: locales[navigator.browserLanguage || navigator.language || navigator.userLanguage] })
    })
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.date !== undefined) {
      var date = nextProps.date
      this.setState({
        date,
        calendar: {
          year: getYear(date),
          month: getMonth(date),
        },
      })
    }
  }

  dayweek = () => {
    var dayweek = [];
    for (var i = 0; i <= 6; i++) {
      dayweek[i] = format(setDay(new Date(), i + 1), 'dd', { locale: locales[navigator.browserLanguage || navigator.language || navigator.userLanguage] });
    }
    return (
      <div style={{ justifyContent: 'space-between', textTransform: 'capitalize' }} className='calendar-flex-row' >
        {
          dayweek.map((day, i) => <span
            key={i}
            style={{
              height: this.state.button,
              width: this.state.button,
              margin: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }} >{day}</span>)
        }
      </div>)
  }

  _onClick = (date) => {
    this.setState({
      date,
    })
    //console.log(date)
    this.props.onSelect && this.props.onSelect(date)
  }

  _onClickMonth = (month) => {
    var calendar = this.state.calendar;
    var date = this.state.date;
    var openModalSelectMonth = this.state.openModalSelectMonth
    calendar.month = month;
    if (!this.props.isMonth) {
      openModalSelectMonth = false;
    }
    else {
      date = new Date(calendar.year, month, 1)
      this.props.onSelect && this.props.onSelect(date)
    }
    this.setState({
      openModalSelectMonth,
      calendar,
      date,
    })
  }

  _selectMonth = (calendar) => {
    return (<div className="calendar-flex-row"
      style={{
        display: 'flex',
        flex: 3,
        justifyContent: 'space-between',
        alignItems: 'center'
      }} >
      <Btn
        style={{
          height: this.state.button,
          width: this.state.button,
        }}
        onClick={this._currentDay}>
        <SvgCenterFocus />
      </Btn>
      <Btn
        style={{
          height: this.state.button,
          width: this.state.button,
        }}
        onClick={this._downMonth}>
        <SvgArrowLeft />
      </Btn>
      <div className='calendar-flex-row' style={{ flex: 'auto' }} >
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
          {(this.state.openModalSelectMonth) ? calendar.year : format(setMonth(new Date(), calendar.month), 'MMMM', { locale: locales[navigator.browserLanguage || navigator.language || navigator.userLanguage] }) + ' ' + calendar.year}
        </div>
        {(!this.state.openModalSelectMonth) ? <div style={{ position: 'relative', alignSelf: 'flex-end' }} >
          <Btn
            style={{
              height: this.state.button,
              width: this.state.button,
            }}
            onClick={() => this.setState({
              openModalSelectMonth: !this.state.openModalSelectMonth
            })}>
            <SvgArrowDown />
          </Btn>
        </div> : null}
      </div>
      <Btn
        onClick={this._upMonth}
        style={{
          height: this.state.button,
          width: this.state.button,
        }}>
        <SvgArrowRight />
      </Btn>
    </div>)
  }

  _selectDayClass = ({ date, day, calendar }) => (isSameDay(date, day.date)) && ((day.month !== calendar.month) ? 'no-current-month active' : 'active') || ((day.current) ? 'current' : (day.month !== calendar.month) ? 'no-current-month' : ' ')

  _selectDay = (calendar, arr, date) => <div style={{ overflow: 'hidden' }} className={(this.state.openModalSelectMonth) ? 'off-select-day' : 'on-select-day'}>
    <div className='calendar-flex-column' >
      {this.dayweek()}
      {arr.map((week, i) => <div key={i} style={{ justifyContent: 'space-between' }} className='calendar-flex-row' >
        {week.map((day) => <div key={day.date}>
          <Btn
            className={this._selectDayClass({ date, day, calendar })}
            style={{
              height: this.state.button,
              width: this.state.button,
            }}
            onClick={() => this._onClick(day.date)}>
            {day.day}
          </Btn> </div>
        )}</div>
      )}
    </div>
  </div>

  _selectMonths = (arr, month) => <div style={{ overflow: 'hidden' }} className={(this.state.openModalSelectMonth) ? 'on-select-month' : 'off-select-month'}>
    <div className='calendar-flex-column' >
      {arr.map((row, i) => <div key={i} style={{ justifyContent: 'space-around' }} className='calendar-flex-row' >
        {row.map((col) => <div key={col.m} >
          <Btn
            className={(month === col.m) ? 'btn-select-day active' : (col.current) ? 'btn-select-day current' : 'btn-select-day'}
            onClick={() => this._onClickMonth(col.m)}
            style={{
              height: this.state.bigButton,
              width: this.state.bigButton,
            }} >
            {col.month}
          </Btn>
        </div>
        )}
      </div>
      )}
    </div>
  </div>

  _ref = (elem) => {
    let {
      clientWidth,
      clientHeight
    } = elem
    console.log(clientHeight, clientWidth)
    // let button = 32;
    // let bigButton = 59.5;
    // let height = 262;
    // let width = 232;
    //let _height = (clientWidth * 1.13) > clientHeight ? clientHeight : clientWidth * 1.13
    //let _width = (clientHeight / 1.13) > clientWidth ? clientWidth : clientHeight / 1.13
    let _height = (clientWidth * 1.13)
    let _width = (clientHeight / 1.13)
    if (_width*1.13 > _height) _height = _width * 1.13
    console.log(_height, _width)
    // if (_height > height && _width > width) {
    //   height = _height
    //   width = _height / 1.13
    //   button = height / 8;
    //   bigButton = height / 4.35
    // }
    this.setState({
      height,
      button,
      bigButton
    })
  }

  render() {
    const {
      calendar,
      date,
    } = this.state;
    const arrDay = this._fillDayArray();
    const arrMonth = this._fillMonthArray();
    return (
      <div ref={this._ref} style={{
        display: 'inline-block',
        fontSize: 16,
        boxSizing: "content-box",
        height: '100%',
        width: '100%'
      }}  >
        <div style={{
          justifyContent: 'space-between',
          //fontSize: 20,
          border: '1px solid #e0e0e0'
        }}
          className="calendar-flex-column">
          <div style={{ borderBottom: '1px solid #e0e0e0', alignItems: 'center', textTransform: 'capitalize' }} className="calendar-flex-row">
            {this._selectMonth(calendar)}
          </div>
          <div style={{ height: this.state.height, overflow: 'hidden' }} >
            {this._selectMonths(arrMonth, calendar.month)}
            {this._selectDay(calendar, arrDay, date)}
          </div>

        </div>
      </div>
    );
  }
}
export default CalendarCore;