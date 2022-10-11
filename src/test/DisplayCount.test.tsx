import { screen  } from "@testing-library/react";
import CountButton  from '../Navbar/CountButton/CountButton';
import { renderWithProviders } from "./test-util"
import '@testing-library/jest-dom'
import fetch from 'jest-fetch-mock'



describe('DropdownList', () => {
    test("should always display 0 if data retrival is unsuccessful", async () => {
        fetch.mockResponseOnce(JSON.stringify({ }))
        renderWithProviders(<CountButton />);
        expect(screen.getAllByText("0")).toHaveLength(1)
    });

})
