import React, { useContext, useState, useEffect } from "react";
import ModalEdit from "../../components/Modal/ModalEdit.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CabecalhoSimples from "../../components/CabecalhoSimples/CabecalhoSimples";
import { UsuarioContext } from "../../context/UsuarioContext.jsx";
import "./InformacoesUsuario.css";

function InformacoesUsuario() {
  const { usuario, setUsuario, logout } = useContext(UsuarioContext);
  const navigate = useNavigate();

  const [campoEditando, setCampoEditando] = useState(null);

  const salvarCampo = async (campo, valor) => {
    if (!usuario) return;

    try {
      const dados = {
        nome: usuario.nome || "",
        email: usuario.email || "",
        senha: usuario.senha || "",
        telefone: usuario.telefone || null,
        data_nascimento: usuario.data_nascimento
          ? formatarData(usuario.data_nascimento)
          : null,
      };

      dados[campo] = valor === "" ? null : valor;

      console.log("Enviando dados para PUT:", dados);

      const res = await axios.put(
        `http://localhost:3000/usuario/${usuario.id_usuario}`,
        dados
      );

      setUsuario(res.data);
      setCampoEditando(null);
      alert("Campo atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      alert("Erro ao atualizar usuário");
    }
  };

  const deletarConta = async () => {
    if (!usuario) return;
    if (!confirm("Tem certeza que deseja excluir sua conta?")) return;

    try {
      await axios.delete(
        `http://localhost:3000/usuario/${usuario.id_usuario}`
      );
      logout();
      navigate("/");
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
      alert("Erro ao deletar conta");
    }
  };

  const formatarData = (data) => {
    if (!data) return "";
    return new Date(data).toISOString().split("T")[0];
  };

  return (
    <>
      <CabecalhoSimples />

      <div className="corpo-informacoes-usuario">


        <div className="container-avatar-nome-usuario">
          <div className="foto-usuario"></div>
          <h2 className="nome-usuario-pg-infos">
            {usuario?.nome ? `Bem-vindo, ${usuario.nome}` : "Bem-vindo"}
          </h2>
        </div>

        <div
          className="container-meus-anuncios"
          onClick={() => navigate("/meus-anuncios")}
        >
          <div>
            <h3>Meus anúncios</h3>
            <p>Clique para ver seus anúncios</p>
          </div>
          <h3>-</h3>
        </div>

        <div
          className="container-meu-dashboard"
          onClick={() => navigate("/dashboard")}
        >
          <div>
            <h3 style={{fontWeight: "500"}}>Dashboard</h3>
            <p>Clique para ver seu dashboard</p>
          </div>
          <h3>-</h3>
        </div>

        <div className="container-informacoes">
          <div className="cabecalho-informacoes">
            <h3>Minhas informações</h3>
            <p>Clique em cada campo para editar</p>
          </div>

          <div className="campo" onClick={() => setCampoEditando("nome")}>
            <div className="cntr-lbl-inf">
              <label>{usuario?.nome}</label>
            </div>
            <div>
              <h3>-</h3>
            </div>
          </div>

          <div className="campo" onClick={() => setCampoEditando("email")}>
            <div className="cntr-lbl-inf">
              <label>{usuario?.email}</label>
            </div>
            <div>
              <h3>-</h3>
            </div>
          </div>

          <div className="campo" onClick={() => setCampoEditando("senha")}>
            <div className="cntr-lbl-inf">
              <label>{"•".repeat(usuario?.senha?.length || 8)}</label>
            </div>
            <div>
              <h3>-</h3>
            </div>
          </div>

          <div
            className="campo"
            onClick={() => setCampoEditando("data_nascimento")}
          >
            <div className="cntr-lbl-inf">
              <label>{formatarData(usuario?.data_nascimento)}</label>
            </div>
            <div>
              <h3>-</h3>
            </div>
          </div>

          <div className="campo" onClick={() => setCampoEditando("telefone")}>
            <div className="cntr-lbl-inf">
              <label>{usuario?.telefone}</label>
            </div>
            <div>
              <h3>-</h3>
            </div>
          </div>

        </div>
        <div className="container-botoes">
          <button className="btn-sair-minhasinfos" onClick={() => { logout(); navigate("/login"); }}>
            Sair
          </button>

          <button className="btn-delete-minhasinfos" onClick={deletarConta}>
            Excluir Conta
          </button>

        </div>


        {campoEditando && (
          <ModalEdit
            campo={campoEditando}
            valorInicial={
              campoEditando === "data_nascimento"
                ? formatarData(usuario[campoEditando])
                : usuario[campoEditando]
            }
            onSalvar={(novoValor) => salvarCampo(campoEditando, novoValor)}
            onCancelar={() => setCampoEditando(null)}
          />
        )}
      </div>
    </>
  );
}

export default InformacoesUsuario;
