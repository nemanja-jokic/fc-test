import initialJSON from './initialJSON.json'

const initialState = new Array(100).fill(initialJSON) 
const changeRow = ( state: any[], payload: { index: any; field: any; value: any } ) => {  
  // let list = state.map((item,index)=>{
  //   if(index === payload.index) {   
  //     // target item 
  //     item = {...item, [payload.field]: payload.value}
  //   }    
  //   return item
  // })
  // return list
  const newState = [...state]
  newState[payload.index] = {...newState[payload.index]}
  newState[payload.index][payload.field] = payload.value
  return newState
}
function reducer(state: any[], action: { type: any; payload: { index: any; field: any; value: any; }; }) {
  switch (action.type) {   
    case 'HANDLE-GROUP-CHANGE':   
      return changeRow(state,action.payload);
    default:
      throw new Error();
  }
}

export {
    initialState,
    reducer
}