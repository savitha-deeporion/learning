import React from "react";
import User2 from "../src/utils/mock2";
import axios from "axios";

import LoginScrn from "../src/screens/LoginScrn";
import renderer from 'react-test-renderer'
import { render } from "@testing-library/react-native";

jest.mock("axios")


describe("testing api",()=>{
    it("api data",async()=>{

        const apidata= await User2.get()
        console.log("apidat",apidata)
        // expect(apidata).toBe("Gwenborough")
    })
    it("compnent render",()=>{
        const wrapper=render(<LoginScrn/>)
       
   
    })
   
  
})
