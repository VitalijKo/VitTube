import axios from 'axios';
import { async } from '@firebase/util';
import { signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from '../firebase';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 56px);
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 50px;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.soft};
`;

const Button = styled.button`
  font-weight: 500;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  font-size: 12px;
  margin-top: 10px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(loginStart());

    try {
      const res = await axios.post('/auth/login', { name, password });

      dispatch(loginSuccess(res.data));

      navigate('/')
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());

    signInWithPopup(auth, provider).then((result) => {
      axios.post('/auth/google', {
            name: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL
          }).then((res) => {
            dispatch(loginSuccess(res.data));

            navigate('/');
          });
      }).catch((err) => {
        dispatch(loginFailure());
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <SubTitle>to continue to VitTube</SubTitle>
        <Input
          placeholder='username'
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        <Title>or</Title>
        <Input
          placeholder='Username'
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        <Input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Sign Up</Button>
      </Wrapper>
      <More>
        English (USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default Login;
