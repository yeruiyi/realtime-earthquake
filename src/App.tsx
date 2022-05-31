// import { createGlobalStyle } from 'styled-components';
// import styled from 'styled-components';
import { Provider } from 'react-redux';

import Leaflet from './Leaflet';
import NavBar from './Navbar';
import store from './store';
import TimeSlider from './Navbar/TimeSlider';
export default function App() {
  return (
    <>
      {/* <GlobalStyle /> */}
      <Provider store={store}>
        <NavBar />
        <Leaflet />
        <TimeSlider/>
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