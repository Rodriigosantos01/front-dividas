import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const ModalCliente = ({ status, hideModal, user }) => {
    //Variaveis de inicialização
    const [name, setName] = useState('')
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [website, setWebsite] = useState(user.website)

    //setar os valores caso for editar uma divida
    useEffect(() => {
        setName(user.name)
        setEmail(user.email)
        setPhone(user.phone)
        setWebsite(user.website)
    }, [user]);

    return (
        <Modal
            size="mg"
            show={status}
            onHide={hideModal}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Cliente
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                        Nome: {name}
                    </div>
                    <hr />
                    <div className="col-md-12">
                        Email: {email}
                    </div>
                    <hr />
                    <div className="col-md-12">
                        Telefone: {phone}
                    </div>
                    <hr />
                    <div className="col-md-12">
                        Site: {website}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <span className="btn btn-outline-primary" onClick={hideModal}>Fechar</span>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCliente;