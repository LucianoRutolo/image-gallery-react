import "./App.css";
import { Footer } from "./features/Footer/Footer";
import { Gallery } from "./features/Gallery/Gallery";
import { Header } from "./features/Header/Header";

function App() {
  return (
    <div className="app">
      <Header />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
