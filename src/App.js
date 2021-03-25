import logo from './logo.svg';
import './App.css';
import { PhotoContainer } from './components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React Photo Stream
        </p>
      </header>
      <section className="App-body">
        <PhotoContainer/>
      </section>
    </div>
  );
}

export default App;
