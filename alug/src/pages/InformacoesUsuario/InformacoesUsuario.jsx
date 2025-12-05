import CabecalhoSimples from "../../components/CabecalhoSimples/CabecalhoSimples"
import './InformacoesUsuario.css'
import { GlobalContext } from "../../context/GlobalContext.jsx";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';

function InformacoesUsuario() {
  const { usuario } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNasc] = useState("");

useEffect(() => {
  console.log("usuario no contexto:", usuario);
  if (usuario) {
    setNome(usuario.nome || "");
    setEmail(usuario.email || "");
    setSenha(usuario.senha || "");
    setTelefone(usuario.telefone || "");
    setDataNasc(usuario.dataNascimento || usuario.data_nascimento || "");
  }
}, [usuario]);
  return (
    <>
      <CabecalhoSimples />
      <div className="corpo-informacoes-usuario">


        <div className="container-avatar-nome-usuario">

          <div className="foto-usuario">
            {/* <img src="" alt="" /> */}
          </div>
          <h2 className="nome-usuario-pg-infos">
            {nome ? `Bem-vindo, ${nome}` : "Bem Vindo"}
          </h2>


        </div>

        <div className="container-meus-anuncios"
            onClick={() => navigate('/meus-anuncios')}
        >
          <div>
            <h3
            >
              Meus anuncios</h3>
            <p>Clique para ver seus anúncios</p>
          </div>
          <h3>-</h3>
        </div>

        <div className="container-informacoes">
          <div className="cabecalho-informacoes">
            <h3>Minhas informações</h3>
            <p>Clique para editar suas informações</p>
          </div>

          <div className="campo">
            <div className="cntr-lbl-inf">
              <label style={{ marginRight: "98px" }} >
                Nome
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <h3 className="info-usuario">Nombre</h3>
            </div>
            <div><h3>-</h3></div>
          </div>

          <div className="campo">
            <div className="cntr-lbl-inf">
              <label style={{ marginRight: "103px" }} >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div><h3>-</h3></div>
          </div>

          <div className="campo">
            <div className="cntr-lbl-inf">
              <label style={{ marginRight: "99px" }} >
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div><h3>-</h3></div>
          </div>

          <div className="campo">
            <div className="cntr-lbl-inf">
              <label style={{ marginRight: "20px" }} >
                Data Nascimento
              </label>
              <input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNasc(e.target.value)}
              />
            </div>
            <div><h3>-</h3></div>
          </div>

          <div className="campo">
            <div className="cntr-lbl-inf">
              <label style={{ marginRight: "82px" }} >
                Telefone
              </label>
              <input
                type="tel"
                value={telefone}
                onChange={e => setTelefone(e.target.value)} />
            </div>
            <div><h3>-</h3></div>
          </div>

        </div>

      </div>
    </>
  )
}

export default InformacoesUsuario;