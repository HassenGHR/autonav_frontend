import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { register } from "../actions/UserAction";
import FormContainer from "../components/FormContainer";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("كلمة المرور غير متطابقة");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <FormContainer className='mb-3 text-right' dir="rtl">
      <h1 className="text-right">فتح حساب جديد</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' >
          <div className="text-right mt-3">
          <Form.Label  >الاسم</Form.Label>

          </div>
          <Form.Control
            required
            type="name"
            placeholder="أدخل الاسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-right"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='mt-2 '>
        <div className="text-right mt-3">
          <Form.Label>البريد الإلكتروني</Form.Label>
          </div>
          <Form.Control
            required
            type="email"
            placeholder="أدخل البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-right"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className='mt-2'>
        <div className="text-right mt-3">

          <Form.Label>كلمة المرور</Form.Label>
          </div>

          <Form.Control
            required
            type="password"
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-right"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="passwordConfirm" className='mt-2'>
        <div className="text-right mt-3">

          <Form.Label>تأكيد كلمة المرور</Form.Label>
          </div>

          <Form.Control
            required
            type="password"
            placeholder="تأكيد كلمة المرور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="text-right"
          ></Form.Control>
        </Form.Group>
        <div className="text-right ">

        <Button type="submit" variant="primary" className='mt-3'>
          تسجيل
        </Button>
        </div>

      </Form>
      <Row className="py-3 mb-5">
        <Col className="text-right">
          لديك حساب؟{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            تسجيل دخول
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
