import { Button } from "@mui/material";
import { BingoCardContext } from "../BingoCardReducer/BingoCardReducer";
import { useContext } from "react";

function GenerateBingoCard() {
    const bingoCard = useContext(BingoCardContext);

    // TODO delete when done
    const testWords = [];

    for (let i = 0; i < 50; i++) {
        testWords.push(`i`);
    }
    const words = bingoCard.state?.words ?? testWords;

    const generateNewCard = () => {
        if (bingoCard.dispatch) {
            bingoCard.dispatch({type: 'generateNewCard'});
        }
    }

    return <Button variant="contained" onClick={generateNewCard}>Generate New Card</Button>
}

export default GenerateBingoCard;