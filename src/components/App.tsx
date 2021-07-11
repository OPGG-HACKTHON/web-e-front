import GreetingPage from "pages/GreetingPage";
import { Route, Switch } from "react-router-dom";
import GlobalStyle from "styles/GlobalStyle";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={GreetingPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default App;
