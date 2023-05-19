import styles from '../styles/Cadastro.module.css'

import CadastroCard from '../components/cadastroCard/cadastroCard'
import Image from 'next/image'
import MyLogo from '../../public/images/DeixaBaixo_logo.png'
import Link from 'next/link'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'
import {message} from "antd"; 
import { handleInputChange } from '@/components/handleFunctions/handleFunctions'

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
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    const handleInfoButtonClick = () => {
        setIsInfoVisible(!isInfoVisible);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const senhaRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/;
        const isEmailValid = emailRegex.test(email);
        const isSenhaValid = senhaRegex.test(senha);
    
        if (!isEmailValid) {
            message.error({
                content: "E-mail inválido. Por favor, insira um endereço de e-mail válido.",
                duration: 2
            });
            return;
        }
        if (!isSenhaValid) {
            message.error({
                content: "Senha inválida. A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.",
                duration: 2
            });
            return;
        }
        await register({ email, nome, senha });
    };

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
                            onChange={(e) => handleInputChange("nome", e.target.value, /^[a-zA-ZÀ-ÿ']+(([',. -][a-zA-ZÀ-ÿ])?[a-zA-ZÀ-ÿ]*)*$/, setNome, setIsValidName, 30)} 
                            type="text" 
                            placeholder="Nome completo"
                        />

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
                        <span className={styles.showInfo} onClick={handleInfoButtonClick}>Exibir informações</span>
                        {isInfoVisible && (
                            <ul className={styles.listInfo}>
                                <li>Minimo 8 caracteres</li>
                                <li>Maximo 15 caracteres</li>
                                <li>Deve conter um caracter especial</li>
                                <li>Deve conter uma letra maiuscula</li>
                                <li>Deve conter um numero</li>
                            </ul>
                        )}

                        <input
                            className={!isConfirmPassword && confirmarSenha.length > 0 ? 'invalid' : '' || isConfirmPassword && confirmarSenha.length > 0 ? 'valid' : ''}
                            value={confirmarSenha}
                            type="password" 
                            placeholder="Confirmar senha"
                            onChange={(e) => handleInputChange("confirmarSenha", e.target.value, /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/, setConfirmarSenha, setIsConfirmPassword, 20)}  
                        />

                        <button type='button' onClick={handleSubmit}>
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