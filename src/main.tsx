import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Show body once React has mounted to prevent static HTML flash
document.body.style.visibility = "visible";
