import './App.css';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import UserList from './components/userList';

function App() {
  return (
    <div className="App">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Navbar />
        </div>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        < UserList/>
        </div>
        <div>
        </div>
      </div>
    
  );
}

export default App;