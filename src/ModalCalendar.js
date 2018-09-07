import React from 'react'
import CalendarCore from './CalendarCore';
import './Modal.css'
//import 'ch-calendar/dist/ch-calendar.css';

const ClassModal = ({ openModal, isButtonActive }) => {
    //console.log(isButtonActive)
    return (isButtonActive) && ((openModal) ? 'modal-dialog-button active' : 'modal-dialog-button') || ((openModal) ? 'modal-dialog-flex active' : 'modal-dialog-flex')
}

const ClassModalOverlay = ({openModal, isButtonActive }) => {
    return ((!isButtonActive) && (openModal ? 'modal-dialog-overlay active' : 'modal-dialog-overlay'))
}


export const ModalCalendar = (props) => {
    const { openModal, onClick } = props;

    return <div>
        {(openModal && !props.isButtonActive) ? <div style={{
            position: 'fixed',
            background: 'black',
            opacity: '0',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '999',
        }}
            onClick={

                onClick
            } /> : null}
        <div className={ClassModalOverlay({openModal, isButtonActive: !!props.isButtonActive})} >
            <div className={ClassModal({ openModal, isButtonActive: !!props.isButtonActive })} >
                <CalendarCore {...props} />
            </div>
        </div>

    </div>
}