import CabecalhoSimples from "../../components/CabecalhoSimples/CabecalhoSimples"
import './InformacoesUsuario.css'

function InformacoesUsuario() {
  return (
    <>
      <CabecalhoSimples />
      <div className="corpo-informacoes-usuario">


        <div className="container-avatar-nome-usuario">

          <div className="foto-usuario">
            <img src="" alt="" />
          </div>
          <h2 className="nome-usuario-pg-infos">Nome Usuário</h2>

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
              <label style={{ marginRight: "98px" }} >Nome</label>
              <h3 className="info-usuario">Nome Usuár</h3>
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