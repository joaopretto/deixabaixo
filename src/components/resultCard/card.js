// src/components/Card.js
import React from 'react';
import styles from './card.module.css';
import Image from 'next/image'
import Area from '../../../public/images/area.png'
import Banheira from "../../../public/images/banheira.png"
import Gagarem from '../../../public/images/garagem.png'
import Quarto from '../../../public/images/quarto.png'

const Card = ({ house }) => {
  return (
    <div onClick={() => window.open(house.link, '_blank')} className={styles.card}>
      <Image className={styles.casa} src={house.imagem} alt="Imoveis" width={680} height={470}/>
      <h2>{house.titulo}</h2>
      <div className={styles.caracteristicas}>
        <div className={styles.divIcon}>
          <Image className={styles.Icon} src={Area} alt="Area"/>
          <p className={styles.information}>{`${house.m2} m²`}</p>
        </div>
        <div className={styles.divIcon}>
          <Image className={styles.Icon} src={Banheira} alt="Banheira"/>
          <p className={styles.information}>{`${house.banheiros}`}</p>
        </div>
        <div className={styles.divIcon}>
          <Image className={styles.Icon} src={Gagarem} alt="Garagem"/>
          <p className={styles.information}>{`${house.vaga}`}</p>
        </div>
        <div className={styles.divIcon}>
          <Image className={styles.Icon} src={Quarto} alt="Quarto"/>
          <p className={styles.information}>{`${house.quartos}`}</p>
        </div>
      </div>
      <p className={styles.value}>{`Valor: R$ ${house.valor}`}</p>
      <p className={styles.description}>{`Condomínio: R$ ${house.condominio}`}</p>
      <p className={styles.description}>{house.descricao}</p>
    </div>
  );
};

export default Card;