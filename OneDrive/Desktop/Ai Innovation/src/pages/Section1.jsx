import React, { useState } from "react";
import {
  Briefcase,
  Clock,
  CheckCircle2,
  Settings,
  PlayCircle,
  Plus,
  Search,
  MoreVertical,
  LayoutDashboard,
  ChevronDown,
  Activity,
} from "lucide-react";
import "./Section.css";

const Section1 = ({ setActiveSection }) => {
  const [activeTab, setActiveTab] = useState("all");

  const cases = [
    {
      id: "101",
      num: "test_dg_11",
      docs: 12,
      date: "12/10/2025, 11:34 am",
      score: "88% (AI)",
      status: "Completed",
    },
    {
      id: "102",
      num: "test_dev_03",
      docs: 8,
      date: "12/10/2025, 12:15 pm",
      score: "92% (AI)",
      status: "Pending",
    },
    {
      id: "103",
      num: "test_dg_12",
      docs: 15,
      date: "12/09/2025, 09:20 am",
      score: "76% (AI)",
      status: "Failed",
    },
    {
      id: "104",
      num: "test_alpha_01",
      docs: 5,
      date: "12/09/2025, 03:45 pm",
      score: "95% (AI)",
      status: "Completed",
    },
  ];

  const sidebarItems = [
    { id: "all", label: "All Cases", icon: Briefcase },
    { id: "pending", label: "All Pending Cases", icon: Clock },
    { id: "completed", label: "All Completed Cases", icon: CheckCircle2 },
    { id: "automate", label: "Automate Testing", icon: PlayCircle },
    { id: "account", label: "Account Configuration", icon: Settings },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      Completed: "badge-success",
      Pending: "badge-warning",
      Failed: "badge-danger",
    };
    return badges[status] || "badge-info";
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
      {/* Internal Sidebar */}
      <div
        style={{
          width: "240px",
          backgroundColor: "#fff",
          borderRight: "1px solid #eee",
          padding: "25px 0",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            padding: "0 20px 20px 20px",
            borderBottom: "1px solid #f0f0f0",
            marginBottom: "15px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#2b5ce7",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <LayoutDashboard size={18} />
            </div>
            <div>
              <div
                style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}
              >
                Workbench
              </div>
              <div style={{ fontSize: "11px", color: "#999" }}>
                Analysis Control
              </div>
            </div>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column" }}>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "automate") setActiveSection("admin-center");
                else setActiveTab(item.id);
              }}
              style={{
                padding: "12px 20px",
                border: "none",
                textAlign: "left",
                backgroundColor:
                  activeTab === item.id ? "#f0f4ff" : "transparent",
                color: activeTab === item.id ? "#2b5ce7" : "#666",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: activeTab === item.id ? "600" : "500",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderLeft:
                  activeTab === item.id
                    ? "4px solid #2b5ce7"
                    : "4px solid transparent",
                transition: "all 0.2s",
              }}
            >
              <item.icon size={16} /> {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          overflowY: "auto",
          backgroundColor: "#fcfcfc",
        }}
      >
        {/* Page Header */}
        <div className="page-header" style={{ marginBottom: "30px" }}>
          <div className="page-header-content">
            <h2 className="page-title">
              {sidebarItems.find((i) => i.id === activeTab)?.label}
            </h2>
            <div className="page-breadcrumb">Home / Workbench / Dashboard</div>
          </div>
          <div className="page-actions">
            <button className="btn btn-outline btn-icon">
              <Activity size={16} /> View Insights
            </button>
            <button
              className="btn btn-primary btn-icon"
              onClick={() => setActiveSection("create-case")}
            >
              <Plus size={18} /> New Analysis
            </button>
          </div>
        </div>

        {/* Search And Filter Bar */}
        <div
          className="card"
          style={{
            padding: "20px",
            display: "flex",
            gap: "20px",
            alignItems: "flex-end",
          }}
        >
          <div style={{ flex: 1 }}>
            <label className="form-label">Search</label>
            <div style={{ position: "relative" }}>
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
                placeholder="Search by Case Number or ID"
                className="form-input"
                style={{ paddingLeft: "45px" }}
              />
            </div>
          </div>
          <div style={{ width: "220px" }}>
            <label className="form-label">Select Category</label>
            <div style={{ position: "relative" }}>
              <select className="form-select">
                <option>All Categories</option>
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
          <div style={{ paddingBottom: "0", fontSize: "13px", color: "#666" }}>
            167 cases found
          </div>
        </div>

        {/* Cases Table */}
        <div
          className="card"
          style={{ padding: 0, marginTop: "25px", overflow: "hidden" }}
        >
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Case Number</th>
                  <th style={{ textAlign: "center" }}>Document Count</th>
                  <th>Submission Date</th>
                  <th>AI Accuracy</th>
                  <th>Status</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: "bold", color: "#2b5ce7" }}>
                      #{c.id}
                    </td>
                    <td>{c.num}</td>
                    <td style={{ textAlign: "center" }}>
                      <span className="badge badge-info">{c.docs}</span>
                    </td>
                    <td style={{ color: "#999" }}>{c.date}</td>
                    <td style={{ color: "#10b981", fontWeight: "bold" }}>
                      {c.score}
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(c.status)}`}>
                        {c.status}
                      </span>
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
    </div>
  );
};

export default Section1;
