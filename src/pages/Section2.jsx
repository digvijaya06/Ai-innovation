import React from "react";
import {
  Activity,
  Send,
  AlertCircle,
  Search,
  MoreVertical,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import "./Section.css";

const Section2 = ({ setActiveSection }) => {
  const serviceCards = [
    {
      id: 1,
      title: "Inbound Records",
      status: "Healthy",
      count: "1,284",
      icon: Activity,
      color: "#2b5ce7",
      trend: "+12%",
    },
    {
      id: 2,
      title: "Pending Authorizations",
      status: "Processing",
      count: "452",
      icon: Send,
      color: "#f59e0b",
      trend: "+5%",
    },
    {
      id: 3,
      title: "Validation Flags",
      status: "Attention",
      count: "12",
      icon: AlertCircle,
      color: "#ef4444",
      trend: "-2%",
    },
  ];

  const auditTrail = [
    {
      id: "WF-001",
      date: "Feb 09, 2026",
      client: "PNC Bank",
      amount: "$45,000.00",
      status: "Authorized",
      type: "Wire In",
    },
    {
      id: "WF-002",
      date: "Feb 09, 2026",
      client: "Chase Fed",
      amount: "$12,400.00",
      status: "Pending",
      type: "Wire Out",
    },
    {
      id: "WF-003",
      date: "Feb 08, 2026",
      client: "Zillow Inc",
      amount: "$105,000.00",
      status: "Completed",
      type: "Wire In",
    },
    {
      id: "WF-004",
      date: "Feb 08, 2026",
      client: "Freddie Mac",
      amount: "$8,900.00",
      status: "Flagged",
      type: "Wire Out",
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      Authorized: "badge-success",
      Pending: "badge-warning",
      Completed: "badge-success",
      Flagged: "badge-danger",
    };
    return badges[status] || "badge-info";
  };

  return (
    <div className="section-container">
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: "30px" }}>
        <div className="page-header-content">
          <h2 className="page-title">Workbench Dashboard</h2>
          <div className="page-breadcrumb">
            System Overview & Operational Metrics
          </div>
        </div>
        <button className="btn btn-primary">Export Report</button>
      </div>

      {/* Service Cards Row */}
      <div className="grid-3" style={{ marginBottom: "30px" }}>
        {serviceCards.map((card) => (
          <div
            key={card.id}
            className="card"
            style={{
              padding: "25px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                backgroundColor: `${card.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: card.color,
              }}
            >
              <card.icon size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                className="form-label"
                style={{ color: "#666", marginBottom: "4px" }}
              >
                {card.title}
              </div>
              <div
                style={{
                  fontSize: "26px",
                  fontWeight: "bold",
                  margin: "4px 0",
                  color: "#333",
                }}
              >
                {card.count}
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: card.color,
                    fontWeight: "bold",
                  }}
                >
                  ● {card.status}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: card.trend.startsWith("+") ? "#10b981" : "#ef4444",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {card.trend.startsWith("+") ? (
                    <ArrowUpRight size={12} />
                  ) : (
                    <ArrowDownRight size={12} />
                  )}{" "}
                  {card.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Wire Funds Audit Trail */}
      <div className="card" style={{ padding: "0", overflow: "hidden" }}>
        <div className="card-header">
          <div className="card-header-left">
            <h3>Wire Funds Audit Trail</h3>
            <p>Real-time transaction monitoring</p>
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            <div style={{ position: "relative" }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "12px",
                  color: "#ccc",
                }}
              />
              <input
                type="text"
                className="form-input"
                placeholder="Search Trail..."
                style={{ paddingLeft: "40px", width: "220px" }}
              />
            </div>
          </div>
        </div>

        <div
          className="table-container"
          style={{ margin: 0, border: "none", borderRadius: 0 }}
        >
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date & Time</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Type</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {auditTrail.map((item) => (
                <tr key={item.id}>
                  <td style={{ color: "#2b5ce7", fontWeight: "bold" }}>
                    {item.id}
                  </td>
                  <td>{item.date}</td>
                  <td>{item.client}</td>
                  <td style={{ fontWeight: "600", color: "#333" }}>
                    {item.amount}
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.type}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ccc",
                        cursor: "pointer",
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Section2;
