// __tests__/LoginScrn.test.tsx
// import React from 'react';
// import {fireEvent, render,screen,waitFor} from '@testing-library/react-native';
// import LoginScrn from '../src/screens/LoginScrn';
// import User from '../src/utils/mock';

//describe('Loginscreen', () => {
//   it('checking the text and placeholder', () => {
//     const {getByText, getAllByTestId, getByPlaceholderText} = render(
//       <LoginScrn></LoginScrn>,
//     );
//     //checking by values
//     expect(getByText('LoginScrn'));
//     expect(getAllByTestId('textinput')).toBeTruthy();
//     //placeholder text checking
//     expect(getByPlaceholderText('email')).toBeTruthy();
//   });

// it('checking userevent by typing', () => {
//     const {getByTestId} = render(<LoginScrn />);
//     const input = getByTestId('textinput');
//     const inputval = getByTestId('emailvalue');
//     //firing the events

//     fireEvent.changeText(input, 'hello');
//     expect(input.props.value).toBe('HELLO');

//     //expecting value to be in text
//     expect(inputval.props.children).toBe('hello');
//   });

//   it("api fetching",async function(){
//     global.fetch=jest.fn().mockImplementation(()=>{
//       var promise=new Promise((resolve,reject)=>{
//         resolve({
//           json:function(){
// return {Id:1}
//           }
//         })
//       })
//       return promise
//     })
//     const response=await  User.get()
//     expect(response.Id).toBe(1)

//   })

//  });

// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import LoginScrn from '../src/screens/LoginScrn';
// import User from '../src/utils/mock';

// describe('LoginScrn component', () => {

//   beforeEach(() => {

//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//       })
//     );
//   });

//   afterEach(() => {
//     
//     jest.clearAllMocks();
//   });

//   it('should display the loading indicator while fetching data', () => {
//     // Mock fetch to delay the resolution so we can test the loading state
//     global.fetch= jest.fn().mockImplementation(() =>
//       new Promise(resolve => setTimeout(() => resolve({
//         json: () => Promise.resolve([]),
//       }), 100))
//     );

//     const { getByTestId } = render(<LoginScrn />);

//     // Check if the loading indicator is present initially
//     expect(getByTestId('loading-indicator')).toBeTruthy();
//   });

//   it('should render the login screen elements correctly', () => {
//     const { getByText, getByPlaceholderText, getByTestId } = render(<LoginScrn />);

//     // Check if the title and inputs are rendered
//     expect(getByText('LoginScrn')).toBeTruthy();
//     expect(getByPlaceholderText('email')).toBeTruthy();
//     expect(getByTestId('textinput')).toBeTruthy();
//     expect(getByPlaceholderText('phonenumber')).toBeTruthy();
//   });

//   it('should update state when typing in the email input', () => {
//     const { getByTestId } = render(<LoginScrn />);
//     const input = getByTestId('textinput');

//     // Fire the changeText event
//     fireEvent.changeText(input, 'test@example.com');

//     // Expect the email to be updated in the component's state and transformed to uppercase
//     expect(input.props.value).toBe('TEST@EXAMPLE.COM');
//   });

//   it('should render products when data is fetched', async () => {
//     // Mock the fetch API with data
//     global.fetch= jest.fn().mockResolvedValue({
//       json: () => Promise.resolve([{ name: 'Product 1' }, { name: 'Product 2' }]),
//     });

//     const { getByText } = render(<LoginScrn />);

//     // Wait for the products to be rendered
//     await waitFor(() => {
//       expect(getByText('Product 1')).toBeTruthy();
//       expect(getByText('Product 2')).toBeTruthy();
//     });
//   });

//   it('should display an error message if fetch fails', async () => {
//     // Mock fetch to reject the promise, simulating an error
//     global.fetch= jest.fn().mockRejectedValue(new Error('API error'));

//     const { getByText } = render(<LoginScrn />);

//     // Wait for the error message to appear
//     await waitFor(() => {
//       expect(getByText('error occured')).toBeTruthy();
//     });
//   });
// });
// __tests__/LoginScrn.test.tsx
import React from 'react';
import {
  render,
  waitFor,
  screen,
  fireEvent,
} from '@testing-library/react-native';
import LoginScrn from '../src/screens/LoginScrn';
import User from '../src/utils/mock'; // Assuming this is the utility for the API call
const REAL_API_URL = 'https://jsonplaceholder.typicode.com/users';

jest.mock('../src/utils/mock');

// describe('LoginScrn component', () => {
//   beforeEach(() => {
//     jest.resetAllMocks();

//   });

//   it('should show loading indicator while fetching data', () => {

//     (User.get as jest.Mock).mockImplementation(() => new Promise(() => {}));

//     const { getByTestId } = render(<LoginScrn />);

//     expect(getByTestId('loading-indicator')).toBeTruthy();
//   });

//   it('should display fetched data after loading', async () => {

//     const mockProducts = [{name: 'Product 1'}, {name: 'Product 2'}];
//     (User.get as jest.Mock).mockResolvedValue(mockProducts);

//     const { getByText, queryByTestId } = render(<LoginScrn />);

//     await waitFor(() => {
//       expect(queryByTestId('loading-indicator')).toBeNull();
//     });

//     expect(getByText('Product 1')).toBeTruthy();
//     expect(getByText('Product 2')).toBeTruthy();
//   });

//   it('should handle API error and show error message', async () => {

//     (User.get as jest.Mock).mockRejectedValue('API error');

//     const { getByText, queryByTestId } = render(<LoginScrn />);

//    // queryByTestId ==> returns null if the elements is not there
//    //getBYTEstId ==> throws error if not present
//     await waitFor(() => {
//       expect(queryByTestId('loading-indicator')).toBeNull();
//     });

