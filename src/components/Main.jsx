import { useState } from "react"
import Homepage from "./Homepage"
import QuizPage from "./QuizPage"
import { FormValues } from "../store/form-values-context"
import { motion, AnimatePresence } from "framer-motion"

const fonts = ['Lato','Mochiy Pop One','Noto Sans JP']
const checkboxOptions = ['Main Hiragana','Diacritics Hiragana','Yōon Hiragana','Main Katakana','Diacritics Katakana','Yōon Katakana']

export default function Main() {
    const [isHomepage, setIsHomepage] = useState(true)
    const [fontSelected, setFontSelected] = useState(fonts[0])
    const [checkboxValues, setCheckboxValues] = useState(checkboxOptions.reduce((options, option, optionIndex) => ({
        ...options,
        [option]: optionIndex === 0 ? true : false
    }), {}))

    const ctxValue = {
        fonts,
        checkboxOptions,
        checkBoxes : checkboxValues,
        setCheckBoxes: setCheckboxValues,
        fontValue: fontSelected,
        setFontValue: setFontSelected
    }
    
    return (
        <FormValues.Provider value={ctxValue}>
        <main>
            <AnimatePresence layout mode="wait">
                {isHomepage && (
                        <motion.div
                            key="homepage"
                            className="homepage"
                            initial={{opacity: 0, y: -30}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -30}}
                            transition={{duration: 0.4}}
                        >
                            <Homepage onSubmitForm={setIsHomepage}/>
                        </motion.div>)}
                {!isHomepage && (
                        <motion.div
                            key="quizpage"
                            className="quizpage"
                            initial={{opacity: 0, y: -30}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -30}}
                        >
                            <QuizPage onReturn={setIsHomepage}/>
                        </motion.div>)}
            </AnimatePresence>
        </main>
        </FormValues.Provider>
    )
}