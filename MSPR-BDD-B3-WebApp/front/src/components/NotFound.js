import logo from '../assets/images/logo.png'

function NotFound(){
    return (
        <div className="body">
            <div className=" align-items-center justify-content-center" style={{ margin: "10em" }}>
                <div className="alert alert-danger" role="alert">
                    <div className=" d-flex align-items-center justify-content-center">
                        <p>
                            <b>
                                <u>
                                    <h1 className=" d-flex align-items-center justify-content-center">
                                        ERROR 404:
                                    </h1>
                                    <h1 className=" d-flex align-items-center justify-content-center">
                                        <br /> CETTE PAGE N'EXISTE PAS
                                    </h1>
                                </u>
                            </b>
                        </p>
                    </div>
                    <div className=" d-flex align-items-center justify-content-center">
                        <img src={logo} alt="logo" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NotFound;