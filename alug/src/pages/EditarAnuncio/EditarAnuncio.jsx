import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CabecalhoSimples from "../../components/CabecalhoSimples/CabecalhoSimples";
import "./EditarAnuncio.css";


const API = "http://localhost:3000";

export default function EditarAnuncio() {
  const { id } = useParams();
  const navigate = useNavigate();

  // campos do imóvel
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [area, setArea] = useState("");
  const [quartos, setQuartos] = useState("");
  const [banheiros, setBanheiros] = useState("");
  const [mobilia, setMobilia] = useState("Não");
  const [numeroGaragem, setNumeroGaragem] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [cep, setCep] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [usuarioId, setUsuarioId] = useState(null);

  // imagens
  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchImovel();
  }, [id]);

  async function fetchImovel() {
    try {
      const resImovel = await axios.get(`${API}/imoveis/${id}`);
      const imovel = resImovel.data;

      setTitulo(imovel.titulo || "");
      setTipo(imovel.tipo || "");
      setArea(imovel.area || "");
      setQuartos(imovel.quartos || "");
      setBanheiros(imovel.banheiros || "");
      setMobilia(imovel.mobilia || "Não");
      setNumeroGaragem(imovel.numero_garagem ?? "");
      setEstado(imovel.estado || "");
      setCidade(imovel.cidade || "");
      setBairro(imovel.bairro || "");
      setRua(imovel.rua || "");
      setNumero(imovel.numero || "");
      setCep(imovel.cep || "");
      setDescricao(imovel.descricao || "");
      setPreco(imovel.preco ?? "");
      setUsuarioId(imovel.usuario_id || null);

      const resImgs = await axios.get(`${API}/imagens/imovel/${id}`);
      setExistingImages(resImgs.data || []);
    } catch (err) {
      alert("Erro ao carregar anúncio.");
    } finally {
      setLoading(false);
    }
  }

  const handleNewFiles = (filesList) => {
    const files = Array.from(filesList || []);

    const totalDisponivel = 4 - existingImages.length - newFiles.length;
    const filesPermitidos = files.slice(0, totalDisponivel);

    if (filesPermitidos.length === 0) {
      alert("Máximo de 4 imagens.");
      return;
    }

    filesPermitidos.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPreviews((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });

    setNewFiles((prev) => [...prev, ...filesPermitidos]);
  };

  const excluirImagemExistente = async (imgId) => {
    if (!window.confirm("Excluir esta imagem?")) return;

    try {
      await axios.delete(`${API}/imagens/${imgId}`);
      setExistingImages((prev) =>
        prev.filter((i) => i.id_imagem !== imgId)
      );
    } catch (err) {
      alert("Erro ao apagar imagem.");
    }
  };

  const removeNewFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const salvar = async () => {
    if (existingImages.length + newFiles.length > 4) {
      alert("Máximo 4 imagens.");
      return;
    }

    setSaving(true);

    try {
      const corpo = {
        titulo,
        tipo,
        area,
        quartos,
        banheiros,
        mobilia,
        numero_garagem: numeroGaragem,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        cep,
        descricao,
        preco,
        usuario_id: usuarioId,
      };

      await axios.put(`${API}/imoveis/${id}`, corpo);

      if (newFiles.length > 0) {
        const formData = new FormData();
        formData.append("imovel_id", id);
        newFiles.forEach((f) => formData.append("url_imagem", f));

        await axios.post(`${API}/imagens`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Anúncio atualizado!");
      navigate("/meus-anuncios");
    } catch (err) {
      alert("Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Carregando anúncio...</div>;

  // ARRAY FINAL DE EXIBIÇÃO (existentes + previews)
  const exibicao = [
    ...existingImages.map((i) => ({ tipo: "existente", dado: i })),
    ...newPreviews.map((p, index) => ({ tipo: "novo", dado: p, index })),
  ];

  // Preenche até 4 slots
  while (exibicao.length < 4) exibicao.push(null);

  return (
    <>
      <CabecalhoSimples />

      <div className="wrapper-anuncio">

        {/* IMAGENS */}
        <div className="cntnr-esquerda-infos-anuncio">
          <div className="containerpai-inputs-fotos">

            {[0, 1, 2, 3].map((i) => {
              const item = exibicao[i];

              return (
                <label className="container-input-foto" key={i}>

                  {item?.tipo === "existente" && (
                    <>
                      <img
                        src={`${API}/imagens/${item.dado.url_imagem}`}
                        alt=""
                      />
                      <button
                        className="btn-excluir-img"
                        onClick={(e) => {
                          e.preventDefault();
                          excluirImagemExistente(item.dado.id_imagem);
                        }}
                      >
                        X
                      </button>
                    </>
                  )}

                  {item?.tipo === "novo" && (
                    <>
                      <img src={item.dado} alt="preview" />
                      <button
                        className="btn-excluir-img"
                        onClick={(e) => {
                          e.preventDefault();
                          removeNewFile(item.index);
                        }}
                      >
                        X
                      </button>
                    </>
                  )}

                  {!item && (
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleNewFiles(e.target.files)}
                    />
                  )}

                </label>
              );
            })}

          </div>
        </div>

        {/* FORMULÁRIO */}
        <div className="cntnr-direita-infos-anuncio">
          <form className="form-inputs-criar-anuncio">

            <div className="ctnr-zxlj">
              <label>Título</label>
              <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>

            <div className="ctnr-zxlj">
              <label>Descrição</label>
              <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </div>

            <div className="ctnr-zxlj">
              <label>Tipo</label>
              <input value={tipo} onChange={(e) => setTipo(e.target.value)} />
            </div>

            <div className="ctnr-zxlj">
              <label>Área</label>
              <input value={area} onChange={(e) => setArea(e.target.value)} />
            </div>

            <div className="ctnr-zxlj">
              <label>Quartos</label>
              <input value={quartos} onChange={(e) => setQuartos(e.target.value)} />
            </div>

            <div className="ctnr-zxlj">
              <label>Banheiros</label>
              <input value={banheiros} onChange={(e) => setBanheiros(e.target.value)} />
            </div>

            <div className="ctnr-zxlj">
              <label>Mobília</label>
              <input value={mobilia} onChange={(e) => setMobilia(e.target.value)} />
            </div>

            <div className="ctnr-zxlj">
              <label>Garagem</label>
              <input value={numeroGaragem} onChange={(e) => setNumeroGaragem(e.target.value)} />
            </div>

            <div className="ctnr-zxlj">
              <label>Estado</label>
              <input value={estado} onChange={(e) => setEstado(e.target.value)} />
            </div>

            <div className="ctnr-zxlj">
              <label>Cidade</label>
              <input value={cidade} onChange={(e) => setCidade(e.target.value)} />
            </div>

            <div className="ctnr-zxlj">
              <label>Bairro</label>
              <input value={bairro} onChange={(e) => setBairro(e.target.value)} />
            </div>

            <div className="ctnr-zxlj">
              <label>Rua</label>
              <input value={rua} onChange={(e) => setRua(e.target.value)} />
            </div>

            <div className="ctnr-zxlj">
              <label>Número</label>
              <input value={numero} onChange={(e) => setNumero(e.target.value)} />
            </div>

            <div className="ctnr-zxlj">
              <label>CEP</label>
              <input value={cep} onChange={(e) => setCep(e.target.value)} />
            </div>

            <div className="ctnr-zxlj">
              <label>Preço</label>
              <input value={preco} onChange={(e) => setPreco(e.target.value)} />
            </div>

            <button type="button" className="btn-salvar" onClick={salvar}>
              Salvar alterações
            </button>

          </form>
        </div>
      </div>
    </>
  );
}
