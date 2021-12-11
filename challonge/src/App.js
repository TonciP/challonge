
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouterConfig from './RouterConfig/RouterConfig';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
        <Header />
        <Container>
          <RouterConfig />
        </Container>
        
        </div>

      </Router>
    </div>
  );
}

export default App;
