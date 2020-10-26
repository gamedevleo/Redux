const redux = require('redux');
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;

const initialState ={
  loading:false,
  users:[],
  error:''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const FetchUsersRequest= ()=>{
  return{
    type:FETCH_USERS_REQUEST
  }
}


const FetchUsersSuccess= users=>{
  return{
    type:FETCH_USERS_SUCCESS,
    payload:users
  }
}

const FetchUsersFailure = (error)=>{
  return {
    type:FETCH_USERS_FAILURE,
    payload:error
  }
}


const reducer = (state=initialState,action)=>{
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return{
        ...state,
        loading:true
      }
    case FETCH_USERS_SUCCESS:
      return{
          loading:false,
          users:action.payload,
          error:''
        }

    case FETCH_USERS_FAILURE:
      return{
        ...state,
        loading:false,
        users:[],
        error:action.payload
      }
  }
};

const fetchUsers =()=>{
  return function(dispatch){
    dispatch(FetchUsersRequest());
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(response =>{
        const users = response.data.map(user =>user.id);
        dispatch(FetchUsersSuccess(users));
      })
      .catch(error => {
        dispatch(FetchUsersFailure(error.message));
      })
  }
}


const store = createStore(reducer,applyMiddleware(thunkMiddleware));

const unsubscribe=store.subscribe(()=>console.log(store.getState()));
store.dispatch(fetchUsers());
//unsubscribe();
