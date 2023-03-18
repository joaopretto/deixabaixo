import styles from '../styles/Login.module.css'

import LoginCard from '../components/loginCard/loginCard'
import Input from '../components/input/input'

export default function LoginPage(){
    return(
        <div className={styles.background}>
            <LoginCard title="Deixa baixo">
                <div className={styles.container}>
                    <form className={styles.form}>
                        <Input type="text" placeholder="Nome de Usuário"/>
                        <Input type="password" placeholder="Senha"/>
                    </form>
                </div>
            </LoginCard>
        </div>
    )
}