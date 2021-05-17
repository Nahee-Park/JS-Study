import React from "react";
import DrawMain from "./Screens/DrawMain";
import CreateNote from "./Screens/CreateNote";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={DrawMain} />
        <Route exact path="/createnote" component={CreateNote} />
        <Route path="/createnote/:id" component={CreateNote} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
