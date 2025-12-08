import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UsuarioContext } from "../../context/UsuarioContext.jsx";
import "./MeusAnuncios.css";
import CabecalhoSimples from "../../components/CabecalhoSimples/CabecalhoSimples.jsx";

function MeusAnuncios() {
  const navigate = useNavigate();
  const { usuario } = useContext(UsuarioContext);

  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    if (usuario) {
      axios
        .get(`http://localhost:3000/imoveis/usuario/${usuario.id_usuario}`)
        .then((res) => setAnuncios(res.data))
        .catch((err) => console.error("Erro ao buscar anúncios:", err));
    }
  }, [usuario]);

  if (!usuario)
    return <div className="meusanuncios-container">Nenhum usuário logado.</div>;

  const deletarAnuncio = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja deletar este anúncio?");
    if (!confirmacao) return;

    try {
      await axios.delete(`http://localhost:3000/imoveis/${id}`);
      setAnuncios(anuncios.filter((a) => a.id_imoveis !== id));
    } catch (err) {
      console.error("Erro ao deletar anúncio:", err);
      alert("Erro ao deletar anúncio");
    }
  };


  return (
    <>
      <CabecalhoSimples />
      <div className="meusanuncios-container">

        <h1>Meus Anúncios</h1>

        {anuncios.length === 0 ? (
          <p className="no-ads">Você ainda não possui anúncios.</p>
        ) : (
          <div className="lista-anuncios">
            {anuncios.map((item) => (
              <div className="card-anuncio" key={item.id_imoveis}>
                <h2>{item.titulo}</h2>
                {item.imagem && (
                  <img
                    src={item.imagem ? `http://localhost:3000/uploads/${item.imagem}` : '/image/AlugLogo.png'}
                    alt={item.titulo}
                    className="img-anuncio"
                  />

                )}
                <p><strong>Tipo:</strong> {item.tipo}</p>
                <p><strong>Cidade:</strong> {item.cidade}</p>
                <p><strong>Preço:</strong> R$ {item.preco}</p>

                <div className="anuncio-buttons">
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/editar-anuncio/${item.id_imoveis}`)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() => deletarAnuncio(item.id_imoveis)}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MeusAnuncios;
