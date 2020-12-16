import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const ModalDivida = ({ status, hideModal, saveDivida, divida, users }) => {
    //Variaveis de inicialização
    const [id, setId] = useState("");
    const [cliente, setCliente] = useState("");
    const [motivo, setMotivo] = useState('');
    const [valor, setValor] = useState('');
    const [date, setDate] = useState();

    //setar os valores caso for editar uma divida
    useEffect(() => {
        setId(divida._id);
        setCliente(divida.user)
        setMotivo(divida.motivo);
        setValor(divida.valor);
        setDate(divida.data);

    }, [divida]);

    //função para alterar cliente
    const handleCliente = (e) => {
        setCliente(e.target.value);
    }

    //função para alterar motivo
    const handleMotivo = (e) => {
        setMotivo(e.target.value);
    }

    //função para alterar valor
    const handleValue = (e) => {
        setValor(e.target.value);
    }

    //função para alterar data
    const handleDate = (e) => {
        setDate(e.target.value);
    }

    //função para enviar dados para salvar/editar
    const save = (e) => {
        e.preventDefault();
        const dividaCompleted = {
            user: cliente,
            motivo,
            valor,
            data: date
        };

        saveDivida(dividaCompleted, id);
        resetForm();
    }

    //função para resetar formulario
    const resetForm = () => {
        setId(0);
        setCliente('');
        setMotivo('');
        setValor('');
        setDate('');
    }

    //função pra quando fechar a modal tbm resetar o formulario
    const fecharModal = () => {
        hideModal();
        resetForm();
    }

    return (
        <Modal
            size="mg"
            show={status}
            onHide={fecharModal}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Despesa
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={save}>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="titulo">Cliente</label>
                                <select className="form-control" defaultValue={cliente} value={cliente} onChange={handleCliente} required>
                                    <option value="">Selecione um cliente</option>
                                    {!users ? "" :
                                        users.map(user => (<option key={user.id} value={user.id}>{user.name}</option>))
                                    }
                                </select>

                                <label htmlFor="descricao">Motivo</label>
                                <input type="text" className="form-control" id="descricao" value={motivo} onChange={handleMotivo} minLength="3" required />

                                <label htmlFor="valor">Valor</label>
                                <input type="number" step="any" className="form-control" id="valor" value={valor} onChange={handleValue} min="0" required />

                                <label htmlFor="data">Data</label>
                                <input type="date" className="form-control" id="data" value={date} onChange={handleDate} required />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <span className="btn btn-outline-primary" onClick={hideModal}>Fechar</span>
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalDivida;