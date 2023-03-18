import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <header className={styles.background}>
      Home
      <div className={styles.container}>
        <Link href="/login">
          <button className={styles.button}>Entrar</button>
        </Link>
      </div>
    </header>
  )
}
