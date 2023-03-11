import React , {useEffect} from 'react';
import {Nav , Navbar , Container , Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import logo from '../Images/logo.png';
import {useDispatch , useSelector} from "react-redux";
import { userLogout , clearError } from '../Redux/Action/UserAction';

const Navigation = () => {
  const {userData , error} = useSelector(state => state.userReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() =>{
      dispatch(clearError())
    }, 5000)
    // eslint-disable-next-line
  }, [error])

  const logout = async()=>{
    dispatch(userLogout(userData))
  }

    return (<>
    <Navbar  expand="lg">
    <Container>
        <LinkContainer to='/'>
        <Navbar.Brand ><img src={logo} alt="Logo" style={{width:45 , height:45}} /></Navbar.Brand>
        </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto text-center">
         <LinkContainer to="/chat" >
            <Nav.Link>Chat</Nav.Link>
         </LinkContainer>
         { !userData && <LinkContainer to="/login" >
            <Nav.Link>Login</Nav.Link>
         </LinkContainer>} 
        
          {userData && <div>
            <img src={userData.picture} alt="profile-pic" style={{width:30 , height:30 , borderRadius:"50%", marginRight:10 , objectFit:"cover"}} />
                      {userData.name}{ " "}
            
              <Button onClick={logout} variant='danger'  >
                         Logout
                         </Button>
            
          </div>}
        </Nav>
      </Navbar.Collapse>
    </Container>
    
  </Navbar>
  <Container>   
  {error && <div className='alert alert-danger text-center' > {error}</div>}
  </Container>
  </>)
}


export default Navigation;