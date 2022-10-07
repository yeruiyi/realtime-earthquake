import App from '../App';
import { renderWithProviders } from "./test-util"
import { render, screen, fireEvent  } from "@testing-library/react";

describe('App', () => {

    test("Render all elements without crashing", async () => {
       
        render( <App />);
        expect(screen.getAllByText("Earthquake")).toBeInTheDocument()
    });
})