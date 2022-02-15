import styles from './Card.module.scss'
import { useState, useEffect } from 'react';
import useSaveLocal from '../custom-hooks/useSaveLocal'
import { Reorder } from 'framer-motion'

const COLORS = {
    checked: '#A7FAE6',
    unchecked: '#87878a'
}

const Card = (props) => {
    const {className, children, finishCard, changeCard, id, variants, ...rest} = props;
    const [text, setText] = useState(props.text);
    const [checked, setChecked] = useState(false);
    // const y = useMotionValue(0);

    const handleClick = () => {
        setChecked((prev) => !prev);
        finishCard(id)
    }

    const inputChangeHandler = (event) => {
        setText(event.target.value)
    }

    useEffect(() => {
        let saveChangesTimer = setTimeout(() => {
            changeCard(id, text);
        }, 2000);
        
        return () => {
            clearTimeout(saveChangesTimer)
        }
    }, [text, changeCard, id])

    return (
        <Reorder.Item
            {...rest}
            layout
            className={`${className ? className : ''} ${styles.card}`}
            whileDrag={{ scale: 1.1, transition: { duration: 0.3 }}}
            variants={variants}
            exit={{opacity:0}}
            transition={{duration:0.5}}
            style={{zIndex: 10}}
            >
            <svg className={styles.confirmBox} onClick={handleClick} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50%" cy="50%" r="7.5" className={styles.circle} fill={checked ? COLORS.checked : COLORS.unchecked} stroke="#000"/>
                <path d="M4 8L7 10.5L12 5" stroke={checked ? '#000' : 'none'} strokeLinecap="round"/>
            </svg>
            <input value={text} onChange={inputChangeHandler} className={styles.input}/>
            <div className={styles.cardContext}>
                {children}
            </div>
        </Reorder.Item>
    )
}

export default Card;



