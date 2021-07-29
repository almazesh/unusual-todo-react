import './App.css';
import {v4 as uuidv4} from 'uuid';
import {randomColor} from 'randomcolor'
import Draggable from 'react-draggable';
import {useEffect, useState} from 'react'
function App() {
  const [item , setItem] = useState('')
  const [items ,setItems] = useState(
    JSON.parse(localStorage.getItem('todo')) || []
  )

  useEffect(() =>{
    localStorage.setItem('todo' , JSON.stringify(items))
  } , [items])

  const newItem = () =>{
        if(item.trim() !== ''){
            const newTodo = {
              id:uuidv4(),
              item:item,
              color:randomColor({
                luminosity: 'light',

              }),
              defaultPos:{
                x:500,
                y:-400
              }
            }
            setItems((items) => [...items , newTodo])
        }else{
          alert('Enter Something')
        }
  }

  const deleteNode = (id) =>{
      const newArr = items.filter((item) => item.id !== id)
      setItems(newArr)
  }
  


  return (
      <>
        <div className="App">
            <div className="wrapper">
                 <input 
                  className="enter"
                  type="text"
                  onChange={e => setItem(e.target.value)}
                  placeholder="Enter something..."
                 />
                 <button className="button" onClick={newItem}>Enter</button>
            </div>

            {
              items.map((item ) =>{
                 return (
                   <Draggable 
                      key={item.id}
                      defaultPosition={item.defaultPos}
                   >
                    <div className='todo_item' style={{backgroundColor:item.color}}>
                        {`${item.item}`}
                        <button className='delete' onClick={() => deleteNode(item.id)}>
                            X
                        </button>
                    </div>
                   </Draggable>
                 )
              })
            }
        </div>
      </>
  );
}

export default App;
