import styles from '../styles/Cadastro.module.css'

import CadastroCard from '../components/cadastroCard/cadastroCard'
import Image from 'next/image'
import MyLogo from '../../public/images/DeixaBaixo_logo.png'
import Link from 'next/link'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'

export default function RegisterPage(){

    const {register} = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isConfirmPassword, setIsConfirmPassword] = useState(false);

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleNomeInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const maxLenght = 30;
        const inputValue = e.target.value;

        if(inputValue.length <= maxLenght){
            setNome(inputValue);
            const regex = /^[a-zA-ZÀ-ÿ']+(([',. -][a-zA-ZÀ-ÿ])?[a-zA-ZÀ-ÿ]*)*$/;
            setIsValidName(regex.test(inputValue));
        }else{
            setNome(inputValue.slice(0, maxLenght));
            setIsValidName(false);
        }
    }

    const handleSenhaInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const maxLenght = 8;
        const inputValue = e.target.value;

        if(inputValue.length <= maxLenght){
            setSenha(inputValue);
            const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            setIsValidPassword(regex.test(inputValue));
        }else{
            setSenha(inputValue.slice(0, maxLenght));
            setIsValidPassword(false);
        }
    }

    const handleConfirmSenhaInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxLenght = 8;
        const inputValue = e.target.value;

        if(inputValue.length <= maxLenght){
            setConfirmarSenha(inputValue);
            const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            setIsConfirmPassword(regex.test(inputValue));
        }else{
            setConfirmarSenha(inputValue.slice(0, maxLenght));
            setIsConfirmPassword(false);
        }

       if(senha !== "" && inputValue !== senha){
            console.log("As senhas não conferem");
        }
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
                        <input
                            className={!isValidName && nome.length > 0 ? 'invalid' : '' || isValidName && nome.length > 0 ? 'valid' : ''}  
                            value={nome} 
                            onChange={handleNomeInput} 
                            type="text" 
                            placeholder="Nome completo"
                        />

                        <input
                            className={!isValidEmail && email.length > 0 ? 'invalid' : '' || isValidEmail && email.length > 0 ? 'valid' : ''}  
                            value={email} 
                            onChange={handleEmailInput} 
                            type="email" 
                            placeholder="Seu E-mail"
                        />

                        <input
                            className={!isValidPassword && senha.length > 0 ? 'invalid' : '' || isValidPassword && senha.length > 0 ? 'valid' : ''}  
                            value={senha} 
                            onChange={handleSenhaInput} 
                            type="password" 
                            placeholder="Senha"
                        />

                        <input
                            className={!isConfirmPassword && confirmarSenha.length > 0 ? 'invalid' : '' || isConfirmPassword && confirmarSenha.length > 0 ? 'valid' : ''}
                            value={confirmarSenha}
                            type="password" 
                            placeholder="Confirmar senha"
                            onChange={handleConfirmSenhaInput}
                        />

                        <button type='button' onClick={handleCadastrar}>
                            Cadastrar
                        </button>
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