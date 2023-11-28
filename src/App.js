import './App.css';
import Quiz from './components/Quiz'

function App() {
  const sort=()=>{
    let array=["A","B","c","f","g","A"];
    let result = array.sort((a,b) => { return a.localeCompare(b)});
    console.log(result);
  }
  return (
    <div className="App mt-5">
      <h2 className='text-center'style={{color:"#00308F"}} onClick={()=>sort()}>REACT QUIZ</h2>
      <Quiz />
      
    </div>
  );
}

export default App;
