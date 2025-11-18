import './Login.css'

function Login() {
    return (
      <div className='corpo-cadastro'>
  
        <div className='container-esquerda'>
          <h1>Conteúdo Login</h1>
        </div>
  
        <div className='container-direita'>
          <form action="" className='formulario-login'>  
            <div className='container-input'>
              <label className='labels-login'>Email</label>
              <input type="email" className='inputs-login'/>
            </div>
  
            <div className='container-input'>
              <label className='labels-login'>Senha</label>
              <input type="password" className='inputs-login'/>
            </div>
  
            <button className='botao-criarconta'>Criar conta</button>
  
            <a href="">Ainda não tenho conta</a>
          </form>
  
        </div>
      </div>
  
  
    )
  }

export default Login