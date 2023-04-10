import styles from '../styles/Login.module.css'

import LoginCard from '../components/loginCard/loginCard'
import Image from 'next/image'
import MyLogo from '../../public/images/DeixaBaixo_logo.png'
import Link from 'next/link'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'

export default function LoginPage(){

    const { signin } = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    
    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const maxLenght = 50;
        const inputValue = e.target.value;

        if(inputValue.length <= maxLenght){
            setEmail(inputValue);
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            setIsValidEmail(regex.test(inputValue));
        }else{
            setEmail(inputValue.slice(0, maxLenght));
            setIsValidEmail(false);
        }
    }

    const handleSenhaInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const minLenght = 8;
        const maxLenght = 15;
        const inputValue = e.target.value;

        if(inputValue.length >= minLenght && inputValue.length <= maxLenght){
            setSenha(inputValue);
            const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/;
            setIsValidPassword(regex.test(inputValue));
        }else{
            setSenha(inputValue.slice(0, maxLenght));
            setIsValidPassword(false);
        }
    }

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        const data = {
            email,
            senha
        };

        await signin(data);
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

                        <input 
                            className={!isValidEmail && email.length > 0 ? 'invalid' : '' || isValidEmail && email.length > 0 ? 'valid' : ''} 
                            value={email} 
                            onChange={handleEmailInput} 
                            type="email" 
                            placeholder="Email do Usuário"
                        />

                        <input
                            className={!isValidPassword && senha.length > 0 ? 'invalid' : '' || isValidPassword && senha.length > 0 ? 'valid' : ''} 
                            value={senha} 
                            onChange={handleSenhaInput} 
                            type="password" 
                            placeholder="Senha"
                        />

                        <button type='button' onClick={handleLogin}>
                           Entrar
                        </button>
                    </div>
                </div>
                <p className={styles.p}>Não possui uma conta? 
                    <Link href="/cadastro">
                        <span className={styles.span}> Cadastre-se</span>
                    </Link>
                </p>
            </LoginCard>
        </main>
    )
}