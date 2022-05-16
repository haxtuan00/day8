import logo from './logo.svg';
import './App.css';
import { RotatingLines } from 'react-loader-spinner';
import {useState,useEffect} from 'react'
import Button from './components/Button';
import {BsArrowUpSquare} from 'react-icons/bs'
function App() {
  const [load,setLoad]=useState(false)
  const [todoss,setTodoss]=useState(null)
  const [scroll,setScroll]=useState(false)
  useEffect(()=>{
      const showScroll=(e)=>{
        if(e.target.documentElement.scrollTop!=0) setScroll(true)
        else setScroll(false)
      }
      window.addEventListener('scroll',showScroll)
  })
  const fetchData= ()=>{
    setLoad(true)
      setTimeout(async ()=>{
        const data=await fetch('https://jsonplaceholder.typicode.com/todos')
      const datas=await data.json()
      setTodoss(datas)
      setLoad(false)
      },2000)
  }
  const upToTop=()=>{
      window.scrollTo({
        top:0,
        behavior: 'smooth'
      })
  }
  return (
    <div className="App">
    { load?<RotatingLines width="100" strokeColor="#FF5733" strokeWidth="1" />:<Button 
      text='API'
       onClick={fetchData}
      />}
      {todoss && todoss.map((t)=>{
        return <>
          <h3>{t.id}.{t.title}</h3>
        </>
      })} 
      {scroll&&<span className='span-icon' onClick={upToTop}><BsArrowUpSquare fontSize={"30px"} color={"red"}/></span>}
    </div>
  );
}

export default App;
