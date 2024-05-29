import './App.css';
import UserForm from './components/UserForm';
import NFTForm from './components/NFTForm';
import NFTList from './components/NFTList';

function App() {
  return (
    <div className="App">
      <UserForm />
      <NFTForm />
      <NFTList />
    </div>
  );
}

export default App;
