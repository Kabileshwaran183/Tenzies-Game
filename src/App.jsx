
import Dice from "./components/Dice"

function App() {
  
  return (
    <>
    <main>
      <div className="dice-container">
      <Dice value={2}/><Dice value={2}/><Dice value={2}/>
      <Dice value={2}/><Dice value={2}/><Dice value={2}/>
      <Dice value={2}/><Dice value={2}/><Dice value={2}/>
      </div>
    </main>
    </>
  )
}

export default App
