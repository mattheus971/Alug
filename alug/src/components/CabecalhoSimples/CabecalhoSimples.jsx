import { useNavigate } from 'react-router-dom';
import './CabecalhoSimples.css';
import AvatarUsuario from '../AvatarUsuario/AvatarUsuario';

function CabecalhoSimples({ destinoCriarAnuncio }) {
  const navigate = useNavigate();


  const irParaCriarAnuncio = () => {
    if (destinoCriarAnuncio) {
      navigate(destinoCriarAnuncio);
    }
  };

  return (
    <div className="container-cabecalho-simples">
      <img
        src="./image/-logoSimplesAlug.png"
        alt="Logo"
        className='logo-simples'
        onClick={() => navigate('/')}
      />

      <div className='container-criaranuncio-avatar'>
        <button
          className='botao-criaranuncio'
          onClick={irParaCriarAnuncio}
        >
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
