import styles from './buttons.module.css'

export default function Input({children, ...props}){
    return(
        <button className={styles.button} {...props}>{children}</button>
    )
}