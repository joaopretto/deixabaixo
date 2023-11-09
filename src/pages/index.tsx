import Styles from '../Styles/Home.module.css'
import Image from 'next/image'
import MyLogo from '../../public/images/logo_apenas.png'
import MyTitle from '../../public/images/Titulo.png'
import React, { useContext, useState } from 'react'
import Slider from 'rc-slider';
import { AuthContext } from '@/contexts/auth/AuthContext'
import Router from 'next/router'
import DadosJson from '../../public/jsonimoveis.json'
import Link from 'next/link';
import { message } from 'antd'
import 'rc-slider/assets/index.css';


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

  const handleSearch = (e: React.FormEvent) => {
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
      const filteredData = DadosJson.filter((imovel) => {

        const selectedTypeValues = [selectedType, ...selectedTypes];

        if (
          selectedTypeValues.every((type) => type === "0") ||
          !selectedTypeValues.includes(imovel.tipo)
        ) {
          return false;
        }

        return (
          (formData.tipoImovel === '' || imovel.tipo === formData.tipoImovel) &&
          (formData.qtdGarage === 0 || imovel.vaga === formData.qtdGarage) &&
          (formData.qtdBedrooms === 0 || imovel.quartos === formData.qtdBedrooms) &&
          (formData.qtdBathrooms === 0 || imovel.banheiros === formData.qtdBathrooms) &&
          (formData.minValue === 0 || imovel.valor_total >= formData.minValue) &&
          (formData.maxValue === 0 || imovel.valor_total <= formData.maxValue)
        );
      });

      Router.push({
        pathname: '/result',
        query: { results: JSON.stringify(filteredData) },
      });
    } catch (error) {
      console.error("Erro ao buscar resultados: ", error);
    }
  }

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  const addToFavorites = () => {
    // Implemente a lógica para adicionar o imóvel aos favoritos aqui
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
    <div className={Styles.background}>
      <header className={Styles.header}>
        {user ? (
          <>
            <div className={Styles.container_login}>
              <Link href='/'>
                <Image className={Styles.logo} src={MyLogo} alt="Logo" />
              </Link>
              <Link href='/'>
                <Image className={Styles.title} src={MyTitle} alt="Titulo" />
              </Link>
              <span className={Styles.user}>{user.email}</span>
              <button type='button' className={Styles.menuButton} onClick={toggleMenu}>
                &#9776;
              </button>
              {menuVisible && (
                <div className={Styles.menu_overlay}>
                  <div className={Styles.menu}>
                    {/* Coloque aqui os itens do menu, como opções de perfil, configurações, etc. */}
                    <ul>
                      <button className={Styles.menuOptions} onClick={addToFavorites}>Favoritos</button>
                      <button className={Styles.menuOptions} onClick={handleLogout}>Sair</button>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={Styles.container_logout}>
              <Image className={Styles.logo} src={MyLogo} alt="Logo" />
              <Image className={Styles.title} src={MyTitle} alt="Titulo" />
              <button type='button' className={Styles.button_logout} onClick={handleEnter}>
                Entrar
              </button>
            </div>
          </>
        )}
      </header>
      <main>
        <div className={Styles.container_main}>
          <div className={Styles.container_text}>
            <p>Seu imóvel<br></br>mais barato apenas em<br></br> Bauru</p>
          </div>
          <div className={Styles.container_form}>
            <form className={Styles.form_input}>
              <div className={Styles.div_input}>
                <span>Deixa Baixo o imóvel de sua preferência só aqui</span>
                {/* <div className={Styles.labeltag}>
                  <input
                    type="radio"
                    id={Styles.alugar}
                    name="radio"
                    value="Alugar">
                  </input>
                  <label className={Styles.alugar1}>Alugar</label>
                </div> */}
                <div className={Styles.type}>
                  <label className={Styles.labelType}>Tipo do Imóvel *</label>
                  <div className={Styles.divSelect}>
                    <select
                      name="typeImovel"
                      className={error ? `${Styles.selectType} ${Styles.error}` : Styles.selectType}
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      onBlur={() => setIsSelectValid(selectedType !== "0")}
                    >
                      <option value="0">Tipo de Imovel</option>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Condominio">Condominio</option>
                      <option value="Casa">Casa</option>
                    </select>
                  </div>
                  {Array.from({ length: numberOfClones }).map((_, index) => (
                    <div className={`${Styles.divSelect} clonedSelect`} key={index}>
                      <select
                        name={`typeImovel${index + 1}`}
                        className={Styles.selectType}
                        value={selectedTypes[index]}
                        onChange={(e) => {
                          const updatedSelectedTypes = [...selectedTypes];
                          updatedSelectedTypes[index] = e.target.value;
                          setSelectedTypes(updatedSelectedTypes);
                        }}
                        onBlur={() => setIsSelectValid(selectedTypes[index] !== "0")}
                      >
                        <option value="0">Tipo de Imovel</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Condominio">Condominio</option>
                        <option value="Casa">Casa</option>
                      </select>
                    </div>
                  ))}
                </div>
                <div className={Styles.value}>
                  <div>
                    <label className={Styles.labelValue}>Valor do Imóvel</label>
                    <label className={Styles.labelMaxMinValue}>Mínimo: R$ {formData.minValue}</label>
                    <input
                      className={Styles.slider}
                      type="range"
                      name="value"
                      min="0"
                      max="300"
                      value={formData.minValue}
                      onChange={(e) => setFormData({ ...formData, minValue: parseFloat(e.target.value) })}
                    />
                    <label className={Styles.labelMaxMinValue}>Máximo: R$ {formData.maxValue}</label>
                    <input
                      className={Styles.slider}
                      type="range"
                      name="value"
                      min="0"
                      max="10000"
                      value={formData.maxValue}
                      onChange={(e) => setFormData({ ...formData, maxValue: parseFloat(e.target.value) })}
                    />
                    {/* <input
                      type="number"
                      name="value"
                      className={Styles.valueMin}
                      placeholder="Valor Min"
                      value={formData.minValue !== 0 ? formData.minValue : ""}
                      onChange={(e) => setFormData({ ...formData, minValue: parseFloat(e.target.value) })}
                    />
                    <input
                      type="number"
                      name="value"
                      className={Styles.valueMax}
                      placeholder="Valor Max"
                      value={formData.maxValue !== 0 ? formData.maxValue : ""}
                      onChange={(e) => setFormData({ ...formData, maxValue: parseFloat(e.target.value) })}
                    /> */}
                  </div>
                </div>
                <div className={Styles.bedroom}>
                  <label className={Styles.labelBedroom}>Quantidade de quartos</label>
                  <ul className={Styles.ulBedroom}>
                    <li className={Styles.listQtd}>
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
                    <li className={Styles.listQtd}>
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
                    <li className={Styles.listQtd}>
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
                    <li className={Styles.listQtd}>
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
                <div className={Styles.bethroom}>
                  <label className={Styles.labelBethroom}>Quantidade de banheiros</label>
                  <ul className={Styles.ulBethroom}>
                    <li className={Styles.listQtd}>
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
                    <li className={Styles.listQtd}>
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
                    <li className={Styles.listQtd}>
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
                    <li className={Styles.listQtd}>
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
                <div className={Styles.garage}>
                  <label className={Styles.labelGarage}>Quantidade de vagas</label>
                  <ul className={Styles.ulGarage}>
                    <li className={Styles.listQtd}>
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
                    <li className={Styles.listQtd}>
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
                    <li className={Styles.listQtd}>
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
                    <li className={Styles.listQtd}>
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
                <button className={Styles.addSelect} onClick={(e) => { e.preventDefault(); handleCloneSelect(); }} disabled={numberOfClones === 2}>
                  +
                </button>
                <div className={Styles.searchButton}>
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