import CabecalhoSimples from "../../components/CabecalhoSimples/CabecalhoSimples"
import './InformacoesUsuario.css'
import { useState, useEffect } from "react"

function InformacoesUsuario() {
  const [nome, setNome] = useState('')
  const [emailCad, setEmail] = useState('')
  const [senhaCad, setSenha] = useState('')
  const [telefoneCad, setTelefone] = useState('')
  const [dataNascimento, setDataNasc] = useState('')


useEffect(() => {
  const id = localStorage.getItem("idUsuario");

  if (!id) return; // evita erro se não existir

  async function fetchUsuario() {
    try {
      const response = await fetch(`http://localhost:3000/usuario/${id}`);
      const usuario = await response.json();

      setNome(usuario.nome); // <-- seta o nome vindo do backend
    } catch (error) {
      console.log("Erro ao buscar usuário", error);
    }
  }

  fetchUsuario();
}, []);




  return (
    <>
      <CabecalhoSimples />
      <div className="corpo-informacoes-usuario">


        <div className="container-avatar-nome-usuario">

          <div className="foto-usuario">
            {/* <img src="" alt="" /> */}
          </div>
          <h2 className="nome-usuario-pg-infos">Bem Vindo{nome}</h2>

        </div>

        <div className="container-meus-anuncios">
          <div>
            <h3>Meus anuncios</h3>
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
                <input 
                type="text" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} />
              </label>

              <h3 className="info-usuario">{nome}</h3>
            </div>
            <div><h3>-</h3></div>
          </div>

          <div className="campo">
            <div className="cntr-lbl-inf">
              <label style={{ marginRight: "103px" }} >Email</label>
              <h3 className="info-usuario">Email do Usuário</h3>
            </div>
            <div><h3>-</h3></div>
          </div>

          <div className="campo">
            <div className="cntr-lbl-inf">
              <label style={{ marginRight: "99px" }} >Senha</label>
              <h3 className="info-usuario">Senha Usuário</h3>
            </div>
            <div><h3>-</h3></div>
          </div>

          <div className="campo">
            <div className="cntr-lbl-inf">
              <label style={{ marginRight: "20px" }} >Data Nascimento</label>
              <h3 className="info-usuario">Data Usuário</h3>
            </div>
            <div><h3>-</h3></div>
          </div>

          <div className="campo">
            <div className="cntr-lbl-inf">
              <label style={{ marginRight: "82px" }} >Telefone</label>
              <h3 className="info-usuario">99 9999-9999</h3>
            </div>
            <div><h3>-</h3></div>
          </div>

        </div>

      </div>
    </>
  )
}

export default InformacoesUsuario