import CabecalhoSimples from "../../components/CabecalhoSimples/CabecalhoSimples";
import "./TesteDashboard.css";

function TesteDashboard() {
  return (
    <>
    <CabecalhoSimples />
    <div className="container-dashboard">
      
      <h1 className="titulo-dashboard">Meu dashboard</h1>

      <div className="painel">
        <div className="linha-cards">
          <div className="card-dashboard" onClick={() => navigate("/meus-anuncios")}>
            <span className="titulo-card">Anúncios ativos</span>
            <span className="valor-card">4</span>
          </div>

          <div className="card-dashboard" onClick={() => navigate("/anuncio-mais-barato")}>
            <span className="titulo-card">Anúncio mais barato</span>
            <span className="valor-card">1.150,00</span>
          </div>

          <div className="card-dashboard" onClick={() => navigate("/anuncio-mais-caro")}>
            <span className="titulo-card">Anúncio mais caro</span>
            <span className="valor-card">1.400,00</span>
          </div>
        </div>

        <div className="card-dashboard grande"onClick={() => navigate("/meus-anuncios")}>
          <span className="titulo-card">Valor médio dos anúncios</span>
          <span className="valor-card">1.117,00</span>
        </div>
      </div>
    </div>
    </>
  );
}

export default TesteDashboard;

