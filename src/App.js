import './App.css';
import { Route, Routes } from 'react-router';
import Track from './Screens/Track';
import Form from './Screens/Form';
import AdminForm from './Screens/AdminForm';
import TrackInfo from './Screens/TrackInfo';
import AdminView from './Screens/AdminView';

function App() {


  return (
    
    <div>
      

    <Routes>
      {/* <Route path='/' element={<Track/>}/> */}
      {/* <Route path='/form' element={<Form/>}/> */}
      <Route path='/adminform' element={<AdminForm/>}/>
      <Route path='/trackInfo' element={<TrackInfo/>}/>
      <Route path='/' element={<AdminView/>}/>

    </Routes>

    </div>

    
  );
}

export default App;
