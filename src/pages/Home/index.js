import { useEffect, useState } from 'react';
import moment from 'moment';

import Spinner from '../../components/Spinner';
import ModalDelete from './ModalDelete';
import ModalDivida from './Modal';
import ModalUsuario from './ModalCliente';

import { getAllUsers } from '../../controller/User'; //Controller para buscar todos os usuarios da API
import { getAllDividas, createDivida, deleteDivida, updateDivida } from '../../controller/Dividas'; //Controller das dividas

const Home = () => {
    //Variaveis de inicialização
    const [users, setUsers] = useState([]);
    const [dividas, setDividas] = useState([]);
    const [dividasFiltered, setDividasFiltered] = useState([]);
    const [userSelected, setUserSelected] = useState([]);
    const [dividaSelected, setDividaSelected] = useState(false);
    const [statusModalDelete, setStatusModalDelete] = useState(false);
    const [statusModalDivida, setStatusModalDivida] = useState(false);
    const [statusModalUser, setStatusModalUser] = useState(false);

    useEffect(() => {
        getAll();
    }, []);

    //Função para buscar usuarios e dividas
    const getAll = async () => {
        const usersAPI = await getAllUsers();
        setUsers(usersAPI);

        const dividasAPI = await getAllDividas();

        //Aqui eu faço um MAP para colocar dados do usuario junto com as dividas, isso é usado para o filtro
        const allDividas = dividasAPI.map(dividas => {
            const user = usersAPI.filter(user => user.id === dividas.user);
            dividas.userData = user;
            return dividas;
        })
        setDividas(allDividas);
        setDividasFiltered(allDividas);
    }

    //Função para abrir modal de visualizar dados do cliente
    const viewDadosUser = (user) => {
        setStatusModalUser(true);
        setUserSelected(user);
    }

    const filterCliente = (id) => {
        let dividaFiltered = '';
        if (id === 0) {
            dividaFiltered = dividas;
        } else {
            dividaFiltered = dividas.filter((divida) => (
                divida.user === id
            ))
        }

        setDividasFiltered(dividaFiltered);
    }

    //Filtro de dividas pelo nome do usuario
    const searchDivida = (e) => {
        const value = e.target.value;
        const dividaFiltered = dividas.filter((divida) => {
            const motivo = divida.motivo;

            return motivo.toLowerCase().includes(value.toLowerCase())
        })

        setDividasFiltered(dividaFiltered);
    }

    //Abrir modal para confirmar se vai deletar divida
    const showModalDelete = (divida) => {
        setStatusModalDelete(true);
        setDividaSelected(divida)
    }

    //Abrir modal de cadastrar/editar divida
    const showModal = (divida = false) => {
        if (divida)
            setDividaSelected(divida);

        setStatusModalDivida(true);
    }

    //função para salvar/editar divida
    const save = async (divida, id = 0) => {
        if (id !== 0) {
            const result = await updateDivida(id, divida);
            if (result.error) {
                alert(result.error);
            } else {
                hideModal();
                getAll();
            }
        } else {
            const result = await createDivida(divida);
            if (result.error) {
                alert(result.error);
            } else {
                hideModal();
                getAll();
            }
        }

    }

    //Função para deletar divida no banco
    const delDivida = async (e) => {
        e.stopPropagation();

        const result = await deleteDivida(dividaSelected._id);
        if (result.error) {
            alert(result.error);
        } else {
            hideModal();
            getAll();
        }

        hideModal();
    }

    //Função para fechar modais, e setar como false a divida selecionada
    const hideModal = () => {
        setStatusModalUser(false)
        setStatusModalDelete(false);
        setStatusModalDivida(false)
        setDividaSelected(false)
        setUserSelected(false)
    }

    return (
        <div className="row">
            <ModalDivida status={statusModalDivida} hideModal={hideModal} saveDivida={save} divida={dividaSelected} users={users} />
            <ModalDelete hideModal={hideModal} status={statusModalDelete} deleteDivida={delDivida} />
            <ModalUsuario status={statusModalUser} hideModal={hideModal} user={userSelected} />
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-3">
                        {
                            !users ?
                                <Spinner />
                                :
                                <ul className="list-group">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <span className="btn btn-outline-dark" onClick={() => filterCliente(0)}>
                                            <small>Listar todos</small>
                                        </span>
                                        <span className="btn btn-outline-dark">
                                            {
                                                dividas.reduce((acc, score) => {
                                                    return acc + score.valor;
                                                }, 0).toFixed(2)
                                            }
                                        </span>
                                    </li>
                                    {
                                        users.map((user) => {
                                            const valor = dividas.filter(dividas => {
                                                return dividas.user === user.id
                                            }).reduce((acc, score) => {
                                                return acc + score.valor;
                                            }, 0);

                                            return (
                                                <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span className="btn btn-outline-dark" onClick={() => filterCliente(user.id)}>
                                                        <small>{user.name}</small>
                                                    </span>
                                                    <span>
                                                        <button className="btn btn-outline-dark" disabled>
                                                            {valor.toFixed(2)}
                                                        </button>

                                                        <button className="btn btn-outline-dark" onClick={() => viewDadosUser(user)}>
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                    </span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                        }
                    </div>
                    <div className="col-md-8">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">
                                Motivo:
                                <input className="form-control" type="text" onKeyUp={searchDivida} />
                                <button className="btn btn-outline-success" onClick={showModal}>
                                    ADD
                                </button>
                            </div>
                        </nav>
                        <div className="col-md-12 border mt-1">
                            {
                                !dividas.length ?
                                    <Spinner />
                                    :
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Usuario</th>
                                                <th scope="col">Data</th>
                                                <th scope="col">Motivo</th>
                                                <th scope="col">Valor</th>
                                                <th scope="col">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dividasFiltered.map((divida, index) => {
                                                    const user = divida.userData[0];
                                                    const { name } = user;

                                                    return (
                                                        <tr key={divida._id}>
                                                            <th scope="col">{index}</th>
                                                            <th scope="col">{name}</th>
                                                            <th scope="col">
                                                                {moment(divida.data).format('DD/MM/YYYY')}
                                                            </th>
                                                            <th scope="col">
                                                                {divida.motivo}
                                                            </th>
                                                            <th scope="col">{divida.valor.toFixed(2)}</th>
                                                            <th scope="col">
                                                                <button className="btn btn-outline-warning"
                                                                    onClick={() => showModal(divida)}
                                                                >
                                                                    <i className="fas fa-edit"></i>
                                                                </button>
                                                                <button className="btn btn-outline-danger"
                                                                    onClick={() => showModalDelete(divida)}
                                                                >
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                            </th>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;