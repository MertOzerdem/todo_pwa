import React, {useState, useEffect} from 'react';
import './App.scss';
// import {DUMMY_CARDS as dummy_cards} from './data/dummy'
import { getItemFromLocal, setItemToLocal } from './utils/localStorage-helpers'
import { motion, AnimatePresence } from 'framer-motion'
import Card from './components/Card/Card'

const storageName = 'userCards'
const userCards = getItemFromLocal(storageName)

const variants = {
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.5}
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const childrenVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    x: -50,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 }
    }
  }
};


function App() {
  const [isOpen, setOpen] = useState(false)
  const [cards, setCards] = useState(userCards ? userCards : [])

  useEffect(() => {
    setOpen(true);

    return () => {
      setOpen(false);
    }
  }, [])

  useEffect(() => {
    setItemToLocal(storageName, cards);
  }, [cards])

  const finishCard = (id) => {
    setCards((prev) => {
      return prev.filter(card => card.id !== id)
    })
  }

  const changeCard = (id, text) => {
    setCards(prev => {
      let tempCards = [...prev]

      // sort and change with lodash
      tempCards.find(o => o.id === id);
      tempCards[id].text = text

      return tempCards
    })
  }

  const handleClick = (e) => {
    e.preventDefault()

    setCards((prev) => {
      let lastItem = prev.slice(-1).pop()
      let tempCards = [...prev] // Create and return new array to make pure function. Rerender cause problems when prev changed on its own
      
      if(tempCards.length) {
        tempCards.push({
          text: '',
          id: lastItem.id + 1,
          isFinished: false
        })
      } else {
         tempCards.push({
            id: 0,
            text: '',
            isFinished: false
        })
      }

      return tempCards
    })
  }

  const handleToggle = () => {
    setOpen(!isOpen);
  }

  const getCards = () => {
    let CardComponents = [];

    cards.forEach(card => {
      CardComponents.push(<Card variants={childrenVariants} key={card.id} id={card.id} finishCard={finishCard} changeCard={changeCard} text={card.text} className={`card-${(card.id % 5) + 1}`}></Card>)
    });

    return CardComponents;
  }

  return (
    <>
      <button className="Button" onClick={handleClick}>Add Task</button>
      <button className="Button" onClick={handleToggle}>Toggle</button>
      <motion.div
        layout
        className="App"
        variants={variants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
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
