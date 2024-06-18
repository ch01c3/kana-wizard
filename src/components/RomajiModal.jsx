import ReactModal from 'react-modal'
import { MAIN_H, MAIN_K, DIAC_H, DIAC_K, YOON_H, YOON_K } from '../data.js'

const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      zIndex: 2
    },
    content: {
      display: 'flex',
      zIndex: 2,
      flexDirection: 'column',
      position: 'absolute',
      top: '40px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5px',
      outline: 'none',
      padding: '20px'
    }
  }

ReactModal.setAppElement('#root')
export default function RomajiModal({isOpen, setIsOpen}) {

    return (
    <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
    >
        <button className='close-modal' onClick={() => setIsOpen(false)}>X</button>
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
    </ReactModal>
)}