import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'
import { useRouter }  from 'next/router';

export default function Home() {
    const {user, signout} = useContext(AuthContext);
    const router = useRouter();

    const handleLogout = () =>{
      signout();
      router.push("/");
    }

  return (
    <header className={styles.background}>
        Home
      <div className={styles.container}>
        {user ? (
          <>
            <span>{user.name}</span>
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