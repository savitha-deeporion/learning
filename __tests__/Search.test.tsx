import React from 'react';
import { fireEvent, render } from "@testing-library/react-native"
import SearchComponent from "../src/screens/Searchcomponent"

describe("search filter",()=>{
    it("should all the component",()=>{
        const {getAllByTestId}=render(<SearchComponent/>)

        expect(getAllByTestId("text")).toHaveLength(5)
    })

    it("should items  having letter a",()=>{
        const {getAllByTestId,getByTestId}=render(<SearchComponent/>)
        let textbox=getByTestId("search-input")
        fireEvent.changeText(textbox,"y")
        expect(getAllByTestId("text")).toHaveLength(2)


    })
    it("should items  having letter xy",()=>{
        const {getByTestId,queryByTestId}=render(<SearchComponent/>)
        let textbox=getByTestId("search-input")
        fireEvent.changeText(textbox,"zy")
        expect(queryByTestId("text")).toBeNull()


    })
})


