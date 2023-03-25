import styles from '../styles/Login.module.css'

import LoginCard from '../components/loginCard/loginCard'
import Input from '../components/input/input'
import Image from 'next/image'
import MyLogo from '../../public/images/DeixaBaixo_logo.png'
import Link from 'next/link'
import Button from '../components/button/button'

export default function LoginPage(){
    return(
        <main className={styles.background}>
            <LoginCard>
                <div className={styles.container_img}>
                    <Link href='/'>
                        <Image className={styles.logo} src={MyLogo} alt="Logo"/>
                    </Link>
                </div>
                <div className={styles.container}>
                    <div className={styles.form}>
                        <h2 className={styles.title}>Faça o login abaixo.</h2>
                        <Input type="text" placeholder="Nome de Usuário"/>
                        <Input type="password" placeholder="Senha"/>
                        <Button>Entrar</Button>
                    </div>
                </div>
                <p className={styles.p}>Não possui uma conta? <Link href="/cadastro"><span className={styles.span}>Cadastre-se</span></Link></p>
            </LoginCard>
        </main>
    )
}