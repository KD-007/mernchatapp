import React , {useEffect} from 'react';
import {Row , Col , Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {useDispatch } from "react-redux";
import { authUser } from '../Redux/Action/UserAction';
import "./Home.css";

const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {
       dispatch(authUser())
       // eslint-disable-next-line
    }, [])


    return (
        <Row>
            <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center " >
                <div>
                    <h1>
                        Share the world with Friends
                    </h1>
                    <p>Chat app to get Connected</p>
                    <LinkContainer to="/chat">
                    <Button variant='success'>Get Starterd  <i className='fas fa-comments home-message-icon '></i></Button>
                    </LinkContainer>
                </div>
            </Col>
            <Col md={6} className="homeBG" >
            </Col>
        </Row>
    )
}

export default Home;