import { Box } from "@mui/material";
import './CardChip.css';

export interface CardChipProps {
    selected: boolean;
    label: string;
}

function CardChip(props: CardChipProps) {
    return (
            <div 
                className="CardChip-container"
                style={{
                    // color: !props.selected ? 'white' : 'black',
                }}>
                    <div 
                        className={`CardChip-Chip ${props.selected ? 'CardChip-position-selected' : 'CardChip-position'}`}
                        style={{
                            color: !props.selected ? 'white' : 'black',
                            backgroundColor: props.selected ? '#6aaa64' : '#121213',
                        }}
                    >
                            {props.label}
                    </div>
            </div>);
}

export default CardChip;