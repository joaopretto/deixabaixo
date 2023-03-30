import styles from '../styles/Cadastro.module.css'

import CadastroCard from '../components/cadastroCard/cadastroCard'
import Input from '../components/input/input'
import Image from 'next/image'
import MyLogo from '../../public/images/DeixaBaixo_logo.png'
import Link from 'next/link'
import Button from '../components/button/button'

export default function RegisterPage(){
    return(
        <main className={styles.background}>
            <CadastroCard>
            <div className={styles.container_img}>
                    <Link href='/'>
                        <Image className={styles.logo} src={MyLogo} alt="Logo"/>
                    </Link>
                </div>
                <div className={styles.container}>
                    <div className={styles.form}>
                        <h2 className={styles.title}>Faça seu cadastro abaixo.</h2>
                        <Input type="text" placeholder="Nome completo"/>
                        <Input type="text" placeholder="Seu E-mail"/>
                        <Input type="password" placeholder="Senha"/>
                        <Input type="password" placeholder="Confirmar senha"/>
                        <Button type='submit'>Cadastrar</Button>
                    </div>
                </div>
                <p className={styles.p}>
                    <Link href="/login">
                        <span className={styles.span}>Já possui uma conta?</span>
                    </Link>
                </p>
            </CadastroCard>
        </main>
    )
}