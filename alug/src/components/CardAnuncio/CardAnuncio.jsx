import React from "react";
import "./CardAnuncio.css";

function CardAnuncio({ dados, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img 
        className="card-img" 
        src={dados.imagem ? `http://localhost:3000${dados.imagem}` : "/caminho/padrao.jpg"} 
        alt={dados.titulo} 
      />
      <div className="card-info">
        <h2>{dados.titulo}</h2>
        <p className="card-tipo">{dados.tipo}</p>
        <p className="card-preco">R$ {dados.preco}</p>
      </div>
    </div>
  );
}

export default CardAnuncio;
