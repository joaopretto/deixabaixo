import styles from '../styles/Cadastro.module.css'

import CadastroCard from '../components/cadastroCard/cadastroCard'
import Input from '../components/input/input'
import Image from 'next/image'
import MyLogo from '../../public/images/DeixaBaixo_logo.png'
import Link from 'next/link'
import Button from '../components/button/button'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'

export default function RegisterPage(){

    const {register} = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleNomeInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setNome(e.target.value);
    }

    const handleSenhaInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setSenha(e.target.value);
    }

    async function handleCadastrar(event: FormEvent){
        event.preventDefault();
        const data = {
            email,
            nome,
            senha
        };
        await register(data);
    }

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
                        <Input value={nome} onChange={handleNomeInput} type="text" placeholder="Nome completo"/>
                        <Input value={email} onChange={handleEmailInput} type="email" placeholder="Seu E-mail"/>
                        <Input value={senha} onChange={handleSenhaInput} type="password" placeholder="Senha"/>
                        <Input type="password" placeholder="Confirmar senha"/>
                        <Button type='button' onClick={handleCadastrar}>
                            Cadastrar
                        </Button>
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