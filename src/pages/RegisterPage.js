import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from '../utils/api';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secPassword, setSecPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => { 
    event.preventDefault();
    setError(''); // 에러 초기화
    
    try {
      if (password !== secPassword) {
        throw new Error('패스워드가 일치하지 않습니다 다시 입력해주세요');
      }
      
      const response = await api.post('/user', { name, email, password });
      console.log('Register Response:', response); // 응답 확인용
      
      // 성공 시 로그인 페이지로 이동
      if (response?.data) {
        navigate('/login');
      }
      
    } catch (error) {
      console.error('Register Error:', error);
      // 에러 메시지 안전하게 처리
      if (error.message) {
        setError(error.message);
      } else if (error.error) {
        setError(error.error);
      } else {
        setError('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="display-center">
      {error && <div className='red-error'>{error}</div>}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Name" 
            value={name}
            onChange={(event) => setName(event.target.value)} 
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email}
            onChange={(event) => setEmail(event.target.value)} 
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(event) => setPassword(event.target.value)} 
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="re-enter the password" 
            value={secPassword}
            onChange={(event) => setSecPassword(event.target.value)} 
            required
          />
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;