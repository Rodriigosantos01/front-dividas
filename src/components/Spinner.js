const Spinner = () => {
    return (
        <div className="col-md-12 text-center">
            <div className="spinner-grow text-primary ml-2" role="status">
                <span className="visually-hidden"></span>
            </div>
            <div className="spinner-grow text-success ml-2" role="status">
                <span className="visually-hidden"></span>
            </div>
            <div className="spinner-grow text-danger ml-2" role="status">
                <span className="visually-hidden"></span>
            </div>
            <div className="spinner-grow text-warning ml-2" role="status">
                <span className="visually-hidden"></span>
            </div>
            <div className="spinner-grow text-info ml-2" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    );
}

export default Spinner;