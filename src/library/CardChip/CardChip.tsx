import { CenterFocusStrong } from '@mui/icons-material';
import './CardChip.css';
import { DrinkRule, DrinkRuleColor, DrinkRuleIcon, DrinkRuleText, RandomDrinkRule } from "./CardChipDrinkRule";
import { Typography } from '@mui/material';

export interface CardChipProps {
    selected: boolean;
    label: string;
    drinkRule: DrinkRule;
}

function CardChip(props: CardChipProps) {
    const rule = props.drinkRule;
    const backgroundColor = () => {
        if (props.selected) {
            if (props.drinkRule === DrinkRule.Death) {
                return '#212121'
            }
            else {
                return '#40d138'
            }
        }
        return '#121213'
    }
    
    return (
            <div 
                className="CardChip-container" style={{position: 'relative', color: !props.selected ? 'white' : 'black',}}>
                    <div 
                        className={`CardChip-Chip CardChip-position`}
                        style={{
                            color: !props.selected ? 'white' : 'black',
                            backgroundColor: props.selected ? backgroundColor() : '#121213',
                            outlineWidth: '0.25rem',
                            outline: props.selected ? `solid ${DrinkRuleColor(rule)}` : ''
                        }}
                    >
                            {props.label}
                    </div>
                    <div style={{position: 'absolute', right: 0, bottom: 0, top: 0, left: 0, fontSize: '1rem', display: !props.selected || rule === DrinkRule.None ? 'none': 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem'}}>
                        <Typography sx={{fontSize: '2rem', textShadow: '1px 1px 2px black'}}>{
                            DrinkRuleIcon(rule)
                        }</Typography>
                        <div className="DrinkRule-text">
                        <Typography sx={{textAlign: 'center', background: 'white', color: 'black', fontWeight: 'bold', borderRadius: '0.25rem', padding: '0.25rem'}}>{
                            DrinkRuleText(rule)
                        }</Typography>
                        </div>
                    </div>
            </div>);
}

export default CardChip;