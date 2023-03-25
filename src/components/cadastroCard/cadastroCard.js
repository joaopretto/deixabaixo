import styles from './cadastroCard.module.css'

export default function CadastroCard({children}){
    return(
        <form className={styles.card}>
            {children}
        </form>
    )
}