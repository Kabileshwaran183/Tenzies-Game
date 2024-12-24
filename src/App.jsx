import Die from "./components/Die"
import { useState,useRef,useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
export default function App() {
    const [dice, setDice] = useState(()=>generateAllNewDice())
    const [count,setCount] = useState(0)
    const gameWon = dice.every(die=>die.isHeld)&& dice.every(die=>die.value===dice[0].value)
    const buttonRef = useRef(null)
    useEffect(()=>{
        if(gameWon){
            buttonRef.current.focus()  // It ensures that the "New Game" button is automatically highlighted or ready to press.
        }
    },[gameWon])
    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }

    function rollDice() {
        setCount(prevCount=>prevCount+1)
        if (!gameWon) {
            setDice(oldDice => oldDice.map(die =>
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            ))
        } else {
            setDice(generateAllNewDice())
            setCount(prevCount=>0)
        }
        count+=1

    }


    function hold(id) {
        setDice(oldDice => oldDice.map(die =>
            die.id === id ?
                            { ...die,
                                isHeld: !die.isHeld } :
                            die
        ))
    }
    
    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />
    ))

    return (
        <main>
            {gameWon && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">{gameWon ? `Congratulations! You won by ${count} Moves`:"Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <div className="bot-el">
                <div>
            
            <img className="img-two" src="./image.png"></img>
            <img className="img-three" src="./image.png"></img></div>
            <button ref={buttonRef} className="dice-roll-btn" onClick={rollDice}>{gameWon?"NewGame":"Roll"}</button>
            <h2 className="right-h">Moves : {count} </h2>
            </div>
        </main>
    )
}