import logo from './logo.svg';
import './App.css';
import CartIcon from './components/CartIcon.js';
import Logo from './components/Logo.js';
import SearchBarIcon from './components/SearchBarIcon.js';

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
          backgroundColor: '#3BB6EB',
        }}
      >
      <div>
        <Logo/>
        <div style = {{marginTop: '100px', marginLeft: '150px'}}>
          <SearchBarIcon/>
        </div>
      </div>
      <div style = {{alignSelf: 'center', display: 'flex', justifyContent: 'center', marginRight: '100px'}}>
        <CartIcon/>
      </div>
      </header>
    </div>
  );
}

export default App;
