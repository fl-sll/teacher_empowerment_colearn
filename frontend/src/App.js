import logo from "./logo.svg";
import "./App.css";
import SlackButton from "./components/SlackButton";
import Chip from "./components/Chip";

function App() {
  const title = "Avg.Attendance"
  const number = 78.1
  const sub = "Slot average attendance"
  const change = 12.1
  return (
    <div className="App">
      <h1>Welcome CoLearn Educator</h1>
      {/* <SlackButton /> */}
      <Chip 
      title={title}
      sub={sub}
      number={number}
      change={change}
      />
    </div>
  );
}

export default App;
