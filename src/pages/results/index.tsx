import styles from '@/styles/resultSearch.module.css'
import stylesHome from '@/styles/home.module.css'
import Card from '@/components/resultCard/card'
import Image from 'next/image'
import MyLogo from '../../../public/images/logo_apenas.png'
import MyTitle from '../../../public/images/titulo.png'
import { Key, useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'
import DadosJson from '@/../../public/jsonimoveis.json'
import Router, { useRouter } from 'next/router'
import Link from 'next/link';
import { message } from 'antd'
import { apiRecomenda, apiTracing } from '@/services/apiClient'

export default function Result() {
  const { user, signout } = useContext(AuthContext);
  const router = useRouter();
  const query = router.query.results;
  const searchResults = query ? JSON.parse(query as string) : [];
  const [isLoading, setIsLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("0");
  const [selectedTypes, setSelectedTypes] = useState([selectedType]);
  const [isSelectValid, setIsSelectValid] = useState(false);
  const [numberOfClones, setNumberOfClones] = useState(0);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    tipoImovel: '',
    qtdGarage: 0,
    qtdBedrooms: 0,
    qtdBathrooms: 0,
    minValue: 0,
    maxValue: 0,
  });
  
  const handleCloneSelect = () => {
    if (numberOfClones < 2) {
      setNumberOfClones(numberOfClones + 1);
      setSelectedTypes([...selectedTypes, "0"]);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(false);

    if (selectedType === "0" && selectedTypes.some((type) => type === "0")) {
      setError(true);
      message.error(
        "Selecione um tipo de imóvel válido antes de fazer a busca."
      );
      return;
    }

    try {
      // const filteredData = DadosJson.filter((imovel) => {

      //   const selectedTypeValues = [selectedType, ...selectedTypes];
      // // const emailToSend = user ? user.email : '';

      //   if (
      //     selectedTypeValues.every((type) => type === "0") ||
      //     !selectedTypeValues.includes(imovel.tipo)
      //   ) {
      //     return false;
      //   }

      //   return (
      //     (formData.tipoImovel === '' || imovel.tipo === formData.tipoImovel) &&
      //     (formData.qtdGarage === 0 || imovel.vaga === formData.qtdGarage) &&
      //     (formData.qtdBedrooms === 0 || imovel.quartos === formData.qtdBedrooms) &&
      //     (formData.qtdBathrooms === 0 || imovel.banheiros === formData.qtdBathrooms) &&
      //     (formData.minValue === 0 || imovel.valor_total >= formData.minValue) &&
      //     (formData.maxValue === 0 || imovel.valor_total <= formData.maxValue)
      //   );
      // });
      const emailToSend = user ? user.email : '';
      const selectedTypeValues = [selectedType, ...selectedTypes];

      const resultadoTypes = selectedTypeValues.filter(item => item != "0")

      if (emailToSend != '') {
        try{      

          const responseTracing = await apiTracing.post("/api/v1/tracing", {
            tipo: resultadoTypes,
            vagas: formData.qtdGarage,
            quartos: formData.qtdBedrooms,
            banheiros: formData.qtdBathrooms,
            valorMinimo: formData.minValue,
            valorMaximo: formData.maxValue,
            emailUsuario: emailToSend, 
          }, {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": process.env.NEXT_PUBLIC_API_KEY
            }
          })
            
          
          
        } catch (error) {
          console.error("Erro ao enviar tracing: ", error);
        }
      }

      const response = await apiRecomenda.post("/recomenda", {
        tipo: resultadoTypes,
        vaga: formData.qtdGarage,
        quarto: formData.qtdBedrooms,
        banheiro: formData.qtdBathrooms,
        valorMinimo: formData.minValue,
        valorMaximo: formData.maxValue,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })
      const filteredResults = response.data;

      Router.push({
        pathname: '/results',
        query: { results: JSON.stringify(filteredResults) },
      });
      console.log(filteredResults);
    } catch (error) {
      console.error("Erro ao buscar resultados: ", error);
    }
  }

  const handleIsFormVisible = () => {
    setIsFormVisible(!isFormVisible);
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000)
  }, [])

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
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
                          <ul>
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
              <div className={styles.containerForm}>
                <button className={styles.showForm} onClick={handleIsFormVisible}>Filtro</button>
                {isFormVisible && (
                  <><form className={styles.form_results}>
                    <div className={styles.div_input}>
                      <div className={stylesHome.type}>
                        <label className={stylesHome.labelType}>Tipo do Imóvel *</label>
                        <div className={stylesHome.divSelect}>
                          <select
                            name="typeImovel"
                            className={error ? `${stylesHome.selectType} ${stylesHome.error}` : stylesHome.selectType}
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            onBlur={() => setIsSelectValid(selectedType !== "0")}
                          >
                            <option value="0">Tipo de Imovel</option>
                            <option value="Casa">Casa</option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Sala/Conjunto">Sala/Conjunto</option>
                            <option value="Kitnet/Conjugado">Kitnet/Conjugado</option>
                            <option value="Ponto/Imóvel Comercial">Ponto/Imóvel Comercial</option>
                          </select>
                        </div>
                        {Array.from({ length: numberOfClones }).map((_, index) => (
                          <div className={`${stylesHome.divSelect} clonedSelect`} key={index}>
                            <select
                              name={`typeImovel${index + 1}`}
                              className={stylesHome.selectType}
                              value={selectedTypes[index]}
                              onChange={(e) => {
                                const updatedSelectedTypes = [...selectedTypes];
                                updatedSelectedTypes[index] = e.target.value;
                                setSelectedTypes(updatedSelectedTypes);
                              }}
                              onBlur={() => setIsSelectValid(selectedTypes[index] !== "0")}
                            >
                              <option value="0">Tipo de Imovel</option>
                              <option value="Casa">Casa</option>
                              <option value="Apartamento">Apartamento</option>
                              <option value="Sala/Conjunto">Sala/Conjunto</option>
                              <option value="Kitnet/Conjugado">Kitnet/Conjugado</option>
                              <option value="Ponto/Imóvel Comercial">Ponto/Imóvel Comercial</option>
                              <option value="Prédio/Edifício">Prédio/Edifício</option>
                            </select>
                          </div>
                        ))}
                      </div>
                      <div className={stylesHome.value}>
                        <div>

                          <label className={stylesHome.labelValue}>Valor do Imóvel</label>
                          <br></br>
                          <label className={stylesHome.labelMaxMinValue}>Mínimo: R$ {formData.minValue}</label>
                          <input
                            className={stylesHome.slider}
                            type="range"
                            name="value"
                            min="0"
                            max="200"
                            value={formData.minValue}
                            onChange={(e) => setFormData({ ...formData, minValue: parseFloat(e.target.value) })}
                          />

                          <label className={stylesHome.labelMaxMinValue}>Máximo: R$ {formData.maxValue}</label>
                          <input
                            className={stylesHome.slider}
                            type="range"
                            name="value"
                            min="1000"
                            max="10000"
                            value={formData.maxValue}
                            onChange={(e) => setFormData({ ...formData, maxValue: parseFloat(e.target.value) })}
                          />
                        </div>
                      </div>
                      <div className={stylesHome.bedroom}>
                        <label className={stylesHome.labelBedroom}>Quantidade de quartos</label>
                        <ul className={stylesHome.ulBedroom}>
                          <li className={stylesHome.listQtd}>
                            <label>
                              <input
                                type="radio"
                                name="bedrooms"
                                value={1}
                                checked={formData.qtdBedrooms === 1}
                                onChange={(e) => setFormData({ ...formData, qtdBedrooms: 1 })}>
                              </input>
                              <span>1</span>
                            </label>
                          </li>
                          <li className={stylesHome.listQtd}>
                            <label>
                              <input
                                type="radio"
                                name="bedrooms"
                                value={2}
                                checked={formData.qtdBedrooms === 2}
                                onChange={(e) => setFormData({ ...formData, qtdBedrooms: 2 })}>
                              </input>
                              <span>2</span>
                            </label>
                          </li>
                          <li className={stylesHome.listQtd}>
                            <label>
                              <input
                                type="radio"
                                name="bedrooms"
                                value={3}
                                checked={formData.qtdBedrooms === 3}
                                onChange={(e) => setFormData({ ...formData, qtdBedrooms: 3 })}>
                              </input>
                              <span>3</span>
                            </label>
                          </li>
                          <li className={stylesHome.listQtd}>
                            <label>
                              <input
                                type="radio"
                                name="bedrooms"
                                value={4}
                                checked={formData.qtdBedrooms === 4}
                                onChange={(e) => setFormData({ ...formData, qtdBedrooms: 4 })}>
                              </input>
                              <span>4+</span>
                            </label>
                          </li>
                        </ul>
                      </div>
                      <div className={stylesHome.bethroom}>
                        <label className={stylesHome.labelBethroom}>Quantidade de banheiros</label>
                        <ul className={stylesHome.ulBethroom}>
                          <li className={stylesHome.listQtd}>
                            <label>
                              <input
                                type="radio"
                                name="banheiro"
                                value={1}
                                checked={formData.qtdBathrooms === 1}
                                onChange={() => setFormData({ ...formData, qtdBathrooms: 1 })}>
                              </input>
                              <span>1</span>
                            </label>
                          </li>
                          <li className={stylesHome.listQtd}>
                            <label>
                              <input
                                type="radio"
                                name="banheiro"
                                value={2}
                                checked={formData.qtdBathrooms === 2}
                                onChange={() => setFormData({ ...formData, qtdBathrooms: 2 })}>
                              </input>
                              <span>2</span>
                            </label>
                          </li>
                          <li className={stylesHome.listQtd}>
                            <label>
                              <input
                                type="radio"
                                name="banheiro"
                                value={3}
                                checked={formData.qtdBathrooms === 3}
                                onChange={() => setFormData({ ...formData, qtdBathrooms: 3 })}>
                              </input>
                              <span>3</span>
                            </label>
                          </li>
                          <li className={stylesHome.listQtd}>
                            <label>
                              <input
                                type="radio"
                                name="banheiro"
                                value={4}
                                checked={formData.qtdBathrooms === 4}
                                onChange={() => setFormData({ ...formData, qtdBathrooms: 4 })}>
                              </input>
                              <span>4+</span>
                            </label>
                          </li>
                        </ul>
                      </div>
                      <div className={stylesHome.garage}>
                        <label className={stylesHome.labelGarage}>Quantidade de vagas</label>
                        <ul className={stylesHome.ulGarage}>
                          <li className={stylesHome.listQtd}>
                            <label>
                              <input
                                type="radio"
                                name="garage"
                                value={1}
                                checked={formData.qtdGarage === 1}
                                onChange={(e) => setFormData({ ...formData, qtdGarage: 1 })}>
                              </input>
                              <span>1</span>
                            </label>
                          </li>
                          <li className={stylesHome.listQtd}>
                            <label>
                              <input
                                type="radio"
                                name="garage"
                                value={2}
                                checked={formData.qtdGarage === 2}
                                onChange={(e) => setFormData({ ...formData, qtdGarage: 2 })}>
                              </input>
                              <span>2</span>
                            </label>
                          </li>
                          <li className={stylesHome.listQtd}>
                            <label>
                              <input
                                type="radio"
                                name="garage"
                                value={3}
                                checked={formData.qtdGarage === 3}
                                onChange={(e) => setFormData({ ...formData, qtdGarage: 3 })}>
                              </input>
                              <span>3</span>
                            </label>
                          </li>
                          <li className={stylesHome.listQtd}>
                            <label>
                              <input
                                type="radio"
                                name="garage"
                                value={4}
                                checked={formData.qtdGarage === 4}
                                onChange={(e) => setFormData({ ...formData, qtdGarage: 4 })}>
                              </input>
                              <span>4+</span>
                            </label>
                          </li>
                        </ul>
                      </div>
                      <button className={stylesHome.addSelect} onClick={(e) => { e.preventDefault(); handleCloneSelect(); }} disabled={numberOfClones === 2}>
                        +
                      </button>
                      <div className={stylesHome.searchButton}>
                        <button type="button" onClick={handleSearch}>
                          Atualizar
                        </button>
                      </div>
                    </div>
                  </form></>
                )}
              </div>
              <h1 className={styles.result}>{searchResults.length} Opções mais próximas da sua busca</h1>
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