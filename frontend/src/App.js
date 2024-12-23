import logo from "./logo.svg";
import "./App.css";
import SlackButton from "./components/SlackButton";
import Chip from "./components/Chip";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Button from "./components/Button";
import slider from "./assets/sliders-solid.svg";
import slack_logo from "./assets/slack_logo.png";

function App() {
  const title = "Avg.Attendance";
  const number = 78.1;
  const sub = "Slot average attendance";
  const change = 12.1;
  return (
    <div className="App">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main">
        <div className="header">
          <Header></Header>
        </div>
        <div className="chips">
          <Chip title={title} sub={sub} number={number} change={change} />
          <Chip
            title={"title 2"}
            sub={"subtitle 2"}
            number={50.3}
            change={-18.2}
          />
          <Chip
            title={"title 3"}
            sub={"subtitle 3"}
            number={89.3}
            change={6.2}
          />
          <div className="customize">
            {/* <Button label={"Customize"} /> */}
            <Button label={"Customize"} logo={slider} border={"customize"}/>
            {/* <Button label={"Notification On"} logo={slack_logo} /> */}
            <SlackButton />
          </div>
        </div>
        <div className="button_details">
          <Button label={"Students"} />
          <Button label={"Sessions"} />
        </div>

        {/* <SlackButton /> */}
      </div>
    </div>
  );
}

export default App;
