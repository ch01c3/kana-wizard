import BlankStar from '../assets/rating-star-blank.svg'
import FilledStar from '../assets/rating-star-fill.svg'

export default function QuizOver({onReset, progress, quizOver}) {
    let results = ''
    let starRating = []
    if(progress <= 10 || isNaN(progress)){
        results = "What a pitiful performance..."
        starRating = [true,false,false,false,false]
    }
    if(progress > 10 && progress <= 25) {
        results = "You're lacking ... knowledge ?"
        starRating = [true,true,false,false,false]
    }
    if(progress > 25 && progress <= 50) {
        results = 'You handled it!'
        starRating = [true,true,true,false,false]
    }
    if(progress > 50 && progress < 100) {
        results = 'You did great!'
        starRating = [true,true,true,true,false]
    }
    if(progress == 100) {
        results = "Wow! Are you a Wizard?"
        starRating = [true,true,true,true,true]
    }

    function createStar(option, index) {
        return (
            <img
                id={'star '+index}
                src={option ? FilledStar : BlankStar }
                alt='Quiz rating star'
            />
        )
    }

    function createStarRating() {
        return starRating.map((option, index) => {
            return createStar(option,index)
        })
    }
    return (
        <div className="quiz-game-over">
                <h1>The Quiz is over!</h1>
            <div className="game-over-result">
                {quizOver ? createStarRating() : ''}
            </div>
            <div className="game-over-text">
                <h2>{results}</h2>
            </div>
            <button type="button" onClick={onReset} disabled={quizOver ? false : true}>Play Again</button>
        </div>
    )
}