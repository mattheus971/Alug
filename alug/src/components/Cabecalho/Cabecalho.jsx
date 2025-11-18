import AvatarUsuario from '../AvatarUsuario/AvatarUsuario'
import BotaoCriarAnuncio from '../BotaoCriarAnuncio/BotaoCriarAnuncio'
import CampoPesquisaCabecalho from '../CampoPesquisaCabecalho/CampoPesquisaCabecalho'
import './Cabecalho.css'

function Cabecalho() {
  return (
    <div className="container-cabecalho">
      <img src="" alt="Logo" />

      <CampoPesquisaCabecalho />

      <div className='container-criaranuncio-avatar'>
        <button className='botao-criaranuncio' >Cria anúncio</button>
        <AvatarUsuario />
      </div>

    </div>
  )
}

export default Cabecalho