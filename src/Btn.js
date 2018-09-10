import React from 'react'

export const Btn = ({ onClick, children, style, className }) => {
    return <a
        className={(() => 'btn-select-day ' + className)()}
        onClick={onClick}
        style={{
            height: 32,
            width: 32,
            margin: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...style,
        }}>{children}</a>
}

// export const Btn = ({ onClick, style, _key, onFocus, children, className }) => <div className={(() => 'btn-select-day btn-spin ' + className)()}
//     key={_key}
//     style={style}
//     onClick={onClick ? (event) => onClick(event) : null}>
//     <input
//         key={_key}
//         type='url'
//         readOnly
//         className='btn-spin browser-default'>
//     </input>{children}</div>