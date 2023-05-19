import styles from '../styles/Login.module.css'

import LoginCard from '../components/loginCard/loginCard'
import Image from 'next/image'
import MyLogo from '../../public/images/DeixaBaixo_logo.png'
import Link from 'next/link'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'
import { handleInputChange } from '@/components/handleFunctions/handleFunctions'

export default function LoginPage(){

    const { signin } = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);

    async function handleLogin(event: FormEvent) {
        event.preventDefault();
        await signin({email, senha});
    }

    return(
        <main className={styles.background}>
            <LoginCard>
                <div>
                    <Link href='/'>
                        <Image className={styles.logo} src={MyLogo} alt="Logo"/>
                    </Link>
                </div>
                <div className={styles.container}>
                    <div className={styles.form}>

                    <input
                            className={!isValidEmail && email.length > 0 ? 'invalid' : '' || isValidEmail && email.length > 0 ? 'valid' : ''}  
                            value={email} 
                            onChange={(e) => handleInputChange("email", e.target.value, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, setEmail, setIsValidEmail, 50)}  
                            type="email" 
                            placeholder="Seu E-mail"
                        />

                        <input
                            className={!isValidPassword && senha.length > 0 ? 'invalid' : '' || isValidPassword && senha.length > 0 ? 'valid' : ''}  
                            value={senha} 
                            onChange={(e) => handleInputChange("senha", e.target.value, /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/, setSenha, setIsValidPassword, 20)}  
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