//     expect(getByText('error occured')).toBeTruthy();
//   });
//   // it('should display fetched data after loading from real API', async () => {
//   //   // Mock the User.get method to use the real API endpoint
//   //   (User.get as jest.Mock).mockImplementation(() =>
//   //     fetch(REAL_API_URL).then(res => res.json())
//   //   );

//   //   const { getByText, queryByTestId } = render(<LoginScrn />);

//   //   // Wait for the ActivityIndicator to disappear
//   //   await waitFor(() => {
//   //     expect(queryByTestId('loading-indicator')).toBeNull();
//   //   });

//   //   // Wait for the data to be rendered
//   //   await waitFor(() => {
//   //     // Fetch the data from the API directly
//   //     fetch(REAL_API_URL)
//   //       .then(res => res.json())
//   //       .then(data => {
//   //         data.forEach(item => {
//   //           expect(getByText(item.name)).toBeTruthy();
//   //         });
//   //       });
//   //   });
//   // });

//   it("should  handle the api resolved response",async ()=>{
//     const mockProducts = [{username: 'Product 1'}, {name: 'Product 2'}];

//     (User.get as jest.Mock).mockResolvedValue(mockProducts);
//     const {queryByTestId,getByText}=render(<LoginScrn/>)

// await  waitFor(()=>{
//   expect(queryByTestId("loading-indicatior")).toBeNull()
// })
// expect(getByText("Product 2")).toBeTruthy()

//   })

// });// describe('LoginScrn component', () => {
//   beforeEach(() => {
//     jest.resetAllMocks();

//   });

//   it('should show loading indicator while fetching data', () => {

//     (User.get as jest.Mock).mockImplementation(() => new Promise(() => {}));

//     const { getByTestId } = render(<LoginScrn />);

//     expect(getByTestId('loading-indicator')).toBeTruthy();
//   });

//   it('should display fetched data after loading', async () => {

//     const mockProducts = [{name: 'Product 1'}, {name: 'Product 2'}];
//     (User.get as jest.Mock).mockResolvedValue(mockProducts);

//     const { getByText, queryByTestId } = render(<LoginScrn />);

//     await waitFor(() => {
//       expect(queryByTestId('loading-indicator')).toBeNull();
//     });

//     expect(getByText('Product 1')).toBeTruthy();
//     expect(getByText('Product 2')).toBeTruthy();
//   });

//   it('should handle API error and show error message', async () => {

//     (User.get as jest.Mock).mockRejectedValue('API error');

//     const { getByText, queryByTestId } = render(<LoginScrn />);

//    // queryByTestId ==> returns null if the elements is not there
//    //getBYTEstId ==> throws error if not present
//     await waitFor(() => {
//       expect(queryByTestId('loading-indicator')).toBeNull();
//     });

//     expect(getByText('error occured')).toBeTruthy();
//   });
//   // it('should display fetched data after loading from real API', async () => {
//   //   // Mock the User.get method to use the real API endpoint
//   //   (User.get as jest.Mock).mockImplementation(() =>
//   //     fetch(REAL_API_URL).then(res => res.json())
//   //   );

//   //   const { getByText, queryByTestId } = render(<LoginScrn />);

//   //   // Wait for the ActivityIndicator to disappear
//   //   await waitFor(() => {
//   //     expect(queryByTestId('loading-indicator')).toBeNull();
//   //   });

//   //   // Wait for the data to be rendered
//   //   await waitFor(() => {
//   //     // Fetch the data from the API directly
//   //     fetch(REAL_API_URL)
//   //       .then(res => res.json())
//   //       .then(data => {
//   //         data.forEach(item => {
//   //           expect(getByText(item.name)).toBeTruthy();
//   //         });
//   //       });
//   //   });
//   // });

//   it("should  handle the api resolved response",async ()=>{
//     const mockProducts = [{username: 'Product 1'}, {name: 'Product 2'}];

//     (User.get as jest.Mock).mockResolvedValue(mockProducts);
//     const {queryByTestId,getByText}=render(<LoginScrn/>)

// await  waitFor(()=>{
//   expect(queryByTestId("loading-indicatior")).toBeNull()
// })
// expect(getByText("Product 2")).toBeTruthy()

//   })

// });















describe('LoginScrn Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  it('should set error message when phone number length exceeds 10 digits', () => {
    const {getByTestId, getByText, getByRole} = render(<LoginScrn />);
    const textInputs = getByTestId('textinput');
    const textInput = getByTestId('textinputs');
    const submitButton = getByRole('button');
    fireEvent.changeText(textInputs, 'gt');
    fireEvent.changeText(textInput, '12345678901');

    fireEvent.press(submitButton);

    expect(getByText('number length should be 10 digits')).toBeTruthy();
  });

  it('should not set error message when phone number length is  less', () => {
    const {getByTestId, getByText, getByRole} = render(<LoginScrn />);

    const textInput = getByTestId('textinputs');
    const textInputs = getByTestId('textinput');

    const submitButton = getByRole('button');
    fireEvent.changeText(textInputs, 'gt');
    fireEvent.changeText(textInput, '123456789');

    fireEvent.press(submitButton);

    expect(getByText('number length should be 10 digits')).toBeTruthy();
  });

  it('should email is empty  how error while clicking on button', () => {
    const {getByTestId, getByText, getByRole} = render(<LoginScrn />);

    const textInput = getByTestId('textinputs');
    const textInputs = getByTestId('textinput');

    const submitButton = getByRole('button');
    fireEvent.changeText(textInput, '1234567890');
    fireEvent.changeText(textInputs, '');
    fireEvent.press(submitButton);
    expect(getByText('email should not be empty')).toBeTruthy();
  });
});
