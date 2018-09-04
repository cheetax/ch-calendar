
import { ModalCalendar } from './ModalCalendar'
import { BtnCalendar } from './BtnSpin'
import { SvgCalendar } from './Svg'
import React, { Component } from 'react';
import CalendarCore from './CalendarCore';

class Calendar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            openModalCalendar: !!props.isActive,
        }
    }

    _ModalCalendar = () => <div >
        <ModalCalendar
            {...this.props}
            openModal={this.state.openModalCalendar}
            onSelect={(date) => {
                this.setState({ openModalCalendar: false })
                this.props.onSelect && this.props.onSelect(date)
            }}
            onClick={() => {
                this.setState({ openModalCalendar: false })
            }}
        />
    </div>

    _btnCalendar = () => <div style={{ position: 'relative', color: 'initial' }} >
        {this._ModalCalendar()}
        {!this.props.isActive && <BtnCalendar onClick={() => this.setState({
            openModalCalendar: !this.state.openModalCalendar
        })}
        ><SvgCalendar /></BtnCalendar>}
    </div>

    render() {
        return (this.props.isModal) ? <div style={{ display: 'flex' }}>{this._btnCalendar()}</div> : <div><CalendarCore {...this.props} /></div>
        //return <div style={{display: 'flex'}} >{this._btnCalendar()}</div>
    }
}

export default Calendar;