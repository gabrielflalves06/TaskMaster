import React, { useState } from "react";
import api from '../../api'
import './index.css'
import { Link, useNavigate } from "react-router-dom";

export default function Cadastro() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataVencimento, setDataVencimento] = useState('');
    const [prioridade, setPrioridade] = useState('baixa');
    const [status, setStatus] = useState('incompleta');
    const [dataAtual] = useState(new Date().toISOString().split('T')[0]);

    const navigate = useNavigate();

    async function enviar(e) {
        try {

            if (!titulo || !descricao || !dataVencimento) {
                window.alert("Por favor, preencha todos os campos obrigatórios.")
                return
            }

            if (dataVencimento <= dataAtual) {
                window.alert("Por favor, escolha uma data que seja a partir de amanhã.")
                return
            }


            e.preventDefault();

            const formData = new FormData();

            formData.append('titulo', titulo);
            formData.append('descricao', descricao);
            console.log(dataVencimento);
            formData.append('dataVencimento', dataVencimento.toString());
            formData.append('prioridade', prioridade);
            formData.append('status', status);

            await api.post('/Tarefas', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <body className="container-cadastro">
            <div className="container-body">
                
                <div className="voltar">
                    <Link to="/">
                        <h1><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.3794 31.5L15.9375 24L23.3794 16.5M16.9716 24H32.0625" stroke="black"
                                strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            <path
                                d="M42 24C42 14.0625 33.9375 6 24 6C14.0625 6 6 14.0625 6 24C6 33.9375 14.0625 42 24 42C33.9375 42 42 33.9375 42 24Z"
                                stroke="black" strokeWidth="4" strokeMiterlimit="10" />
                        </svg>
                            Voltar</h1>
                    </Link>
                </div>
                <h1 className="titulo">Cadastro</h1>
                <form>


                    <div className="input-container">
                        <label htmlFor="titulo">titulo da tarefa:* </label>
                        <input id="titulo" type="text" name="titulo" maxLength={20} value={titulo} onChange={(e) => setTitulo(e.target.value)}></input>
                    </div>

                    <div className="input-container">
                        <label htmlFor="descricao">Descricao:* </label>
                        <input id="descricao" type="text" name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)}></input>
                    </div>

                    <div className="input-container">
                        <label htmlFor="dataVencimento">Data de vencimento:* </label>
                        <input className="data" id="dataVencimento" type="date" name="dataVencimento" min={dataAtual} value={dataVencimento} onChange={(e) => setDataVencimento(e.target.value)}></input>
                    </div>

                    <div className="input-container">
                        <label htmlFor="prioridade">Prioridade: </label>
                        <select className="contianer-select" id="prioridade" name="prioridade" value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
                            <option className="baixa" value="baixa">Baixa</option>
                            <option value="media">Média</option>
                            <option value="alta">Alta</option>
                        </select>
                    </div>

                    <div className="input-container">
                        <label htmlFor="status">Status: </label>
                        <select className="contianer-select" name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="incompleta">Incompleta</option>
                            <option value='completa'>Completa</option>
                        </select>
                    </div>
                    <button id='enviarBotao' type="button" onClick={enviar}>
                        CADASTRAR
                    </button>
                </form>

                
            </div>

            
        </body>
    );
}