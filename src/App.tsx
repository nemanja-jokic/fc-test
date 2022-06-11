import React, { useReducer, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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

    const [count, setCount] = useState({
      prev: 0,
      next: 10
    })
    const [hasMore, setHasMore] = useState(true);
    const [current, setCurrent] = useState(state.slice(count.prev, count.next))
    const getMoreData = () => {
      if (current.length === state.length) {
          setHasMore(false);
        return;
      }
    setTimeout(() => {
      setCurrent(current.concat(state.slice(count.prev + 10, count.next + 10)))
    }, 500)
    setCount((prevState) => ({ prev: prevState.prev + 10, next: prevState.next + 10 }))
  }

  useEffect(() => {
      setCurrent(state.slice(0, count.next))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])
  
  
  return (
    <div className="App">    
      <InfiniteScroll
        dataLength={current.length}
        next={getMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div>
          {current && current.map(((group , index)=> (
            <React.Fragment key={index}>
              <Group  
                index={index} 
                group={group} 
                onChangeGroup={onChangeGroup}
              />
            </React.Fragment>
          )))
          }
        </div>
      </InfiniteScroll>
      {/* {
        state.map((group , index)=> (
          <React.Fragment key={index}>
            <Group  
              index={index} 
              group={group} 
              onChangeGroup={onChangeGroup}
            />
          </React.Fragment>
        ))
      } */}
    </div>
  );
}

export default App;

// const [count, setCount] = useState({
//   prev: 0,
//   next: 10
// })
// const [hasMore, setHasMore] = useState(true);
// const [current, setCurrent] = useState(data.slice(count.prev, count.next))
// const getMoreData = () => {
//   if (current.length === data.length) {
//     setHasMore(false);
//     return;
//   }
//   setTimeout(() => {
//     setCurrent(current.concat(data.slice(count.prev + 10, count.next + 10)))
//   }, 2000)
//   setCount((prevState) => ({ prev: prevState.prev + 10, next: prevState.next + 10 }))
// }

// return (
//   <InfiniteScroll
//     dataLength={current.length}
//     next={getMoreData}
//     hasMore={hasMore}
//     loader={<h4>Loading...</h4>}
//   >
//     <div>
//       {current && current.map(((item, index) => (
//         <div key={index} className="post">
//           <h3>{`${item.title}-${item.id}`}</h3>
//           <p>{item.body}</p>
//         </div>
//       )))
//       }
//     </div>
//   </InfiniteScroll>
// );
// }
// export default App;