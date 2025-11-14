import React from 'react'
import './BotaoPadrao.css'

function BotaoPadrao({textoBotao}) {
  return (
    <div>
        <button>{textoBotao}</button>
    </div>
  )
}

export default BotaoPadrao