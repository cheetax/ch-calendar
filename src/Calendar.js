
import { ModalCalendar } from './ModalCalendar'
import { BtnCalendar } from './BtnSpin'
import { SvgCalendar } from './Svg'
import React, { Component } from 'react';
import CalendarCore from './CalendarCore';

class Calendar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            openModalCalendar: !props.toNotClose && !!props.isActive || false,
            elem: null
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps.isActive !== undefined && this.setState({ openModalCalendar: !!nextProps.isActive })
        nextProps.isClose && this.setState({ openModalCalendar: false })
    }

    _onFocus = (event) => !event.bubbles && this.setState({ openModalCalendar: false })

    _ModalCalendar = () =>
        <ModalCalendar
            {...this.props}
            openModal={this.state.openModalCalendar}
            onSelect={(date) => {
                if (!this.props.isActive) {
                    this.setState({ openModalCalendar: false })
                }
                this.props.onSelect && this.props.onSelect(date)
            }}
            onClick={() => {
                !this.props.isActive && this.setState({ openModalCalendar: false })
            }}
        />
    
    _btnCalendarOnClick = () => {
       // console.log(this.state.elem)
       // var elem = this.state.elem
        //elem && elem.focus()
        this.setState({
            openModalCalendar: !this.state.openModalCalendar
        })
    }

    _btnCalendar = () => <div style={{ position: 'relative', color: 'initial' }} >
        {this._ModalCalendar()}
        {this.props.isButtonActive && <BtnCalendar onClick={this._btnCalendarOnClick}
        ><SvgCalendar /></BtnCalendar>}
    </div>

    _ref = (elem) => this.setState({elem})

    render() {
        return ((this.props.isModal) ?
            <div ref={this._ref} style={{ display: 'flex', justifyContent: 'center' }} onBlur={this._onFocus}>{this._btnCalendar()} </div> :
            !!this.props.isActive && <div style={{ height: '100%', width: '100%' }} ><CalendarCore {...this.props} /></div>)
    }
}

export default Calendar;