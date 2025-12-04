import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext.jsx";
import axios from 'axios';
import React from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const navigate = useNavigate();
 const { usuario, setUsuario } = useContext(GlobalContext);




  const logar = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        senha
      });

      setMensagem(response.data.message);
      setUsuario(response.data.usuario);
      alert("Usuario logado!")
      navigate('/')

    } catch (error) {
      if (error.response) {
        setMensagem(error.response.data.message || 'Erro ao fazer login');
      } else {
        setMensagem('Erro de conexão com o servidor');
      }
    }
  };

  return (
    <div className='corpo-login'>

      <div className='container-esquerda'>
        <img src="./image/AlugImag.png" alt="Logo Alug" className="logo" />

      </div>

      <div className='container-direita'>
        <form onSubmit={logar} className='formulario-login'>
          <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{mensagem}</p>
          <div className='container-input'>
            <label className='labels-cadastro'>E-mail</label>
            <input
              type="email"
              className='inputs-login'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='container-input'>
            <label className='labels-cadastro'>Senha</label>
            <input
              type="password"
              className='inputs-login'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button type="submit" className='botao-criarconta'>Entrar</button>

          <Link to="/cadastro" className='link-cadastro-login'>
          Ainda não tenho conta
            </Link>

        </form>

      </div>
    </div>


  )
}

export default Login