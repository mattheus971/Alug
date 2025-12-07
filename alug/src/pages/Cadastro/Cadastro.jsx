import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios'
import React from 'react'
import './Cadastro.css'

function Cadastro() {
  const [nomeCad, setCadNome] = useState('')
  const [emailCad, setCadEmail] = useState('')
  const [senhaCad, setCadSenha] = useState('')
  const [telefoneCad, setCadTelefone] = useState('')
  const [dataNascimento, setCadDataNasc] = useState('')
  const [urlImagem, setCadUrlImagem] = useState('')
  const [mensagem, setMensagem] = useState('')

  const navigate = useNavigate()

  const Cadastrar = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/usuario', {
        nome: nomeCad,
        email: emailCad,
        senha: senhaCad,
        telefone: telefoneCad,
        data_nascimento: dataNascimento,
        url_imagem: urlImagem
      })

      setMensagem('✅ Usuário cadastrado com sucesso!')


      setCadNome('')
      setCadEmail('')
      setCadSenha('')
      setCadTelefone('')
      setCadDataNasc('')
      setCadUrlImagem('')

      navigate('/login')


    } catch (error) {
      console.error(error)
      setMensagem('❌ Erro ao cadastrar usuário')
    }
  }

  return (
    <div className='corpo-cadastro'>

      <div className='container-esquerda'>
        <img src="./image/AlugImag.png" alt="Logo Alug" className="logo" />
      </div>

      <div className='container-direita'>
        <form onSubmit={Cadastrar} className='formulario-cadastro'>
          <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{mensagem}</p>
          <div className='container-input'>
            <label className='labels-cadastro'>Nome</label>
            <input
              type="text"
              className='inputs-cadastro'
              value={nomeCad}
              onChange={(e) => setCadNome(e.target.value)}
            />
          </div>

          <div className='container-input'>
            <label className='labels-cadastro'>E-mail</label>
            <input
              type="email"
              className='inputs-cadastro'
              value={emailCad}
              onChange={(e) => setCadEmail(e.target.value)}
            />
          </div>

          <div className='container-input'>
            <label className='labels-cadastro'>Telefone</label>
            <input
              type="tel"
              className='inputs-cadastro'
              value={telefoneCad}
              onChange={(e) => setCadTelefone(e.target.value)}
            />
          </div>

          
          <div className='container-input'>
            <label className='labels-cadastro'>Senha</label>
            <input
              type="date" 
              className='inputs-cadastro'
              value={dataNascimento}
              onChange={(e) => setCadDataNasc(e.target.value)}
            />
          </div>

          <div className='container-input'>
            <label className='labels-cadastro'>Senha</label>
            <input
              type="password"
              className='inputs-cadastro'
              value={senhaCad}
              onChange={(e) => setCadSenha(e.target.value)}
            />
          </div>


          <button className='botao-criarconta' type="submit">Criar conta</button>

          <Link to="/login" className='link-cadastro-login'>Já tenho uma conta</Link>
        </form>

      </div>
    </div>


  )
}

export default Cadastro