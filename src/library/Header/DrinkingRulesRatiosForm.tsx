import { IconButton, Typography } from "@mui/material";
import { DrinkRule, DrinkRuleColor, DrinkRuleIcon } from "../CardChip/CardChipDrinkRule";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext } from "react";
import { BingoCardContext } from "../BingoCardReducer/BingoCardReducer";

function DrinkRuleCard(props: {rule: DrinkRule}) {
    const {state, dispatch} = useContext(BingoCardContext);
    const ratios = state?.currentDrinkRulesRatios;
    const count = ratios?.get(props.rule) ?? 0;
    const icon = props.rule !== DrinkRule.None ? DrinkRuleIcon(props.rule) : '🚫';

    const addClick = () => {
        if(dispatch) {
            let ratios = state?.currentDrinkRulesRatios ?? new Map<DrinkRule, number>();
            let count = ratios.get(props.rule);
            if (count === undefined) {
                count = 1;
            }
                else if (count < 99) {
                count += 1;
            }

            ratios.set(props.rule, count);

            dispatch({type: 'setDrinkRulesRatios', payload: ratios})
        }
    }

    const subtractClick = () => {
        if(dispatch) {
            if(dispatch) {
                let ratios = state?.currentDrinkRulesRatios ?? new Map<DrinkRule, number>();
                let count = ratios.get(props.rule);
                if (count === undefined) {
                    count = 0;
                }
                    else if (count > 0) {
                    count -= 1;
                }
    
                ratios.set(props.rule, count);
    
                dispatch({type: 'setDrinkRulesRatios', payload: ratios})
            }
        }
    }

    return (
        <div style={{width: '31%', aspectRatio: '1', padding: '0.25rem'}}>
            <div style={{width: '100%', height: '100%', backgroundColor: DrinkRuleColor(props.rule), display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderRadius: '0.25rem'}}>
                <Typography sx={{fontSize: '3rem', marginBottom: '1.5rem', textShadow: '1px 1px 2px black'}}>{icon}</Typography>
                <Typography sx={{position: 'absolute', bottom: '0.25rem', left: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', textShadow: '1px 1px 2px black'}}>{`x${count}`}</Typography>
                <IconButton onClick={subtractClick} sx={{position: 'absolute', bottom: '0rem', right: '1.5rem', transform: 'scale(0.75)', margin: 0}}><RemoveIcon sx={{color: 'white'}} /></IconButton>
                <IconButton onClick={addClick} sx={{position: 'absolute', bottom: '0rem', right: '0', transform: 'scale(0.75)', margin: 0}}><AddIcon sx={{color: 'white'}} /></IconButton>
            </div>
        </div>
    )
}

function DrinkingRulesRatiosForm() {
    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <DrinkRuleCard rule={DrinkRule.Drink}/>
            <DrinkRuleCard rule={DrinkRule.Drink2}/>
            <DrinkRuleCard rule={DrinkRule.Chug}/>
            <DrinkRuleCard rule={DrinkRule.Gift}/>
            <DrinkRuleCard rule={DrinkRule.Buddy}/>
            <DrinkRuleCard rule={DrinkRule.Boys}/>
            <DrinkRuleCard rule={DrinkRule.Girls}/>
            <DrinkRuleCard rule={DrinkRule.Death}/>
            <DrinkRuleCard rule={DrinkRule.Truth}/>
            <DrinkRuleCard rule={DrinkRule.Dare}/>
            <DrinkRuleCard rule={DrinkRule.WaterShot}/>
            <DrinkRuleCard rule={DrinkRule.None}/>
        </div>
    )
}

export default DrinkingRulesRatiosForm;