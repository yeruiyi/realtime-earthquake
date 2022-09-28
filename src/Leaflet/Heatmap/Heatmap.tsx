import Button from '@mui/material/Button';
import styled from 'styled-components';
import { changeCountEnabled } from '../../Navbar/actions';
import { useDispatch } from 'react-redux';

export default function Heatmap() {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(changeCountEnabled(true));
    };

    return(
        <HeatmapContainer>
            <Button onClick={handleClick} variant="contained">Heatmap</Button>
        </HeatmapContainer>
    )
}

const HeatmapContainer = styled.div`
    position: absolute;
    bottom: 500px;
    z-index: 314159;
    margin:auto;
    width:20%;
    right: 0;
`;