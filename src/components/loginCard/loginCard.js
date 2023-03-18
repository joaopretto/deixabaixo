import styles from './loginCard.module.css'

export default function LoginCard({children}){
    return(
        <form className={styles.card}>
            {children}
        </form>
    )
}