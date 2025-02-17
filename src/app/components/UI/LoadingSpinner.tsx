import React from 'react'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import './LoadingSpinner.scss'

const LoadingSpinner = () => {
    return (
        <div className='spinner-overlay'>
            <CgSpinnerTwoAlt className='spinner' />
        </div>
    )
}

export default LoadingSpinner