import { useNavigate } from 'react-router-dom';
import './CabecalhoSimples.css';

function CabecalhoSimples() {
  const navigate = useNavigate();

  const voltarPagina = () => {
    navigate(-1); 
  };

  return (
    <div className="container-cabecalho-simples">
      <img 
        src="./image/AlugLogo.png" 
        alt="Logo" 
        onClick={voltarPagina} 
      />
    </div>
  );
}

export default CabecalhoSimples;