import React from 'react'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import './Error.css'

export default function Error({message}) {
    return (
        <div className='Error'>
            <ErrorOutlineIcon color='primary' fontSize='large'/>
           <h2>{message}</h2>
        </div>
    )
}
