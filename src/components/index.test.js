import React from 'react'
import { unmountComponentAtNode } from "react-dom"
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils"


import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { ExchangeController } from './index'

const mockStore = configureMockStore([])

let container = null;

describe("exchange controller", () => {
    it("automatic amount calculation test", () => {
        const store = mockStore({ 
            wallet: [
                {
                    currency: 'EUR', symbol: '', rate: 1, amount: 10,
                }, {
                    currency: 'USD', symbol: '', rate: 0.8, amount: 10,
                }
            ]
        })
        
        container = render(
            <Provider store={store}>
                <ExchangeController />
            </Provider>
        )
        
        const firstValueInput = container.getByTestId('firstValue')
        expect(firstValueInput.value).toEqual("")
        fireEvent.change(firstValueInput, {target: {value: "5"}})
        const secondValueInput = container.getByTestId('secondValue')
        expect(secondValueInput.value).toEqual("4")
    })    
})
