import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/UserAction';
import FormContainer from '../components/FormContainer';

function UserScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();

  const redirect = location.search ? location.search.split('=')[1] : '/';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer className='mb-3 text-right' dir="rtl">
      <h1 className="text-right">تسجيل الدخول</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className='mt-3'>
        <Form.Group>
        <div className="text-right mt-3">
          <Form.Label>البريد الإلكتروني</Form.Label>
          </div>          <Form.Control
            type='email'
            placeholder='أدخل البريد الإلكتروني'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-right"
          />
        </Form.Group>
        <Form.Group controlId='password' className='mt-2'>
        <div className="text-right mt-3">

<Form.Label>كلمة المرور</Form.Label>
</div>          <Form.Control
            type='password'
            placeholder='أدخل كلمة المرور'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-right"
          />
        </Form.Group>
        <div className="text-right ">

        <Button type='submit' variant='primary' className='mt-3'>
          تسجيل الدخول
        </Button>
        </div> 
      </Form>
      <Row className='py-3'>
        <Col className="text-right">
          حساب جديد؟{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            سجل هنا
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default UserScreen;
