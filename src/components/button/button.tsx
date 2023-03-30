import { ButtonHTMLAttributes, ComponentProps, HTMLProps } from 'react'
import styles from './buttons.module.css'

export default function Button({children, ...props}: ButtonHTMLAttributes<HTMLButtonElement>){
    return(
        <button className={styles.button} {...props}>{children}</button>
    )
}