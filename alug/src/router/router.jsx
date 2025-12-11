import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Cadastro from "../pages/Cadastro/Cadastro";
import Login from "../pages/Login/Login";
import CriarAnuncio from "../pages/CriarAnuncio/CriarAnuncio";
import EditarAnuncio from "../pages/EditarAnuncio/EditarAnuncio";
import MeusAnuncios from "../pages/MeusAnuncios/MeusAnuncios";
import InformacoesAnuncio from "../pages/InformacoesAnuncio/InformacoesAnuncio";
import InformacoesUsuario from "../pages/InformacoesUsuario/InformacoesUsuario";
import TesteDashboard from "../pages/TesteDashboard/TesteDashboard";


const router = createBrowserRouter([

    {path: "/", element: <Home />},
    {path: "/cadastro", element: <Cadastro />},
    {path: "/login", element: <Login />},
    {path: "/criar-anuncio", element: <CriarAnuncio />},
    {path: "/editar-anuncio/:id", element: <EditarAnuncio />},
    {path: "/meus-anuncios", element: <MeusAnuncios />},
    {path: "/informacoes-anuncio/:id", element: <InformacoesAnuncio />},
    {path: "/minhas-informacoes", element: <InformacoesUsuario />},
    {path: "/teste-dashboard", element: <TesteDashboard/>}
])

export default router