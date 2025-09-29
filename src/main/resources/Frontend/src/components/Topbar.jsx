import './Topbar.css';

export default function Topbar() {
  return (
    <header className="topbar">
      <input
        type="text"
        placeholder="Search anything..."
      />
      <div className="right">
        <span>English (US)</span>
        <span className="font-semibold">Good Morning</span>
        <span className="text-gray-600">24 September 2025</span>
      </div>
    </header>
  );
}
