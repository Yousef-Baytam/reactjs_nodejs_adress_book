import React from 'react'

export default function Filter() {
    return (
        <>
            <Input type={'text'} name={'Search'} placeholder={'Search'} value={search} setValue={setSearch} />
        </>
    )
}
