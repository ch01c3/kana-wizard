import { useState } from "react"
import Homepage from "./Homepage"
import QuizPage from "./QuizPage"

import { motion, AnimatePresence } from "framer-motion"

export default function Main() {
    const [isHomepage, setIsHomepage] = useState(true)
    
    return (
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
    )
}