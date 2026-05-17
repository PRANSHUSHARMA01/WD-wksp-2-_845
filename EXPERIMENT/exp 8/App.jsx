import { useState } from "react";

import "./App.css";

function App() {

  // State creation
  const [count, setCount] = useState(0);

  // Event functions
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (

    <div className="container">

      <h1>React Counter Application</h1>

      {/* Display Count */}
      <h2>{count}</h2>

      {/* Buttons */}
      <div className="buttons">

        <button onClick={increment}>
          Increment (+)
        </button>

        <button onClick={decrement}>
          Decrement (-)
        </button>

        <button onClick={reset}>
          Reset
        </button>

      </div>

    </div>
  );
}

export default App;