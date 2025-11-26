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
          <div>
            <h3>Minhas informações</h3>
            <p>Clique para editar suas</p>
          </div>

          <div className="campo-nome">

          </div>

          
        </div>

      </div>
    </>
  )
}

export default InformacoesUsuario