import {Button, Form, Input, Logo, StyledLink} from '../../components/Form'
import Container from '../../components/Container'
import api from '../../services/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {

    const navigate = useNavigate()
    const [signupForm, setSignupForm] = useState({
        name:'',
        email:'',
        password:'',
        repeatPassword:''
    })

    function changeSignUp(e) {
        setSignupForm({...signupForm, [e.target.name]: e.target.value})
    }

    function submitSignUp(e) {
        e.preventDefault()

        const promise = api.register({...signupForm})
        promise.then((res) => {
            res.status(201).send('OK')
            navigate('/')
        })
        promise.catch((err) => {
            if (err.response.status === 409) {
                alert(err.response.data)
            }
            if (err.response.status === 422) {
                alert('Preencha os dados corretamente')
            }
            console.log(err.message)
        })
    }

    return (
    <Container>
        <Logo>MyWallet</Logo>
        <Form onSubmit={submitSignUp}>
            <Input 
            name='name'
            type={'text'}
            placeholder="Nome"
            onChange={changeSignUp}
            value={signupForm.name}
            required>
            </Input>

            <Input 
            name='email'
            type={'email'}
            placeholder="E-mail"
            onChange={changeSignUp}
            value={signupForm.email}
            required>
            </Input>

            <Input 
            name='password'
            type={'password'}
            placeholder="Senha"
            onChange={changeSignUp}
            value={signupForm.password}
            required>
            </Input>

            <Input 
            placeholder="Confirme a senha"
            name='repeatPassword'
            type={'password'}
            onChange={changeSignUp}
            value={signupForm.repeatPassword}
            required>
            </Input>

            <Button type={'submit'} >Cadastrar</Button>
        </Form>
        <StyledLink to='/'>Já tem um conta? Entre agora!</StyledLink>
    </Container>
    )
};
