import { BrowserRouter, Route, Routes } from "react-router-dom";
import Alterar from "./pages/Alterar";
import Cadastro from "./pages/Cadastrar";
import Tarefas from "./pages/Tarefas";

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Tarefas/>}/>
                <Route path="/Cadastro" element={<Cadastro/>}/>
                <Route path="/Alterar" element={<Alterar/>}/>
            </Routes>
        </BrowserRouter>
    );
}