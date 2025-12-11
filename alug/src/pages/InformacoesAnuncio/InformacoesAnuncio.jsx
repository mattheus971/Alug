import './InformacoesAnuncio.css'
import Cabecalho from '../../components/Cabecalho/Cabecalho'
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


export default function InformacoesAnuncio() {
  const { id } = useParams();
  const [imovel, setImovel] = useState (null);
  const [imagens, setImagens] = useState ([]);
  const [usuario,setUsuario] = useState (null);
  

    useEffect(() => {
  async function carregarAnuncio() {
    try {
      const respostaImovel = await axios.get(`http://localhost:3000/imoveis/${id}`);
      setImovel(respostaImovel.data);

      const respostaImagens = await axios.get(`http://localhost:3000/imagens/imovel/${id}`);
      setImagens(respostaImagens.data);

      const respostaUsuario = await axios.get(`http://localhost:3000/usuario/${respostaImovel.data.id_usuario}`);
      setUsuario(respostaUsuario.data);

    } catch (err) {
      console.error("Erro ao carregar anúncio:", err);
    }
  }

  carregarAnuncio();
}, [id]);


  if (!imovel) return <p>Carregando...</p>;
  

  return (
    <>
      <Cabecalho />

      <div className="pagina-anuncio">
        <div className="conteudo-anuncio">

          <div className="imagem-anuncio">
    {imagens.map(img => (
        <img className='imagem-do-anuncio-infs' key={img.id_imagem} src={`http://localhost:3000/uploads/${img.url_imagem}`} alt={imovel.titulo} />
    ))}
</div>


          <div className="card-anunciante">
            <h2 className="preco" style={{fontWeight: '500', fontSize: '32px'}}>{imovel.preco} / mês</h2>
            <button className="botao-contato">Entrar em contato</button>
            

            

            <div className="secao-anunciante">
              <hr className="linha-divisoria" />
              
              <p className="titulo-secao">Anunciante</p>
              <div className="foto-anunciante">Foto</div>
              <p className="nome-anunciante">Nome Anunciante</p>
            </div>
          </div>
        </div>

        <div className="info-texto-anuncio">
            <h1 className="titulo-anuncio">{imovel.titulo}</h1>
          <p className="descricao">{imovel.descricao}</p>
        </div>

        <hr className="linha-divisoria" />




        <div className='container-detalhes'>

          <div class="detalhes-container">
            
 <div className="detalhe">
    <span className="titulo">Tipo</span>
    <span className="valor">{imovel.tipo}</span>
</div>

<div className="detalhe">
    <span className="titulo">Tamanho</span>
    <span className="valor">{imovel.area} m²</span>
</div>

<div className="detalhe">
    <span className="titulo">Quartos</span>
    <span className="valor">{imovel.quartos}</span>
</div>

<div className="detalhe">
    <span className="titulo">Banheiros</span>
    <span className="valor">{imovel.banheiros}</span>
</div>

<div className="detalhe">
    <span className="titulo">Mobíliado</span>
    <span className="valor">{imovel.mobilia ? "Sim" : "Não"}</span>
</div>

<div className="detalhe">
    <span className="titulo">Garagens</span>
    <span className="valor">{imovel.numero_garagem}</span>
</div>

<div className="detalhe">
    <span className="titulo">Endereço</span>
    <span className="valor">
        {`${imovel.rua}, ${imovel.numero} - ${imovel.bairro}, ${imovel.cidade} - ${imovel.estado}, ${imovel.cep}`}
    </span>
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