import CabecalhoSimples from "../../components/CabecalhoSimples/CabecalhoSimples";
import { useContext, useState, useEffect } from "react";
import { UsuarioContext } from "../../context/UsuarioContext.jsx";
import axios from 'axios';
import "./TesteDashboard.css";

function TesteDashboard() {
  const [anuncios, setAnuncios] = useState(0);
  const [maisBarato, setMaisBarato] = useState(0);
  const [maisCaro, setMaisCaro] = useState(0);
  const [valorMedio, setValorMedio] = useState(0);

  const { usuario } = useContext(UsuarioContext);

 useEffect(() => {
  async function carregarDados() {
    if (!usuario) return;

    const userId = usuario.id ?? usuario.id_usuario;
    if (!userId) return;

    try {
      const resposta = await axios.get(
        `http://localhost:3000/imoveis/usuario/${userId}`
      );

      const lista = resposta.data || [];
      console.log("IMÓVEIS DO USUÁRIO:", lista);

      setAnuncios(lista.length);

      if (lista.length > 0) {
        const valores = lista
          .map(a => Number(a.preco)) // <-- aqui usamos 'preco'
          .filter(v => !isNaN(v));

        if (valores.length > 0) {
          setMaisBarato(Math.min(...valores));
          setMaisCaro(Math.max(...valores));
          setValorMedio(
            (valores.reduce((acc, v) => acc + v, 0) / valores.length).toFixed(2)
          );
        } else {
          setMaisBarato(0);
          setMaisCaro(0);
          setValorMedio(0);
        }
      } else {
        setMaisBarato(0);
        setMaisCaro(0);
        setValorMedio(0);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  carregarDados();
}, [usuario]);

  return (
    <>
      <CabecalhoSimples destinoCriarAnuncio="/criar-anuncio" />

      <div className="container-dashboard">
        <h1 className="titulo-dashboard">Meu dashboard</h1>

        <div className="painel">
          <div className="linha-cards">
            <div className="card-dashboard">
              <span className="titulo-card">Anúncios ativos</span>
              <span className="valor-card">{anuncios}</span>
            </div>

            <div className="card-dashboard">
              <span className="titulo-card">Anúncio mais barato</span>
              <span className="valor-card">{maisBarato}</span>
            </div>

            <div className="card-dashboard">
              <span className="titulo-card">Anúncio mais caro</span>
              <span className="valor-card">{maisCaro}</span>
            </div>
          </div>

          <div className="card-dashboard grande">
            <span className="titulo-card">Valor médio dos anúncios</span>
            <span className="valor-card">{valorMedio}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default TesteDashboard;
