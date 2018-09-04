import React from 'react'
import CalendarCore from './CalendarCore';
import './Modal.css'
//import 'ch-calendar/dist/ch-calendar.css';

const ClassModal = (openModal) => (openModal) ? 'modal-dialog active' : 'modal-dialog'

export const ModalCalendar = (props) => {
    const { openModal, onClick } = props;
    
    return <div >
        <div style={(openModal && !!props.isButtonActive ) ? {
            position: 'fixed',
            background: 'black',
            opacity: '0',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '999',
        } : null}
            onClick={onClick} />
        <div className={ClassModal(openModal)} >
            <CalendarCore {...props} />
        </div>
    </div>
}