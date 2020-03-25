import React, {useState} from 'react';
import './NewIncident.css';
import logoImage from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import axios from '../../services/api';
import {FiArrowLeft} from 'react-icons/fi';

export default function NewIncident() {


    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[value, setValue] = useState('');

    const history = useHistory();
    const ongID = localStorage.getItem('ongID');

    function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }
        axios.post('/incidents', data, {
            headers:{
                Authorization: ongID
            }
        }).then(res =>{
            history.push('/profile');
        }).catch( err => alert('Erro ao criar novo caso, tente novamente.'))
    }

  return (
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImage} alt="hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>
                    <Link className="back-link" to="/profile"> 
                        <FiArrowLeft size={16} color="#E02041"/> Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={ e => setTitle(e.target.value)}
                        />

                    <textarea
                        value={description} 
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição"
                        />

                    <input 
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        placeholder="Valor em Reais"/>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
  );
}
