import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Nav } from 'react-bootstrap';
// import { push } from 'connected-react-router';



const DefaultHeader = () => {
  
  const dispatch = useDispatch();

  // const { auth, cart } = useSelector(redux => redux);
  // const onClickLogout = (e) => {
  //     e.preventDefault();
  //     // dispatch(logout());
  //     dispatch(push("/"));
  // }

  const ref = useRef(null);

  const [navExpanded, setNavExpanded] = useState(false);

  useEffect(() => {
      const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
              setNavExpanded(false);
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
  },[]);

    const {isAuth, username} = useSelector(redux => redux.auth);
    console.log("Auth user info ", isAuth);
    return (
    
      <Navbar ref={ref} bg="dark" variant="dark" expand="lg"
      onToggle={setNavExpanded}
      expanded={navExpanded}
  >
      <Container>
          <Link className="navbar-brand" to="/">Авто запчастини</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" onClick={() => setNavExpanded(false)}>
                  <Link className="nav-link active" aria-current="page" to="/">Головна</Link>
              </Nav>
              {/* {!auth.isAuth ? */}
                  <Nav onClick={() => setNavExpanded(false)}>
                      <Link className="nav-link" to="/login">Вхід</Link>
                      <Link className="nav-link" to="/register">Реєструватися</Link>
                  </Nav>
                  {/* :
                  <Nav onClick={() => setNavExpanded(false)}>
                      <Link className="nav-link" to="/cart">
                          <i className="pi pi-shopping-cart" style={{ fontSize: "2rem" }}></i>
                          {cart.count}
                      </Link>
                      <Link className="nav-link" to="/profile">{auth.user.name}</Link>
                      <Link className="nav-link" to="/logout" onClick={onClickLogout}>Вихід</Link>
                  </Nav> */}
              {/* } */}
          </Navbar.Collapse>
      </Container>
  </Navbar>

      // <nav
       
      //   className="navbar navbar-expand-lg navbar-light bg-light"
      // >
      //   <div className="container">
      //     <Link className="navbar-brand" to="/">
      //       Авто запчастини
      //     </Link>
      //     <button
            
      //       className="navbar-toggler"
      //       type="button"
      //       data-bs-toggle="collapse"
      //       data-bs-target="#navbarSupportedContent"
      //       aria-controls="navbarSupportedContent"
      //       aria-expanded="false"
      //       aria-label="Toggle navigation"
      //     >
      //       <span className="navbar-toggler-icon"></span>
      //     </button>
      //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
      //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      //         <li className="nav-item">
      //           <Link className="nav-link active" aria-current="page" to="/">
      //             Головна
      //           </Link>
      //         </li>
      //       </ul>

      //       {!isAuth ? (
      //         <ul className="navbar-nav">
              
      //           <li className="nav-item ">
      //             <Link className="nav-link" to="/login">
      //               Вхід
      //             </Link>
      //           </li>
      //           <li className="nav-item">
      //             <Link className="nav-link" to="/register">
      //               Реєструватися
      //             </Link>
      //           </li>
              
      //         </ul>
      //       ) : (
      //         <ul className="navbar-nav">
      //           <li className="nav-item">
      //             <Link className="nav-link" to="/profile">
      //               {username}
      //             </Link>
      //           </li>
      //           <li className="nav-item">
      //             <Link className="nav-link" to="/logout">
      //               Вихід
      //             </Link>
      //           </li>
      //         </ul>
      //       )}
      //     </div>
      //   </div>
      // </nav>
    );
}

export default DefaultHeader; 