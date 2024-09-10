import { useContext, useState } from "react"
import { BingoCardContext } from "../BingoCardReducer/BingoCardReducer"
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Modal, Switch, TextField, Typography } from "@mui/material";
import GenerateBingoCard from "../GenerateBingoCard/GenerateBingoCard";
import Help from "./Help";
import './Help.css';
import './Header.css';
import DrinkingRulesRatiosForm from "./DrinkingRulesRatiosForm";
import CloseIcon from '@mui/icons-material/Close';

function Header() {
    const bingoCard = useContext(BingoCardContext);
    const [tab, setTab] = useState<'Settings' | 'Drinking'>('Settings');

    const [open, setOpen] = useState<boolean>(false);
    const title = bingoCard.state?.name ?? 'N/A';
    const freeSpace = bingoCard.state?.freeSpace ?? true;
    const drinkingGame = bingoCard.state?.drinkingGame ?? false;
    const size = bingoCard.state?.size ?? 5;
    const words = bingoCard.state?.words.join(',') ?? '';


    const handleClose = () => {
        setOpen(false);
    }

    const updateTitle = (title: string) => {
        if (bingoCard.dispatch) {
            bingoCard.dispatch({type: 'updateTitle', payload: title});
        }
    }

    const updateFreeSpace = () => {
        if (bingoCard.dispatch) {
            bingoCard.dispatch({type: 'toggleFreeSpace'})
        }
    }

    const updateDrinkingGame = () => {
        if (bingoCard.dispatch) {
            bingoCard.dispatch({type: 'toggleDrinkingGame'})
        }
    }

    const updateSize = (n: number) => {
        if (bingoCard.dispatch) {
            bingoCard.dispatch({type: 'setSize', payload: n});
        }
    }

    const updateWords = (str: string) => {
        const words = str.split(',');
        if (bingoCard.dispatch) {
            bingoCard.dispatch({type: 'setWords', payload: words});
        }
    }

    return (
    <Box className="header">
        <Typography variant="h4" className="header-text">{title}</Typography>
        <Box className="header-buttons">
        <IconButton aria-label="edit" onClick={() => setOpen(true)}><EditIcon sx={{fontSize: '2rem', color: 'white'}} /></IconButton>
        <GenerateBingoCard />
        <Help />
        <Modal open={open} onClose={handleClose}>
            <div className="edit-form-container">
                <div style={{position: 'relative'}}>
                    <button onClick={() => setTab('Settings')} onChange={() => setTab('Settings')} className="edit-form-tab" style={{backgroundColor: tab === 'Settings' ? 'white' : '', color: tab === 'Settings' ? 'black' : ''}}><Typography variant='h5'>Settings</Typography></button>
                    <button onClick={() => setTab('Drinking')} onChange={() => setTab('Drinking')} className="edit-form-tab" style={{backgroundColor: tab === 'Drinking' ? 'white' : '', color: tab === 'Drinking' ? 'black' : ''}}><Typography variant='h5'>Drinking</Typography></button>
                    <IconButton sx={{ position: 'absolute', right: '0', top: '0', color: 'white'}} onClick={() => setOpen(false)}><CloseIcon /></IconButton>
                </div>
                { tab === 'Settings' ?
                (<div className="edit-form">
                        <TextField style={{width: '100%'}} id="outline-title" label="Bingo Board Name" onChange={(event) => updateTitle(event.target.value)} value={title} />
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center'}}>
                            <Typography variant='h6' sx={{color: 'black'}}>Free Space</Typography>
                            <Switch onChange={updateFreeSpace} checked={freeSpace} />
                        </Box>
                        <ButtonGroup>
                            <Button onClick={() => updateSize(3)} variant={size === 3 ? 'contained' : 'outlined'}>3x3</Button>
                            <Button onClick={() => updateSize(5)} variant={size === 5 ? 'contained' : 'outlined'}>5x5</Button>
                        </ButtonGroup>
                        <TextField className="edit-form-text" style={{width: '100%'}} multiline label='Words' rows={15} variant="outlined" onChange={(event) => updateWords(event.target.value)} value={words}></TextField>
                </div>) :
                (<div className="edit-form">
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center'}}>
                            <Typography variant='h6' sx={{color: 'black'}}>Drinking Game</Typography>
                            <Switch onChange={updateDrinkingGame} checked={drinkingGame} />
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center'}}>
                            <Typography variant="h6" sx={{color: 'black'}}>Drinking Rules Ratios</Typography>
                            <DrinkingRulesRatiosForm />
                        </Box>
                </div>)
                }
            </div>
        </Modal>
        </Box>
    </Box>)
}

export default Header;