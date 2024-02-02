import { Box } from "@mui/material";
import './CardChip.css';

export interface CardChipProps {
    selected: boolean;
    label: string;
}

function CardChip(props: CardChipProps) {
    return (
            <div 
                className="CardChip-Chip"
                style={{
                    color: !props.selected ? 'white' : 'black',
                    backgroundColor: props.selected ? '#6aaa64' : '',
                }}>
                    <Box 
                sx={{
                    color: !props.selected ? 'white' : 'black',
                    overflow: 'hidden',
                    overflowWrap: 'break-all',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    left: 0, right: 0, top: 0, bottom: 0
                }}>
                        {props.label}
                    </Box>
            </div>);
}

export default CardChip;