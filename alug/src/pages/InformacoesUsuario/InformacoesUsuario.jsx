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
          <h2>Nome Usuário</h2>

        </div>

        <div className="container-anuncios">
          <div>
            <h3>Meus anuncios</h3>
            <p>Clique para ver seus anúncios</p>
          </div>
          <h2>-</h2>
        </div>

        <div className="container-informacoes">
          <div className="cabecalho-informacoes">
            <h3>Meus anuncios</h3>
            <p>Clique para ver seus anúncios</p>
          </div>

          <div className="campo">
            <div className="cntr-lbl-inf">
              <label style={{ marginRight: "98px" }} >Nome</label>
              <h3>Nome Usuário</h3>
            </div>
            <div><h3>-</h3></div>
          </div>

          <div className="campo">
            <div className="cntr-lbl-inf">
              <label style={{ marginRight: "103px" }} >Email</label>
              <h3>Email do Usuário</h3>
            </div>
            <div><h3>-</h3></div>
          </div>

          <div className="campo">
            <div className="cntr-lbl-inf">
              <label style={{ marginRight: "99px" }} >Senha</label>
              <h3>Senha Usuário</h3>
            </div>
            <div><h3>-</h3></div>
          </div>

          <div className="campo">
            <div className="cntr-lbl-inf">
              <label style={{ marginRight: "20px" }} >Data Nascimento</label>
              <h3>Data Usuário</h3>
            </div>
            <div><h3>-</h3></div>
          </div>

          <div className="campo">
            <div className="cntr-lbl-inf">
              <label style={{ marginRight: "82px" }} >Telefone</label>
              <h3>10/10/2002</h3>
            </div>
            <div><h3>-</h3></div>
          </div>
        
        </div>

      </div>
    </>
  )
}

export default InformacoesUsuario