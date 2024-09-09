import { BingoCardContext, GenerateDrinkRules, GenerateDrinkRulesRatios, GenerateNewPositions, GenerateSelected } from "../BingoCardReducer/BingoCardReducer";
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
    const drinkRatios = bingoCard.state?.currentDrinkRulesRatios ?? GenerateDrinkRulesRatios();

    const selected: boolean[][] = bingoCard.state?.currentSelected
        ?? 
        GenerateSelected(size, freeSpace);
    const labels: string[][] = bingoCard.state?.currentPositions
        ??
        GenerateNewPositions(words, size);
    const drinkRules: DrinkRule[][] = bingoCard.state?.currentDrinkRules
        ??
        GenerateDrinkRules(size, drinkingRules, drinkRatios);

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
    </div>
    );
}

export default Card;