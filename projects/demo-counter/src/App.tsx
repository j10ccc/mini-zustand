import './App.css'
import useCountStore from './stores/useCountStore'

function App() {
  const { value: count, increase, decrease, reset } = useCountStore();

  return (
    <>
      <h1>counter-demo</h1>
      <div className="button-group">
        <button onClick={increase}> increase </button>
        <button onClick={decrease}> decrease </button>
        <button onClick={reset}> reset </button>
      </div>
      <p className="read-the-docs">count: { count }</p>
    </>
  )
}

export default App
