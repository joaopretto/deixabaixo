import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'

export default function Home() {
    const {user, signout} = useContext(AuthContext);
    
    async function handleLogout(){
      await signout();
      window.location.replace("/");
    }

  return (
    <header className={styles.background}>
        Home
      <div className={styles.container}>
        {user ? (
          <>
            <span>{user.email}</span>
            <button type='button' className={styles.button} onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : (
          <Link href="/login">
            <button type='button' className={styles.button}>
              Entrar
            </button>
          </Link>
        )}
      </div>
    </header>
  )
}