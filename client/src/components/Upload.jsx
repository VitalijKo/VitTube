import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import app from '../firebase';

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000a7;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 600px;
  height: 600px;
  gap: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  z-index: 999;
  background-color: transparent;
  border-radius: 3px;
  padding: 10px;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.soft};
`;

const Description = styled.textarea`
  background-color: transparent;
  border-radius: 3px;
  padding: 10px;
  color: ${({ theme }) => theme.text};
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

const Label = styled.label`
  font-size: 16px;
`;

const Upload = ({ setOpen }) => {
  const [image, setImage] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imageProgress, setImagePerc] = useState(0);
  const [videoProgress, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const handleTags = (e) => {
    setTags(e.target.value.split(','));
  }

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const videoProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === 'imageUrl' ? setImagePerc(Math.round(videoProgress)) : setVideoPerc(Math.round(videoProgress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video , 'videoUrl');
  }, [video]);

  useEffect(() => {
    image && uploadFile(image, 'imageUrl');
  }, [image]);

  const handleUpload = async (e)=>{
    e.preventDefault();
    const res = await axios.post('/videos', {...inputs, tags})
    setOpen(false)
    res.status===200 && navigate(`/video/${res.data._id}`)
  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoProgress > 0 ? (
          'Uploading:' + videoProgress
        ) : (
          <Input
            type='file'
            accept='video/*'
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input
          type='text'
          placeholder='Title'
          name='title'
          onChange={handleChange}
        />
        <Description
          placeholder='Description'
          name='description'
          rows={8}
          onChange={handleChange}
        />
        <Input
          type='text'
          placeholder='Separate the tags with commas.'
          onChance={handleTags}
        />
        <Label>Cover:</Label>
        {imageProgress > 0 ? (
          'Uploading:' + imageProgress + '%'
        ) : (
          <Input
            type='file'
            accept='image/*'
            onChange={(e) => setImage(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
