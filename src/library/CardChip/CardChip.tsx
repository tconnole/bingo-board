import { Box } from "@mui/material";

export interface CardChipProps {
    selected: boolean;
    label: string;
}

function CardChip(props: CardChipProps) {
    return (
            <Box 
                sx={{
                    width: '100%',
                    aspectRatio: '1',
                    color: !props.selected ? 'white' : 'black',
                    backgroundColor: props.selected ? '#6aaa64' : '',
                    borderRadius: '0.25rem',
                    border: '0.25rem solid #3a3a3c',
                    overflow: 'hidden',
                    overflowWrap: 'break-all',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {props.label}
            </Box>);
}

export default CardChip;