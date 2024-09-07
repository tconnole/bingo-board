import { Box } from "@mui/material";
import { BingoCardContext, GenerateDrinkRules, GenerateNewPositions, GenerateSelected } from "../BingoCardReducer/BingoCardReducer";
import { useContext } from "react";
import CardChip from "../CardChip/CardChip";
import './Card.css';
import { DrinkRule, RandomDrinkRule } from "../CardChip/CardChipDrinkRule";

function Card() {
    const bingoCard = useContext(BingoCardContext);
    const freeSpace = bingoCard.state?.freeSpace ?? false;
    const drinkingRules = bingoCard.state?.drinkingGame ?? false;
    const size = bingoCard.state?.size ?? 5;
    const words = bingoCard.state?.words ?? [];
    const selected: boolean[][] = bingoCard.state?.currentSelected
        ?? 
        GenerateSelected(size, freeSpace);
    const labels: string[][] = bingoCard.state?.currentPositions
        ??
        GenerateNewPositions(words, size);
    const drinkRules: DrinkRule[][] = bingoCard.state?.currentDrinkRules
        ??
        GenerateDrinkRules(size, drinkingRules );

    const clickChip = (pos: number[]) => {
        if (bingoCard.dispatch) {
            const tempArray = selected;
            tempArray[pos[0]][pos[1]] = !tempArray[pos[0]][pos[1]];

            bingoCard.dispatch({type: 'toggleSelected', payload: tempArray});
        }
    }

    return  (
    <div className="Card-container">
        {
            selected.map((row, i) => (
                <div className="Card-row" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                     {row.map((chip, index) => <div onClick={() => clickChip([i, index])} style={{flexGrow: 1}} key={`${i}-${index}`}><CardChip drinkRule={drinkRules[i][index]} selected={chip} label={labels[i][index]}></CardChip></div>)}
                 </div>
            ))
        }
        {/* <div className="Card-row" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {selected[0].map((chip, index) => <div onClick={() => clickChip([0, index])} className="Card-Chip" key={`0-${index}`}><CardChip drinkRule={drinkRules[0][index]} selected={chip} label={labels[0][index]}></CardChip></div>)}
        </div>
        <div className="Card-row" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {selected[1].map((chip, index) => <div onClick={() => clickChip([1, index])} className="Card-Chip" key={`1-${index}`}><CardChip drinkRule={drinkRules[1][index]} selected={chip} label={labels[1][index]}></CardChip></div>)}
        </div>
        <div className="Card-row" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {selected[2].map((chip, index) => <div onClick={() => clickChip([2, index])} className="Card-Chip" key={`2-${index}`}><CardChip drinkRule={drinkRules[2][index]} selected={chip} label={labels[2][index]}></CardChip></div>)}
        </div>
        <div className="Card-row" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {selected[3].map((chip, index) => <div onClick={() => clickChip([3, index])} className="Card-Chip" key={`3-${index}`}><CardChip drinkRule={drinkRules[3][index]} selected={chip} label={labels[3][index]}></CardChip></div>)}
        </div>
        <div className="Card-row" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {selected[4].map((chip, index) => <div onClick={() => clickChip([4, index])} className="Card-Chip" key={`4-${index}`}><CardChip drinkRule={drinkRules[4][index]} selected={chip} label={labels[4][index]}></CardChip></div>)}
        </div> */}
    </div>
    );
}

export default Card;