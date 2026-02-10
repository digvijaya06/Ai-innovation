import React from "react";
import {
  Search,
  Plus,
  Download,
  MoreVertical,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import "./Section.css";

const ViewHighSection = ({ setActiveSection }) => {
  const items = [
    {
      id: "101",
      name: "View, High Priority Case",
      status: "High",
      type: "Primary Analysis",
      date: "Feb 09, 2026",
    },
    {
      id: "102",
      name: "View, High Alert Document",
      status: "Medium",
      type: "Review Flow",
      date: "Feb 08, 2026",
    },
    {
      id: "103",
      name: "View, High Risk Borrower",
      status: "High",
      type: "Audit Trail",
      date: "Feb 08, 2026",
    },
    {
      id: "104",
      name: "View, High Complexity Loan",
      status: "Low",
      type: "Calculations",
      date: "Feb 07, 2026",
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      High: "badge-danger",
      Medium: "badge-warning",
      Low: "badge-success",
    };
    return badges[status] || "badge-info";
  };

  return (
    <div className="section-container">
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: "30px" }}>
        <div className="page-header-content">
          <h2 className="page-title">High Priority Queue</h2>
          <div className="page-breadcrumb">
            System Overview / Priority Management
          </div>
        </div>
        <div className="page-actions">
          <button className="btn btn-outline btn-icon">
            <Download size={18} />
          </button>
          <button className="btn btn-primary btn-icon">
            <Plus size={18} /> New Entry
          </button>
        </div>
      </div>

      {/* Search And Filter */}
      <div className="card" style={{ padding: "20px", marginBottom: "25px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "15px", flex: 1 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "12px",
                  color: "#ccc",
                }}
              />
              <input
                type="text"
                className="form-input"
                placeholder="Search cases..."
                style={{ paddingLeft: "45px" }}
              />
            </div>
            <div style={{ position: "relative", width: "220px" }}>
              <select className="form-select">
                <option>Filter by Status</option>
                <option>High Priority</option>
                <option>Medium Priority</option>
                <option>Low Priority</option>
              </select>
              <ChevronDown
                size={14}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "12px",
                  color: "#999",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cases Table */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Case Name</th>
                <th>Status</th>
                <th>Type</th>
                <th>Date</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={{ color: "#2b5ce7", fontWeight: "bold" }}>
                    #{item.id}
                  </td>
                  <td style={{ fontWeight: "500" }}>{item.name}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.type}</td>
                  <td style={{ color: "#999", fontSize: "13px" }}>
                    {item.date}
                  </td>
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

export default ViewHighSection;
