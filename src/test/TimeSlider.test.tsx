import { render, screen, fireEvent  } from "@testing-library/react";
import TimeSlider  from '../Navbar/TimeSlider/TimeSlider';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event'
import { renderWithProviders,getById } from "./test-util"
import '@testing-library/jest-dom'

describe('Time Slider', () => {
    const currentYear = new Date().getFullYear();
    test("should always show 2 tabs for switching the slider", async () => {
     
        renderWithProviders(<TimeSlider />);

        expect(screen.getAllByText("Time Slider")).toHaveLength(1)
        expect(screen.getAllByText("Magnitude Slider")).toHaveLength(1)
    });

    test("should always show 3 button to switch in time slider", async () => {
     
        renderWithProviders(<TimeSlider />);

        expect(screen.getAllByText("Year")).toHaveLength(1)
        expect(screen.getAllByText("Month")).toHaveLength(1)
        expect(screen.getAllByText("Date")).toHaveLength(1)
    });

    test("should switch silder when year button is pressed ", async () => {
     
        const { container } = renderWithProviders(<TimeSlider />);

        const yearButton = getById<HTMLButtonElement>(container, 'year');
        await userEvent.click(yearButton);
        expect(screen.getAllByText("Data for current year")).toHaveLength(1)
    });

    test("should switch silder when date button is pressed ", async () => {
     
        const { container } = renderWithProviders(<TimeSlider />);

        const yearButton = getById<HTMLButtonElement>(container, 'date');
        await userEvent.click(yearButton);
        expect(screen.getAllByText("Data for today")).toHaveLength(1)
    });

    test("should switch silder when month button is pressed ", async () => {
     
        const { container } = renderWithProviders(<TimeSlider />);

        const monthButton = getById<HTMLButtonElement>(container, 'month');
        await userEvent.click(monthButton);
        expect(screen.getAllByText("Data for current month")).toHaveLength(1)
    });

    
})
