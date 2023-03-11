import React ,{useState , useEffect} from 'react';
import {Form , Button, Container, Row, Col} from 'react-bootstrap';
import { Link ,useNavigate } from 'react-router-dom';
import "./Login.css";
import {useDispatch , useSelector} from "react-redux";
import { userLogin } from '../Redux/Action/UserAction';


const Login = () => {
  const [user, setuser] = useState({password: "" , email: ""});
  const {userData} = useSelector(state => state.userReducer)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onChange = (e) => {
      setuser({...user , [e.target.name]:e.target.value});
  }
 
  const onSubmit = async (e) => { 
    e.preventDefault();
    dispatch(userLogin(user));
    // socket.emit("new-user")
    
  }
  useEffect(() => {
    if(userData){
      navigate("/chat")
    } 
    // eslint-disable-next-line
  }, [userData?._id])

    return (
        <Container>
            <Row>
                <Col md={5} className="loginBG" >

                </Col>
                <Col md={7} className='d-flex flex-direction-column justify-content-center align-items-center' >
                <Form style={{width:"80%", maxWidth:500}} onSubmit={onSubmit} >
                
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={onChange} name="email" value={user.email}  />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"  onChange={onChange} name="password" value={user.password} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <div className='py-4' >
                <p className="text-center">
                    Don't have an Account? create one <Link to="/signup" >Sign-up</Link>
                </p>
          </div>
        </Form>
                </Col>

            </Row>
        </Container>
       
      );
}

export default Login;