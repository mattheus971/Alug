import React from 'react'
import InputPadrao from '../InputPadrao/InputPadrao'

function FormularioCadastro() {
    return (
        <div className='container-formulario'>
            <InputPadrao
                label={'Nome'}
                placeholder={'Seu Nome'}
                type='text'
            />

            <InputPadrao
                label={'Email'}
                placeholder={'seuemail@email.com'}
                type='email'
            />

            <InputPadrao
                label={'Senha'}
                placeholder={'suasenha123'}
                type='password'
            />
        </div>
    )
}

export default FormularioCadastro