import './App.css';
import CountDown from './countdown';

function App() {
  return (
    <div className="App" style={{ padding: 16 }}>
      <CountDown
        widthInput={110}
        secondsInput={5400}
      />
    </div>
  );
}

export default App;
