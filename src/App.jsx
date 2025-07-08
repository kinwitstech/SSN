import { localisables } from "./common/localisables";

function App() {
  const { welcome } = localisables;

  return <div>{welcome}</div>;
}

export default App;
