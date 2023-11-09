import styles from '../styles/ResultSearch.module.css'
import Card from '../components/resultCard/card';
import Image from 'next/image'
import MyLogo from '../../public/images/logo_apenas.png'
import MyTitle from '../../public/images/Titulo.png'
import { Key, useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'
import Router, { useRouter } from 'next/router'
import Link from 'next/link';

export default function Result() {
  const { user, signout } = useContext(AuthContext);
  const router = useRouter();
  const query = router.query.results;
  const searchResults = query ? JSON.parse(query as string) : [];
  const [isLoading, setIsLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000)
  }, [])

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  const addToFavorites = () => {
    // Implemente a lógica para adicionar o imóvel aos favoritos aqui
  }

  async function handleLogout() {
    await signout();
    window.location.replace("/");
  }

  async function handleEnter() {
    Router.push("/login");
  }


  return (
    <div className={styles.background}>
      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p className={styles.textLoading}>Carregando...</p>
        </div>
      ) : (
        <>
          <div className={styles.background}>
            <header className={styles.header}>
              {user ? (
                <>
                  <div className={styles.container_login}>
                    <Link href='/'>
                      <Image className={styles.logo} src={MyLogo} alt="Logo" />
                    </Link>
                    <Link href='/'>
                      <Image className={styles.title} src={MyTitle} alt="Titulo" />
                    </Link>
                    <span className={styles.user}>{user.email}</span>
                    <button type='button' className={styles.menuButton} onClick={toggleMenu}>
                      &#9776;
                    </button>
                    {menuVisible && (
                      <div className={styles.menu_overlay}>
                        <div className={styles.menu}>
                          {/* Coloque aqui os itens do menu, como opções de perfil, configurações, etc. */}
                          <ul>
                            <button className={styles.menuOptions} onClick={addToFavorites}>Favoritos</button>
                            <button className={styles.menuOptions} onClick={handleLogout}>Sair</button>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.container_logout}>
                    <Link href='/'>
                      <Image className={styles.logo} src={MyLogo} alt="Logo" />
                    </Link>
                    <Link href='/'>
                      <Image className={styles.title} src={MyTitle} alt="Titulo" />
                    </Link>
                    <button type='button' className={styles.button_logout} onClick={handleEnter}>
                      Entrar
                    </button>
                  </div>
                </>
              )}
            </header>
            <main>
              <h1 className={styles.result}>Resultado da Pesquisa: {searchResults.length}</h1>
              <div className={styles.card_container}>
                {searchResults.map((result: any, index: Key | null | undefined) => (
                  <Card key={index} house={result} />
                ))}
              </div>
            </main>
          </div>
        </>
      )}
    </div>

  )
}