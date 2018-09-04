import moment from 'moment';
import 'moment/locale/ru';
import { Btn } from './Btn'
import React, { Component } from 'react';
import './CalendarCore.css';

moment.locale('ru');

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
    var date = moment(props.date, 'ru').startOf('day');

    this.state = {
      calendar: {
        year: moment(date).year(),
        month: moment(date).month(),
      },
      isMonth: props.isMonth || false,
      date,
      openModalSelectMonth: props.isMonth || false,
      openModalCalendar: false,
      isActive: props.isActive || true,
      toClose: (props.toClose === undefined) ? true : props.toClose,
    }
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
          date: moment(month).weekday((week * 7) + (day)),
          day: moment(month).weekday((week * 7) + (day)).date(),
          month: moment(month).weekday((week * 7) + (day)).month(),
          current,
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
    var currentDate = moment().startOf('day');
    var month = moment(currentDate).month();
    var year = moment(currentDate).year();
    this.setState({
      calendar: {
        year,
        month,
      },
      date: currentDate,
      currentValue: currentDate.format('DD-MM-YYYY')
    })
  }

  componentWillReceiveProps(nextProps) {
    var isActive = this.state.isActive;
    var date = this.props.date;
    if (nextProps.isActive === undefined && !this.state.isActive) {
      isActive = true;
    }
    else if (nextProps.isActive !== this.state.isActive && nextProps.isActive !== undefined) {
      isActive = nextProps.isActive;
    }
    this.setState({ isActive })
    if (nextProps.date !== undefined) {
      var _date = moment(nextProps.date).startOf('day')
      if (!moment(_date).isSame(date)) {
        date = moment(_date);
        this.setState({
          date,
          calendar: {
            year: moment(date).year(),
            month: moment(date).month(),
          },
        })
      }
    }

  }

  dayweek = () => {
    var dayweek = [];
    for (var i = 0; i <= 6; i++) {
      dayweek[i] = moment().day(i + 1).format('dd');
    }
    return (
      <div style={{ justifyContent: 'space-between', textTransform: 'capitalize' }} className='calendar-flex-row' >
        {
          dayweek.map((day, i) => <span key={i} style={{ height: 32, width: 32, margin: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }} >{day}</span>)
        }
      </div>)
  }

  _onClick = (date) => {
    //event.preventDefault();
    var toClose = this.state.toClose;
    this.setState({
      date,
      isActive: toClose ? false : true,
    })
    //console.log(date.format());
    var _date = date.format();
    if (this.props.onSelect) this.props.onSelect(new Date(_date))
  }

  _onClickMonth = (month) => {
    //event.preventDefault();
    var calendar = this.state.calendar;
    var date = this.state.date;
    var openModalSelectMonth = this.state.openModalSelectMonth
    calendar.month = month;
    if (!this.props.isMonth) {
      openModalSelectMonth = false;
    }
    else {
      date = moment({ day: date.date(), month, year: calendar.year })
      this.props.onSelect && this.props.onSelect(new Date(date.format()))
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
      <Btn onClick={this._currentDay}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
      </Btn>
      <Btn onClick={this._downMonth}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='icon-svg' >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
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
          {(this.state.openModalSelectMonth) ? calendar.year : moment().month(calendar.month).format('MMMM') + ' ' + calendar.year}
        </div>
        {(!this.state.openModalSelectMonth) ? <div style={{ position: 'relative', alignSelf: 'flex-end' }} >
          <Btn onClick={() => this.setState({ openModalSelectMonth: !this.state.openModalSelectMonth })}>
            <svg xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={(this.state.openModalSelectMonth) ? "icon-down-arrow dropdown-active" : "icon-down-arrow"}>
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </Btn>
          {/* {this.modalSelectMonth(this)} */}
        </div> : null}
      </div>
      <Btn onClick={this._upMonth}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='icon-svg' >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </Btn>
    </div>)
  }

  _selectDayClass = ({ date, day, calendar }) => {
    var result = '';
    if (moment(date).isSame(day.date)) {
      if (day.month !== calendar.month) {
        result += 'no-current-month active'
      }
      else {
        result += 'active'
      }
    }
    else {
      if (day.current) {
        result += 'current';
      }
      else {
        if (day.month !== calendar.month) {
          result += 'no-current-month'
        }
      }
    }
    //console.log(result)
    return result;
  }

  _selectDay = (calendar, arr, date) => <div style={{ overflow: 'hidden' }} className={(this.state.openModalSelectMonth) ? 'off-select-day' : 'on-select-day'}>
    <div className='calendar-flex-column' >
      {this.dayweek()}
      {arr.map((week, wi) => <div key={wi} style={{ justifyContent: 'space-between' }} className='calendar-flex-row' >
        {week.map((day, di) =>
          <Btn _key={di}
            className={this._selectDayClass({ date, day, calendar })}
            onClick={() => {
              //console.log('select day - ' + day.date)
              return this._onClick(day.date)
            }}>
            {day.day}
          </Btn>
        )}</div>
      )}
    </div>
  </div>

  _selectMonths = (arr, month) => <div style={{ overflow: 'hidden' }} className={(this.state.openModalSelectMonth) ? 'on-select-month' : 'off-select-month'}>
    <div className='calendar-flex-column' >
      {arr.map((row, ri) => <div key={ri} style={{ justifyContent: 'space-around' }} className='calendar-flex-row' >
        {row.map((col, ci) =>
          <Btn _key={ci}
            className={(moment(month).isSame(col.m)) ? 'btn-select-day active' : (col.current) ? 'btn-select-day current' : 'btn-select-day'}
            onClick={() => this._onClickMonth(col.m)}
            style={{
              height: 59.5,
              width: 59.5,
            }} >
            {col.month}
          </Btn>
        )}</div>
      )}
    </div>
  </div>

  render() {
    const {
      calendar,
      date,
      isActive } = this.state;
    const arrDay = this._fillDayArray();
    const arrMonth = this._fillMonthArray();
    //console.log('calendar -' + isActive)
    return (
      <div style={{
        display: (isActive) ? 'inline-block' : 'none',
        fontSize: 16,
        boxSizing: "content-box"
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
          <div style={{ height: 262, overflow: 'hidden' }} >
            {this._selectMonths(arrMonth, calendar.month)}
            {this._selectDay(calendar, arrDay, date)}
          </div>

        </div>
      </div>

    );
  }
}
export default CalendarCore;