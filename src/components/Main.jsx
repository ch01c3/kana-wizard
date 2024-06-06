import { useState } from "react"
import Homepage from "./Homepage"
import QuizPage from "./QuizPage"
import { FormValues } from "../store/form-values-context"

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
        <main className={isHomepage ? "homepage": "quizpage"}>
            {isHomepage && <Homepage onSubmitForm={setIsHomepage}/>}
            {!isHomepage && <QuizPage onReturn={setIsHomepage}/>}
        </main>
        </FormValues.Provider>
    )
}