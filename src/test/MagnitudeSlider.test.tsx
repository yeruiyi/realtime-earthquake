import { render, screen, fireEvent  } from "@testing-library/react";
import TimeSlider  from '../Navbar/TimeSlider/TimeSlider';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event'
import { renderWithProviders,getById } from "./test-util"
import '@testing-library/jest-dom'

describe('DropdownList', () => {

    
    test("should always switch to magnitude slider when magnitude tab is pressed", async () => {
     
        renderWithProviders(<TimeSlider />);
        const tab = screen.getByRole('tab', { name: 'Magnitude Slider' });
        await userEvent.click(tab);
        expect(screen.getAllByText("Data for magnitude ranged from 7 to 10")).toHaveLength(1)
    });

    test("should always show 3 button in magnitude slider", async () => {

        renderWithProviders(<TimeSlider />);

        const tab = screen.getByRole('tab', { name: 'Magnitude Slider' });
        await userEvent.click(tab);
        expect(screen.getAllByText("Minor")).toHaveLength(1)
        expect(screen.getAllByText("Medium")).toHaveLength(1)
        expect(screen.getAllByText("Major")).toHaveLength(1)
    });

    test("should update value in silder when minor button is pressed ", async () => {
     
        const { container } = renderWithProviders(<TimeSlider />);

        const tab = screen.getByRole('tab', { name: 'Magnitude Slider' });
        await userEvent.click(tab);
        const minorButton = getById<HTMLButtonElement>(container, 'minor');
        await userEvent.click(minorButton);
        expect(screen.getAllByText("Data for magnitude ranged from 0 to 5")).toHaveLength(1)
    });

    test("should update value in silder when medium button is pressed ", async () => {
     
        const { container } = renderWithProviders(<TimeSlider />);

        const tab = screen.getByRole('tab', { name: 'Magnitude Slider' });
        await userEvent.click(tab);
        const mediumButton = getById<HTMLButtonElement>(container, 'medium');
        await userEvent.click(mediumButton);
        expect(screen.getAllByText("Data for magnitude ranged from 5 to 7")).toHaveLength(1)
    });

    test("should update value in silder when major button is pressed", async () => {
     
        const { container } = renderWithProviders(<TimeSlider />);

        const tab = screen.getByRole('tab', { name: 'Magnitude Slider' });
        await userEvent.click(tab);
        const majorButton = getById<HTMLButtonElement>(container, 'major');
        await userEvent.click(majorButton);
        expect(screen.getAllByText("Data for magnitude ranged from 7 to 10")).toHaveLength(1)
    });

})
