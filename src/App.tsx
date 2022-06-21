import React, { useReducer } from 'react';
import './App.css'

// Components
import Group from './components/Group';

// Reducer
import {
  initialState,
  reducer
} from './reducer/store'


function App() {  
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const onChangeGroup = (index: any,field: any,value: any) => 
    dispatch({type: 'HANDLE-GROUP-CHANGE', payload: { index, field, value }})
  
  return (
    <div className="App">    
      {
        state.map((group , index)=> (
            <Group  
              key={index}
              index={index}
              group={group} 
              onChangeGroup={onChangeGroup}
            />
        ))
      }
    </div>
  );
}

export default App;
