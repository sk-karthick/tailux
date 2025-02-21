import React from 'react'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import './LoadingSpinner.scss'

const LoadingSpinner = () => {

    const splitWords = (word: string) => {
        return word.split('').map((letter, index) => (
            <span key={index} style={{ transitionDelay: `${index * 50}ms` }}>{letter}</span>
        ))
    }

    return (
        <div className='spinner'>
            <div className='spinner-brand'>{splitWords("Tailux")}</div>
            <div className='spinner-brand-proverb'>For Ultra Luxury</div>
        </div>
    )
}

export default LoadingSpinner