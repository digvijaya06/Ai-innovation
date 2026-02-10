import React, { useState } from "react";
import {
  Search,
  Plus,
  X,
  FileText,
  ChevronDown,
  ShieldCheck,
  Target,
  Database,
  Terminal,
  Save,
  RotateCcw,
  Activity,
  Settings,
  MoreVertical,
} from "lucide-react";
import "./Section.css";

const RuleEngine = () => {
  const [isCreating, setIsCreating] = useState(false);

  // Table Data
  const rowCount = 10;
  const colCount = 10;

  // Wizard State
  const [targetDocs, setTargetDocs] = useState(["Appraisal Report"]);
  const [mappedClients, setMappedClients] = useState(["All Clients (Default)"]);

  const previewData = [
    {
      qid: "FLD01",
      field: "property_value",
      source: "$450,000",
      confidence: "98%",
    },
    {
      qid: "FLD02",
      field: "borrower_name",
      source: "John Doe",
      confidence: "94%",
    },
    {
      qid: "FLD03",
      field: "appraisal_date",
      source: "Oct 12, 2025",
      confidence: "89%",
    },
  ];

  const TableView = () => (
    <div
      className="card"
      style={{
        marginTop: "20px",
        padding: 0,
        backgroundColor: "#fff",
        border: "1px solid #eee",
        borderRadius: "12px",
        overflow: "auto",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#fcfcfc" }}>
          <tr>
            <th
              style={{
                borderBottom: "1px solid #eee",
                color: "#666",
                padding: "15px",
                textAlign: "left",
              }}
            >
              Requirement Name
            </th>
            {Array.from({ length: colCount }).map((_, i) => (
              <th
                key={i}
                style={{
                  borderBottom: "1px solid #eee",
                  color: "#666",
                  padding: "15px",
                }}
              >
                Logic V{i + 1}
              </th>
            ))}
            <th
              style={{
                textAlign: "center",
                borderBottom: "1px solid #eee",
                color: "#666",
                padding: "15px",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                borderBottom: "1px solid #f9f9f9",
                backgroundColor: "#fff",
              }}
            >
              <td
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 5,
                  backgroundColor: "#fff",
                  fontWeight: "bold",
                  color: "#2b5ce7",
                  borderRight: "1px solid #f0f0f0",
                  padding: "15px",
                }}
              >
                R-{2000 + rowIndex}
              </td>
              <td style={{ fontWeight: "600", color: "#333", padding: "15px" }}>
                Income Verification Check
              </td>
              {Array.from({ length: colCount }).map((_, colIndex) => (
                <td key={colIndex} style={{ padding: "15px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "4px 10px",
                      backgroundColor:
                        colIndex % 3 === 0 ? "#f0f4ff" : "#fcfcfc",
                      color: colIndex % 3 === 0 ? "#2b5ce7" : "#999",
                      borderRadius: "4px",
                      fontWeight: "600",
                    }}
                  >
                    Active
                  </span>
                </td>
              ))}
              <td style={{ textAlign: "center", padding: "15px" }}>
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
  );

  const WizardModal = () => (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <div
        className="card"
        style={{
          width: "900px",
          padding: 0,
          backgroundColor: "#fff",
          color: "#333",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            padding: "20px 30px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fcfcfc",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "#2b5ce7",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <Settings size={20} />
            </div>
            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
              Create Global Logic Rule
            </h2>
          </div>
          <X
            size={20}
            style={{ cursor: "pointer", color: "#999" }}
            onClick={() => setIsCreating(false)}
          />
        </div>

        <div style={{ display: "flex", minHeight: "500px" }}>
          <div
            style={{
              width: "240px",
              backgroundColor: "#fcfcfc",
              borderRight: "1px solid #eee",
              padding: "30px 20px",
            }}
          >
            {[
              { step: 1, label: "Metadata", desc: "Define rule scope" },
              { step: 2, label: "Field Mapping", desc: "Select AI inputs" },
              { step: 3, label: "Logic Builder", desc: "Condition setup" },
              { step: 4, label: "Review", desc: "Deploy to grid" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "15px",
                  marginBottom: "30px",
                  opacity: i === 0 ? 1 : 0.5,
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: i === 0 ? "#2b5ce7" : "#eee",
                    color: i === 0 ? "#fff" : "#999",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {s.step}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    {s.label}
                  </div>
                  <div style={{ fontSize: "11px", color: "#999" }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, padding: "40px", backgroundColor: "#fff" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "25px" }}
            >
              <div className="grid-2">
                <div className="form-group">
                  <label
                    className="form-label"
                    style={{ fontWeight: "bold", color: "#444" }}
                  >
                    Rule Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter rule identifier"
                    className="form-input"
                    style={{ border: "1px solid #eee" }}
                  />
                </div>
                <div className="form-group">
                  <label
                    className="form-label"
                    style={{ fontWeight: "bold", color: "#444" }}
                  >
                    Category *
                  </label>
                  <select
                    className="form-select"
                    style={{ border: "1px solid #eee" }}
                  >
                    <option>Income Verification</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label
                  className="form-label"
                  style={{ fontWeight: "bold", color: "#444" }}
                >
                  Select Target Documents
                </label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  {[
                    "Appraisal Report",
                    "Paystub",
                    "W2 Form",
                    "Bank Statement",
                  ].map((doc) => (
                    <div
                      key={doc}
                      style={{
                        padding: "8px 15px",
                        borderRadius: "8px",
                        border: targetDocs.includes(doc)
                          ? "1px solid #2b5ce7"
                          : "1px solid #eee",
                        backgroundColor: targetDocs.includes(doc)
                          ? "#f0f4ff"
                          : "#fff",
                        color: targetDocs.includes(doc) ? "#2b5ce7" : "#999",
                        fontSize: "12px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                      onClick={() => setTargetDocs([doc])}
                    >
                      {doc}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  padding: "25px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "12px",
                  border: "1px solid #eee",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <Terminal size={18} color="#2b5ce7" />
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    AI Field mapping Preview
                  </div>
                </div>
                <table style={{ width: "100%", fontSize: "12px" }}>
                  <thead style={{ color: "#999" }}>
                    <tr>
                      <th style={{ textAlign: "left", paddingBottom: "10px" }}>
                        Field ID
                      </th>
                      <th style={{ textAlign: "left", paddingBottom: "10px" }}>
                        Mapping Source
                      </th>
                      <th style={{ textAlign: "right", paddingBottom: "10px" }}>
                        Confidence
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((d) => (
                      <tr key={d.qid}>
                        <td style={{ padding: "8px 0", fontWeight: "bold" }}>
                          {d.field}
                        </td>
                        <td style={{ padding: "8px 0", color: "#666" }}>
                          {d.source}
                        </td>
                        <td
                          style={{
                            padding: "8px 0",
                            textAlign: "right",
                            color: "#10b981",
                            fontWeight: "bold",
                          }}
                        >
                          {d.confidence}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              style={{
                marginTop: "40px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "15px",
              }}
            >
              <button
                className="btn btn-outline"
                style={{
                  border: "1px solid #eee",
                  color: "#999",
                  padding: "10px 30px",
                }}
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor: "#2b5ce7",
                  color: "#fff",
                  padding: "10px 40px",
                }}
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="section-container">
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: "30px" }}>
        <div className="page-header-content">
          <h2 className="page-title">Rule Engine</h2>
          <div className="page-breadcrumb">
            Global Logic Grid & Rule Repository
          </div>
        </div>
        <div className="page-actions">
          <button className="btn btn-outline btn-icon">
            <Terminal size={16} /> Debug Console
          </button>
          <button
            onClick={() => setIsCreating(true)}
            className="btn btn-primary btn-icon"
          >
            <Plus size={18} /> Create New Rule
          </button>
        </div>
      </div>

      {/* Search And Filter */}
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
          <label className="form-label">Search Logic</label>
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
              placeholder="Search global rules by ID or Description..."
              className="form-input"
              style={{ paddingLeft: "45px" }}
            />
          </div>
        </div>
        <div style={{ width: "220px" }}>
          <label className="form-label">Version Control</label>
          <div style={{ position: "relative" }}>
            <select className="form-select">
              <option>Latest (V2.4)</option>
              <option>Production (V2.3)</option>
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
        <button className="btn btn-outline">Export Grid</button>
      </div>

      <TableView />

      {isCreating && <WizardModal />}
    </div>
  );
};

export default RuleEngine;
