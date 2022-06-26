import React from 'react'

export default function Submit(props) {
    return (
        <div className='action'>
            <input className='submit' type={'submit'} value={props.value} onClick={(e) => { e.preventDefault(); props.run() }} />
        </div>
    )
}
