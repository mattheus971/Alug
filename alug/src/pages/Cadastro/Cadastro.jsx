import './Cadastro.css'

function Cadastro() {
  return (
    <div className='corpo-cadastro'>

      <div className='container-esquerda'>
        Conteudo container esquerda
      </div>

      <div className='container-direita'>
        <form action="">
          <div className='container-input'>
            <label>Nome</label>
            <input type="text" />
          </div>

          <div className='container-input'>
            <label>Email</label>
            <input type="email" />
          </div>

          <div className='container-input'>
            <label>Senha</label>
            <input type="password" />
          </div>

          <button>Criar</button>

        </form>

      </div>
    </div>


  )
}

export default Cadastro