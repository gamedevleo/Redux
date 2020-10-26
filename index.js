const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

const cakeState = {
  numOfCakes:10
}

const iceCreamState ={
  numOfIceCream:20
}

function BuyCake()
{
  return {
    type:BUY_CAKE,
    info:'Customer wants to buy a cake.'
  }
}
function BuyIceCream()
{
  return {
    type:BUY_ICECREAM,
    info:'Customer wants to buy an ice cream.'
  }
}

const cakeReducer = (state=cakeState,action) =>{
  switch(action.type){
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes:state.numOfCakes-1
      }
    default:
      return state;
  }
}

const iceCreamReducer = (state=iceCreamState,action) =>{
  switch (action.type){
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCream:state.numOfIceCream-1
      }
    default:
      return state;
  }

}

const rootReducer = combineReducers({cake:cakeReducer,iceCream:iceCreamReducer});

const store = createStore(rootReducer,applyMiddleware(logger));

console.log('initialState:',store.getState());

const unsubscribe = store.subscribe(()=> console.log('updated state:',store.getState()));


store.dispatch(BuyCake());
store.dispatch(BuyIceCream());
store.dispatch(BuyIceCream());
unsubscribe();



// const redux = require('redux');
// const createStore = redux.createStore;
//
// const initialState ={
//   numOfCakes:10,
//   numOfIceCream:7
// };
//
// const BUY_CAKE ='BUY_CAKE';
// const BUY_ICECREAM ='BUY_ICECREAM';
//
// function BuyCake(){
//   return{
//     type:BUY_CAKE,
//     info:'The Action of buy cake'
//   }
// };
//
// function BuyIceCream(){
//   return {
//     type:BUY_ICECREAM,
//     info:'Customer wants to buy an icecream'
//   }
// }
//
// const reducer = (state = initialState,action) =>{
//   switch (action.type){
//
//     case BUY_CAKE:
//       return {
//         ...state,
//         numOfCakes:state.numOfCakes -1
//       };
//       break;
//     case BUY_ICECREAM:
//       return{
//         ...state,
//         numOfIceCream:state.numOfIceCream-1
//       }
//     default:
//       return state;
//   }
// }
//
//
// const store = createStore(reducer);
// console.log('initialState',store.getState());
//
// const unsubscribe = store.subscribe(()=> console.log('Updated state',store.getState()));
// store.dispatch(BuyCake());
// store.dispatch(BuyCake());
// store.dispatch(BuyCake());
// store.dispatch(BuyIceCream());
// unsubscribe();
