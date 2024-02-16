import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import Upload from './Upload';

const Container = styled.div`
  position: sticky;
  top: 0;
  height: 56px;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
`;

const Search = styled.div`
  display: flex;
  position: absolute;
  left: 0px;
  right: 0px;
  width: 50%;
  border: 1px solid #333;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 5px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  display: flex;
  background-color: transparent;
  font-weight: 500;
  color: #3ea6ff;
  border: 1px solid #3ea6ff;
  border-radius: 3px;
  align-items: center;
  cursor: pointer;
  gap: 5px;
  padding: 5px 15px;
`;

const User = styled.div`
  display: flex;
  font-weight: 500;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  background-color: #999;
  border-radius: 50%;
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder='Search'
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchOutlinedIcon onClick={()=>navigate('/search?q=' + query)}/>
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              <Avatar src={currentUser.image} />
              {currentUser.name}
            </User>
          ) : (
            <Link to='login' style={{ textDecoration: 'none' }}>
              <Button>
                <AccountCircleOutlinedIcon />
                Login
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
