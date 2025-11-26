import React, { useEffect, useState } from "react";
import "./MeusAnuncios.css";

function MeusAnuncios() {
  const [user, setUser] = useState(null);
  const [anuncios, setAnuncios] = useState([]);
  const [editId, setEditId] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [cidade, setCidade] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    const userLogged = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUser(userLogged);

    const allAds = localStorage.getItem("anuncios")
      ? JSON.parse(localStorage.getItem("anuncios"))
      : [];

    if (userLogged) {
      const myAds = allAds.filter((ad) => ad.idUser === userLogged.id);
      setAnuncios(myAds);
    }
  }, []);

  if (!user) {
    return <div className="meusanuncios-container">Nenhum usuário logado.</div>;
  }

  const handleDelete = (id) => {
    let allAds = JSON.parse(localStorage.getItem("anuncios")) || [];
    allAds = allAds.filter((a) => a.id !== id);
    localStorage.setItem("anuncios", JSON.stringify(allAds));
    setAnuncios(allAds.filter((a) => a.idUser === user.id));
  };

  const handleEdit = (ad) => {
    setEditId(ad.id);
    setTitulo(ad.titulo);
    setTipo(ad.tipo);
    setCidade(ad.cidade);
    setPreco(ad.preco);
  };

  const handleSave = () => {
    let allAds = JSON.parse(localStorage.getItem("anuncios")) || [];
    const index = allAds.findIndex((a) => a.id === editId);
    if (index !== -1) {
      allAds[index] = {
        ...allAds[index],
        titulo,
        tipo,
        cidade,
        preco,
      };
    }
    localStorage.setItem("anuncios", JSON.stringify(allAds));
    setAnuncios(allAds.filter((a) => a.idUser === user.id));
    setEditId(null);
  };

  const handleCancel = () => setEditId(null);

  return (
    <div className="meusanuncios-container">
      <h1>Meus Anúncios</h1>

      {anuncios.length === 0 ? (
        <p className="no-ads">Você ainda não possui anúncios.</p>
      ) : (
        <div className="lista-anuncios">
          {anuncios.map((item) => (
            <div className="card-anuncio" key={item.id}>
              {editId === item.id ? (
                <>
                  <label>Título:</label>
                  <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />

                  <label>Tipo:</label>
                  <select
                    value={tipo}
                    className="inputs-Crianuncio"
                    onChange={(e) => setTipo(e.target.value)}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Casa">Casa</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Kitnet">Kitnet</option>
                  </select>

                  <label>Cidade:</label>
                  <input value={cidade} onChange={(e) => setCidade(e.target.value)} />

                  <label>Preço:</label>
                  <input value={preco} onChange={(e) => setPreco(e.target.value)} />

                  <button className="btn-save" onClick={handleSave}>
                    Salvar
                  </button>
                  <button className="btn-cancel" onClick={handleCancel}>
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <h2>{item.titulo}</h2>
                  <p>
                    <strong>Tipo:</strong> {item.tipo}
                  </p>
                  <p>
                    <strong>Cidade:</strong> {item.cidade}
                  </p>
                  <p>
                    <strong>Preço:</strong> R$ {item.preco}
                  </p>

                  <div className="anuncio-buttons">
                    <button className="btn-edit" onClick={() => handleEdit(item)}>
                      Editar
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(item.id)}>
                      Deletar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MeusAnuncios;

