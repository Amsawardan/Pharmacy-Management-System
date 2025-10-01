import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Raj Pharmacy</h2>
      
      <div className="admin-info">
        <img src="https://via.placeholder.com/60" alt="Admin" />
        <div>
          <h4>S. Kethieswaran</h4>
          <p>Super Admin</p>
        </div>
      </div>

      <ul>
        <li className="active">Dashboard</li>
        <li>Inventory</li>
        <li>Reports</li>
        <li>Configuration</li>
        <li>Contact Management</li>
        <li>Notifications</li>
        <li>Chat with Visitors</li>
        <li>Application Settings</li>
        <li>Get Technical Help</li>
      </ul>
    </aside>
  );
}
