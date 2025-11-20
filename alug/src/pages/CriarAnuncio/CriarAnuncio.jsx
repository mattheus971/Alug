import AlugImg from '../../components/image/AlugImag.png';
import { useState } from 'react'
import axios from 'axios'
import React from 'react'
import './CriarAnuncio.css'
import Cabecalho from '../../components/Cabecalho/Cabecalho';

function CriarAnuncio() {

  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [area, setArea] = useState('');
  const [quartos, setQuartos] = useState('');
  const [banheiros, setBanheiros] = useState('');
  const [mobilia, setMobilia] = useState('');
  const [numeroGaragem, setNumeroGaragem] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cep, setCep] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState(null);      
  const [preview, setPreview] = useState(null);    
  const [mensagem, setMensagem] = useState('');

  const [imagensPreview, setImagensPreview] = useState([]);

  const buscarCep = async () => {
    if (cep.length !== 8) {
      alert('Digite um CEP válido com 8 dígitos');
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        alert('CEP não encontrado');
        return;
      }

      setRua(response.data.logradouro);
      setBairro(response.data.bairro);
      setCidade(response.data.localidade);
      setEstado(response.data.uf);

    } catch (error) {
      alert('Erro ao buscar o CEP');
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) {
      setImagem(null);
      setPreview(null);
      setImagensPreview([]);
      return;
    }

    setImagem(files[0]);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagensPreview(previews);

    setPreview(previews[0] || null);
  };

  const CriarAnuncioFunc = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('titulo', titulo);
    formData.append('tipo', tipo);
    formData.append('area', area);
    formData.append('quartos', quartos);
    formData.append('banheiros', banheiros);
    formData.append('mobilia', mobilia);
    formData.append('numero_garagem', numeroGaragem);
    formData.append('estado', estado);
    formData.append('cidade', cidade);
    formData.append('bairro', bairro);
    formData.append('rua', rua);
    formData.append('numero', numero);
    formData.append('cep', cep);
    formData.append('descricao', descricao);
    formData.append('preco', preco);

    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/imoveis',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setMensagem('✅ Imóvel cadastrado com sucesso!');
      console.log(response.data);

      setTitulo('');
      setTipo('');
      setArea('');
      setQuartos('');
      setBanheiros('');
      setMobilia('');
      setNumeroGaragem('');
      setEstado('');
      setCidade('');
      setBairro('');
      setRua('');
      setNumero('');
      setCep('');
      setDescricao('');
      setPreco('');
      setImagem(null);
      setPreview(null);
      setImagensPreview([]);

    } catch (error) {
      console.error(error);
      setMensagem('❌ Erro ao cadastrar imóvel');
    }
  };

  return (
    
    <div className='corpo-criaranuncio'>
      <Cabecalho />
      
      <div className='container-corpo-criranuncio'>
      <div className='container-titulo'>
        <h1 className='titulo-das-informacoes'>Qual vai ser o titulo do seu anúncio?</h1>
        <input type="text" className='input-titulo' placeholder=''/>
        <div className='container-botoes-voltar-continuar'>
          <button className='botao-voltar-criaranuncio'>Voltar</button>
          <button className='botao-continuar-criaranuncio'>Continuar</button>
        </div>
      </div>

      </div>
      


    </div>
  );


  //Pedro fez para a sprint
  // return (

  //   <div className='corpo-criaranuncio'>

  //     <div className='container-esquerda'>
  //       <img src={AlugImg} alt="Logo Alug" className="logo" />
  //     </div>

  //     <div className='container-direita'>

  //       <form onSubmit={CriarAnuncioFunc} className='formulario-Crianuncio'>

  //         <div className="container-imagens">
  //           <label>Imagens do Imóvel</label>

  //           <input
  //             type="file"
  //             multiple
  //             className="input-file"
  //             onChange={handleFileChange}
  //           />

  //           <div className="preview-container">
  //             {imagensPreview.map((img, index) => (
  //               <div key={index} className="preview-item">
  //                 <img src={img} alt={`preview-${index}`} />
  //               </div>
  //             ))}
  //           </div>
  //         </div>


  //         <div className='container-input'>
  //           <label>Título do Anúncio</label>
  //           <input
  //             type="text"
  //             className='inputs-Crianuncio'
  //             placeholder="Casa na Frente da Praia"
  //             value={titulo}
  //             onChange={(e) => setTitulo(e.target.value)}
  //             required
  //           />
  //         </div>

  //         <div className='container-input'>
  //           <label>Tipo de imóvel</label>
  //           <select
  //             value={tipo}
  //             className='inputs-Crianuncio'
  //             onChange={(e) => setTipo(e.target.value)} required>
  //             <option value="">Selecione...</option>
  //             <option value="Casa">Casa</option>
  //             <option value="Apartamento">Apartamento</option>
  //             <option value="Kitnet">Kitnet</option>
  //           </select>
  //         </div>

  //         <div className='container-input'>
  //           <label>Tamanho (m²)</label>
  //           <input
  //             type="number"
  //             className='inputs-Crianuncio'
  //             placeholder="Ex: 85"
  //             value={area}
  //             onChange={(e) => setArea(e.target.value)}
  //             required
  //           />
  //         </div>

  //         <div className='container-input'>
  //           <label>Quartos</label>
  //           <input
  //             type="number"
  //             className='inputs-Crianuncio'
  //             value={quartos}
  //             onChange={(e) => setQuartos(e.target.value)}
  //             required
  //           />
  //         </div>

  //         <div className='container-input'>
  //           <label>Banheiros</label>
  //           <input
  //             type="number"
  //             className='inputs-Crianuncio'
  //             value={banheiros}
  //             onChange={(e) => setBanheiros(e.target.value)}
  //             required
  //           />
  //         </div>

  //         <div className='container-input'>
  //           <label>Possui mobília?</label>
  //           <select
  //             value={mobilia}
  //             className='inputs-Crianuncio'
  //             onChange={(e) => setMobilia(e.target.value)}>
  //             <option value="">Selecione...</option>
  //             <option value="Sim">Sim</option>
  //             <option value="Não">Não</option>
  //           </select>
  //         </div>

  //         <div className='container-input'>
  //           <label>Vagas na garagem</label>
  //           <input
  //             type="number"
  //             className='inputs-Crianuncio'
  //             value={numeroGaragem}
  //             onChange={(e) => setNumeroGaragem(e.target.value)}
  //           />
  //         </div>

  //         <div className='container-input'>
  //           <label>CEP</label>
  //           <input
  //             type="text"
  //             className='inputs-Crianuncio'
  //             placeholder="Ex: 88000000"
  //             value={cep}
  //             onChange={(e) => setCep(e.target.value)}
  //             onBlur={buscarCep}
  //           />
  //         </div>

  //         <div className='container-input'>
  //           <label>Rua</label>
  //           <input
  //             type="text"
  //             value={rua}
  //             className='inputs-Crianuncio'
  //             onChange={(e) => setRua(e.target.value)}
  //           />
  //         </div>

  //         <div className='container-input'>
  //           <label>Bairro</label>
  //           <input
  //             type="text"
  //             value={bairro}
  //             className='inputs-Crianuncio'
  //             onChange={(e) => setBairro(e.target.value)}
  //           />
  //         </div>

  //         <div className='container-input'>
  //           <label>Cidade</label>
  //           <input
  //             type="text"
  //             value={cidade}
  //             className='inputs-Crianuncio'
  //             onChange={(e) => setCidade(e.target.value)}
  //           />
  //         </div>

  //         <div className='container-input'>
  //           <label>Estado</label>
  //           <input
  //             type="text"
  //             value={estado}
  //             className='inputs-Crianuncio'
  //             onChange={(e) => setEstado(e.target.value)}
  //           />
  //         </div>

  //         <div className='container-input'>
  //           <label>Número</label>
  //           <input
  //             type="text"
  //             value={numero}
  //             className='inputs-Crianuncio'
  //             onChange={(e) => setNumero(e.target.value)}
  //           />
  //         </div>

  //         <div className='container-input'>
  //           <label>Preço (R$)</label>
  //           <input
  //             type="number"
  //             value={preco}
  //             className='inputs-Crianuncio'
  //             onChange={(e) => setPreco(e.target.value)}
  //             required
  //           />
  //         </div>

  //         <div className='container-input'>
  //           <label>Descrição</label>
  //           <textarea
  //             placeholder="Fale sobre o imóvel..."
  //             value={descricao}
  //             className='inputs-Crianuncio'
  //             onChange={(e) => setDescricao(e.target.value)}
  //           />
  //         </div>

  //         <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{mensagem}</p>

  //         <button type="submit" className='botao-criarconta'>Cadastrar Imóvel</button>

  //       </form>
  //     </div>
  //   </div>
  // );
}

export default CriarAnuncio;
