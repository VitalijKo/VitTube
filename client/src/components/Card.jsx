import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'timeago.js';

const Container = styled.div`
  cursor: pointer;
  gap: 10px;
  display: ${(props) => props.type === 'sm' && 'flex'};
  width: ${(props) => props.type !== 'sm' && '360px'};
  margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
`;

const Image = styled.img`
  flex: 1;
  width: 100%;
  background-color: #999;
  height: ${(props) => (props.type === 'sm' ? '120px' : '202px')};
`;

const Details = styled.div`
  display: flex;
  flex: 1;
  gap: 12px;
  margin-top: ${(props) => props.type !== 'sm' && '16px'};
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  background-color: #999;
  border-radius: 50%;
  display: ${(props) => props.type === 'sm' && 'none'};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 16px;
  color: ${({ theme }) => theme.textSoft};
  margin: 10px 0px;
`;

const Info = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get('/users/find/' + video.userId);

      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Link to={'/video/' + video._id} style={{ textDecoration: 'none' }}>
      <Container type={type}>
        <Image
          type={type}
          src={video.imgUrl}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel.image}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
