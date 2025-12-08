import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UsuarioContext } from "../../context/UsuarioContext";
import "./CardAnuncio.css";

function CardAnuncio({ dados, onClick }) {
  const { usuario } = useContext(UsuarioContext);
  const [favorito, setFavorito] = useState(false);

  const userId = usuario?.id ?? usuario?.id_usuario;

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:3000/favorito/${userId}/${dados.id_imoveis}`)
      .then((res) => setFavorito(res.data.favoritado))
      .catch((err) => console.log(err));
  }, [dados.id_imoveis, userId]);

  
  const toggleFavorito = (e) => {
    e.stopPropagation(); 
    if (!userId) return alert("Você precisa estar logado para favoritar!");

    if (favorito) {
      axios
        .delete("http://localhost:3000/favorito", {
          data: { usuario_id: userId, imovel_id: dados.id_imoveis },
        })
        .then(() => setFavorito(false))
        .catch((err) => console.log(err));
    } else {
      axios.post("http://localhost:3000/favorito", {
        usuario_id: userId,
        imovel_id: dados.id_imoveis, 
      })

        .then(() => setFavorito(true))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="card" onClick={onClick}>
      <img
        className="card-img"
        src={
          dados.imagem
            ? `http://localhost:3000/uploads/${dados.imagem}`
            : "/caminho/padrao.jpg"
        }
        alt={dados.titulo || "Imagem do imóvel"}
      />

      <div className="card-info">
        <h2>{dados.titulo}</h2>
        <p className="card-tipo">{dados.tipo}</p>
        <p className="card-preco">R$ {dados.preco}</p>
      </div>

      <button className="btn-favorito-grande" onClick={toggleFavorito}>
        {favorito ? "Remover dos Favoritos ❤️" : "Adicionar aos Favoritos 🤍"}
      </button>
    </div>
  );
}

export default CardAnuncio;
