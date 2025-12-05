import './InformacoesAnuncio.css'
import Cabecalho from '../../components/Cabecalho/Cabecalho'
import { useParams } from "react-router-dom";


function InformacoesAnuncio() {
  const { id} = useParams();
  return (
    <>
      <Cabecalho />
      <div className='wrapper-anuncio'>


        <div className='cntnr-esquerda-infos-anuncio'>
          <div className='containerpai-inputs-fotos'>

            <div className='linha-um'>
              <div className="container-input-foto"></div>
              <div className="container-input-foto"></div>
            </div>

            <div className='linha-dois'>
              <div className="container-input-foto"></div>
              <div className="container-input-foto"></div>
            </div>

          </div>
        </div>

        <div className='cntnr-direita-infos-anuncio'>
          <form className='form-inputs-criar-anuncio'>
            
            <div className='ctnr-zxlj'>
              <label htmlFor="titulo-anuncio">Titulo do Anuncio</label>
              <input type="text" />
            </div>

            <div className='ctnr-zxlj' >
              <label htmlFor="titulo-anuncio">Descrição</label>
              <textarea type="text" />
            </div>

            <div className='ctnr-zxlj' >
              <label htmlFor="titulo-anuncio">Titulo do anuncio</label>
              <input type="text" />
            </div>

            <div className='ctnr-zxlj' >
              <label htmlFor="titulo-anuncio">Tipo do imóvel</label>
              <input type="text" />
            </div>

            <div className='ctnr-zxlj' >
              <label htmlFor="titulo-anuncio">Tipo do imóvel</label>
              <input type="text" />
            </div>

            <div className='ctnr-zxlj' >
              <label htmlFor="titulo-anuncio">Tipo do imóvel</label>
              <input type="text" />
            </div>

          </form>
        </div>
      </div>
    </>

  )
}

export default InformacoesAnuncio