import { useContext, useState } from "react"
import { BingoCardContext } from "../BingoCardReducer/BingoCardReducer"
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, CardContent, CardHeader, Modal, Switch, TextField, Typography } from "@mui/material";
import GenerateBingoCard from "../GenerateBingoCard/GenerateBingoCard";

function Header() {
    const bingoCard = useContext(BingoCardContext);

    const [open, setOpen] = useState<boolean>(false);
    const title = bingoCard.state?.name ?? 'N/A';
    const freeSpace = bingoCard.state?.freeSpace ?? true;
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
        <Modal open={open} onClose={handleClose}>
            <Card variant="outlined" sx={{position: 'absolute', width: '400px', left: 'calc(50% - 200px)', top: '30%', backgroundColor: '#ffffff'}}>
                <CardHeader title='Edit Form'></CardHeader>
                <CardContent>
                    <TextField style={{width: '100%'}} id="outline-title" label="Bingo Board Name" onChange={(event) => updateTitle(event.target.value)} value={title} />
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center'}}>
                        <Typography>Free Space</Typography>
                        <Switch onChange={updateFreeSpace} checked={freeSpace} />
                    </Box>
                    <TextField style={{width: '100%'}} multiline label='Words' rows={10} variant="outlined" onChange={(event) => updateWords(event.target.value)} value={words}></TextField>
                </CardContent>
            </Card>
        </Modal>
    </Box>)
}

export default Header;