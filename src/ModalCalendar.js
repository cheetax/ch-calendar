import React from 'react'
import CalendarCore from './CalendarCore';
import './Modal.css'

const ClassModal = ({ openModal, isButtonActive }) => ((isButtonActive) && ((openModal) ? 'modal-calendar-button active' : 'modal-calendar-button') || ((openModal) ? 'modal-calendar-flex active' : 'modal-calendar-flex'))

const ClassModalOverlay = ({ openModal, isButtonActive }) => ((!isButtonActive) && (openModal ? 'modal-calendar-overlay active' : 'modal-calendar-overlay') || '')

const _onFocus = (event) => event.bubbles && event.preventDefault();

export const ModalCalendar = (props) => {
    const { openModal, style } = props;
    //console.log(openModal, props.isButtonActive)
    return <div >
        {(openModal && !props.isButtonActive) ? <div style={{
            position: 'fixed',
            backgroundColor: 'black',
            opacity: '0',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '999',
            ...style
        }}
            onClick={props.onClick} /> : null}
        <div className={ClassModalOverlay({ openModal, isButtonActive: !!props.isButtonActive })}
        >
            <div className={ClassModal({ openModal, isButtonActive: !!props.isButtonActive })} onMouseDown={_onFocus} onBlur={_onFocus}>
                <CalendarCore {...props} />
            </div>
        </div>

    </div>
}