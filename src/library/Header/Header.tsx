import { useContext, useState } from "react"
import { BingoCardContext } from "../BingoCardReducer/BingoCardReducer"
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Modal, Switch, TextField, Typography } from "@mui/material";
import GenerateBingoCard from "../GenerateBingoCard/GenerateBingoCard";
import Help from "./Help";

function Header() {
    const bingoCard = useContext(BingoCardContext);

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
    <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center'}}>
        <Typography variant="h4">{title}</Typography>
        <IconButton aria-label="edit" onClick={() => setOpen(true)}><EditIcon sx={{fontSize: '2rem', color: 'white'}} /></IconButton>
        <GenerateBingoCard />
        <Help />
        <Modal open={open} onClose={handleClose}>
            <Card variant="outlined" sx={{position: 'absolute', width: '400px', left: 'calc(50% - 200px)', top: '30%', backgroundColor: '#ffffff'}}>
                <CardHeader title='Edit Form'></CardHeader>
                <CardContent sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '0.25rem'}}>
                    <TextField style={{width: '100%'}} id="outline-title" label="Bingo Board Name" onChange={(event) => updateTitle(event.target.value)} value={title} />
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center'}}>
                        <Typography>Free Space</Typography>
                        <Switch onChange={updateFreeSpace} checked={freeSpace} />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center'}}>
                        <Typography>Drinking Game</Typography>
                        <Switch onChange={updateDrinkingGame} checked={drinkingGame} />
                    </Box>
                    <ButtonGroup>
                        <Button onClick={() => updateSize(3)} variant={size === 3 ? 'contained' : 'outlined'}>3x3</Button>
                        <Button onClick={() => updateSize(5)} variant={size === 5 ? 'contained' : 'outlined'}>5x5</Button>
                    </ButtonGroup>
                    <TextField style={{width: '100%'}} multiline label='Words' rows={10} variant="outlined" onChange={(event) => updateWords(event.target.value)} value={words}></TextField>
                </CardContent>
            </Card>
        </Modal>
    </Box>)
}

export default Header;