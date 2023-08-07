import Modal from 'react-modal';
import Home from './pages/Home';

Modal.setAppElement('#root');

const App = () => {
  return (
    <div className='container'>
      <Home />
    </div>
  )
}

export default App
