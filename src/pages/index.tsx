import styles from '../styles/Home.module.css'
import Image from 'next/image'
import MyLogo from '../../public/images/logo_apenas.png'
import MyTitle from '../../public/images/Titulo.png'
import { useContext, useState } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'
import Router from 'next/router'
import dadosJson from '../../public/jsonimoveis.json'
import Link from 'next/link';
import { api } from '@/services/apiClient'

export default function Home() {
  const { user, signout } = useContext(AuthContext);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [selectedType, setSelectedType] = useState("0");
  const [formData, setFormData] = useState({
    qtdGarage: 0,
    qtdBedrooms: 0,
    qtdBathrooms: 0,
  });

  async function handleSearch(){
    try{
      const response = await api.post("/recomenda", {
        tipo: selectedType,
        vaga: formData.qtdGarage,
        quartos: formData.qtdBedrooms,
        banheiros: formData.qtdBathrooms
      })
      const filteredResults = response.data;
      setSearchResults(filteredResults);

      Router.push({
        pathname: '/result',
        query: {results: JSON.stringify(filteredResults)},
      });
    } catch(error){
      console.error("Erro ao buscar resultados: ", error);
    }
  }

  async function handleLogout() {
    await signout();
    window.location.replace("/");
  }

  async function handleEnter(){
    Router.push("/login");
  }

  return  (
    <div className={styles.background}>
        <header className={styles.header}>
            {user ? (
              <>
              <div className={styles.container_login}>
                <Link href='/'>
                  <Image className={styles.logo} src={MyLogo} alt="Logo"/>
                </Link>
                <Link href='/'>
                  <Image className={styles.title} src={MyTitle} alt="Titulo"/>
                </Link>
                <span className={styles.user}>{user.email}</span>
                <button type='button' className={styles.button_login} onClick={handleLogout}>
                  Sair
                </button>
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
                </div>
              </>
            )}
        </header>
        <main>
          <div className={styles.container_main}>
            <div className={styles.container_text}>
              <p>Seu imóvel<br></br>mais barato apenas em<br></br> Bauru</p>
            </div>
            <div className={styles.container_form}>
              <form className={styles.form_input}>
                <div className={styles.div_input}>
                  <span>Deixa Baixo o imóvel de sua preferência só aqui</span>
                  <div className={styles.labeltag}>
                    <input 
                      type="radio" 
                      id={styles.alugar} 
                      name="radio"
                      value="Alugar">
                    </input>
                    <label className={styles.alugar1}>Alugar</label>
                  </div>
                  <div className={styles.type}>
                    <label className={styles.labelType}>Tipo do Imóvel</label>
                    <div className={styles.divSelect}>
                      <select name="typeImovel" className={styles.selectType} value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                        <option>Tipo de Imovel</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Condominio">Condominio</option>
                        <option value="Casa">Casa</option>
                      </select> 
                    </div>
                  </div>
                  <div className={styles.garage}>
                    <label className={styles.labelGarage}>Quantidade de vagas</label>
                    <ul className={styles.ulGarage}>
                      <li className={styles.listQtd}>
                        <label>
                          <input 
                            type="radio" 
                            name="garage" 
                            value={1}
                            checked={formData.qtdGarage === 1}
                            onChange={(e) => setFormData({...formData, qtdGarage: 1})}>
                          </input>
                          <span>1</span>
                        </label>
                      </li>
                      <li className={styles.listQtd}>
                        <label>
                            <input 
                              type="radio" 
                              name="garage" 
                              value={2}
                              checked={formData.qtdGarage === 2}
                              onChange={(e) => setFormData({...formData, qtdGarage: 2})}>
                            </input>
                            <span>2</span>
                        </label>
                      </li>
                      <li className={styles.listQtd}>
                        <label>
                              <input 
                                type="radio" 
                                name="garage" 
                                value={3}
                                checked={formData.qtdGarage === 3}
                              onChange={(e) => setFormData({...formData, qtdGarage: 3})}>
                              </input>
                              <span>3</span>
                        </label>
                      </li>
                      <li className={styles.listQtd}>
                        <label>
                              <input 
                                type="radio" 
                                name="garage" 
                                value={4}
                                checked={formData.qtdGarage === 4}
                                onChange={(e) => setFormData({...formData, qtdGarage: 4})}>
                                </input>
                              <span>4+</span>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.bedroom}>
                    <label className={styles.labelBedroom}>Quantidade de quartos</label>
                    <ul className={styles.ulBedroom}>
                      <li className={styles.listQtd}>
                        <label>
                          <input 
                            type="radio" 
                            name="bedrooms" 
                            value={1}
                            checked={formData.qtdBedrooms === 1}
                            onChange={(e) => setFormData({...formData, qtdBedrooms: 1})}>
                          </input>
                          <span>1</span>
                        </label>
                      </li>
                      <li className={styles.listQtd}>
                        <label>
                            <input 
                              type="radio" 
                              name="bedrooms" 
                            value={2}
                              checked={formData.qtdBedrooms === 2}
                              onChange={(e) => setFormData({...formData, qtdBedrooms: 2})}>
                            </input>
                            <span>2</span>
                        </label>
                      </li>
                      <li className={styles.listQtd}>
                        <label>
                              <input 
                                type="radio" 
                                name="bedrooms" 
                                value={3}
                                checked={formData.qtdBedrooms === 3}
                              onChange={(e) => setFormData({...formData, qtdBedrooms: 3})}>
                              </input>
                              <span>3</span>
                        </label>
                      </li>
                      <li className={styles.listQtd}>
                        <label>
                              <input 
                                type="radio" 
                                name="bedrooms" 
                                value={4}
                                checked={formData.qtdBedrooms === 4}
                                onChange={(e) => setFormData({...formData, qtdBedrooms: 4})}>
                                </input>
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
                          <input 
                            type="radio" 
                            name="banheiro" 
                            value={1}
                            checked={formData.qtdBathrooms === 1}
                            onChange={() => setFormData({...formData, qtdBathrooms: 1})}>
                          </input>
                          <span>1</span>
                        </label>
                      </li>
                      <li className={styles.listQtd}>
                        <label>
                            <input 
                              type="radio" 
                              name="banheiro" 
                              value={2}
                              checked={formData.qtdBathrooms === 2}
                              onChange={() => setFormData({...formData, qtdBathrooms: 2})}>
                            </input>
                            <span>2</span>
                        </label>
                      </li>
                      <li className={styles.listQtd}>
                        <label>
                              <input 
                                type="radio" 
                                name="banheiro" 
                                value={3}
                                checked={formData.qtdBathrooms === 3}
                                onChange={() => setFormData({...formData, qtdBathrooms: 3})}>
                              </input>
                              <span>3</span>
                        </label>
                      </li>
                      <li className={styles.listQtd}>
                        <label>
                              <input 
                                type="radio" 
                                name="banheiro" 
                                value={4}
                                checked={formData.qtdBathrooms === 4}
                                onChange={() => setFormData({...formData, qtdBathrooms: 4})}>                         
                              </input>
                              <span>4+</span>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.searchButton}>
                    <button type="button" onClick={handleSearch}>
                      Buscar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
    </div>
  )
}