import React , {useState , useEffect} from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link , useNavigate } from "react-router-dom";
import "./Signup.css";
import logo from "../Images/logo.png";
import {useDispatch , useSelector} from "react-redux";
import {userSignup , addError } from "../Redux/Action/UserAction"

const Signup = () => {
    const [user, setuser] = useState({name: ""  , email: "" , password: "" });
    const [image, setimage] = useState(null);
    const [imagePreview, setimagePreview] = useState(null);
    const [uploadingImage, setuploadingImage] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userData } = useSelector((state) => state.userReducer)
    

    const onChange = (e) => {
        setuser({...user , [e.target.name]:e.target.value});
    }
    const validateImg = (e)=>{
      const file = e.target.files[0];
      if(file.size> 1048576){
        return alert("Image size exceeds 1MB");
      }else{
        setimage(file);
        setimagePreview(URL.createObjectURL(file));
      }

    }

    const uploadImage = async ()=>{
      const data = new FormData();
      data.append('file' , image);
      data.append('upload_preset', 'fzhcr1nb');
      try {
        setuploadingImage(true)
        let res = await fetch("https://api.cloudinary.com/v1_1/dsyz3bvhp/image/upload", {
              method:"post",
              body:data
        })
        const urlData = await res.json();
        setuploadingImage(false);
        return urlData.url
        
      } catch (error) {
        setuploadingImage(false);
        dispatch(addError(error.message));
      }
    }

    const onSubmit = async (e)=>{
      e.preventDefault();
      if(!image) return alert("Please upload a profile image");
      const url = await uploadImage(image);
      dispatch(userSignup({name:user.name , email:user.email , password:user.password , picture:url}));
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
        <Col
          md={7}
          className="d-flex flex-direction-column justify-content-center align-items-center"
        >
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={onSubmit} >
          
            <div className="signup-profile-container">
                <img src={imagePreview || logo} alt="profile-pic" className="signup-profile-picture" />
                <label htmlFor="image-upload" className="image-upload-label" >
                    <i className="fas fa-plus-circle add-picture-icon " ></i>
                </label>
                <input type="file" hidden id="image-upload" accept="image/png , image/jpeg"  onChange={validateImg} />
            </div>
          <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Your Name" onChange={onChange} name="name" value={user.name} />
            </Form.Group>
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
              { uploadingImage ? "Signing you up..." :"Create Account"}
            </Button>
            <div className="py-4">
              <p className="text-center">
                Already have an Account? {" "}
                <Link to="/login">login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="signupBG"></Col>
      </Row>
    </Container>
  );
};

export default Signup;
