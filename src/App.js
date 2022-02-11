import React, {useState, useEffect} from 'react';
import './App.scss';
import {DUMMY_CARDS as dummy_cards} from './data/dummy'
import { motion, AnimatePresence } from 'framer-motion'
import Card from './components/Card/Card'

function App() {
  const [cards, setCards] = useState(dummy_cards)

  const finishTask = (id) => {
    setCards((prev) => {
      return prev.filter(card => card.id !== id)
    })
  }

  const handleClick = () => {
    setCards((prev) => {
      let lastItem = prev.slice(-1).pop()
      let tempCards = [...prev] // Create and return new array to make pure function. Rerender cause problems when prev changed on its own
      
      if(lastItem === undefined) {
        return dummy_cards
      } else {
        tempCards.push({
          ...lastItem,
          id: lastItem.id + 1
        })
      }

      return tempCards
    })
  }

  useEffect(() => {
    console.log(cards)
  }, [cards])

  const getCards = () => {
    let CardComponents = [];

    cards.forEach(card => {
      CardComponents.push(<Card key={card.id} id={card.id} finishTask={finishTask} className={`card-${(card.id % 5) + 1}`}></Card>)
    });

    return CardComponents;
  }

  return (
    <>
      <button onClick={handleClick}>Add Task</button>
      <motion.div
        layout 
        className="App"
        >
        <AnimatePresence>
          {getCards().map((card)=>{
            return card
          })}
        </AnimatePresence>
      </motion.div>
      
    </>
  );
}

export default App;
