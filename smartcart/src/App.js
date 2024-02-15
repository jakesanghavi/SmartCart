import logo from './logo.svg';
import './App.css';
import CartIcon from './components/CartIcon.js';
import Logo from './components/Logo.js';

function App() {
  return (
    <div className="App">
      <header className="App-header"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '20px',
          backgroundColor: '#3BB6EB'
        }}
      >
      <div>
        <Logo />
      </div>
      <div style = {{alignSelf: 'center', marginRight: '300px'}}>
        <CartIcon />
      </div>
      </header>
    </div>
  );
}

export default App;
