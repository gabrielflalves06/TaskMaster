import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import api from "../../api"
import { format } from 'date-fns';
import "./index.css"


export default function Tarefas() {
    const [tarefas, setTarefas] = useState([])
    const navigate = useNavigate();

    async function listar() {
        try {
            const response = await api.get("/Tarefas")
            setTarefas(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listar()
    }, [])

    const formatarData = (data) => {
        return format(new Date(data), 'dd/MM/yyyy');
    }

    async function excluirTarefa(id) {
        try {
            await api.delete(`/Tarefas/${id}`);
            listar();
        } catch (error) {
            console.log('Erro ao excluir produto:', error);
        }

    }

    async function alterarTarefa(tarefas){
        navigate("/Alterar/", { state: tarefas.id });
    }
    return (
        <body className="container-tarefas">
            <div className="container">

                <div className="cabecalho">
                    <h1>Tarefas</h1>
                    <Link className="Cadastro" to="/cadastro"><svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_57_593)">
                            <path
                                d="M18.7 15.3H25.5V18.7H18.7V25.5H15.3V18.7H8.5V15.3H15.3V8.5H18.7V15.3ZM17 34C12.4913 34 8.1673 32.2089 4.97918 29.0208C1.79107 25.8327 0 21.5087 0 17C0 12.4913 1.79107 8.1673 4.97918 4.97918C8.1673 1.79107 12.4913 0 17 0C21.5087 0 25.8327 1.79107 29.0208 4.97918C32.2089 8.1673 34 12.4913 34 17C34 21.5087 32.2089 25.8327 29.0208 29.0208C25.8327 32.2089 21.5087 34 17 34ZM17 30.6C20.6069 30.6 24.0662 29.1671 26.6167 26.6167C29.1671 24.0662 30.6 20.6069 30.6 17C30.6 13.3931 29.1671 9.93384 26.6167 7.38335C24.0662 4.83285 20.6069 3.4 17 3.4C13.3931 3.4 9.93384 4.83285 7.38335 7.38335C4.83285 9.93384 3.4 13.3931 3.4 17C3.4 20.6069 4.83285 24.0662 7.38335 26.6167C9.93384 29.1671 13.3931 30.6 17 30.6Z"
                                fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_57_593">
                                <rect width="34" height="34" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                        Adicionar tarefas</Link>

                </div>
                <div className="tabelaProduto">

                    {tarefas.length === 0 ? (
                        <p>Nenhuma tarefa pendente</p>
                    ) : (
                        <table>
                            <tr>
                                <th>Titulo</th>
                                <th>Descrição</th>
                                <th>Data de vencimento</th>
                                <th>Prioridade</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                            {tarefas.map((tarefas) => (
                                <tr className='Conteudo'>
                                    <td className='primeiro'>{tarefas.titulo}</td>
                                    <td>{tarefas.descricao}</td>
                                    <td>{formatarData(tarefas.dataVencimento)}</td>
                                    <td>{tarefas.prioridade}</td>
                                    <td>{tarefas.status}</td>
                                    <td className="final">
                                        <button onClick={() => alterarTarefa(tarefas) }>
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M6.6665 33.3333H33.3332M6.6665 33.3333V26.6667L19.9998 13.3333L24.7815 8.55167L24.7832 8.55C25.4415 7.89167 25.7715 7.56167 26.1515 7.43833C26.4862 7.32958 26.8468 7.32958 27.1815 7.43833C27.5615 7.56167 27.8898 7.89167 28.5482 8.54833L31.4482 11.4483C32.1082 12.1083 32.4382 12.4383 32.5615 12.8183C32.6703 13.1531 32.6703 13.5136 32.5615 13.8483C32.4382 14.2283 32.1082 14.5583 31.4482 15.2183L26.6665 20.0017L19.9998 13.335M6.6665 33.3333H13.3332L26.6665 20"
                                                    stroke="black" strokeWidth="3" stroke-linecap="round"
                                                    stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                        <button onClick={() => excluirTarefa(tarefas.id)}>
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M15 6.66667V5C15 4.55797 15.1756 4.13405 15.4882 3.82149C15.8007 3.50893 16.2246 3.33333 16.6667 3.33333H23.3333C23.7754 3.33333 24.1993 3.50893 24.5118 3.82149C24.8244 4.13405 25 4.55797 25 5V6.66667H31.6667C32.5507 6.66667 33.3986 7.01785 34.0237 7.64298C34.6488 8.2681 35 9.11594 35 10V11.6667C35 12.5507 34.6488 13.3986 34.0237 14.0237C33.3986 14.6488 32.5507 15 31.6667 15H31.445L30.3117 32C30.2271 33.2655 29.6648 34.4515 28.7386 35.318C27.8125 36.1844 26.5916 36.6665 25.3233 36.6667H14.71C13.4428 36.6666 12.2229 36.1855 11.2968 35.3204C10.3708 34.4553 9.80784 33.2709 9.72167 32.0067L8.56167 15H8.33333C7.44928 15 6.60143 14.6488 5.97631 14.0237C5.35119 13.3986 5 12.5507 5 11.6667V10C5 9.11594 5.35119 8.2681 5.97631 7.64298C6.60143 7.01785 7.44928 6.66667 8.33333 6.66667H15ZM31.6667 10H8.33333V11.6667H31.6667V10ZM11.9017 15L13.0467 31.78C13.0754 32.2015 13.2631 32.5964 13.5719 32.8848C13.8807 33.1731 14.2875 33.3335 14.71 33.3333H25.3233C25.7464 33.3334 26.1536 33.1726 26.4625 32.8835C26.7714 32.5945 26.9587 32.1988 26.9867 31.7767L28.1033 15H11.9033H11.9017ZM16.6667 16.6667C17.1087 16.6667 17.5326 16.8423 17.8452 17.1548C18.1577 17.4674 18.3333 17.8913 18.3333 18.3333V30C18.3333 30.442 18.1577 30.8659 17.8452 31.1785C17.5326 31.4911 17.1087 31.6667 16.6667 31.6667C16.2246 31.6667 15.8007 31.4911 15.4882 31.1785C15.1756 30.8659 15 30.442 15 30V18.3333C15 17.8913 15.1756 17.4674 15.4882 17.1548C15.8007 16.8423 16.2246 16.6667 16.6667 16.6667ZM23.3333 16.6667C23.7754 16.6667 24.1993 16.8423 24.5118 17.1548C24.8244 17.4674 25 17.8913 25 18.3333V30C25 30.442 24.8244 30.8659 24.5118 31.1785C24.1993 31.4911 23.7754 31.6667 23.3333 31.6667C22.8913 31.6667 22.4674 31.4911 22.1548 31.1785C21.8423 30.8659 21.6667 30.442 21.6667 30V18.3333C21.6667 17.8913 21.8423 17.4674 22.1548 17.1548C22.4674 16.8423 22.8913 16.6667 23.3333 16.6667Z"
                                                    fill="black" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    )}
                </div>
            </div>
        </body >
    )
}