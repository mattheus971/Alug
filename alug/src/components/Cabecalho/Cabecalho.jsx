import AvatarUsuario from '../AvatarUsuario/AvatarUsuario'
import CampoPesquisaCabecalho from '../CampoPesquisaCabecalho/CampoPesquisaCabecalho'
import Input from '../Input/Input'
import './Cabecalho.css'

function Cabecalho() {
  return (
    <div className="container-cabecalho">
      <img src="" alt="Logo" />

      <CampoPesquisaCabecalho />

      <AvatarUsuario />
    </div>
  )
}

export default Cabecalho