import React from 'react'

function NavBarOne() {
    return (
        <nav className="navbar navbar-default navbar-fixed-top" >
            <div className="container-fluid">

                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle Navigation</span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar" ></span>
                </button>

                <a className="navbar-brand" href="#">ShopNinja <span className="glyphicon glyphicon-shopping-cart" style={{color:'steelblue'}}></span></a>

                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right" >
                        <li className="active"><a href="#">Home</a></li>

                        <li className="dropdown"><a href="#" className="dropdown-toggle" data-toggle="dropdown">Courses<b className="caret"></b></a>

                            <ul className="dropdown-menu">
                                <li className="dropdown-header">Programming Languages</li>
                                <li><a href="#">C</a></li>
                                <li><a href="#">C++</a></li>
                                <li><a href="#">Java</a></li>
                                <li className="dropdown-header">Frameworks</li>
                                <li><a href="#">BootStrap</a></li>
                                <li><a href="#">React JS</a></li>
                            </ul>
                        </li>



                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#" data-toggle="modal" data-target="#MyModal" ><span className="glyphicon glyphicon-user" ></span> About Us</a></li>
                    </ul>
                </div>


            </div>
        </nav>
    )
}

export default NavBarOne
