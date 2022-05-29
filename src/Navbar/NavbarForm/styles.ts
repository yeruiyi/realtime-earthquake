import styled from 'styled-components';

const EndTimeInput = styled.input`
    margin-bottom: 10px;
    @media only screen and (max-width: 990px) {
        margin-top: 10px;
    }
`;

const LongitudeInput = styled.input`
    @media only screen and (max-width: 990px) {
        margin-top: 10px;
    }
`;

const LatitudeInput = styled.input`
    @media only screen and (max-width: 990px) {
        margin-top: 10px;
    }
`;

const MaxradiusInput = styled.input`
    @media only screen and (max-width: 990px) {
        margin-top: 10px;
    }
`;


const Icon = styled.i`
    cursor: pointer;
    border: none !important;
    outline: none !important;
`;

export { EndTimeInput, Icon, LongitudeInput, LatitudeInput, MaxradiusInput };