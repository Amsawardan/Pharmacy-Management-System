import './Reports.css';

function ReportCard({ title, content }) {
  return (
    <div className="report-card">
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  );
}

export default function Reports() {
  return (
    <div className="reports-grid">
      <ReportCard title="Inventory" content="298 Medicines | 24 Groups" />
      <ReportCard title="Quick Report" content="70,856 Sold | 5,288 Invoices" />
      <ReportCard title="My Pharmacy" content="04 Suppliers | 05 Users" />
      <ReportCard title="Customers" content="845 Customers | Adalimumab Popular" />
    </div>
  );
}
