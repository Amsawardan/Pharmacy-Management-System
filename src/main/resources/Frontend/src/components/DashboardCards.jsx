import './DashboardCards.css';
function Card({ title, subtitle, color, button }) {
  return (
    <div className={`card ${color}`}>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <button>{button}</button>
    </div>
  );
}

export default function DashboardCards() {
  return (
    <div className="card-grid">
      <Card title="Good" subtitle="Inventory Status" color="green" button="View Report" />
      <Card title="Rs. 8,55,875" subtitle="Revenue (Sep 2025)" color="yellow" button="View Report" />
      <Card title="298" subtitle="Medicines Available" color="blue" button="Visit Inventory" />
      <Card title="01" subtitle="Medicine Shortage" color="red" button="Resolve Now" />
    </div>
  );
}
