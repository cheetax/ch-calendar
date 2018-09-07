
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.isActive !== undefined) {
            this.setState({
                openModalCalendar: !!nextProps.isActive,
            })
        }
    }

    _ModalCalendar = () =>
        <ModalCalendar
            {...this.props}
            openModal={this.state.openModalCalendar}
            onSelect={(date) => {
                if (this.props.toClose === undefined || this.props.toClose) {
                    this.setState({ openModalCalendar: false })                    
                }
                this.props.onSelect && this.props.onSelect(date)
            }}
            onClick={() => {
                (this.props.toClose === undefined || this.props.toClose) && this.setState({ openModalCalendar: false })
            }}
        />

    _btnCalendar = () => <div style={{ position: 'relative', color: 'initial' }} >
        {this._ModalCalendar()}
        {this.props.isButtonActive && <BtnCalendar onClick={() => this.setState({
            openModalCalendar: !this.state.openModalCalendar
        })}
        ><SvgCalendar /></BtnCalendar>}
    </div>

    render() {
        return ((this.props.isModal) ?
            <div style={{ display: 'flex' }}>{this._btnCalendar()}</div> :
            !!this.props.isActive && <div><CalendarCore {...this.props} /></div>)
    }
}

export default Calendar;