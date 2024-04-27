import { EthProvider } from "./contexts/EthContext";
import Index from "./components/test model/index";
// import MyComponent from "./components/test model/test/index";
// import Index from "./components/test model/oldIndex";



function App() {
  return (
    <EthProvider>
      <Index/>
    </EthProvider>
  );
}

export default App;
