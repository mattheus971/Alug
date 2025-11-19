import AlugImg from '../../components/image/AlugImag.png';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios'
import React from 'react'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');



  const Logar = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        senha
      });

      setMensagem(response.data.message);
      console.log('Usuário logado:', response.data.usuario);


    } catch (error) {
      if (error.response) {
        setMensagem(error.response.data.message || 'Erro ao fazer login');
      } else {
        setMensagem('Erro de conexão com o servidor');
      }
    }
  };

  return (
    <div className='corpo-cadastro'>

      <div className='container-esquerda'>
      <img src={AlugImg} alt="Logo Alug" className="logo" />
      
      </div>

      <div className='container-direita'>
        <form onSubmit={Logar} className='formulario-login'>
          <div className='container-input'>
            <label htmlFor="">E-mail</label>
            <input
              type="E-mail"
              className='inputs-login'
              placeholder='usuario@gmail.com'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='container-input'>
            <label htmlFor="">Senha</label>
            <input
              type="password"
              className='inputs-login'  
              placeholder='123456789'
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{mensagem}</p>

          <button type="submit" className='botao-criarconta'>Criar conta</button>

          <Link to="/cadastro">Ainda não tenho conta</Link>

        </form>

      </div>
    </div>


  )
}

export default Login