import React from 'react'

export default function Input(props) {
    return (
        <div className='layer-1'>
            <label htmlFor={`${ props.name }`}>{props.placeholder}</label><br />
            <input type={props.type} name={props.name} id={`${ props.name }`} placeholder={props.placeholder} value={props.value} onChange={(e) => {
                props.setValue(e.target.value)
            }} />
        </div>
    )
}
