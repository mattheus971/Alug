import './InformacoesAnuncio.css'
import Cabecalho from '../../components/Cabecalho/Cabecalho'
import { useParams } from "react-router-dom";

export default function InformacoesAnuncio() {
  const { id } = useParams();

  return (
    <>
      <Cabecalho />

      <div className="pagina-anuncio">
        <div className="conteudo-anuncio">

          {/* Imagem principal */}
          <div className="imagem-anuncio">
            <span>Imagem do anuncio</span>
          </div>

          {/* Card lateral */}
          <div className="card-anunciante">
            <h2 className="preco" style={{fontWeight: '500', fontSize: '32px'}}>1.200,00 / mês</h2>
            <button className="botao-contato">Entrar em contato</button>
            

            

            <div className="secao-anunciante">
              <hr className="linha-divisoria" />
              
              <p className="titulo-secao">Anunciante</p>
              <div className="foto-anunciante">Foto</div>
              <p className="nome-anunciante">Nome Aqui</p>
            </div>
          </div>
        </div>

        {/* Texto abaixo */}
        <div className="info-texto-anuncio">
          <h1 className="titulo-anuncio">Título do anuncio aqui</h1>
          <p className="descricao">Descrição do anuncio aqui</p>
        </div>

        <hr className="linha-divisoria" />




        <div className='container-detalhes'>

          <div class="detalhes-container">
            
    <div class="detalhe">
        <span class="titulo">Tipo</span>
        <span class="valor">Casa</span>
    </div>

    <div class="detalhe">
        <span class="titulo">Tamanho</span>
        <span class="valor">80 m²</span>
    </div>

    <div class="detalhe">
        <span class="titulo">Quartos</span>
        <span class="valor">3</span>
    </div>

    <div class="detalhe">
        <span class="titulo">Banheiros</span>
        <span class="valor">2</span>
    </div>

    <div class="detalhe">
        <span class="titulo">Mobíliado</span>
        <span class="valor">Não</span>
    </div>

    <div class="detalhe">
        <span class="titulo">Garagens</span>
        <span class="valor">2</span>
    </div>

    <div class="detalhe">
        <span class="titulo">Endereço</span>
        <span class="valor">Endereço completo do imóvel aqui</span>
    </div>

    


      </div>


        </div>
      </div>
    </>
  );
}































// import './InformacoesAnuncio.css'
// import Cabecalho from '../../components/Cabecalho/Cabecalho'
// import { useParams } from "react-router-dom";


// function InformacoesAnuncio() {
//   const { id} = useParams();
//   return (
//     <>
//       <Cabecalho />
//       <div className='wrapper-anuncio'>


//         <div className='cntnr-esquerda-infos-anuncio'>
//           <div className='containerpai-inputs-fotos'>

//             <div className='linha-um'>
//               <div className="container-input-foto"></div>
//               <div className="container-input-foto"></div>
//             </div>

//             <div className='linha-dois'>
//               <div className="container-input-foto"></div>
//               <div className="container-input-foto"></div>
//             </div>

//           </div>
//         </div>

//         <div className='cntnr-direita-infos-anuncio'>
//           <form className='form-inputs-criar-anuncio'>
            
//             <div className='ctnr-zxlj'>
//               <label htmlFor="titulo-anuncio">Titulo do Anuncio</label>
//               <input type="text" />
//             </div>

//             <div className='ctnr-zxlj' >
//               <label htmlFor="titulo-anuncio">Descrição</label>
//               <textarea type="text" />
//             </div>

//             <div className='ctnr-zxlj' >
//               <label htmlFor="titulo-anuncio">Titulo do anuncio</label>
//               <input type="text" />
//             </div>

//             <div className='ctnr-zxlj' >
//               <label htmlFor="titulo-anuncio">Tipo do imóvel</label>
//               <input type="text" />
//             </div>

//             <div className='ctnr-zxlj' >
//               <label htmlFor="titulo-anuncio">Tipo do imóvel</label>
//               <input type="text" />
//             </div>

//             <div className='ctnr-zxlj' >
//               <label htmlFor="titulo-anuncio">Tipo do imóvel</label>
//               <input type="text" />
//             </div>

//           </form>
//         </div>
//       </div>
//     </>

//   )
// }

// export default InformacoesAnuncio