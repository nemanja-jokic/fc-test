import React, { useReducer } from 'react';

// Components
import Group from './components/Group';

// Reducer
import {
  initialState,
  reducer
} from './reducer/store'


function App() {  
  const [state, dispatch] = useReducer(reducer, initialState);  
   
  return (
    <div className="App">    
      {
        state.map((group , index)=> (
          <React.Fragment key={index}>
            <Group  
              index={index} 
              group={group} 
              onChangeGroup={(index,field,value) =>
                dispatch({type: 'HANDLE-GROUP-CHANGE', payload: { index, field, value }})
              }
            />
          </React.Fragment>
        ))
      }
    </div>
  );
}

export default App;
