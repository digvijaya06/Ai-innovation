import React, { useState } from "react";
import { X, Upload, ChevronDown, FileText, ArrowLeft } from "lucide-react";
import "./Section.css";

const CreateCaseSection = ({ setActiveSection }) => {
  const [uploadMethod, setUploadMethod] = useState("manual");
  const [w2Files, setW2Files] = useState([
    { name: "W-2 Data.pdf", tags: ["Borrower_1", "2024"] },
  ]);

  return (
    <div
      className="section-container"
      style={{
        minHeight: "calc(100vh - 60px)",
        backgroundColor: "#fcfcfc",
        display: "flex",
        justifyContent: "center",
        padding: "50px 0",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "40px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "35px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <button
              onClick={() => setActiveSection("section1")}
              className="btn btn-icon"
              style={{
                backgroundColor: "#f0f4ff",
                border: "none",
                color: "#2b5ce7",
                padding: "8px",
              }}
            >
              <ArrowLeft size={18} />
            </button>
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: "700",
                color: "#333",
              }}
            >
              Create New Case
            </h2>
          </div>
          <button
            onClick={() => setActiveSection("section1")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#ccc",
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          {/* Client Organization */}
          <div>
            <label className="form-label">Client Organization *</label>
            <div style={{ position: "relative" }}>
              <select className="form-select">
                <option>Altisource Main Office</option>
              </select>
              <ChevronDown
                size={14}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#2b5ce7",
                }}
              />
            </div>
          </div>

          {/* Case Identifier */}
          <div>
            <label className="form-label">Case Identifier *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Loan_1_Initial"
            />
          </div>

          {/* Upload Method Toggle */}
          <div>
            <label className="form-label">Upload Document *</label>
            <div
              style={{
                display: "flex",
                gap: "10px",
                backgroundColor: "#f5f7ff",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              <button
                onClick={() => setUploadMethod("manual")}
                className={`btn ${uploadMethod === "manual" ? "btn-primary" : "btn-outline"}`}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: "600",
                  backgroundColor:
                    uploadMethod === "manual" ? "#fff" : "transparent",
                  color: uploadMethod === "manual" ? "#2b5ce7" : "#999",
                  boxShadow:
                    uploadMethod === "manual"
                      ? "0 2px 8px rgba(0,0,0,0.05)"
                      : "none",
                  cursor: "pointer",
                }}
              >
                Manual
              </button>
              <button
                onClick={() => setUploadMethod("los")}
                className={`btn ${uploadMethod === "los" ? "btn-primary" : "btn-outline"}`}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "13px",
                  fontWeight: "600",
                  backgroundColor:
                    uploadMethod === "los" ? "#fff" : "transparent",
                  color: uploadMethod === "los" ? "#2b5ce7" : "#999",
                  boxShadow:
                    uploadMethod === "los"
                      ? "0 2px 8px rgba(0,0,0,0.05)"
                      : "none",
                  cursor: "pointer",
                }}
              >
                Via LOS
              </button>
            </div>
          </div>

          {/* LOS Method */}
          {uploadMethod === "los" && (
            <>
              <div>
                <label className="form-label">LOS Platform *</label>
                <div style={{ position: "relative" }}>
                  <select className="form-select">
                    <option>Encompass</option>
                  </select>
                  <ChevronDown
                    size={14}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#2b5ce7",
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Case Number *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 123456789"
                />
              </div>
            </>
          )}

          {/* Manual Method */}
          {uploadMethod === "manual" && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#ef4444",
                    borderRadius: "50%",
                  }}
                ></div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#333",
                  }}
                >
                  Required Documents (8)
                </h3>
              </div>

              {/* File Upload Area */}
              <div
                style={{
                  border: "1px dashed #ddd",
                  borderRadius: "12px",
                  padding: "40px 20px",
                  textAlign: "center",
                  backgroundColor: "#f9f9f9",
                  marginBottom: "20px",
                }}
              >
                <FileText
                  size={32}
                  style={{ color: "#ccc", margin: "0 auto 15px" }}
                />
                <div
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    fontWeight: "500",
                    marginBottom: "10px",
                  }}
                >
                  Drag files here or click to browse
                </div>
                <button
                  className="btn btn-primary btn-icon"
                  style={{ padding: "8px 16px", fontSize: "12px" }}
                >
                  <Upload size={14} /> Upload
                </button>
                <div
                  style={{ fontSize: "11px", color: "#999", marginTop: "10px" }}
                >
                  Supported: PDF, PNG, JPG (Max 10MB)
                </div>
              </div>

              {/* Uploaded Files */}
              {w2Files.length > 0 && (
                <div
                  style={{
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #eee",
                    borderRadius: "8px",
                    padding: "15px",
                  }}
                >
                  {w2Files.map((file, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "12px",
                        borderBottom:
                          idx < w2Files.length - 1 ? "1px solid #eee" : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <FileText size={18} style={{ color: "#999" }} />
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "#333",
                            }}
                          >
                            {file.name}
                          </div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#999",
                              marginTop: "2px",
                            }}
                          >
                            {file.tags.map((tag, i) => (
                              <span key={i}>
                                {tag}
                                {i < file.tags.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ccc",
                          cursor: "pointer",
                        }}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "flex-end",
            marginTop: "40px",
          }}
        >
          <button
            className="btn btn-outline"
            onClick={() => setActiveSection("section1")}
          >
            Cancel
          </button>
          <button className="btn btn-primary">Create Case</button>
        </div>
      </div>
    </div>
  );
};

export default CreateCaseSection;
