import styles from '../styles/home.module.css'
import Image from 'next/image'
import myLogo from '../../public/images/logo_apenas.png'
import { useContext, useState } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'
import Router from 'next/router'
import DadosJson from '../../public/jsonimoveis.json'
import Link from 'next/link';
import { message } from 'antd'
import { apiRecomenda, apiTracing } from '@/services/apiClient'

export default function Home() {
  const { user, signout } = useContext(AuthContext);
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

  const [menuVisible, setMenuVisible] = useState(false);

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
              "Accept": "application/json"
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

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  const handleCloneSelect = () => {
    if (numberOfClones < 2) {
      setNumberOfClones(numberOfClones + 1);
      setSelectedTypes([...selectedTypes, "0"]);
    }
  };

  async function handleLogout() {
    await signout();
    window.location.replace("/");
  }

  async function handleEnter() {
    Router.push("/login");
  }

  return (
    <div className={styles.background}>
      <header className={styles.header}>
        {user ? (
          <>
            <div className={styles.container_login}>
              <Link href='/'>
                <Image className={styles.logo} src="/images/logo_apenas.png" width={100} height={100} alt="Logo" />
              </Link>
              <Link href='/'>
                <Image className={styles.title} src="/images/titulo.png" width={160} height={33} alt="Logo" />
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
              <Image className={styles.logo} src="/images/logo_apenas.png" width={100} height={100} alt="Logo" />
              <Image className={styles.title} src="/images/titulo.png" width={160} height={33} alt="Logo" />
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
                <div className={styles.type}>
                  <label className={styles.labelType}>Tipo do Imóvel *</label>
                  <div className={styles.divSelect}>
                    <select
                      name="typeImovel"
                      className={error ? `${styles.selectType} ${styles.error}` : styles.selectType}
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
                      <option value="Prédio/Edifício">Prédio/Edifício</option>
                    </select>
                  </div>
                  {Array.from({ length: numberOfClones }).map((_, index) => (
                    <div className={`${styles.divSelect} clonedSelect`} key={index}>
                      <select
                        name={`typeImovel${index + 1}`}
                        className={styles.selectType}
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
                <div className={styles.value}>
                  <div>

                    <label className={styles.labelValue}>Valor do Imóvel</label>
                    <br></br>
                    <label className={styles.labelMaxMinValue}>Mínimo: R$ {formData.minValue}</label>
                    <input
                      className={styles.slider}
                      type="range"
                      name="value"
                      min="0"
                      max="200"
                      value={formData.minValue}
                      onChange={(e) => setFormData({ ...formData, minValue: parseFloat(e.target.value) })}
                    />

                    <label className={styles.labelMaxMinValue}>Máximo: R$ {formData.maxValue}</label>
                    <input
                      className={styles.slider}
                      type="range"
                      name="value"
                      min="1000"
                      max="10000"
                      value={formData.maxValue}
                      onChange={(e) => setFormData({ ...formData, maxValue: parseFloat(e.target.value) })}
                    />
                  </div>
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
                          onChange={(e) => setFormData({ ...formData, qtdBedrooms: 1 })}>
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
                          onChange={(e) => setFormData({ ...formData, qtdBedrooms: 2 })}>
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
                          onChange={(e) => setFormData({ ...formData, qtdBedrooms: 3 })}>
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
                          onChange={(e) => setFormData({ ...formData, qtdBedrooms: 4 })}>
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
                          onChange={() => setFormData({ ...formData, qtdBathrooms: 1 })}>
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
                          onChange={() => setFormData({ ...formData, qtdBathrooms: 2 })}>
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
                          onChange={() => setFormData({ ...formData, qtdBathrooms: 3 })}>
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
                          onChange={() => setFormData({ ...formData, qtdBathrooms: 4 })}>
                        </input>
                        <span>4+</span>
                      </label>
                    </li>
                  </ul>
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
                          onChange={(e) => setFormData({ ...formData, qtdGarage: 1 })}>
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
                          onChange={(e) => setFormData({ ...formData, qtdGarage: 2 })}>
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
                          onChange={(e) => setFormData({ ...formData, qtdGarage: 3 })}>
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
                          onChange={(e) => setFormData({ ...formData, qtdGarage: 4 })}>
                        </input>
                        <span>4+</span>
                      </label>
                    </li>
                  </ul>
                </div>
                <button className={styles.addSelect} onClick={(e) => { e.preventDefault(); handleCloneSelect(); }} disabled={numberOfClones === 2}>
                  +
                </button>
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