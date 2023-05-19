import styles from '../styles/Home.module.css'
import Image from 'next/image'
import MyLogo from '../../public/images/logo_apenas.png'
import MyTitle from '../../public/images/Titulo.png'
import MyProfile from '../../public/images/Profile.png'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'
import Router from 'next/router'

export default function Home() {
  const { user, signout } = useContext(AuthContext);

  async function handleLogout() {
    await signout();
    window.location.replace("/");
  }

  async function handleEnter(){
    Router.push("/login");
  }

  return  (
    <body className={styles.background}>
        <header className={styles.header}>
            {user ? (
              <>
              <div className={styles.container_login}>
                <Image className={styles.logo} src={MyLogo} alt="Logo"/>
                <Image className={styles.title} src={MyTitle} alt="Titulo"/>
                <span className={styles.user}>{user.email}</span>
                <button type='button' className={styles.button_login} onClick={handleLogout}>
                  Sair
                </button>
                <Image className={styles.profile_login} src={MyProfile} alt="Perfil" />
              </div>
              </>
            ) : (
                <>
                <div className={styles.container_logout}>
                  <Image className={styles.logo} src={MyLogo} alt="Logo"/>
                  <Image className={styles.title} src={MyTitle} alt="Titulo"/>
                  <button type='button' className={styles.button_logout} onClick={handleEnter}>
                      Entrar 
                  </button>
                  <Image className={styles.profile_logout} src={MyProfile} alt="Perfil" />
                </div>
              </>
            )}
        </header>
        <main>
          <div className={styles.container_main}>
            <div className={styles.container_text}>
              <p>Seu imóvel<br></br>apenas em<br></br> Bauru</p>
            </div>
            <div className={styles.container_form}>
              <form className={styles.form_input}>
                <span>Deixa Baixo o imóvel de sua prefencia só aqui</span>
                <button>Alugar</button>
              </form>
            </div>
          </div>
        </main>
    </body>
  )
}