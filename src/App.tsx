import './App.css';
import { CounterMultiply } from './components/CounterMultiply';
import { CounterSquare } from './components/CounterSquare';
import { CounterUpdater } from './components/CounterUpdater';
import { useSelector } from 'react-redux';
import { Logout } from './components/Logout';
import { Login } from './components/Login';
function App() {
  const authUser = useSelector<any, string>(state => state.auth.authUser)
  return <div style={{
    display: 'flex', alignItems: 'center',
    flexDirection: 'column'
  }}>
    {authUser && <CounterUpdater operand={10} />}
    {authUser.includes('admin') && <CounterMultiply factor={2} />}
    {authUser && <CounterSquare />}
    {authUser && <Logout />}
    {!authUser && <Login />}
  </div>
}

export default App;
