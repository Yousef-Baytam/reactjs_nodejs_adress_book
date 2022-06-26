import React, { useEffect, useState } from 'react'

export default function Filter(props) {
    const [atr, setAtr] = useState('contains')
    const [val, setVal] = useState('')

    useEffect(() => {
        setAtr('contains')
        setVal('')
    }, [props.clearSignal])


    return (
        <div className={`dropdown-content ${ props.name }`}>
            <select value={atr} onChange={(e) => { setAtr(e.target.value); props.setNameFilter({ "atr": e.target.value, "value": val }) }} id='status'>
                <option value="contains">Contains</option>
                <option value="startsWith">Starts with</option>
                <option value="endsWith">Ends with</option>
            </select><br />
            <input type={'text'} name={props.name} placeholder={props.name} value={val} onChange={(e) => { setVal(e.target.value); props.setNameFilter({ "atr": atr, "value": e.target.value }) }} />
        </div>

    )
}
