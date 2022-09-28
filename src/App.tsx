// import { createGlobalStyle } from 'styled-components';
// import styled from 'styled-components';
import { Provider } from 'react-redux';

import Leaflet from './Leaflet';
import NavBar from './Navbar';
import store from './store';
import TimeSlider from './Navbar/TimeSlider';
import AutoPlay from './Leaflet/AutoPlay';
import CountButton from './Navbar/CountButton';
export default function App() {
  return (
    <>
      {/* <GlobalStyle /> */}
      <Provider store={store}>
        <NavBar />
        <Leaflet />
        <TimeSlider/>
        <AutoPlay/>
        <CountButton/>
      </Provider>
    </>
  );
}

// const GlobalStyle = createGlobalStyle`
//   body {
//     margin-left: 10%;
//   }
// `;

// const BodyContainer = styled.div`
//   margin-left: 10%; 
// `;