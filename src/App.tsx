import { Route, Routes } from "react-router-dom";
import ItemListPage from "./pages/ItemListPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ItemListPage />} />
      <Route path="/items/:id" element={<ItemDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;