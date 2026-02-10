import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Building2,
  ChevronDown,
  X,
  Shield,
  Clock,
  Search,
  Upload,
  FileText,
  LayoutDashboard,
  CheckCircle2,
  Trash2,
  MoreVertical,
  PlayCircle,
  Activity,
  ArrowRight,
  Download,
  Edit3,
  ExternalLink,
  Settings,
  FileSpreadsheet,
  ShieldCheck,
} from "lucide-react";
import "./Section.css";

const AdminCenter = ({ setActiveSection }) => {
  const [view, setView] = useState("automate-testing"); // 'main', 'automate-testing', 'set-answers', 'view-results'
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isCreatingDocType, setIsCreatingDocType] = useState(false);
  const [testingTab, setTestingTab] = useState("golden"); // 'golden', 'test'
  const [showActions, setShowActions] = useState(null);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  // Mock Data
  const goldenSetData = [
    {
      id: "124",
      num: "test_sbg_3-1",
      docs: 12,
      answers: 80,
      date: "12/01/2025, 11:00AM",
      updater: "John Doe",
    },
    {
      id: "125",
      num: "test_sbg_3-2",
      docs: 10,
      answers: 90,
      date: "12/02/2025, 2:00PM",
      updater: "Jack Sr",
    },
    {
      id: "126",
      num: "test_sbg_3-3",
      docs: 7,
      answers: 120,
      date: "12/03/2025, 10:00AM",
      updater: "Michael",
    },
    {
      id: "127",
      num: "test_sbg_3-4",
      docs: 9,
      answers: 68,
      date: "12/04/2025, 1:00PM",
      updater: "Jason S",
    },
  ];

  const questionsList = [
    {
      id: "Q01",
      text: "Does the address in Encompass match the appraisal report? If no, add Collateral-address update condition",
    },
    {
      id: "Q02",
      text: "Does at least one of the borrower's names match the appraisal?",
    },
    {
      id: "Q03",
      text: "If the assignment type is a refinance, does the owner of public record match the borrower?",
    },
  ];

  // --- MODALS (Figma Sync) ---

  const CreateDocTypeModal = () => (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "0",
          backgroundColor: "#fff",
          color: "#333",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            padding: "25px 30px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "700",
              color: "#333",
            }}
          >
            Create New Document Type
          </h2>
          <X
            size={20}
            style={{ cursor: "pointer", color: "#999" }}
            onClick={() => setIsCreatingDocType(false)}
          />
        </div>
        <div
          style={{
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label
              className="form-label"
              style={{
                color: "#333",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Document Name *
            </label>
            <input
              type="text"
              placeholder="eg. UAD Definition"
              className="form-input"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #eee",
                padding: "12px",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label
              className="form-label"
              style={{
                color: "#333",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Display Order
            </label>
            <input
              type="text"
              defaultValue="1"
              className="form-input"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #eee",
                padding: "12px",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label
              className="form-label"
              style={{
                color: "#333",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Description
            </label>
            <textarea
              placeholder="Brief description of this document type"
              className="form-input"
              style={{
                width: "100%",
                minHeight: "80px",
                backgroundColor: "#fff",
                border: "1px solid #eee",
                padding: "12px",
                borderRadius: "8px",
                resize: "none",
              }}
            />
          </div>

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#999",
                  borderRadius: "50%",
                }}
              ></div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#333",
                }}
              >
                Upload Document
              </h3>
            </div>
            <div
              style={{
                border: "1px dashed #eee",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <FileText
                  size={32}
                  style={{ color: "#ccc", strokeWidth: 1.5 }}
                />
                <div
                  style={{ fontSize: "13px", color: "#666", fontWeight: "500" }}
                >
                  Upload pdf file
                </div>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#2196f3",
                    color: "#fff",
                    padding: "8px 20px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "13px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  <Upload size={14} /> Choose File
                </button>
                <span style={{ fontSize: "10px", color: "#999" }}>
                  Accepted: PDF
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "15px",
              marginTop: "10px",
            }}
          >
            <button
              className="btn btn-outline"
              style={{
                color: "#2b5ce7",
                border: "1px solid #2b5ce7",
                padding: "12px 30px",
                borderRadius: "8px",
                fontWeight: "bold",
                width: "120px",
              }}
              onClick={() => setIsCreatingDocType(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              style={{
                backgroundColor: "#ccc",
                color: "#fff",
                padding: "12px 30px",
                borderRadius: "8px",
                border: "none",
                fontWeight: "bold",
                width: "220px",
                cursor: "not-allowed",
              }}
            >
              Create Document Type
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  const CreateUserForm = () => (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "0",
          backgroundColor: "#fff",
          color: "#333",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            padding: "20px 30px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
            Create New User
          </h2>
          <X
            size={20}
            style={{ cursor: "pointer", color: "#666" }}
            onClick={() => setIsCreatingUser(false)}
          />
        </div>
        <div
          style={{
            padding: "25px 40px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxHeight: "85vh",
            overflowY: "auto",
          }}
        >
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label
              className="form-label"
              style={{
                color: "#666",
                fontSize: "11px",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "8px",
              }}
            >
              Select Company
            </label>
            <div style={{ position: "relative" }}>
              <select
                className="form-select"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #eee",
                  color: "#333",
                  fontSize: "13px",
                  padding: "10px 15px",
                  borderRadius: "8px",
                }}
              >
                <option>Select Company</option>
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label
                className="form-label"
                style={{
                  color: "#666",
                  fontSize: "11px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "8px",
                }}
              >
                Email Address
              </label>
              <input
                type="text"
                placeholder="Enter full email address"
                className="form-input"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #eee",
                  color: "#333",
                  fontSize: "13px",
                  padding: "10px 15px",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label
                className="form-label"
                style={{
                  color: "#666",
                  fontSize: "11px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "8px",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                className="form-input"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #eee",
                  color: "#333",
                  fontSize: "13px",
                  padding: "10px 15px",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label
              className="form-label"
              style={{
                color: "#666",
                fontSize: "11px",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "8px",
              }}
            >
              Role *
            </label>
            <div style={{ position: "relative" }}>
              <select
                className="form-select"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #eee",
                  color: "#333",
                  fontSize: "13px",
                  padding: "10px 15px",
                  borderRadius: "8px",
                }}
              >
                <option>Select Roles</option>
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
            <div
              style={{
                fontSize: "11px",
                color: "#bbb",
                marginTop: "8px",
                fontStyle: "italic",
              }}
            >
              No roles selected
            </div>
          </div>

          <div>
            <label
              className="form-label"
              style={{
                color: "#666",
                fontSize: "11px",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "10px",
              }}
            >
              Which clients will the user have access to? *
            </label>
            <div
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#fff",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead
                  style={{
                    backgroundColor: "#fcfcfc",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <tr>
                    <th style={{ padding: "12px 20px", width: "50px" }}>
                      <input
                        type="checkbox"
                        style={{ accentColor: "#2b5ce7" }}
                      />
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        textAlign: "left",
                        fontSize: "10px",
                        color: "#999",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Clients
                    </th>
                    <th
                      style={{
                        padding: "12px 20px",
                        textAlign: "left",
                        fontSize: "10px",
                        color: "#999",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      SLA Days
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Altisource Main Office" },
                    { name: "Annie Mac" },
                    { name: "Kadel Labs" },
                  ].map((client, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: i === 2 ? "none" : "1px solid #f9f9f9",
                      }}
                    >
                      <td style={{ padding: "12px 20px" }}>
                        <input
                          type="checkbox"
                          style={{ accentColor: "#2b5ce7" }}
                        />
                      </td>
                      <td
                        style={{
                          padding: "12px 20px",
                          fontSize: "12px",
                          color: "#333",
                          fontWeight: "500",
                        }}
                      >
                        {client.name}
                      </td>
                      <td style={{ padding: "12px 20px" }}>
                        <input
                          type="text"
                          placeholder="Enter SLA days"
                          className="form-input"
                          style={{
                            width: "150px",
                            padding: "6px 10px",
                            fontSize: "11px",
                            backgroundColor: "#fdfdfd",
                            border: "1px solid #eee",
                            borderRadius: "6px",
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "15px",
              marginTop: "5px",
            }}
          >
            <button
              className="btn btn-outline"
              style={{
                color: "#2b5ce7",
                border: "1px solid #2b5ce7",
                padding: "10px 25px",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "13px",
              }}
              onClick={() => setIsCreatingUser(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              style={{
                backgroundColor: "#f0f0f0",
                color: "#bbb",
                padding: "10px 25px",
                borderRadius: "8px",
                border: "none",
                fontWeight: "bold",
                cursor: "not-allowed",
                fontSize: "13px",
              }}
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ChecklistDetailModal = () => (
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
        zIndex: 3000,
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "700px",
          padding: "0",
          backgroundColor: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
        }}
      >
        <div
          style={{
            padding: "20px 30px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "700",
              color: "#333",
            }}
          >
            test-sbg-1 - Checklist Item 1
          </h2>
          <X
            size={20}
            style={{ cursor: "pointer", color: "#999" }}
            onClick={() => setSelectedDetail(null)}
          />
        </div>

        <div
          style={{
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                color: "#999",
                marginBottom: "12px",
                fontWeight: "500",
              }}
            >
              Checklist Item
            </label>
            <div
              style={{
                fontSize: "15px",
                color: "#333",
                lineHeight: "1.6",
                fontWeight: "500",
              }}
            >
              Does the address in Encompass match the appraisal report? If no,
              add Collateral-address update condition
            </div>
          </div>

          <div style={{ height: "1px", backgroundColor: "#eee" }}></div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                color: "#999",
                marginBottom: "20px",
                fontWeight: "500",
              }}
            >
              AI Prompt
            </label>
            <div style={{ fontSize: "13px", color: "#555", lineHeight: "1.7" }}>
              <div
                style={{
                  fontWeight: "600",
                  marginBottom: "10px",
                  color: "#333",
                }}
              >
                Instructions to LLM:
              </div>
              Check if the subject property address in Encompass matches the one
              reported in the Appraisal.
              <br />
              Fields to Extract:
              <br />
              • From Encompass Data: Property Address (Street, City, State, Zip)
              <br />
              • From Appraisal → “Subject” section: Property Address (Street,
              City, State, Zip)
              <br />
              Return:
              <br />
              • Yes → If Address on both Encompass and Appraisal match exactly
              or with minor formatting differences
              <br />
              • No → If Address on both Encompass and Appraisal differ
              significantly
              <br />• Unknown → If address data from Encompass or the Appraisal
              is missing, unreadable, or cannot be extracted.{" "}
              <span style={{ color: "#2b5ce7", cursor: "pointer" }}>
                View more
              </span>
            </div>
          </div>

          <div style={{ height: "1px", backgroundColor: "#eee" }}></div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                color: "#999",
                marginBottom: "20px",
                fontWeight: "500",
              }}
            >
              AI Reasoning
            </label>
            <div style={{ fontSize: "13px", color: "#555", lineHeight: "1.7" }}>
              <div
                style={{
                  fontWeight: "600",
                  marginBottom: "10px",
                  color: "#333",
                }}
              >
                Instructions to LLM:
              </div>
              Check if the subject property address in Encompass matches the one
              reported in the Appraisal.
              <br />
              Fields to Extract:
              <br />
              • From Encompass Data: Property Address (Street, City, State, Zip)
              <br />
              • From Appraisal → “Subject” section: Property Address (Street,
              City, State, Zip)
              <br />
              Return:
              <br />
              • Yes → If Address on both Encompass and Appraisal match exactly
              or with minor formatting differences
              <br />
              • No → If Address on both Encompass and Appraisal differ
              significantly
              <br />• Unknown → If address data from Encompass or the Appraisal
              is missing, unreadable, or cannot be extracted.{" "}
              <span style={{ color: "#2b5ce7", cursor: "pointer" }}>
                View more
              </span>
            </div>
          </div>

          <div style={{ height: "1px", backgroundColor: "#eee" }}></div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                color: "#999",
                marginBottom: "15px",
                fontWeight: "500",
              }}
            >
              Fields Mapped
            </label>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <div style={{ display: "flex", gap: "50px" }}>
                <div
                  style={{ width: "220px", fontSize: "14px", color: "#555" }}
                >
                  Name of the Borrower
                </div>
                <div
                  style={{ color: "#444", fontWeight: "600", fontSize: "14px" }}
                >
                  : Kathlyn & John Reineke
                </div>
              </div>
              <div style={{ display: "flex", gap: "50px" }}>
                <div
                  style={{ width: "220px", fontSize: "14px", color: "#555" }}
                >
                  Applicant_1 Borrower Name
                </div>
                <div
                  style={{ color: "#444", fontWeight: "600", fontSize: "14px" }}
                >
                  : Kathlyn Reineke
                </div>
              </div>
              <div style={{ display: "flex", gap: "50px" }}>
                <div
                  style={{ width: "220px", fontSize: "14px", color: "#555" }}
                >
                  Name of the Borrower
                </div>
                <div
                  style={{ color: "#444", fontWeight: "600", fontSize: "14px" }}
                >
                  : John Reineke
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SetChecklistAnswersView = () => (
    <div
      style={{
        flex: 1,
        backgroundColor: "#fcfcfc",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          padding: "25px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Set Checklist Answers
        </h2>
        <div style={{ display: "flex", gap: "15px" }}>
          <button
            className="btn btn-outline"
            style={{
              color: "#2b5ce7",
              border: "1px solid #2b5ce7",
              padding: "8px 25px",
            }}
            onClick={() => setView("automate-testing")}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            style={{
              backgroundColor: "#2b5ce7",
              border: "none",
              padding: "8px 25px",
              color: "#fff",
            }}
          >
            Set Answers
          </button>
        </div>
      </div>

      <div
        style={{
          padding: "0 30px 10px 30px",
          fontSize: "12px",
          color: "#2b5ce7",
        }}
      >
        Home / Automate Testing /{" "}
        <span style={{ color: "#999" }}>Set Checklist Answers</span>
      </div>

      <div style={{ padding: "20px 30px", flex: 1, overflowY: "auto" }}>
        <div
          className="card"
          style={{
            padding: 0,
            backgroundColor: "#fff",
            border: "1px solid #eee",
            borderRadius: "12px",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead
              style={{
                backgroundColor: "#fcfcfc",
                borderBottom: "1px solid #eee",
              }}
            >
              <tr>
                <th
                  style={{
                    padding: "15px 20px",
                    textAlign: "left",
                    fontSize: "13px",
                    color: "#333",
                    fontWeight: "600",
                    width: "80px",
                  }}
                >
                  Q ID
                </th>
                <th
                  style={{
                    padding: "15px 20px",
                    textAlign: "left",
                    fontSize: "13px",
                    color: "#333",
                    fontWeight: "600",
                  }}
                >
                  Question
                </th>
                <th
                  style={{
                    padding: "15px 20px",
                    textAlign: "center",
                    fontSize: "13px",
                    color: "#333",
                    fontWeight: "600",
                    width: "100px",
                  }}
                >
                  Yes
                </th>
                <th
                  style={{
                    padding: "15px 20px",
                    textAlign: "center",
                    fontSize: "13px",
                    color: "#333",
                    fontWeight: "600",
                    width: "100px",
                  }}
                >
                  No
                </th>
                <th
                  style={{
                    padding: "15px 20px",
                    textAlign: "center",
                    fontSize: "13px",
                    color: "#333",
                    fontWeight: "600",
                    width: "100px",
                  }}
                >
                  NA
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "Q01",
                  q: "Does the address in Encompass match the appraisal report? If no, add Collateral-address update condition",
                },
                {
                  id: "Q02",
                  q: "Is the borrower's income verified through the appropriate documentation? If not, include Income-verification requirement.",
                },
                {
                  id: "Q03",
                  q: "Are there any outstanding liens on the property? If so, add Lien-clearance condition.",
                },
                {
                  id: "Q04",
                  q: "Does the loan-to-value ratio comply with lending guidelines? If not, specify LTV-adjustment condition.",
                },
                {
                  id: "Q05",
                  q: "Is there a valid credit report on file for the borrower? If not, include Credit-reporting condition.",
                },
                {
                  id: "Q06",
                  q: "Are all required disclosures signed by the borrower? If any missing, add Disclosure-signatures condition.",
                },
                {
                  id: "Q07",
                  q: "Is the property insurance coverage adequate as per the lender's requirements? If not, add Insurance-coverage condition.",
                },
                {
                  id: "Q08",
                  q: "Has the title search been completed with no issues identified? If issues exist, include Title-resolution condition.",
                },
                {
                  id: "Q09",
                  q: "Are there any pending permits or approvals that could affect the project timeline?",
                },
              ].map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f5f5f5" }}>
                  <td
                    style={{
                      padding: "18px 20px",
                      fontSize: "13px",
                      color: "#666",
                    }}
                  >
                    {item.id}
                  </td>
                  <td
                    style={{
                      padding: "18px 20px",
                      fontSize: "14px",
                      color: "#333",
                      fontWeight: "500",
                    }}
                  >
                    {item.q}
                  </td>
                  <td style={{ padding: "18px 20px", textAlign: "center" }}>
                    <input
                      type="radio"
                      name={`q${i}`}
                      style={{
                        accentColor: "#2b5ce7",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </td>
                  <td style={{ padding: "18px 20px", textAlign: "center" }}>
                    <input
                      type="radio"
                      name={`q${i}`}
                      style={{
                        accentColor: "#2b5ce7",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </td>
                  <td style={{ padding: "18px 20px", textAlign: "center" }}>
                    <input
                      type="radio"
                      name={`q${i}`}
                      style={{
                        accentColor: "#2b5ce7",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  const ViewResultTable = () => (
    <div
      style={{ padding: "30px", backgroundColor: "#f5f6ff", minHeight: "100%" }}
    >
      {selectedDetail && <ChecklistDetailModal />}

      <div
        className="card"
        style={{
          padding: 0,
          backgroundColor: "#fff",
          border: "1px solid #eee",
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <th
                style={{
                  padding: "20px",
                  textAlign: "left",
                  minWidth: "300px",
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                Checklist Item
              </th>
              {[
                "test-sbg-1",
                "test-sbg-2",
                "test-sbg-3",
                "test-sbg-4",
                "test-sbg-5",
                "test-sbg-6",
                "test-sbg-7",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  {h}
                </th>
              ))}
              <th
                style={{
                  padding: "20px",
                  textAlign: "center",
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                Avg. Accuracy
              </th>
              <th
                style={{
                  padding: "20px",
                  textAlign: "left",
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                Analysis Comment
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td
                  style={{
                    padding: "20px",
                    fontSize: "12px",
                    color: "#333",
                    lineHeight: "1.5",
                  }}
                >
                  <div style={{ display: "flex", gap: "15px" }}>
                    <span style={{ color: "#999" }}>{i}</span>
                    <span>
                      Check if address in Encompass matches appraisal report. If
                      no, add Collateral-address update condition
                    </span>
                  </div>
                </td>
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <td key={n} style={{ textAlign: "center" }}>
                    <span
                      onClick={() => setSelectedDetail(i)}
                      style={{
                        color: n % 4 === 0 ? "#ff0000" : "#2b5ce7",
                        fontSize: "12px",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      {n % 4 === 0 ? "Incorrect" : "Correct"}
                    </span>
                  </td>
                ))}
                <td
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  66.66%
                </td>
                <td style={{ padding: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div style={{ fontSize: "11px", color: "#666" }}>
                      Analysis shows correct answers for cases
                    </div>
                    <Edit3
                      size={14}
                      style={{ color: "#999", cursor: "pointer" }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="btn btn-outline"
        style={{
          marginTop: "20px",
          color: "#2b5ce7",
          border: "1px solid #2b5ce7",
        }}
        onClick={() => setView("automate-testing")}
      >
        Back
      </button>
    </div>
  );

  // --- MAIN LAYOUT COMPONENTS ---

  const AdminSidebar = () => (
    <div
      style={{
        width: "240px",
        backgroundColor: "#fff",
        borderRight: "1px solid #eee",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "25px 20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderBottom: "1px solid #f9f9f9",
        }}
      >
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
          <Settings size={18} />
        </div>
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Admin Center
          </h2>
          <div style={{ fontSize: "11px", color: "#999" }}>
            System Administration
          </div>
        </div>
        <button
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            color: "#999",
          }}
        >
          <X size={16} />
        </button>
      </div>

      <nav style={{ padding: "15px 0" }}>
        {[
          { id: "all", label: "All Cases", icon: FileText },
          { id: "pending", label: "My Pending Cases", icon: Clock },
          { id: "completed", label: "My Completed Cases", icon: CheckCircle2 },
          { id: "automate-testing", label: "Automate Testing", icon: Activity },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() =>
              setView(
                item.id === "automate-testing" ? "automate-testing" : "main",
              )
            }
            style={{
              width: "100%",
              padding: "12px 20px",
              border: "none",
              textAlign: "left",
              backgroundColor:
                view === item.id ||
                (view === "automate-testing" && item.id === "automate-testing")
                  ? "#f0f4ff"
                  : "transparent",
              color:
                view === item.id ||
                (view === "automate-testing" && item.id === "automate-testing")
                  ? "#2b5ce7"
                  : "#666",
              fontSize: "13px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              borderLeft:
                view === item.id ||
                (view === "automate-testing" && item.id === "automate-testing")
                  ? "4px solid #2b5ce7"
                  : "4px solid transparent",
              cursor: "pointer",
            }}
          >
            <item.icon size={16} /> {item.label}
          </button>
        ))}

        <div
          style={{
            padding: "25px 20px 10px 20px",
            fontSize: "11px",
            fontWeight: "bold",
            color: "#bbb",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Admin Settings
        </div>

        <button
          onClick={() => setView("main")}
          style={{
            width: "100%",
            padding: "12px 20px",
            border: "none",
            textAlign: "left",
            backgroundColor: view === "main" ? "#f0f4ff" : "transparent",
            color: view === "main" ? "#2b5ce7" : "#666",
            fontSize: "13px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
          }}
        >
          <Settings size={16} /> Document Configuration
        </button>

        <div style={{ padding: "18px 20px" }}>
          <button
            onClick={() => setActiveSection("data-extraction")}
            style={{
              width: "100%",
              padding: "12px 20px",
              border: "1px solid #2b5ce7",
              background: "#fff",
              color: "#2b5ce7",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Open Data Extraction Review
          </button>
        </div>
      </nav>
    </div>
  );

  const AutomateTestingView = () => (
    <div
      style={{
        flex: 1,
        backgroundColor: "#fcfcfc",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "25px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Automate Testing
        </h2>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <button
            className="btn btn-outline"
            style={{
              backgroundColor: "#f0f7ff",
              border: "none",
              color: "#2b5ce7",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onClick={() => setActiveSection("section1")}
          >
            <LayoutDashboard size={16} /> Back to Workbench
          </button>
          <div
            style={{
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              color: "#333",
            }}
          >
            Content Admin <ChevronDown size={14} />
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "0 30px 10px 30px",
          fontSize: "12px",
          color: "#2b5ce7",
        }}
      >
        Home / <span style={{ color: "#999" }}>Automate Testing</span>
      </div>

      <div style={{ padding: "20px 30px" }}>
        <div style={{ position: "relative", marginBottom: "30px" }}>
          <div
            style={{
              display: "flex",
              gap: "30px",
              borderBottom: "1px solid #eee",
            }}
          >
            <button
              onClick={() => setTestingTab("golden")}
              style={{
                padding: "0 5px 12px 5px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                color: testingTab === "golden" ? "#2b5ce7" : "#999",
                borderBottom:
                  testingTab === "golden" ? "2px solid #2b5ce7" : "none",
              }}
            >
              Golden Set
            </button>
            <button
              onClick={() => setTestingTab("test")}
              style={{
                padding: "0 5px 12px 5px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                color: testingTab === "test" ? "#2b5ce7" : "#999",
                borderBottom:
                  testingTab === "test" ? "2px solid #2b5ce7" : "none",
              }}
            >
              Test
            </button>
          </div>
          <button
            className="btn btn-primary"
            style={{
              position: "absolute",
              right: 0,
              top: "-10px",
              backgroundColor: "#2b5ce7",
              border: "none",
              padding: "10px 25px",
            }}
            onClick={() => setActiveSection("create-case")}
          >
            Create Case
          </button>
        </div>

        <div
          className="card"
          style={{
            padding: "20px",
            display: "flex",
            gap: "20px",
            alignItems: "flex-end",
            backgroundColor: "#fff",
            border: "1px solid #eee",
            borderRadius: "12px",
          }}
        >
          <div style={{ flex: 1 }}>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                color: "#999",
                marginBottom: "8px",
                fontWeight: "500",
              }}
            >
              Search
            </label>
            <input
              type="text"
              placeholder="Search cases"
              className="form-input"
              style={{
                width: "100%",
                backgroundColor: "#fdfdfd",
                border: "1px solid #eee",
                fontSize: "13px",
              }}
            />
          </div>
          <div style={{ width: "280px" }}>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                color: "#999",
                marginBottom: "8px",
                fontWeight: "500",
              }}
            >
              Updated By
            </label>
            <div style={{ position: "relative" }}>
              <select
                className="form-select"
                style={{
                  backgroundColor: "#fdfdfd",
                  border: "1px solid #eee",
                  fontSize: "13px",
                }}
              >
                <option>All</option>
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
          <div
            style={{ paddingBottom: "12px", fontSize: "13px", color: "#666" }}
          >
            167 cases found
          </div>
        </div>

        <div
          className="card"
          style={{
            padding: 0,
            marginTop: "25px",
            backgroundColor: "#fff",
            border: "1px solid #eee",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#fcfcfc" }}>
              <tr>
                <th
                  style={{
                    padding: "18px 20px",
                    textAlign: "left",
                    fontSize: "12px",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  Test ID
                </th>
                <th
                  style={{
                    padding: "18px 20px",
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  No. of Cases
                </th>
                <th
                  style={{
                    padding: "18px 20px",
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  No. of Questions
                </th>
                <th
                  style={{
                    padding: "18px 20px",
                    textAlign: "left",
                    fontSize: "12px",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  Description
                </th>
                <th
                  style={{
                    padding: "18px 20px",
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  Accuracy
                </th>
                <th
                  style={{
                    padding: "18px 20px",
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  Test Time Taken
                </th>
                <th
                  style={{
                    padding: "18px 20px",
                    textAlign: "left",
                    fontSize: "12px",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  Created Date
                </th>
                <th
                  style={{
                    padding: "18px 20px",
                    textAlign: "left",
                    fontSize: "12px",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  Created By
                </th>
                <th
                  style={{
                    padding: "18px 20px",
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {goldenSetData.map((d) => (
                <tr key={d.id} style={{ borderTop: "1px solid #eee" }}>
                  <td
                    style={{
                      padding: "18px 20px",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    {d.id}
                  </td>
                  <td
                    style={{
                      padding: "18px 20px",
                      textAlign: "center",
                      fontSize: "13px",
                    }}
                  >
                    4
                  </td>
                  <td
                    style={{
                      padding: "18px 20px",
                      textAlign: "center",
                      fontSize: "13px",
                    }}
                  >
                    12
                  </td>
                  <td
                    style={{
                      padding: "18px 20px",
                      fontSize: "13px",
                      color: "#666",
                    }}
                  >
                    80
                  </td>
                  <td
                    style={{
                      padding: "18px 20px",
                      textAlign: "center",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    75%
                  </td>
                  <td
                    style={{
                      padding: "18px 20px",
                      textAlign: "center",
                      fontSize: "13px",
                    }}
                  >
                    5min 23 sec
                  </td>
                  <td
                    style={{
                      padding: "18px 20px",
                      fontSize: "13px",
                      color: "#999",
                    }}
                  >
                    12/01/2025, 11:00AM
                  </td>
                  <td style={{ padding: "18px 20px", fontSize: "13px" }}>
                    John Doe
                  </td>
                  <td
                    style={{
                      padding: "18px 20px",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    <MoreVertical
                      size={16}
                      style={{ cursor: "pointer", color: "#999" }}
                      onClick={() =>
                        setShowActions(showActions === d.id ? null : d.id)
                      }
                    />
                    {showActions === d.id && (
                      <div
                        style={{
                          position: "absolute",
                          right: "40px",
                          top: "15px",
                          backgroundColor: "#fff",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          borderRadius: "8px",
                          zIndex: 10,
                          width: "180px",
                          border: "1px solid #eee",
                          padding: "8px",
                        }}
                      >
                        {[
                          { label: "Upload Document", icon: Upload },
                          { label: "View Document", icon: ExternalLink },
                          {
                            label: "Set Checklist Answer",
                            icon: CheckCircle2,
                            action: () => setView("set-answers"),
                          },
                          {
                            label: "View Result",
                            icon: Activity,
                            action: () => setView("view-results"),
                          },
                          { label: "Delete Case", icon: Trash2, color: "red" },
                        ].map((a, i) => (
                          <div
                            key={i}
                            onClick={a.action}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              padding: "10px",
                              fontSize: "12px",
                              color: a.color || "#333",
                              cursor: "pointer",
                            }}
                            className="dropdown-item"
                          >
                            <a.icon size={14} /> {a.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <AdminSidebar />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {view === "automate-testing" && <AutomateTestingView />}
        {view === "view-results" && <ViewResultTable />}
        {view === "set-answers" && <SetChecklistAnswersView />}
        {(view === "main" || view === "all") && (
          <div style={{ padding: "40px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <h2 style={{ color: "#333", margin: 0 }}>
                Document Configuration
              </h2>
              <button
                className="btn btn-primary"
                onClick={() => setIsCreatingDocType(true)}
                style={{
                  backgroundColor: "#2b5ce7",
                  border: "none",
                  padding: "10px 25px",
                }}
              >
                Add Document Type
              </button>
            </div>
            <div
              className="card"
              style={{ padding: "40px", textAlign: "center" }}
            >
              <h3 style={{ color: "#666" }}>No Document Types Configured</h3>
              <p style={{ color: "#999" }}>
                Click the button above to add your first document type.
              </p>
              <button
                className="btn btn-outline"
                onClick={() => setIsCreatingUser(true)}
                style={{ marginTop: "20px" }}
              >
                Add New User (Admin)
              </button>
            </div>
          </div>
        )}
      </div>

      {isCreatingUser && <CreateUserForm />}
      {isCreatingDocType && <CreateDocTypeModal />}
    </div>
  );
};

export default AdminCenter;
