import React from 'react';
import Die from './components/Die';
import './style/style.css';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  const [dices, setDices] = React.useState(allNewDices());
  const [isWon, setIsWon] = React.useState(false);

  React.useEffect(() => {
    /**
     * Winning conditions
     * 1) All die must be held && all die must have the same value
     * 2) If so, alert("You did it!")
     */
    const allDicesHeld = dices.every((die) => die.isHeld);
    const firstDieValue = dices[0].value;
    const allDieSameValues = dices.every((die) => die.value === firstDieValue);

    if (allDicesHeld && allDieSameValues) {
      setIsWon(true);
      alert("Congrats🎉🎉, You did it!😊😊");
    }

    /**
     * Lose condition
     * 1) if held dices have not the same value.
     * 2) alert("You Lose!")
     */
    const heldDices = dices.filter((die) => die.isHeld);
    const areHeldDicesSameValue = heldDices.every((die) => die.value === (heldDices[0] && heldDices[0].value));

    if (heldDices.length > 0 && !areHeldDicesSameValue) {
      alert("You lost!, try again😢😢. \nHeld values must be the same value.");
      //reset
      setDices(allNewDices());
    }
  }, [dices]);

  function generateNewDie() {
    const rn = Math.floor(Math.random() * 6) + 1;

    return {
      value: rn,
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDices() {
    const newDices = [];
    for (let i = 0; i < 10; i++) {
      newDices.push(generateNewDie());
    }
    return newDices;
  }

  function hold(id) {
    setDices((oldDices) =>
      oldDices.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dices.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      id={die.id}
      isHeld={die.isHeld}
      hold={hold}
    />
  ));

  function handleRollDice() {
    if (isWon) {
      setIsWon(false);
      setDices(allNewDices());
    } else {
      setDices((oldDices) =>
        oldDices.map((die) => (die.isHeld ? die : generateNewDie()))
      );
    }
  }

  return (
    <main>
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die <br /> to freeze it at
        its current value between rolls. <br /> Good luck!
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={handleRollDice}>
        {isWon ? "Repeat" : "Roll"}
      </button>

      {/* Render <Confetti /> if (isWon) */}
      {isWon && <Confetti />}
    </main>
  );
}

export default App;
