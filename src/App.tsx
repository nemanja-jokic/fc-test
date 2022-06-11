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
          <React.Fragment key={index}>
            <Group  
              index={index} 
              group={group} 
              onChangeGroup={onChangeGroup}
            />
          </React.Fragment>
        ))
      }
    </div>
  );
}

export default App;
