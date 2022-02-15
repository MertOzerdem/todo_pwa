import React, {useState, useEffect, useCallback} from 'react';
import * as _ from 'lodash'
import './App.scss';
// import {DUMMY_CARDS as dummy_cards} from './data/dummy'
import { getItemFromLocal, setItemToLocal } from './utils/localStorage-helpers'
// import useSaveLocal from './custom-hooks/useSaveLocal'
import useTimeoutEffect from './custom-hooks/useTimeoutEffect'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
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

  // useSaveLocal(setItemToLocal, [storageName, cards])

  const memoizedCallback = useCallback(
      () => {
        setItemToLocal(storageName, cards)
        console.log('app')
      },
      [cards]
  );
  useTimeoutEffect(memoizedCallback)

  const finishCard = (id) => {
    setCards((prev) => {
      return prev.filter(card => card.id !== id)
    })
  }

  const changeCard = useCallback((id, text) => {
    setCards(prev => {
      let tempCards = [...prev]
      let index = _.findIndex(tempCards, {id: id});

      tempCards.splice(index, 1, {
        ...tempCards[index],
        text: text
      })

      return tempCards
    })
  },[])

  const handleAddClick = (e) => {
    e.preventDefault()

    setCards((prev) => {
      let tempCards = [...prev] // Create and return new array to make pure function. Rerender cause problems when prev changed on its own
      let lastItem = _.maxBy(tempCards, (card) => card.id)

      if(tempCards.length) {
        tempCards.push({
          id: lastItem.id  + 1,
          text: '',
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
      CardComponents.push(<Card key={card.id} value={card} variants={childrenVariants} id={card.id} finishCard={finishCard} changeCard={changeCard} text={card.text} className={`card-${(card.id % 5) + 1}`}></Card>)
    });

    return CardComponents;
  }

  return (
    <>
      <button className="Button" onClick={handleAddClick}>Add Task</button>
      <button className="Button" onClick={handleToggle}>Toggle</button>
      <motion.div
        layout
        className="App"
        variants={variants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        >
        <Reorder.Group axis="y" values={cards} onReorder={setCards}>
          <AnimatePresence>
            {getCards().map((card)=>{
              return card
            })}
          </AnimatePresence>
        </Reorder.Group>
      </motion.div>
    </>
  );
}

export default App;
