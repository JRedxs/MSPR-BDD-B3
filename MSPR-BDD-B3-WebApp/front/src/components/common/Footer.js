import React from "react";
import '../../styles/Footer.css'


const Footer = () => {
    return(
        <footer
                className="text-center text-lg-start text-white position-relative"
                style={{backgroundColor: "#929fba", clear:"both", marginBottom:"0", bottom:"0",position:'absolute', width:'100%'}}
        >
        <div className="container p-4 pb-0">
        <section className="">
            <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                    Company name
                </h6>
                <p>
                    MSPR BDD DEV B3
                </p>
            </div>
            <hr className="w-100 clearfix d-md-none" />
            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 class="text-uppercase mb-4 font-weight-bold">Products</h6>
            <p>
              <a class="text-white">MDBootstrap</a>
            </p>
            <p>
              <a class="text-white">MDWordPress</a>
            </p>
            <p>
              <a class="text-white">BrandFlow</a>
            </p>
            <p>
              <a class="text-white">Bootstrap Angular</a>
            </p>
          </div>
            <hr className="w-100 clearfix d-md-none" />
            <hr className="w-100 clearfix d-md-none" />
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 class="text-uppercase mb-4 font-weight-bold">Contact</h6>
                <p><i class="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                <p><i class="fas fa-envelope mr-3"></i> info@gmail.com</p>
                <p><i class="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                <p><i class="fas fa-print mr-3"></i> + 01 234 567 89</p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>
                <a
                    className="btn btn-primary btn-floating m-1"
                    style={{backgroundColor: "#3b5998"}}
                    href="#!"
                    role="button"
                >
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a
                    className="btn btn-primary btn-floating m-1"
                    style={{backgroundColor: "#55acee"}}
                    role="button"
                    
                >
                    <i className="fab fa-twitter"></i>
                </a>
                <a
                    className="btn btn-primary btn-floating m-1"
                    style={{backgroundColor: "#dd4b39"}}
                    role="button"
                >
                    <i className="fab fa-google"></i>
                </a>
                <a
                    className="btn btn-primary btn-floating m-1"
                    style={{backgroundColor: "#ac2bac"}}
                    role="button"
                >
                    <i className="fab fa-instagram"></i>
                </a>
                <a
                    className="btn btn-primary btn-floating m-1"
                    style={{backgroundColor: "#0082ca"}}
                    role="button"
                >
                    <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                    className="btn btn-primary btn-floating m-1"
                    style={{backgroundColor: "#333333"}}
                    role="button"
                >
                    <i className="fab fa-github"></i>
                </a>
                </div>
            </div>
        </section>
            </div>
                    <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                        <b>© 2020 Copyright:  <a className="text-white"> MDBootstrap.com</a></b>
                    </div>
        </footer>    
    )
}
export default Footer