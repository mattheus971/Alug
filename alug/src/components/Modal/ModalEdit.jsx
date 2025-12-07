import React, { useState } from "react";
import "./ModalEdit.css";

function ModalEdit({ campo, valorInicial, onSalvar, onCancelar }) {
  const [valor, setValor] = useState(valorInicial);

  // Define o tipo do input conforme o campo
  const tipoInput = (() => {
    if (campo === "senha") return "password";
    if (campo === "data_nascimento") return "date";
    if (campo === "telefone") return "tel";
    return "text";
  })();

  return (
    <div className="modal-fundo">
      <div className="modal-conteudo">
        <h3>Editar {campo}</h3>
        <input
          type={tipoInput}
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <div className="botoes-modal">
          <button onClick={() => onSalvar(valor)}>Salvar</button>
          <button onClick={onCancelar}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalEdit;
