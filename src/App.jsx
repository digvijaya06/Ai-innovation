import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Section1 from "./pages/Section1";
import Section2 from "./pages/Section2";
import ViewHighSection from "./pages/ViewHighSection";
import CreateCaseSection from "./pages/CreateCaseSection";
import Section6 from "./pages/Section6";
import RuleEngine from "./pages/RuleEngine";
import ReviewCaseSection from "./pages/ReviewCaseSection";
import IncomeCalculator from "./pages/IncomeCalculator";
import AdminCenter from "./pages/AdminCenter";
import DataExtractionReview from "./pages/DataExtractionReview";
import UserFlowDiagram from "./pages/UserFlowDiagram";

function App() {
  const [activeSection, setActiveSection] = useState("section1");

  const renderSection = () => {
    switch (activeSection) {
      case "section1":
        return <Section1 setActiveSection={setActiveSection} />;
      case "section2":
        return <Section2 setActiveSection={setActiveSection} />;
      case "view-high":
        return <ViewHighSection setActiveSection={setActiveSection} />;
      case "create-case":
        return <CreateCaseSection setActiveSection={setActiveSection} />;
      case "section6":
        return <Section6 setActiveSection={setActiveSection} />;
      case "rule-engine":
        return <RuleEngine setActiveSection={setActiveSection} />;
      case "review-case":
        return <ReviewCaseSection setActiveSection={setActiveSection} />;
      case "income-calc":
        return <IncomeCalculator setActiveSection={setActiveSection} />;
      case "admin-center":
        return <AdminCenter setActiveSection={setActiveSection} />;
      case "data-extraction":
        return <DataExtractionReview setActiveSection={setActiveSection} />;
      case "user-flow":
        return <UserFlowDiagram setActiveSection={setActiveSection} />;
      default:
        return <Section1 setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-layout" style={{ display: "flex" }}>
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main
          style={{
            flex: 1,
            marginLeft: "var(--sidebar-width)",
            marginTop: "var(--header-height)",
            backgroundColor: "var(--bg-main)",
            minHeight: "calc(100vh - var(--header-height))",
            overflowY: "auto",
          }}
        >
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

export default App;
