import img from "../../assets/img/image-not-found.png"
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <main>
                <div class="container mt-5 border">
                    <div class="row">
                        <div class="col-md-6 align-self-center">
                            <img src={img} alt="" />
                        </div>
                        <div class="col-md-6 align-self-center">
                            <h1>404</h1>
                            <h2>UH OH! Você está perdido.</h2>
                            <p>
                                A página que você está procurando não existe. Como você chegou aqui é um mistério. Mas você pode clicar no botão abaixo para voltar à página inicial.
                            </p>
                            <Link to="/home" class="btn green">VOLTAR</Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default NotFound;