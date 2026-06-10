import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "@tabler/icons-webfont/dist/tabler-icons.min.css";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;