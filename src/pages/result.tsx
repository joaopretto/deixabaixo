import styles from '../styles/ResultSearch.module.css'
import Card from '../components/resultCard/card';
import Image from 'next/image'
import MyLogo from '../../public/images/logo_apenas.png'
import MyTitle from '../../public/images/Titulo.png'
import MyProfile from '../../public/images/Profile.png'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'
import Router from 'next/router'

export default function Home() {
  const { user, signout } = useContext(AuthContext);
  const [searchResults, setSearchResults] = useState([]);

  async function handleLogout() {
    await signout();
    window.location.replace("/");
  }

  async function handleEnter(){
    Router.push("/login");
  }

  useEffect(() => {
    fetch('/jsonimoveis.json')
    .then(response => response.json())
    .then(data => {
      setSearchResults(data);
    })
    .catch(error => {
      console.error('Erro ao carregar os dados: ', error);
    })
  })

  return  (
    <div className={styles.background}>
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
          <h1>Resultado da Pesquisa</h1>
          <p>Total de Resultados: {searchResults.length}</p>
          <div className={styles.card_container}>
              {searchResults.map((house, index) => (
                <Card key={index} house={house}/>
              ))}
          </div>
        </main>
    </div>
  )
}