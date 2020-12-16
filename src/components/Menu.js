import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to="/home" className="navbar-brand">Home</Link>
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">

                        <li className="nav-item">
                            <Link to="/logout" className="nav-link">Sair</Link>
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    );
}

export default Menu;