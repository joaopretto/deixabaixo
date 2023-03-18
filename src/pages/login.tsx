import styles from '../styles/Login.module.css'

import LoginCard from '../components/loginCard/loginCard'
import Input from '../components/input/input'

export default function LoginPage(){
    return(
        <main className={styles.background}>
            <LoginCard>
                <div className={styles.container}>
                    <div className={styles.form}>
                        <h2 className={styles.title}>Deixa baixo</h2>
                        <Input type="text" placeholder="Nome de Usuário"/>
                        <Input type="password" placeholder="Senha"/>
                    </div>
                </div>
            </LoginCard>
        </main>
    )
}