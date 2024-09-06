import { Typography } from "@mui/material";

export enum DrinkRule {
    Drink,
    Drink2,
    WaterShot,
    Buddy,
    Death,
    Gift,
    None,
    Boys,
    Girls
}

export function DrinkRuleIcon(rule: DrinkRule) {
    switch(rule) {
        case DrinkRule.Drink:
            return '🍺';
        case DrinkRule.Drink2:
            return (
            <div style={{position: 'relative', fontSize: 'inherit'}}>
                🍺
                <Typography sx={{position: 'absolute', top: '0.5rem', left: '0.5rem', fontSize: 'inherit'}}>🍺</Typography>
            </div>);
        case DrinkRule.WaterShot:
            return '💧'
        case DrinkRule.Buddy:
            return '🫂'
        case DrinkRule.Death:
            return '💀'
        case DrinkRule.Gift:
            return '🎁'
        case DrinkRule.Boys:
            return '👦'
        case DrinkRule.Girls:
            return '👧'
        default:
            return (<></>);
        
    }
}

export function DrinkRuleColor(rule: DrinkRule): string {
    switch(rule) {
        case DrinkRule.Drink:
            return '#fc6603';
        case DrinkRule.Drink2:
            return '#fc0317'
        case DrinkRule.WaterShot:
            return '#037bfc'
        case DrinkRule.Buddy:
            return '#8c03fc'
        case DrinkRule.Death:
            return '#2e2e2e'
        case DrinkRule.Gift:
            return '#dedede'
        case DrinkRule.Boys:
            return '#0011ff'
        case DrinkRule.Girls:
            return '#ff00ee'
        default:
            return '#20fc03';
    }
}

export function RandomDrinkRule() {
    const rules = [
        DrinkRule.Buddy,

        DrinkRule.Boys,

        DrinkRule.Girls,

        DrinkRule.Death,

        DrinkRule.Drink,
        DrinkRule.Drink,
        DrinkRule.Drink,

        DrinkRule.Drink2,

        DrinkRule.Gift,

        DrinkRule.WaterShot,
        DrinkRule.WaterShot,
        DrinkRule.WaterShot,

        DrinkRule.None,
        DrinkRule.None,
        DrinkRule.None,
        DrinkRule.None,
        DrinkRule.None,
    ];

    return rules[Math.floor(Math.random() * rules.length)];
}

export function DrinkRuleText(rule: DrinkRule) {
    switch(rule) {
        case DrinkRule.Drink:
            return 'Drink!';
        case DrinkRule.Drink2:
            return 'Drink! x 2'
        case DrinkRule.WaterShot:
            return 'Water Shot'
        case DrinkRule.Buddy:
            return 'Buddy Shot'
        case DrinkRule.Death:
            return 'Dead Spot'
        case DrinkRule.Gift:
            return 'Gift a Drink'
            case DrinkRule.Boys:
                return 'Boys Drink'
            case DrinkRule.Girls:
                return 'Girls Drink'
        default:
            return '';
    }
}