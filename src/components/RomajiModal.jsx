import { forwardRef } from "react"
import { MAIN_H, MAIN_K, DIAC_H, DIAC_K, YOON_H, YOON_K } from '../data.js'

const RomajiModal = forwardRef(function RomajiModal({onCloseModal}, ref) {
    return (
    <dialog ref={ref} className="romaji-modal">
        <button onClick={onCloseModal}>X</button>
        <div id="romaji-table">
            <table>
                <caption>Main Kana</caption>
                <thead>
                    <tr>
                        <th>Hiragana</th>
                        <th>Katakana</th>
                        <th>Romaji</th>
                    </tr>
                </thead>
                <tbody>
                    {MAIN_H.map((hiraganaData, index) => {
                        const katakanaData = MAIN_K[index].value
            
                    return (
                        <tr key={hiraganaData.id}>
                            <td>{hiraganaData.value}</td>
                            <td>{katakanaData}</td>
                            <td>{hiraganaData.r_value.toLocaleString()}</td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            <table>
                <caption>Diacritics Kana</caption>
                <thead>
                    <tr>
                        <th>Hiragana</th>
                        <th>Katakana</th>
                        <th>Romaji</th>
                    </tr>
                </thead>
                    <tbody>
                        {DIAC_H.map((diacHiragana, index) => {
                            const diacKatakana = DIAC_K[index].value

                            return (
                                <tr key={diacHiragana.id}>
                                    <td>{diacHiragana.value}</td>
                                    <td>{diacKatakana}</td>
                                    <td>{diacHiragana.r_value.toLocaleString()}</td>
                                </tr>
                            )
                        })}
                    </tbody>
            </table>
            <table>
                <caption>Yoon Kana</caption>
                <thead>
                    <tr>
                        <th>Hiragana</th>
                        <th>Katakana</th>
                        <th>Romaji</th>
                    </tr>
                </thead>
                <tbody>
                        {YOON_H.map((yoonHiragana, index) => {
                            const yoonKatakana = YOON_K[index].value

                            return (
                                <tr key={yoonHiragana.id}>
                                    <td>{yoonHiragana.value}</td>
                                    <td>{yoonKatakana}</td>
                                    <td>{yoonHiragana.r_value.toLocaleString()}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    </dialog>)
})

export default RomajiModal