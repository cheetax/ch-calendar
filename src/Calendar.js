
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
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps.isActive !== undefined && this.setState({ openModalCalendar: !!nextProps.isActive })
    }

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

    _btnCalendar = () => <div style={{ position: 'relative', color: 'initial' }} >
        {this._ModalCalendar()}
        {this.props.isButtonActive && <BtnCalendar onClick={() => this.setState({
            openModalCalendar: !this.state.openModalCalendar
        })}
        ><SvgCalendar /></BtnCalendar>}
    </div>

    render() {
        return ((this.props.isModal) ?
            <div style={{ display: 'flex', justifyContent: 'center' }}>{this._btnCalendar()}</div> :
            !!this.props.isActive && <div style={{height: '100%', width: '100%'}} ><CalendarCore {...this.props} /></div>)
    }
}

export default Calendar;