import styled from 'styled-components';

const StartTimeInput = styled.input`
    margin-bottom: 10px;
    @media only screen and (max-width: 990px) {
        margin-top: 10px;
    }
`;

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

const OrderByContainer = styled.div`
  background-color: #ffffff;
  width: fit-content;
  height: fit-content;
  margin-top: 10px;
  border-radius: 3px;
  margin-bottom:10px;
`;

const ButtonContainer = styled.div`
  margin-left: auto;
`;

export { StartTimeInput, EndTimeInput,  LongitudeInput, LatitudeInput, MaxradiusInput, OrderByContainer, ButtonContainer};
