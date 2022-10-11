import { render, screen, fireEvent  } from "@testing-library/react";
import DropdownList  from '../Navbar/DropdownList/DropdownList';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event'
import { renderWithProviders,getById } from "./test-util"
import '@testing-library/jest-dom'

describe('DropdownList', () => {

    test("should always list default values in drop down list", async () => {
     
        renderWithProviders(<DropdownList />);

        expect(screen.getAllByText("1 day")).toHaveLength(2)
    });

    test("should contain all dropdown values in drop down list", async () => {
     
        renderWithProviders(<DropdownList />);

        expect(screen.getAllByText("1 day")).toHaveLength(2)
        expect(screen.getAllByText("3 days")).toHaveLength(1)
        expect(screen.getAllByText("10 days")).toHaveLength(1)
        expect(screen.getAllByText("20 days")).toHaveLength(1)
        expect(screen.getAllByText("30 days")).toHaveLength(1)

    });
})
