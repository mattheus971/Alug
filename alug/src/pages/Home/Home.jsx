import React, { useEffect, useState } from "react";
import axios from "axios";
import CardAnuncio from "../../components/CardAnuncio/CardAnuncio";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // IMPORTANTE

function Home() {
  const [imoveis, setImoveis] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await axios.get("http://localhost:3000/imoveis");
        setImoveis(response.data);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      }
    };

    fetchImoveis();
  }, []);

  return (
    <>
      <Cabecalho />

      <div className="home-container">
        {imoveis.map((imovel) => (
          <CardAnuncio
            key={imovel.id_imoveis}
            dados={{
              titulo: imovel.titulo,
              tipo: imovel.tipo,
              preco: imovel.preco,
              imagem: imovel.imagem, // certo
            }}
            onClick={() => navigate(`/informacoes-anuncio/${imovel.id_imoveis}`)}
          />


        ))}
      </div>
    </>
  );
}

export default Home;
