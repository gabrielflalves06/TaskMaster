import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tarefas from "./pages/Tarefas";
import Cadastro from "./pages/Cadastrar";
import Alterar from "./pages/Alterar";

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