import styles from './Card.module.scss'
import { useState } from 'react';
import { motion } from "framer-motion"

const COLORS = {
    checked: '#A7FAE6',
    unchecked: '#87878a'
}

const Card = (props) => {
    const {className, children, finishTask, id, ...rest} = props;
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
        setChecked((prev) => !prev);
        finishTask(id)
    }

    return (
        <motion.div 
            layout 
            className={`${className ? className : ''} ${styles.card}`} 
            {...rest}
            initial={false}
            drag="x"
            dragConstraints={{ left: 0, right: 100 }}
            animate={{opacity: 1}}
            initial={{opacity: 0}}
            exit={{opacity:0}}
            transition={{ duration: 0.5 }}
            >
            <svg className={styles.confirmBox} onClick={handleClick} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50%" cy="50%" r="7.5" className={styles.circle} fill={checked ? COLORS.checked : COLORS.unchecked} stroke="#000"/>
                <path d="M4 8L7 10.5L12 5" stroke={checked ? '#000' : 'none'} strokeLinecap="round"/>
            </svg>
            <input className={styles.input}/>
            <div className={styles.cardContext}>
                {children}
            </div>
        </motion.div>
    )
}

export default Card;


