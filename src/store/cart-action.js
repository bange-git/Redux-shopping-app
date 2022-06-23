import { cartActions } from './cartSlice';
import { uiActions } from './ui-slice'

export const fetchData = () => {
  return  async(dispatch) => {
      const fetchHandler = async() => {
          const res = await fetch('https://redux-shopping-cart-787ec-default-rtdb.firebaseio.com/cartItems.json');
          const data = await res.json();
          return data;
      }
       try{
         const cartData = await fetchHandler();
         dispatch(cartActions.replaceData(cartData));
         
       }catch(error){
         dispatch(uiActions.showNotification({
       message: 'request failed',
       type:'error',
       open: true
     }))
       }
  }
}
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
       message: 'Sending request',
       type:'warning',
       open: true
     }))

    const sendRequest = async () => {
     
    const res = await fetch('https://redux-shopping-cart-787ec-default-rtdb.firebaseio.com/cartItems.json', {
       method: 'PUT',
       body: JSON.stringify(cart)
     });
      const data = await res.json();
      dispatch(uiActions.showNotification({
       message: 'request successfully sent to db',
       type:'success',
       open: true
     }))
      
    }

    try {

      await sendRequest();

    } catch (error) {
       dispatch(uiActions.showNotification({
       message: 'request failed',
       type:'error',
       open: true
     }))
    }
  }

}