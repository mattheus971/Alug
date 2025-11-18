import './Cadastro.css'

function Cadastro() {
  return (
    <div className='corpo-cadastro'>

      <div className='container-esquerda'>
        <h1>Conteúdo Cadastro</h1>
      </div>

      <div className='container-direita'>
        <form action="" className='formulario-cadastro'>
          <div className='container-input'>
            <label className='labels-cadastro'>Nome</label>
            <input type="text" className='inputs-cadastro' />
          </div>

          <div className='container-input'>
            <label className='labels-cadastro'>Email</label>
            <input type="email" className='inputs-cadastro' />
          </div>

          <div className='container-input'>
            <label className='labels-cadastro'>Senha</label>
            <input type="password" className='inputs-cadastro' />
          </div>

          <button className='botao-criarconta'>Criar conta</button>

          <a href="">Já tenho uma conta</a>
        </form>

      </div>
    </div>


  )
}

export default Cadastro