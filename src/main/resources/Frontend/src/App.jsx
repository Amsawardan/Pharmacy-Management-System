import './App.css';
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardCards from "./components/DashboardCards";
import Reports from "./components/Reports";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <DashboardCards />
        <Reports />
      </div>
    </div>
  );
}

export default App;
