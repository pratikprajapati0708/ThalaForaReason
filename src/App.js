import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';
import { Input } from 'semantic-ui-react';

Modal.setAppElement('#root');

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [displayThala, setDisplayThala] = useState(false);

  const handleSearchClick = () => {
    if (inputValue.length === 7) {
      setDisplayThala(true);
      setTimeout(() => {
        displayVideo('bolejokoyal')
      }, 2000);
    } else {
      const inputNumber = parseInt(inputValue, 10);
      const sumOfCharacters = inputValue
        .toString()
        .split('')
        .reduce((acc, char) => acc + parseInt(char, 10), 0);

      if (!isNaN(inputNumber) && (inputNumber === 7 || sumOfCharacters === 7)) {
        setTimeout(() => {
          displayVideo('bolejokoyal')
        }, 2000);
        setDisplayThala(true);
      } else {
        displayVideo('laugh');
        setDisplayThala(false);
      }
    }
  };

  const displayVideo = (videoName) => {
    const videoUrl = process.env.PUBLIC_URL + '/' + videoName + '.mp4';

    // Setting the URL of the video
    setVideoUrl(videoUrl);
    // Opening the modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Closing the modal
    setIsModalOpen(false);
    setDisplayThala(false);
  };

  return (
    <div className="main-container">
      <div className='input-type-text-no'>
        <Input
          action={{
            content: 'Search',
            onClick: handleSearchClick,
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='search-on-input'
          placeholder='Search...'
        />
      </div>
      {displayThala && <h1 style={{textAlign:"center"}}>Thala for a Reason</h1>}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Video Modal"
      >
        <video autoPlay width="50%" height="auto">
          <source src={videoUrl} type="video/mp4" />
        </video>
      </Modal>
    </div>
  );
}

export default App;
