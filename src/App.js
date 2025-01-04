import './App.css';
import Notes from './components/Notes';
import AddNote from './components/AddNote';

function App() {
  return (
    <div className="container">
      <Notes name="Notes"/>
      <AddNote name="AddNote"/>
    </div>
  );
}

export default App;
