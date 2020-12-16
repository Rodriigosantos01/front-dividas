import Modal from 'react-bootstrap/Modal';

const ModalDelete = ({ hideModal, status, deleteDivida }) => {
    return (
        <Modal
            size="mg"
            show={status}
            onHide={hideModal}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Divida
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                Deseja realmente deletar essa divida?
            </Modal.Body>
            <Modal.Footer>
                <button type="buttom" className="btn btn-outline-primary" onClick={hideModal}>Não</button>
                <button type="buttom" className="btn btn-primary" onClick={deleteDivida}>Sim</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDelete;