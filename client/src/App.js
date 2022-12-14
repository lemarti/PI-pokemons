import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import PokemonCreate from "./components/PokemonCreate";
import Detail from "./components/Detail";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Henry Pokemon</h1>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/pokemons" component={Home} />
          <Route path="/create" component={PokemonCreate} />
          <Route exact path="/pokemon/:id" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
