import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import Products from '../src/screens/Productsdisplay';
import {useNavigation} from '@react-navigation/native';
import {mockData} from '../src/utils/mockdata';

describe('Product display page', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => {
          return Promise.resolve(mockData);
        },
      }),
    );
  });
  
  it('should renderall the producs', async () => {
    const {getByRole} = render(<Products></Products>);
    

    const flatlist = screen.getByTestId('flatlist');
    expect(flatlist).toBeDefined();

    const productItems = await screen.findAllByTestId(/product-item-/);

    // Ensure that the correct number of items are rendered
    expect(productItems.length).toBe(mockData.length);
    const productTitle = screen.getByText(
      'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    );
    expect(productTitle).toBeTruthy();

   
  });
  it('should incresae the count ', async () => {
    const {getByRole,getByText} = render(<Products></Products>);
    waitFor(()=>{
        fireEvent.press(getByRole('button', {name: 'increase'}));
        const productItem = screen.getByText("1")
    expect(productItem).toBeDefined()
    })
   
    
    
  });
  it('should render ased on filter ', async () => {
    const {getByRole} = render(<Products></Products>);
    waitFor(()=>{
        fireEvent.press(getByRole('button', {name: 'filter'}));  
    })

    waitFor(async()=>{
        const productItem = await screen.findAllByTestId(/product-item-/);
        expect(productItem.length).toBe(3);
    })
   
    
  });
  
});

