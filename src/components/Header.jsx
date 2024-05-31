import WzdLogo from '../assets/kana-wzd-logo.svg'

export default function Header() {
    return (
        <header className='box-effects'>
            <img id='logo-img' src={WzdLogo} alt="The app logo displaying a Wizard holding a notebook with both hands."/>
            <p id='logo-title'>Kana Wizard</p>
        </header>
    )
}