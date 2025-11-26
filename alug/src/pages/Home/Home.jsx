import React, { useEffect, useState } from "react";
import axios from "axios";
import CardAnuncio from "../../components/CardAnuncio/CardAnuncio";
import Cabecalho from "../../components/Cabecalho/Cabecalho";

function Home() {
  const [imoveis, setImoveis] = useState([]);

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
    <div className="home-container">
      <Cabecalho />
      {imoveis.map((imovel) => (
        <CardAnuncio
          key={imovel.id_imoveis}
          dados={{
            titulo: imovel.titulo,
            tipo: imovel.tipo,
            preco: imovel.preco,
            imagem: imovel.imagem 
          }}
          onClick={() => console.log("Clicou no imóvel", imovel.id_imoveis)}
        />
      ))}

    </div>
  );
}

export default Home;
