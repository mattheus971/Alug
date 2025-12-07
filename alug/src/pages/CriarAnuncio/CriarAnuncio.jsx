import React, { useState, useContext } from "react";
import axios from "axios";
import {  useNavigate } from 'react-router-dom';
import { UsuarioContext } from "../../context/UsuarioContext.jsx";
import "./CriarAnuncio.css";

function CriarAnuncio() {
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [area, setArea] = useState("");
  const [quartos, setQuartos] = useState("");
  const [banheiros, setBanheiros] = useState("");
  const [mobilia, setMobilia] = useState("");
  const [numeroGaragem, setNumeroGaragem] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [cep, setCep] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagens, setImagens] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const { usuario } = useContext(UsuarioContext); 
  const navigate = useNavigate();

  const buscarCep = async () => {
    if (cep.length !== 9) {
      alert("Digite um CEP válido");
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        alert("CEP não encontrado");
        return;
      }

      setRua(response.data.logradouro);
      setBairro(response.data.bairro);
      setCidade(response.data.localidade);
      setEstado(response.data.uf);
    } catch (error) {
      alert("Erro ao buscar o CEP");
      console.error(error);
    }
  };

  const CriarAnuncioFunc = async (event) => {
    event.preventDefault();

    if (!usuario) {
      alert("Faça login antes de criar um anúncio");
      return;
    }

    try {
      const imovelResponse = await axios.post("http://localhost:3000/imoveis", {
        titulo,
        tipo,
        area,
        quartos,
        banheiros,
        mobilia,
        numero_garagem: numeroGaragem,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        cep,
        descricao,
        preco,
        usuario_id: usuario.id_usuario, // pega do Context
      });

      const imovelId = imovelResponse.data.id_imoveis;

      for (let i = 0; i < imagens.length; i++) {
        const formData = new FormData();
        formData.append("imovel_id", imovelId);
        formData.append("url_imagem", imagens[i]);

        await axios.post("http://localhost:3000/imagens", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setMensagem("✅ Imóvel cadastrado com sucesso!");
        navigate("/");
    } catch (error) {
      console.error(error);
      setMensagem("❌ Erro ao cadastrar imóvel");
    }
  };





  return (
    <div className='corpo-criaranuncio'>
      <div className='container-esquerda'>
        <img src="./image/AlugImag.png" alt="" />
      </div>

      <div className='container-direita'>
        <form onSubmit={CriarAnuncioFunc} className='formulario-Crianuncio'>
    <div className='container-input'>
  <label>Imagens (máx. 4)</label>
  <input
    className='inputs-Crianuncio'
    type="file"
    multiple
    onChange={(e) => {
      const files = Array.from(e.target.files);
      if (files.length > 4) {
        alert("Você só pode adicionar até 4 imagens!");
        return;
      }
      setImagens(files);
      console.log(files)
    }}
  />
  <div className="preview-imagens">
    {imagens && imagens.map((img, index) => (
      <img
        key={index}
        src={URL.createObjectURL(img)}
        alt={`Preview ${index}`}
      />
    ))}
  </div>
</div>

          <div className='container-input'>
            <label>Título do Anúncio</label>
            <input
              type="text"
              className='inputs-Crianuncio'
              placeholder="Casa na Frente da Praia"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className='container-input'>
            <label>Tipo de imóvel</label>
            <select
              value={tipo}
              className='inputs-Crianuncio'
              onChange={(e) => setTipo(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              <option value="Casa">Casa</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Kitnet">Kitnet</option>
            </select>
          </div>

          <div className='container-input'>
            <label>Tamanho (m²)</label>
            <input
              type="number"
              className='inputs-Crianuncio'
              placeholder="Ex: 85"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>

          <div className='container-input'>
            <label>Quartos</label>
            <input
              type="number"
              className='inputs-Crianuncio'
              value={quartos}
              onChange={(e) => setQuartos(e.target.value)}
              required
            />
          </div>

          <div className='container-input'>
            <label>Banheiros</label>
            <input
              type="number"
              className='inputs-Crianuncio'
              value={banheiros}
              onChange={(e) => setBanheiros(e.target.value)}
              required
            />
          </div>

          <div className='container-input'>
            <label>Possui mobília?</label>
            <select
              value={mobilia}
              className='inputs-Crianuncio'
              onChange={(e) => setMobilia(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>

          <div className='container-input'>
            <label>Vagas na garagem</label>
            <input
              type="number"
              className='inputs-Crianuncio'
              value={numeroGaragem}
              onChange={(e) => setNumeroGaragem(e.target.value)}
            />
          </div>

          <div className='container-input'>
            <label>CEP</label>
            <input
              type="text"
              className='inputs-Crianuncio'
              placeholder="Ex: 88000-000"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              onBlur={buscarCep}
            />
          </div>

          <div className='container-input'>
            <label>Rua</label>
            <input
              type="text"
              value={rua}
              className='inputs-Crianuncio'
              onChange={(e) => setRua(e.target.value)}
            />
          </div>

          <div className='container-input'>
            <label>Bairro</label>
            <input
              type="text"
              value={bairro}
              className='inputs-Crianuncio'
              onChange={(e) => setBairro(e.target.value)}
            />
          </div>

          <div className='container-input'>
            <label>Cidade</label>
            <input
              type="text"
              value={cidade}
              className='inputs-Crianuncio'
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>

          <div className='container-input'>
            <label>Estado</label>
            <input
              type="text"
              value={estado}
              className='inputs-Crianuncio'
              onChange={(e) => setEstado(e.target.value)}
            />
          </div>

          <div className='container-input'>
            <label>Número</label>
            <input
              type="text"
              value={numero}
              className='inputs-Crianuncio'
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>

          <div className='container-input'>
            <label>Preço (R$)</label>
            <input
              type="number"
              value={preco}
              className='inputs-Crianuncio'
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </div>

          <div className='container-input'>
            <label>Descrição</label>
            <textarea
              placeholder="Fale sobre o imóvel..."
              value={descricao}
              className='inputs-Crianuncio'
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{mensagem}</p>

          <button 
          type="submit" 
          className='botao-criarconta'>Cadastrar Imóvel</button>
        </form>
      </div>
    </div>
  );
}

export default CriarAnuncio;











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
//               <input
//               type="text"
//               className='inputs-Crianuncio'
//               placeholder="Casa na Frente da Praia"
//               value={titulo}
//               onChange={(e) => setTitulo(e.target.value)}
//               required
//               />
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




// .wrapper-anuncio {
//     display: flex;
//     width: 100%;
//     justify-content: center;
// }


// .cntnr-direita-infos-anuncio {
//     width: 40%;
//     padding: 10px;
//     box-sizing: border-box;
//     display: flex;
//     justify-content: center;
// }

// .cntnr-esquerda-infos-anuncio {
//     display: flex;
//     justify-content: center;
//     padding: 20px;
// }

// .cntnr-esquerda-infos-anuncio {
//     background-color: rgb(255, 255, 255);
//     display: flex;
//     gap: 10px;
//     width: 40%;
// }

// .cntnr-direita-infos-anuncio {
//     background-color: rgb(255, 255, 255);
// }

// .containerpai-inputs-fotos {
//     display: flex;
//     flex-direction: column;
//     gap: 20px;
//     justify-content: center;
//     align-items: center;

// }

// .container-input-foto {
//     background-color: rgb(0, 89, 255);
//     width: 300px;
//     height: 300px;
//     aspect-ratio: 1;
//     border-radius: 8px;
// }




// .linha-um {
//     display: flex;
//     flex-direction: row;
//     gap: 20px;

// }

// .linha-dois {
//     display: flex;
//     flex-direction: row;
//     gap: 20px;
// }

// .form-inputs-criar-anuncio {
//     width: 100%;
//     min-height: 300px;
//     background-color: white;
//     border-radius: 8px;
// }

// .form-inputs-criar-anuncio {
//     display: flex;
//     flex-direction: column;
//     gap: 20px;
//     align-items: center;
// }

// .ctnr-zxlj {
//     display: flex;
//     flex-direction: column;
//     width: 100%;
//     gap: 4px;
// }

// .ctnr-zxlj input {
//     border: solid 1px rgb(184, 184, 184);
//     border-radius: 8px;
//     padding: 8px;
// }

// .ctnr-zxlj textarea {
//     border: solid 1px rgb(184, 184, 184);
//     width: 100%;
//     max-width: 100%;
//     border-radius: 8px;
//     padding: 12px;
// }

// @media (max-width: 768px) {

//     .wrapper-anuncio {
//         flex-direction: column;
//     }

//     .cntnr-esquerda-infos-anuncio {
//         background-color: rgb(255, 255, 255);
//         display: flex;
//         gap: 10px;
//         width: 100%;
//     }

//     .cntnr-direita-infos-anuncio{
//         width: 100%;
//         padding: 20px;
//     }

//     .container-input-foto {
//         background-color: rgb(0, 89, 255);
//         width: 170px;
//         height: 170px;
//         aspect-ratio: 1;
//     }

//     .form-inputs-criar-anuncio {
//         width: 100%;
//     }


// }