// src/components/Card.js
import React from 'react';
import styles from './card.module.css';
import Image from 'next/image'
import MyCasa from '../../../public/images/casa.jpg'

const Card = ({ house }) => {
  return (
    <div className={styles.card}>
      <Image className={styles.casa} src={MyCasa} alt="Logo"/>
      <h2>{house.titulo}</h2>
      <div className={styles.caracteristicas}>
        <p>{`Área: ${house.m2} m²`}</p>
        <p>{`Quartos: ${house.quartos}`}</p>
        <p>{`Banheiros: ${house.banheiros}`}</p>
        <p>{`Vaga de Estacionamento: ${house.vaga}`}</p>
      </div>
      <p>{`Valor: R$ ${house.valor}`}</p>
      <p>{`Condomínio: R$ ${house.condominio}`}</p>
      <p>{house.descricao}</p>
    </div>
  );
};

export default Card;