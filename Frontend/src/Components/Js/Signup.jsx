import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../Css/login.css"
import Menu from './Navbar';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import validateAuthInput from '../../utils/validateAuthInput';
import FormErrorMessage from './FormErrorMessage';

function Signup() {
  const {currentUser} =useAuth();
  // console.log(currentUser);
  const [userInfo,setUserInfo]=useState({
    name:"",
    email:"",
    visitorType:"",
    password:"",
    confirmPassword:""
  });

  const [errorMessage,setErrorMessage]=useState({
    name:"",
    email:"",
    visitorType:"",
    password:"",
    confirmPassword:""
  });

  

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(userInfo);
    let status = 1;
    for(let [name,value] of Object.entries(userInfo)){
       status &= validateAuthInput(name,value,userInfo,setErrorMessage);
    }

    if(!status)
      console.log("Form validation failed,it is not submitted");

    }
    
  
  const HandleInput = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    // console.log(formValue);
    validateAuthInput(name,value,userInfo,setErrorMessage);

}

  return (
    <>
      <Container >
      <Menu/>
      <p class="h1">Signup Form</p><hr />
    <Form onSubmit={handleSubmit}>
    <Card className="border border-info border-3  mb-3"> 
    <Card.Body>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name="name" value={userInfo.name} onChange={HandleInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={userInfo.email} onChange={HandleInput} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Type</Form.Label>
        <div  className="mb-3">
          <Form.Check
            label="Admin"
            name="visitorType"
            type="radio"
           value="Admin" 
           onChange={HandleInput}
          />
          <Form.Check
            label="Vendor"
            name="visitorType"
            type="radio"
            value="Vendor" 
           onChange={HandleInput}
          />
          <Form.Check
            label="User"
            name="visitorType"
            type="radio"
            value="User" 
           onChange={HandleInput}
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={userInfo.password} onChange={HandleInput}/>
        <FormErrorMessage errorMessage={errorMessage.password}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" value={userInfo.confirmPassword} onChange={HandleInput}/>
        <FormErrorMessage errorMessage={errorMessage.confirmPassword}/>
      </Form.Group>
     
      </Card.Body>
      </Card>
      <Button variant="primary" type="submit" className='mb-5'>
        Submit
      </Button>
    </Form>
    </Container>
    </>
  );
}

export default Signup;