import { render, screen, fireEvent  } from "@testing-library/react";
import NavBarForm  from '../Navbar/NavbarForm/NavbarForm';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import assert from "assert";
import userEvent from '@testing-library/user-event'

function getById<T extends Element>(container: HTMLElement, id: string): T {
    const element = container.querySelector<T>(`#${id}`);
    assert(element !== null, `Unable to find an element with ID #${id}.`)
    return element;
}

describe('NavBarForm', () => {
    const initialState = { startTime: '', endTime: '', longitude:'', latitude:'', maxradius:'', orderBy:'', startTimeTooltipOpen:false, endTimeTooltipOpen:false };
    const mockStore = configureStore();
    let store;


    test("input should be initially empty", async () => {
        store = mockStore(initialState);
        const { container } = render(
            <Provider store={store}>
                <NavBarForm />
            </Provider>
        );

        const startTimeInputElement = getById<HTMLInputElement>(container, 'startTime');
        const endTimeInputElement = getById<HTMLInputElement>(container, 'endTime');
        const longitudeInputElement =  getById<HTMLInputElement>(container, 'longitude');
        const latitudeInputElement = getById<HTMLInputElement>(container, 'latitude');
        const maxradiusInputElement = getById<HTMLInputElement>(container, 'maxradius');
        expect(startTimeInputElement.value).toBe("");
        expect(endTimeInputElement.value).toBe("");
        expect(longitudeInputElement.value).toBe("");
        expect(latitudeInputElement.value).toBe("");
        expect(maxradiusInputElement.value).toBe("");
    });

    test("should allow update of all inputs", async () => {
        store = mockStore(initialState);
        const { container } = render(
            <Provider store={store}>
                <NavBarForm />
            </Provider>
        );
        const startTimeInputElement = getById<HTMLInputElement>(container, 'startTime');
        const endTimeInputElement = getById<HTMLInputElement>(container, 'endTime');
        const longitudeInputElement =  getById<HTMLInputElement>(container, 'longitude');
        const latitudeInputElement = getById<HTMLInputElement>(container, 'latitude');
        const maxradiusInputElement = getById<HTMLInputElement>(container, 'maxradius');
        await userEvent.type(startTimeInputElement, "2022-09-13");
        await userEvent.type(endTimeInputElement, "2022-09-13");
        await userEvent.type(longitudeInputElement, "20");
        await userEvent.type(latitudeInputElement, "50");
        await userEvent.type(maxradiusInputElement, "100");
        expect(startTimeInputElement.value).toBe("2022-09-13");
        expect(endTimeInputElement.value).toBe("2022-09-13");
        expect(longitudeInputElement.value).toBe("20");
        expect(latitudeInputElement.value).toBe("50");
        expect(maxradiusInputElement.value).toBe("100");
    });

    test("should not submit invalid start date input", async () => {
        store = mockStore(initialState);
        const { container } = render(
            <Provider store={store}>
                <NavBarForm />
            </Provider>
        );
        const timeInputElement = getById<HTMLInputElement>(container, 'startTime');
        await userEvent.type(timeInputElement, `0001-09-13[Enter]`);

        expect(timeInputElement.value).toBe("");

    });

    test("should not submit invalid end date input", async () => {
        store = mockStore(initialState);
        const { container } = render(
            <Provider store={store}>
                <NavBarForm />
            </Provider>
        );
        const timeInputElement = getById<HTMLInputElement>(container, 'endTime');
        await userEvent.type(timeInputElement, `0001-09-13[Enter]`);

        expect(timeInputElement.value).toBe("");

    });

    
    test("should not submit when either one of the date input is missing", async () => {
        store = mockStore(initialState);
        const { container } = render(
            <Provider store={store}>
                <NavBarForm />
            </Provider>
        );
        const startTimeInputElement = getById<HTMLInputElement>(container, 'startTime');
        const endTimeInputElement = getById<HTMLInputElement>(container, 'endTime');
        await userEvent.type(startTimeInputElement, `2002-09-13[Enter]`);

        expect(startTimeInputElement.value).toBe("");
        expect(endTimeInputElement.value).toBe("");
    });

    test("should not submit when longitude is invalid", async () => {
        store = mockStore(initialState);
        const { container } = render(
            <Provider store={store}>
                <NavBarForm />
            </Provider>
        );
        const longitudeInputElement =  getById<HTMLInputElement>(container, 'longitude');
        await userEvent.type(longitudeInputElement, `-181[Enter]`);

        expect(longitudeInputElement.value).toBe("");
    });

    test("should not submit when latitude is invalid", async () => {
        store = mockStore(initialState);
        const { container } = render(
            <Provider store={store}>
                <NavBarForm />
            </Provider>
        );
        const latitudeInputElement = getById<HTMLInputElement>(container, 'latitude');
        await userEvent.type(latitudeInputElement, `-91[Enter]`);

        expect(latitudeInputElement.value).toBe("");
    });

    test("should not submit when radius is invalid", async () => {
        store = mockStore(initialState);
        const { container } = render(
            <Provider store={store}>
                <NavBarForm />
            </Provider>
        );
        const maxradiusInputElement = getById<HTMLInputElement>(container, 'maxradius');
        await userEvent.type(maxradiusInputElement, `-1[Enter]`);

        expect(maxradiusInputElement.value).toBe("");
    });

    test("should not submit when either one of the coordinate and radius input is missing", async () => {
        store = mockStore(initialState);
        const { container } = render(
            <Provider store={store}>
                <NavBarForm />
            </Provider>
        );
        const longitudeInputElement =  getById<HTMLInputElement>(container, 'longitude');
        const latitudeInputElement = getById<HTMLInputElement>(container, 'latitude');
        const maxradiusInputElement = getById<HTMLInputElement>(container, 'maxradius');
        await userEvent.type(longitudeInputElement, `90[Enter]`);

        expect(longitudeInputElement.value).toBe("");
        expect(latitudeInputElement.value).toBe("");
        expect(maxradiusInputElement.value).toBe("");
    });
})
