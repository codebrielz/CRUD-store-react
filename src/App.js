import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditarProducto } from "./components/EditarProducto";
import { Header } from "./components/Header";
import { NuevoProducto } from "./components/NuevoProducto";
import { Productos } from "./components/Productos";
import { store } from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Productos />} />
            <Route path="/productos/nuevo" element={<NuevoProducto />} />
            <Route path="/productos/editar/:id" element={<EditarProducto />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
