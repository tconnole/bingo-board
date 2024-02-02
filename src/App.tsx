import React, { useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './library/Header/Header';
import Card from './library/Card/Card';
import GenerateBingoCard from './library/GenerateBingoCard/GenerateBingoCard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Snackbar } from '@mui/material';
import { BingoCardContext } from './library/BingoCardReducer/BingoCardReducer';

function App() {
  const [chipOpen, setChipOpen] = useState(false);
  const bingoCard = useContext(BingoCardContext);

  const handleClick = () => {
    setChipOpen(true);

    if (bingoCard.state) {
      const encoded = btoa(JSON.stringify(bingoCard.state));
      navigator.clipboard.writeText(`https://tconnole.github.io/bingo-board?board=${encoded}`);
    }
  }

  return (
    <div className="App">
      <div className="App-Container">
        <Header />
        <Card />
        <Button sx={{display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center'}} onClick={handleClick}>Share Link <ContentCopyIcon /></Button>
        <Snackbar open={chipOpen} onClose={() => setChipOpen(false)} autoHideDuration={2000} message="Copied to clipboard" />
      </div>
    </div>
  );
}

export default App;
