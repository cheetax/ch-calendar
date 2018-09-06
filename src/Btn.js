import React from 'react'

export const Btn = ({ onClick, children, _key = 1, style, className }) => <a
        className={(() => 'btn-select-day ' + className)()}
        onClick={onClick}
        key={_key}
        style={{
            height: 32,
            width: 32,
            margin: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...style,
        }}>{children}</a>