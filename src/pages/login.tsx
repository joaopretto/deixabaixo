import styles from '../styles/Login.module.css'

import LoginCard from '../components/loginCard/loginCard'
import Input from '../components/input/input'
import Image from 'next/image'
import MyLogo from '../../public/images/DeixaBaixo_logo.png'
import Link from 'next/link'
import Button from '../components/button/button'
import { useContext, useState } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'
import Router from 'next/router';

export default function LoginPage(){

    const auth = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
    }

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value);
    }

    const handleLogin = async () => {
        if(email && password){
            const isLogged = await auth.signin(email, password);
            if(isLogged){
                Router.push("/");
            }else{
                alert("Não deu certo");
            }
        }
    }

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
                        <Input value={email} onChange={handleEmailInput} type="text" placeholder="Nome de Usuário"/>
                        <Input value={password} onChange={handlePasswordInput} type="password" placeholder="Senha"/>
                        <Button type='submit' onClick={handleLogin}>
                           Entrar
                        </Button>
                    </div>
                </div>
                <p className={styles.p}>Não possui uma conta? 
                    <Link href="/cadastro">
                        <span className={styles.span}>Cadastre-se</span>
                    </Link>
                </p>
            </LoginCard>
        </main>
    )
}