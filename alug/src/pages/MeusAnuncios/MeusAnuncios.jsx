import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MeusAnuncios.css";

function MeusAnuncios() {
  const [user, setUser] = useState(null);
  const [anuncios, setAnuncios] = useState([]);
  const [editId, setEditId] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [cidade, setCidade] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState(null); // nova imagem
  const [preview, setPreview] = useState(null); // preview da nova imagem

  // Pegar usuário logado e anúncios
  useEffect(() => {
    const userLogged = localStorage.getItem("usuario")
      ? JSON.parse(localStorage.getItem("usuario"))
      : null;

    setUser(userLogged);

    if (userLogged) {
      axios
        .get(`http://localhost:3000/imoveis/usuario/${userLogged.id_usuario}`)
        .then((res) => setAnuncios(res.data))
        .catch((err) => console.error("Erro ao buscar anúncios:", err));
    }
  }, []);

  if (!user) return <div className="meusanuncios-container">Nenhum usuário logado.</div>;

  // Deletar anúncio
  const deletarAnuncio = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/imoveis/${id}`);
      setAnuncios(anuncios.filter((a) => a.id_imoveis !== id));
    } catch (err) {
      console.error("Erro ao deletar anúncio:", err);
      alert("Erro ao deletar anúncio");
    }
  };

  // Preparar edição
  const handleEdit = (ad) => {
    setEditId(ad.id_imoveis);
    setTitulo(ad.titulo);
    setTipo(ad.tipo);
    setCidade(ad.cidade);
    setPreco(ad.preco);
    setImagem(null);
    setPreview(ad.imagem); // mostra imagem atual
  };

  // Salvar edição
  const salvarEdit = async () => {
    if (!editId) return;

    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("tipo", tipo);
      formData.append("cidade", cidade);
      formData.append("preco", preco);
      formData.append("usuario_id", user.id_usuario);

      if (imagem) {
        formData.append("imagem", imagem);
      }

      await axios.put(`http://localhost:3000/imoveis/${editId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAnuncios((prev) =>
        prev.map((a) =>
          a.id_imoveis === editId
            ? {
                ...a,
                titulo,
                tipo,
                cidade,
                preco,
                imagem: imagem ? URL.createObjectURL(imagem) : a.imagem,
              }
            : a
        )
      );

      setEditId(null);
      setImagem(null);
      setPreview(null);
      alert("Anúncio atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar anúncio:", err);
      alert("Erro ao atualizar anúncio");
    }
  };

  const editCancel = () => {
    setEditId(null);
    setImagem(null);
    setPreview(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.reload();
  };

  return (
    <div className="meusanuncios-container">
      <div className="usuario-logado">
        Você está logado como <strong>{user.nome}</strong>
        <button className="btn-logout" onClick={handleLogout}>
          Sair
        </button>
      </div>

      <h1>Meus Anúncios</h1>

      {anuncios.length === 0 ? (
        <p className="no-ads">Você ainda não possui anúncios.</p>
      ) : (
        <div className="lista-anuncios">
          {anuncios.map((item) => (
            <div className="card-anuncio" key={item.id_imoveis}>
              {editId === item.id_imoveis ? (
                <>

                  <label>Imagem atual:</label>
                  {preview && <img src={preview} alt="preview" className="img-anuncio" />}
                  
                  <label>Título:</label>
                  <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />

                  <label>Tipo:</label>
                  <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="">Selecione...</option>
                    <option value="Casa">Casa</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Kitnet">Kitnet</option>
                  </select>


                  <label>Trocar imagem:</label>
                  <input
                    type="file"
                    onChange={(e) => {
                      setImagem(e.target.files[0]);
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                  />

                  <label>Cidade:</label>
                  <input value={cidade} onChange={(e) => setCidade(e.target.value)} />

                  <label>Preço:</label>
                  <input value={preco} onChange={(e) => setPreco(e.target.value)} />

                  <button className="btn-save" onClick={salvarEdit}>
                    Salvar
                  </button>
                  <button className="btn-cancel" onClick={editCancel}>
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <h2>{item.titulo}</h2>
                  {item.imagem && <img src={item.imagem} alt={item.titulo} className="img-anuncio" />}
                  <p><strong>Tipo:</strong> {item.tipo}</p>
                  <p><strong>Cidade:</strong> {item.cidade}</p>
                  <p><strong>Preço:</strong> R$ {item.preco}</p>
                  <div className="anuncio-buttons">
                    <button className="btn-edit" onClick={() => handleEdit(item)}>Editar</button>
                    <button className="btn-delete" onClick={() => deletarAnuncio(item.id_imoveis)}>Deletar</button>
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
