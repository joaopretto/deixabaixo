import styles from '../styles/Home.module.css'
import Image from 'next/image'
import MyLogo from '../../public/images/logo_apenas.png'
import MyTitle from '../../public/images/Titulo.png'
import MyProfile from '../../public/images/Profile.png'
import { useContext, useState } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'
import Router from 'next/router'

export default function Home() {
  const { user, signout } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState('');

  async function handleLogout() {
    await signout();
    window.location.replace("/");
  }

  async function handleEnter(){
    Router.push("/login");
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const json = {
      option: selectedOption
    };
    console.log(json);
  };

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
          <div className={styles.container_main}>
            <div className={styles.container_text}>
              <p>Seu imóvel<br></br>apenas em<br></br> Bauru</p>
            </div>
            <div className={styles.container_form}>
              <form className={styles.form_input}>
                <div className={styles.div_input}>
                  <span>Deixa Baixo o imóvel de sua prefencia só aqui</span>
                  <div className={styles.labeltag}>
                    <input 
                      type="radio" 
                      id={styles.alugar} 
                      name="radio"
                      value="Alugar"
                      checked={selectedOption === 'Alugar'}
                      onChange={handleOptionChange}>
                    </input>
                    <label className={styles.alugar1}>Alugar</label>
                  </div>
                  <div className={styles.labeltag}>
                    <input 
                      type="radio" 
                      id={styles.comprar} 
                      name="radio"
                      value="Comprar"
                      checked={selectedOption === 'Comprar'}
                      onChange={handleOptionChange}>
                    </input>
                    <label className={styles.comprar1}>Comprar</label>
                  </div>
                  <div className={styles.size}>
                    <input type="text" className={styles.minArea} placeholder="Área Mínima m²"></input>
                    <input type="text" className={styles.maxArea} placeholder="Área Máxima m²"></input>
                  </div>
                  <div className={styles.bedroom}>
                    <label className={styles.labelBedroom}>Quantidade de quartos</label>
                    <ul className={styles.ulBedroom}>
                      <li className={styles.listQtd}>
                        <label>
                          <input type="radio" name="option" value="1"></input>
                          <span>1</span>
                        </label>
                      </li>
                      <li className={styles.listQtd}>
                        <label>
                            <input type="radio" name="option" value="2"></input>
                            <span>2</span>
                        </label>
                      </li>
                      <li className={styles.listQtd}>
                        <label>
                              <input type="radio" name="option" value="3"></input>
                              <span>3</span>
                        </label>
                      </li>
                      <li className={styles.listQtd}>
                        <label>
                              <input type="radio" name="option" value="4"></input>
                              <span>4+</span>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.bethroom}>
                    <label className={styles.labelBethroom}>Quantidade de banheiros</label>
                    <ul className={styles.ulBethroom}>
                      <li className={styles.listQtd}>
                        <label>
                          <input type="radio" name="banheiro" value="1"></input>
                          <span>1</span>
                        </label>
                      </li>
                      <li className={styles.listQtd}>
                        <label>
                            <input type="radio" name="banheiro" value="2"></input>
                            <span>2</span>
                        </label>
                      </li>
                      <li className={styles.listQtd}>
                        <label>
                              <input type="radio" name="banheiro" value="3"></input>
                              <span>3</span>
                        </label>
                      </li>
                      <li className={styles.listQtd}>
                        <label>
                              <input type="radio" name="banheiro" value="4"></input>
                              <span>4+</span>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.searchButton}>
                    <button>Buscar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
    </div>
  )
}