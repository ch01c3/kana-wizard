import './Homepage.css'
import { useRef, useState, useContext } from 'react'
import { motion } from 'framer-motion'

import { FormValues } from '../store/form-values-context.jsx'
import Checkbox from './Checkbox.jsx'
import RomajiModal from './RomajiModal.jsx'

const [url1,url2] = ['https://en.wikipedia.org/wiki/Hiragana', 'https://en.wikipedia.org/wiki/Katakana']

export default function Homepage({onSubmitForm}) {
    const {fonts, checkboxOptions, checkBoxes, setCheckBoxes, fontValue, setFontValue} = useContext(FormValues)
    const [isDropdown, setIsDropdown] = useState(false)

    const romajiDialog = useRef()

    function handleRomajiModal() {
        romajiDialog.current.showModal()
    }

    function handleCloseModal() {
        romajiDialog.current.close()
    }

    function handleDropDown() {
        setIsDropdown(!isDropdown);
    }

    function handleFontSelect(font) {
        setFontValue(font)
        handleDropDown()
    }

    function createFontSpan(option) {
        return <motion.span 
        key={option}
        variants={{
            open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24}},
            close: { opacity: 0, y: 20, transition: { duration: 0.3}}
        }}
        onClick={() => handleFontSelect(option)}>
            {option}
        </motion.span>
    }

    function createFontsSpans() {
        return fonts.map(createFontSpan)
    }

// Checkbox functions
    function handleCheckboxChange(checkID) {
        setCheckBoxes(prevValues => ({
            ...prevValues,
            [checkID]: !prevValues[checkID]
        }))
    }

    function createCheckbox(option) {
        return (
            <Checkbox
                key={option}
                label={option}
                isSelected={checkBoxes[option]}
                onCheckboxChange={() => handleCheckboxChange(option)}
            />
        )
    }

    function createCheckboxes() {
        return checkboxOptions.map(createCheckbox)
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        onSubmitForm(false)
    }

    function handleSelection(value) {
        setCheckBoxes(Object.keys(checkBoxes).reduce((options, option) => ({
            ...options,
            [option]: value
        }), {}))
    }

    return (
    <>
        <RomajiModal ref={romajiDialog} onCloseModal={handleCloseModal}/>
        <div className="text-container box-effects">
            <p>
                Kana Wizard is a Quiz App developed for hiragana and katana general practices, 
                there's no Japanese guide or learning lessons here. 
                If you are not used to Japanese "Kana" we strongly recommend to check out&nbsp;
                <a href={url1} target='_blank'>Hiragana</a> and&nbsp;
                <a href={url2} target='_blank'>Katana</a> public wiki
                or any learning app of your choice before continue. Also, to consult our available Rōmaji input&nbsp;
                <span className='text-link' onClick={handleRomajiModal}>click here</span>.
            </p>
        </div>
        <div className="font-form-container box-effects">
            <h1>Choose your font style</h1>
            <div className="font-form-display">
                <p style={{fontFamily:fontValue}}>やあ</p>
            </div>
            <div className="dropdown">
                <motion.button 
                    type='button' 
                    className="dropbtn"
                    whileTap={{ scale: 0.97 }}
                    onClick={handleDropDown}>
                        {fontValue}
                </motion.button>
                    <motion.div 
                        id="font-dropdown" 
                        className="dropdown-content"
                        variants={{
                            open: {opacity: 1, transition: { type: "spring",  staggerChildren: 0.08, delayChildren: 0.1}},
                            close: {opacity: 0, transition: { type: "spring", duration: 1} }
                        }}
                        animate={isDropdown ? 'open' : 'close'}
                        style={{ pointerEvents: isDropdown ? "auto" : "none" }}
                    >
                        {createFontsSpans()}
                    </motion.div>
            </div> 
        </div>
        <div className='content-form-container box-effects'>
            <h1>Select what you want to practice:</h1>  
            <form className='content-form' onSubmit={handleSubmit}>
                {createCheckboxes()}
                <span>
                    <button type='button' onClick={() => handleSelection(true)}>Select All</button>
                    <button type='button' onClick={() => handleSelection(false)}>Deselect All</button>
                </span>
                <button type='submit' id='submit-button'>Start</button>
            </form>
        </div>
    </>
    )
}