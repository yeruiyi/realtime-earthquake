import { render, screen, fireEvent  } from "@testing-library/react";
import TimeSlider  from '../Navbar/TimeSlider/TimeSlider';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import assert from "assert";
import userEvent from '@testing-library/user-event'
import rootReducer from "../store/rootReducer";


function getById<T extends Element>(container: HTMLElement, id: string): T {
    const element = container.querySelector<T>(`#${id}`);
    assert(element !== null, `Unable to find an element with ID #${id}.`)
    return element;
}

describe('TimeSlider', () => {
    const initialState = { expanded: true, tabValue: 1, clusterChecked: false, switchDisabled: false, rangeType: '3', timeRange: [44,44], minTimeRange: 13, maxTimeRange:44, magType:'3', magRange: [7,10], minMagRange: 0, maxMagRange: 10 };
    const mockStore = configureStore();
    let store;
    
    // const spy = jest.spyOn(redux, 'useSelector')
    // spy.mockReturnValue({ autoplayEnabled:false })
    // beforeEach(() => {
    //     spy.mockClear()
    // })

    const currentYear = new Date().getFullYear();

    test("Update slider range when year selected", async () => {
        // spy.mockReturnValue({ autoplayEnabled:false })
        jest.mock('../store/rootReducer', () => ({ __esModule: true, ...jest.requireActual('../store/rootReducer') }));
        store = mockStore(initialState);
        const { container } = render(
            <Provider store={store}>
                <TimeSlider />
            </Provider>
        );

        const yearButton = getById<HTMLButtonElement>(container, 'year');
        const timeSlider = getById<HTMLInputElement>(container, 'time-slider');
        await userEvent.click(yearButton);
        expect(timeSlider.value).toBe([currentYear,currentYear]);
    });
})
