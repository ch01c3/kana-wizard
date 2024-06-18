import './Homepage.css'
import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fontActions, checkBoxesActions } from '../store/index.js'
import { motion } from 'framer-motion'

import Checkbox from './Checkbox.jsx'
import RomajiModal from './RomajiModal.jsx'

const [url1,url2] = ['https://en.wikipedia.org/wiki/Hiragana', 'https://en.wikipedia.org/wiki/Katakana']

export default function Homepage({onSubmitForm}) {
    const [isDropdown, setIsDropdown] = useState(false)
    const [isDropdownFocus, setIsDropdownFocus] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const dispatch = useDispatch()
    const fonts = useSelector((state) => state.fonts.fonts)
    const fontSelected = useSelector((state) => state.fonts.fontSelected)
    const checkboxOptions = useSelector((state) => state.checkboxes.checkboxesOptions)
    const checkBoxes= useSelector((state) => state.checkboxes.checkBoxes)

    const dropdownDiv = useRef()
    const body = document.body
    let oldBodyWidth = document.body.offsetWidth

// Mouse's events listeners for when the dropdown list items are hovered/focused to prevent the onBlur function to execute
    useEffect(() => {
        const dropdownList = dropdownDiv.current
        dropdownList.addEventListener("mouseout", (e) => {setIsDropdownFocus(true)})
        dropdownList.addEventListener("mouseover", (e) => {setIsDropdownFocus(false)})
    }, [])

// Setting the body width to prevent 'document reflow' when opening/closing modals
    useEffect(() => {
        if(isModalOpen) {
            body.style.width = `${oldBodyWidth}px`
        } else {
            body.style.width = 'auto'
        }
    },[isModalOpen])

    function handleDropDown() {
       setIsDropdown(!isDropdown)
    }

    function handleFontSelect(font) {
        dispatch(fontActions.setFont(font))
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
        dispatch(checkBoxesActions.setCheckboxes(checkID))
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
        dispatch(checkBoxesActions.setAllCheckboxes(value))
    }

    return (
    <>
        {/* <RomajiModal ref={romajiDialog} onCloseModal={handleCloseModal}/> */}
        <RomajiModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} bodyWidth={oldBodyWidth}/>
        <div className="text-container box-effects">
            <p>
                Kana Wizard is a Quiz App developed for hiragana and katana general practices, 
                there's no Japanese guide or learning lessons here. 
                If you are not used to Japanese "Kana" we strongly recommend to check out&nbsp;
                <a href={url1} target='_blank'>Hiragana</a> and&nbsp;
                <a href={url2} target='_blank'>Katana</a> public wiki
                or any learning app of your choice before continue. Also, to consult our available Rōmaji input&nbsp;
                <span className='text-link' onClick={() => setIsModalOpen(true)}>click here</span>.
            </p>
        </div>
        <div className="font-form-container box-effects">
            <h1>Choose your font style</h1>
            <div className="font-form-display">
                <p style={{fontFamily:fontSelected}}>やあ</p>
            </div>
            <div className="dropdown" onBlur={() => isDropdownFocus ? setIsDropdown(false) : null}>
                <motion.button 
                    type='button' 
                    className="dropbtn"
                    whileTap={{ scale: 0.97 }}
                    onClick={handleDropDown}>
                        {fontSelected}
                </motion.button>
                    <motion.div 
                        className="dropdown-content"
                        ref={dropdownDiv}
                        initial={false}
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
                    <motion.button type='button' onClick={() => handleSelection(true)} whileTap={{ y: 2 }} whileHover={{ scale: 1.1 }}>Select All</motion.button>
                    <motion.button type='button' onClick={() => handleSelection(false)} whileTap={{ y: 2 }} whileHover={{ scale: 1.1 }}>Deselect All</motion.button>
                </span>
                <motion.button 
                    type='submit' 
                    id='submit-button' 
                    whileTap={{ y: 2 }}
                    whileHover={{ scale: 1.1 }}
                >
                    Start
                </motion.button>
            </form>
        </div>
    </>
    )
}