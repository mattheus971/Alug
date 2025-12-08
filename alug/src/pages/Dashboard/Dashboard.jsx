import React, { useEffect, useState, useContext } from "react";
import { UsuarioContext } from "../../context/UsuarioContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardAnuncio from "../../components/CardAnuncio/CardAnuncio.jsx";
import './Dashboard.css';


export default function Dashboard() {
  const { usuario } = useContext(UsuarioContext);
  const navigate = useNavigate();

  const [meusAnuncios, setMeusAnuncios] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  // Exemplo de dados para o gráfico (pode trocar depois)
  const graficoData = [
    { mes: "Jan", alugueis: 3 },
    { mes: "Fev", alugueis: 5 },
    { mes: "Mar", alugueis: 2 },
    { mes: "Abr", alugueis: 6 },
    { mes: "Mai", alugueis: 4 },
    { mes: "Jun", alugueis: 7 }
  ];

  useEffect(() => {
    if (usuario) {
      // Meus anúncios
      axios
        .get(`http://localhost:3000/imoveis/usuario/${usuario.id_usuario}`)
        .then((res) => setMeusAnuncios(res.data))
        .catch((err) => console.error(err));

      // Favoritos
      axios
        .get(`http://localhost:3000/favorito/${usuario.id_usuario}`)
        .then((res) => setFavoritos(res.data))
        .catch((err) => console.error(err));
    }
  }, [usuario]);


return (
  <div className="dashboard-container">
    <header className="dashboard-header">Dashboard</header>

    <div className="top-cards">
      <div className="card card-grafico">
        {/* Gráfico aqui */}
      </div>
      <div className="card card-perfil" onClick={() => navigate('/minhas-informacoes')}>
        Meu Perfil
      </div>
    </div>

    <section className="secao">
      <div className="secao-header">
        <h2>Meus Anúncios</h2>
        <button onClick={() => navigate('/meus-anuncios')}>Ver todos</button>
      </div>
      <div className="cards-grid">
        {meusAnuncios.map((item) => (
          <CardAnuncio key={item.id_imoveis} dados={item} onClick={() => navigate(`/informacoes-anuncio/${item.id_imoveis}`)} />
        ))}
      </div>
    </section>

    <section className="secao">
  <div className="secao-header">
    <h2>Favoritos</h2>
    <button onClick={() => navigate('/favoritos')}>Ver todos</button>
  </div>
  <div className="cards-grid">
    {favoritos.map((item) => (
      <CardAnuncio
        key={item.id_imoveis || item.imovel?.id_imoveis}
        dados={item.imovel || item}
        onClick={() =>
          navigate(`/informacoes-anuncio/${item.id_imoveis || item.imovel?.id_imoveis}`)
        }
      />
    ))}
  </div>
</section>

  </div>
)};
