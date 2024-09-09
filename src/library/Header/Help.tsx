import HelpIcon from '@mui/icons-material/Help';
import { Box, Card, CardContent, CardHeader, IconButton, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { DrinkRule, DrinkRuleIcon } from '../CardChip/CardChipDrinkRule';
import CloseIcon from '@mui/icons-material/Close';
import './Help.css';

function Help() {
    const [open, setOpen] = useState<boolean>(false);
    const handleClose = () => {
        setOpen(false);
    }

    function HelpRow(props: {rule: DrinkRule, desc: string, odd?: boolean}) {
        return (
            <Box component='div' sx={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: props.odd ? '#c9c9c9' : '', borderRadius: '0.5rem', padding: props.odd ? '0.25rem' : 0 }}>
                <Typography sx={{fontSize: '2.5rem', textShadow: '1px 1px 2px black'}}>{DrinkRuleIcon(props.rule)}</Typography>
                <Typography variant='h6' sx={{textAlign: 'center', flexGrow: 1}}>{props.desc}</Typography>
            </Box>
        )
    }

    return (
        <div>
            <IconButton onClick={() => setOpen(true)}><HelpIcon sx={{fontSize: '2rem', color: 'white'}} /></IconButton>
            <Modal open={open} onClose={handleClose}>
            <Card variant="outlined" className="HelpModal">
                <CardHeader title='Drinking Rules' action={
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>} />
                <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <HelpRow rule={DrinkRule.Drink} desc='Take a Drink'/>
                    <HelpRow odd={true} rule={DrinkRule.Drink2} desc='Take two Drinks'/>
                    <HelpRow rule={DrinkRule.Chug} desc='Finish your drink'/>
                    <HelpRow odd={true} rule={DrinkRule.WaterShot} desc='Chug some water'/>
                    <HelpRow rule={DrinkRule.Buddy} desc='Choose a buddy to take a Drink with'/>
                    <HelpRow odd={true} rule={DrinkRule.Death} desc="Space is dead and can't be used for bingo" />
                    <HelpRow rule={DrinkRule.Gift} desc='Gift a Drink'/>
                    <HelpRow odd={true} rule={DrinkRule.Boys} desc='Boys Drink'/>
                    <HelpRow rule={DrinkRule.Girls} desc='Girls Drink'/>
                </CardContent>
            </Card>
        </Modal>
        </div>
    )
}

export default Help;