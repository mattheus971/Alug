import { useNavigate } from 'react-router-dom';
import './CabecalhoSimples.css';
import AvatarUsuario from '../AvatarUsuario/AvatarUsuario';

function CabecalhoSimples() {
  const navigate = useNavigate();

  const voltarPagina = () => {
    navigate(-1);
  };

  return (
    <div className="container-cabecalho-simples">
      <img
        src="./image/-logoSimplesAlug.png"
        alt="Logo"
        className='logo-simples'
        onClick={voltarPagina}
      />

      <div className='container-criaranuncio-avatar'>
        <button className='botao-criaranuncio'>
          Criar anúncio
        </button>
        <div>
          <AvatarUsuario />
        </div>
      </div>
    </div>
  );
}

export default CabecalhoSimples;