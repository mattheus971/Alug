import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarUsuario from '../AvatarUsuario/AvatarUsuario';
import CampoPesquisaCabecalho from '../CampoPesquisaCabecalho/CampoPesquisaCabecalho';
import { UsuarioContext } from '../../context/UsuarioContext.jsx';
import './Cabecalho.css';

function Cabecalho() {
  const { usuario } = useContext(UsuarioContext);
  const navigate = useNavigate();

  const criarAnuncio = () => {
    if (usuario) {
      navigate('/criar-anuncio');
    } else {
      navigate('/login');
    }
  };

  const acessarPerfil = () => {
    if (usuario) {
      navigate('/minhas-informacoes'); // redireciona pro perfil
    } else {
      navigate('/login'); // se não estiver logado, vai pro login
    }
  };

  return (
    <div className="container-cabecalho">
      <img src="./image/AlugLogo.png" alt="" />

      <CampoPesquisaCabecalho />

      <div className='container-criaranuncio-avatar'>
        <button className='botao-criaranuncio' onClick={criarAnuncio}>
          Criar anúncio
        </button>
        <div onClick={acessarPerfil}>
          <AvatarUsuario />
        </div>
      </div>
    </div>
  );
}

export default Cabecalho;
