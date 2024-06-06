import './QuizPage.css'
import { useState, useRef, useContext } from 'react'

import QuizOver from './QuizOver.jsx'
import { FormValues } from '../store/form-values-context.jsx'
import {MAIN_H, MAIN_K, DIAC_H, DIAC_K, YOON_H, YOON_K} from '../data.js'

const KANA_DATA = [MAIN_H,DIAC_H,YOON_H,MAIN_K,DIAC_K,YOON_K]
const kanaAswers = { 
    init: {
        title: 'Start the Quiz',
        subtitle: 'Read the instructions',
        textColor: '#191919'
    },
    skip: {
        title: 'Skipped',
        subtitle: 'We can catch it later...',
        textColor: '#999999'
    },
    correct: {
        title: 'Correct',
        subtitle: 'Keep going!',
        textColor: '#7bb35d',
    },
    wrong: {
        title: 'Wrong',
        subtitle: "That's not it!",
        textColor: '#be201c',
    }}

export default function QuizPage({onReturn}) {
    const {fontValue, checkBoxes } = useContext(FormValues);
    let kanaList = []
    Object.entries(checkBoxes).forEach((element,index) => {
        kanaList = [...kanaList, ...(element[1] ? KANA_DATA[index] : '')]
    })
    if (!Array.isArray(kanaList) || !kanaList.length) kanaList = MAIN_H
    
    function shuffleList(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }
    
    const initialStateList = () => Object({
        kanaList: shuffleList(kanaList),
        listLength: kanaList.length,
        kanaLog: {
            title: kanaAswers.init.title,
            subtitle: kanaAswers.init.subtitle,
            textColor: kanaAswers.init.textColor
        },
        prevData: {
            prevKana: '?',
            prevRomaji: false
        },
        progress: {
            totalAtt: 0,
            correctAtt: 0
        }
    })
    
    const inputValue = useRef()
    const [kanaListValues, setKanaListValues] = useState(initialStateList)
    let isQuizOver = kanaListValues.kanaList.length === 0 ? true : false
    
    const correctPct = (kanaListValues.progress.correctAtt/kanaListValues.progress.totalAtt)*100

    function handleClearInput() {
        inputValue.current.value = ''
    }

    function handleSkipAnswer() {
        const skippedAnswer = kanaListValues.kanaList[0]
        let temp = [...kanaListValues.kanaList]
        temp.splice(0,1)
        temp = [...temp, skippedAnswer]
        setKanaListValues((prevValue) => 
            ({
                ...prevValue,
                kanaLog: {
                    title: kanaAswers.skip.title,
                    subtitle: kanaAswers.skip.subtitle,
                    textColor: kanaAswers.skip.textColor
                },
                kanaList: temp,
                prevData: {
                    prevKana: prevValue.kanaList[0].value,
                    prevRomaji: '?'
                },
        }))
    }

    function handleCorrectAnswer() {
        const temp = [...kanaListValues.kanaList]
        temp.splice(0,1)
        setKanaListValues((prevValue) => 
            ({
                ...prevValue,
                kanaLog: {
                    title: kanaAswers.correct.title,
                    subtitle: kanaAswers.correct.subtitle,
                    textColor: kanaAswers.correct.textColor
                },
                kanaList: temp,
                prevData: {
                    prevKana: prevValue.kanaList[0].value,
                    prevRomaji: prevValue.kanaList[0].r_value
                },
                progress: {
                    totalAtt: prevValue.progress.totalAtt + 1,
                    correctAtt: prevValue.progress.correctAtt + 1,
                }
        }))
        handleClearInput()
    }

    function handleWrongAnswer() {
        const temp = [...kanaListValues.kanaList]
        setKanaListValues((prevValue) => 
            ({
                ...prevValue,
                kanaLog: {
                    title: kanaAswers.wrong.title,
                    subtitle: kanaAswers.wrong.subtitle,
                    textColor: kanaAswers.wrong.textColor
                },
                kanaList: temp,
                prevData: {
                    prevKana: kanaListValues.kanaList[0].value,
                    prevRomaji: '?'
                },
                progress: {
                    totalAtt: prevValue.progress.totalAtt + 1,
                    correctAtt: prevValue.progress.correctAtt,
                }
        }))
        handleClearInput()
    }

    function handleButtonClick() {
        if( inputValue.current.value === '') {
            handleSkipAnswer()
            return
        }
        const romajiValue = kanaListValues.kanaList[0].r_value.filter((romaji) => {
            return romaji === inputValue.current.value.toLowerCase()
        })
        if(romajiValue.length > 0) {
            handleCorrectAnswer()
        }
        if(romajiValue.length === 0) {
            handleWrongAnswer()
        }
    }

    function handleEnterKey(event) {
        if(event == 'Enter') handleButtonClick()
    }

    function handleStartOver() {
        setKanaListValues(initialStateList)
    }

    function handleReturnButton() {
        onReturn(true)
    }

    return (
        <>
        <div className='text-container box-effects'>
                <h1>Instructions</h1>
                <ul>
                    <li>Type the correct rōmaji in the text field.</li>
                    <li>Hit the “Enter” key or click “Enter” to submit.</li>
                    <li>An empty answer will “pass”.</li>
                    <li>The quiz will be over when you get all the answers right.</li>
                    <li>The “Start over” button resets the quiz.</li>
                </ul>
        </div>
        <div id='quiz-container'>
            <div className='quiz-log box-effects'>
                <h1 style={{color:`${kanaListValues.kanaLog.textColor}`}}>{kanaListValues.kanaLog.title}</h1>
                <h2>{kanaListValues.kanaLog.subtitle}</h2>
                <div className='quiz-log-display'>
                    <p style={{fontFamily:fontValue}}>{kanaListValues.prevData.prevKana}</p>
                </div>
                {!kanaListValues.prevData.prevRomaji ? <h1>&nbsp;</h1> : <h1>{kanaListValues.prevData.prevRomaji.toLocaleString()}</h1>}
            </div>
            <div className='quiz-game box-effects'>
                {isQuizOver && <QuizOver onReset={handleStartOver} progress={correctPct} quizOver={isQuizOver}/>}
                <h1>Remaining Kana : {kanaListValues.kanaList.length}</h1>
                <div className='quiz-game-display'>
                    <p style={{fontFamily:fontValue}}>{isQuizOver ? '...' : kanaListValues.kanaList[0].value}</p>
                </div>
                <input 
                    id='text-input' 
                    type='text' 
                    autoComplete="off" autoCorrect="off" spellCheck="false" 
                    placeholder='Type...'
                    maxLength='3' 
                    onKeyDown={(event) => handleEnterKey(event.key)}
                    ref={inputValue}
                    disabled={isQuizOver ? true : false}
                />
                <button type='button' className='quiz-button' onClick={handleButtonClick} disabled={isQuizOver ? true : false}>Enter</button>
            </div>
            <div className='quiz-progress box-effects'>
                <label htmlFor='game-progress'>Progress</label>
                <progress id='game-progress' max={kanaListValues.listLength} value={kanaListValues.progress.correctAtt}/>
                <table>
                    <tbody>
                        <tr>
                            <th>Total attempts:</th>
                            <td>{kanaListValues.progress.totalAtt}</td>
                        </tr>
                        <tr>
                            <th>Correct attempts:</th>
                            <td>{kanaListValues.progress.correctAtt}</td>
                        </tr>
                        <tr>
                            <th>Correct percentage:</th>
                            <td>{isNaN(correctPct) ? 0 : correctPct.toFixed(0)}%</td>
                        </tr>
                    </tbody>
                </table>
                <button type='button' onClick={handleStartOver}>Start Over</button>
            </div>
        </div>
            <button id='return-button' onClick={handleReturnButton}>Return Home</button>
        </>
    )
}