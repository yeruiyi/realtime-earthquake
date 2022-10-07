import { render, screen, fireEvent  } from "@testing-library/react";
import DropdownList  from '../Navbar/DropdownList/DropdownList';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event'
import { renderWithProviders,getById } from "./test-util"
import '@testing-library/jest-dom'

describe('DropdownList', () => {

    test("should always show default value in drop down list", async () => {
     
        // store = initialStore(initialState);
        renderWithProviders(<DropdownList />);

        expect(screen.getAllByText("1 day")).toHaveLength(2)
    });
})
