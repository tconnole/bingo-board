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
    Girls,
    Chug,
    Truth,
    Dare,
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
        case DrinkRule.Chug:
            return '🫗'
        case DrinkRule.Dare:
            return '🫵'
        case DrinkRule.Truth:
            return '👄'
        default:
            return (<></>);
        
    }
}

export function DrinkRuleColor(rule: DrinkRule): string {
    switch(rule) {
        case DrinkRule.Drink:
            return '#ff8b33';
        case DrinkRule.Drink2:
            return '#ff4529'
        case DrinkRule.WaterShot:
            return '#5cb8ff'
        case DrinkRule.Buddy:
            return '#8438ff'
        case DrinkRule.Death:
            return '#2e2e2e'
        case DrinkRule.Gift:
            return '#dedede'
        case DrinkRule.Boys:
            return '#3b4eff'
        case DrinkRule.Girls:
            return '#ff6efd'
        case DrinkRule.Chug:
            return '#ff1900'
        case DrinkRule.Truth:
            return '#03fc88'
        case DrinkRule.Dare:
            return '#ca03fc'
        default:
            return '#20fc03';
    }
}

export function RandomDrinkRule(ratios: Map<DrinkRule, number>) {
    let rules: DrinkRule[] = [];
    ratios.forEach((count, rule) => {
        for(let i = 0; i < count; i++) {
            rules.push(rule);
        }
    })

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
        case DrinkRule.Chug:
            return 'Finish Drink'
        case DrinkRule.Dare:
            return 'Do a Dare'
        case DrinkRule.Truth:
            return 'Answer a Truth'
        default:
            return '';
    }
}