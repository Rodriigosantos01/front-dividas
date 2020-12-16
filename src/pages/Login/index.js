import { useState } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = () => {
    //Definir variaveis de inicialização
    const [email, setEmail] = useState('rodriigosantos01@gmail.com');
    const [password, setPassword] = useState('123');
    const [token, setToken] = useState(sessionStorage.getItem('token') ?? false);

    //Função para alterar email
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    //Função para alterar senha
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    //Função para enviar dados para o backend
    const submitForm = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://api-dividas.herokuapp.com/auth/authenticate', {
                email,
                password
            }).then(res => {
                //Dados estão corretos
                loginSuccess(res.data.token);
            }).catch((error) => {
                //Erro ao gerar token no backend
                alert("Dados incorretos");
            });

        } catch (error) {
            console.error(error);
        }
    }

    //Função para colocar token no sessionStorage
    const loginSuccess = (token) => {
        sessionStorage.setItem('token', token);
        setToken(token)
        //Aqui mando redirecionar atualizando a página para pegar token da session storage
        window.location.reload();
    }

    return (
        <>
            {/* Caso já estiver logado ou login for realizado com sucesso, redirecionar para tela home */}
            {token ? <Redirect to={{ pathname: '/home' }} /> : ''}
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="col-md-12 mt-5">
                            <form onSubmit={submitForm}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}" value={email} onChange={handleEmail} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Senha</label>
                                    {/* pattern="[a-z]{3,}[0-9]{3,}[!@#$%*()_]{1}" */}
                                    <input type="password" className="form-control" id="password" value={password}
                                        title="A senha deve ter no minimo (3 letras, 3 numeros, 1 caracter especial)"
                                        onChange={handlePassword} required />
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg btn-block">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;