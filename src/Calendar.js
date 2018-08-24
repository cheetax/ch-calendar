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
    var data = moment(props.date, 'ru').startOf('day');

    this.state = {
      calendar: {
        year: moment(data).year(),
        month: moment(data).month(),
        monthArray: [],
      },
      isMonth: props.isMonth || false,
      data,
      openModalSelectYear: false,
      openModalSelectMonth: props.isMonth || false,
      isActive: props.isActive || true,
      toClose: (props.toClose === undefined) ? true : props.toClose,
    }
    console.log(this.state)
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

  _currentDay = () => {
    var currentDate = moment().startOf('day');
    var month = moment(currentDate).month();
    var year = moment(currentDate).year();
    this.setState({
      calendar: {
        year,
        month,
        monthArray: [],
      },
      data: currentDate,
      currentValue: currentDate.format('DD-MM-YYYY')
    })
  }

  componentWillMount() {

  }

  componentWillUpdate(nextProps) {
    var isActive = this.state.isActive;
    var data = this.state.data;
    if (nextProps.isActive === undefined && !this.state.isActive) {
      isActive = true;
      this.setState({ isActive })
    }
    else if (nextProps.isActive !== this.state.isActive && nextProps.isActive !== undefined) {
      isActive = nextProps.isActive;
      this.setState({ isActive })
    }
    if (nextProps.date !== undefined) {
      var _date = moment(nextProps.date).startOf('day')
      if (!moment(_date).isSame(data)) {
        data = _date;
        this.setState({
          data,
          calendar: {
            year: moment(data).year(),
            month: moment(data).month(),
            monthArray: [],
          }
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

  _onClick = (data) => {
    //event.preventDefault();
    var toClose = this.state.toClose;

    this.setState({
      data,
      isActive: toClose ? false : true,
    })
    console.log(data.format());
    var _data = data.format();
    if (this.props.onSelect) this.props.onSelect(new Date(_data))
  }

  _onClickMonth = (month) => {
    //event.preventDefault();
    var calendar = this.state.calendar;
    var data = this.state.data;
    var openModalSelectMonth = this.state.openModalSelectMonth
    calendar.month = month;
    if (!this.props.isMonth) {
      openModalSelectMonth = false;
    }
    else {
      data = moment({ day: data.date(), month, year: calendar.year })
      if (this.props.onSelect) this.props.onSelect(new Date(data.format()))
    }
    this.setState({
      openModalSelectMonth,
      calendar,
      data,
    })
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

  _selectMonth = (calendar) => {
    return (<div className="calendar-flex-row"
      style={{
        display: 'flex',
        flex: 3,
        justifyContent: 'space-between',
        alignItems: 'center'
      }} >
      <a
        className='btn-select-day'
        onClick={this._currentDay}
        style={{
          height: 32,
          width: 32,
          margin: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
          //fontSize: 20,
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
      </a>
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

  _selectDayClass = ({ data, day, calendar }) => {
    var result = 'btn-select-day ';
    //console.log(data +' ' + day.data + " " + moment(data).isSame(day.data))
    if (moment(data).isSame(day.data)) {
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

  _selectDay = (calendar, arr, data) => <div style={{ overflow: 'hidden' }} className={(this.state.openModalSelectMonth) ? 'off-select-day' : 'on-select-day'}>
    <div className='calendar-flex-column' >
      {this.dayweek()}
      {arr.map((week, wi) => <div key={wi} style={{ justifyContent: 'space-between' }} className='calendar-flex-row' >
        {week.map((day, di) =>
          <a key={di}
            className={this._selectDayClass({ data, day, calendar })}
            onClick={() => {
            console.log('select day - ' + day.data)
              return this._onClick(day.data)
            }}
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
    <div className='calendar-flex-column' >
      {arr.map((row, ri) => <div key={ri} style={{ justifyContent: 'space-around' }} className='calendar-flex-row' >
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
              height: 59.5,
              width: 59.5,
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
    //console.log('calendar -' + isActive)
    return (
      <div ref={this._ref} style={{
        display: (isActive) ? 'inline-block' : 'none',
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
            {this._selectDay(calendar, arrDay, data)}
          </div>

        </div>
      </div>

    );
  }
}
export default Calendar;