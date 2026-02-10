import React, { useState } from 'react';
import {
    Calculator,
    Search,
    Plus,
    ChevronDown,
    MoreVertical,
    FileText,
    Settings,
    CheckCircle2,
    Clock,
    LayoutDashboard,
    X,
    Briefcase,
    Activity,
    Upload,
    ExternalLink,
    RotateCcw,
    Trash2
} from 'lucide-react';
import './Section.css';

const animations = `
@keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
}
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}
`;

const IncomeCalculator = ({ setActiveSection }) => {
    const [view, setView] = useState('dashboard'); // 'dashboard', 'workflow'
    const [activeTab, setActiveTab] = useState('all');
    const [showActions, setShowActions] = useState(null);
    const [currentStep, setCurrentStep] = useState(1); // 1 to 6
    const [selectedCase, setSelectedCase] = useState(null);

    // Mock Data
    const cases = [
        { id: '124', num: 'test_sbg_3-1', client: 'Altisource_Main_Office', reviewer: 'Tenant+SAdmin', date: '12/01/2025, 11:00AM', status: 'Extraction Pending' },
        { id: '125', num: 'test_sbg_3-2', client: 'Altisource_Satellite_Office', reviewer: 'Tenant+SViewer', date: '12/02/2025, 2:00PM', status: 'Reviewing' },
        { id: '126', num: 'test_sbg_3-3', client: 'Altisource_Regional_Office', reviewer: 'Tenant+SAdmin', date: '12/03/2025, 10:00AM', status: 'AI Review' },
        { id: '127', num: 'test_sbg_3-4', client: 'Altisource_HQ', reviewer: 'Tenant+SViewer', date: '12/04/2025, 1:00PM', status: 'Review In-progress' },
    ];

    const Stepper = () => {
        const steps = [
            { id: 1, label: 'Select Case' },
            { id: 2, label: 'Doc Extraction' },
            { id: 3, label: 'Review Data' },
            { id: 4, label: 'Calculate Income' },
            { id: 5, label: 'Review Result' },
            { id: 6, label: 'Finish' }
        ];

        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '30px 20px', backgroundColor: '#fcfcfc', borderBottom: '1px solid #eee' }}>
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                backgroundColor: currentStep >= step.id ? '#2b5ce7' : '#eee',
                                color: currentStep >= step.id ? '#fff' : '#999',
                                fontSize: '13px', fontWeight: 'bold'
                            }}>
                                {currentStep > step.id ? <CheckCircle2 size={16} /> : step.id}
                            </div>
                            <span style={{
                                fontSize: '13px',
                                fontWeight: currentStep === step.id ? 'bold' : '500',
                                color: currentStep >= step.id ? '#333' : '#999'
                            }}>
                                {step.label}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div style={{ width: '40px', height: '1px', backgroundColor: currentStep > step.id ? '#2b5ce7' : '#eee' }}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    const IncomeSidebar = () => (
        <div style={{ width: '240px', backgroundColor: '#fff', borderRight: '1px solid #eee', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '25px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #f9f9f9' }}>
                <div style={{ width: '32px', height: '32px', backgroundColor: '#2b5ce7', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Calculator size={18} />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#333' }}>Income Calculator</h2>
                    <div style={{ fontSize: '11px', color: '#999' }}>Paystub Documentation</div>
                </div>
                <button style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#999' }}><X size={16} /></button>
            </div>

            <nav style={{ padding: '15px 0' }}>
                {[
                    { id: 'all', label: 'All Cases', count: 100, icon: Briefcase },
                    { id: 'pending', label: 'My Pending Cases', count: 50, icon: Clock },
                    { id: 'completed', label: 'My Completed Cases', count: 50, icon: CheckCircle2 },
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className="sidebar-nav-item"
                        style={{
                            width: '100%', padding: '12px 20px', border: 'none', textAlign: 'left',
                            backgroundColor: activeTab === item.id ? '#f0f4ff' : 'transparent',
                            color: activeTab === item.id ? '#2b5ce7' : '#666',
                            fontSize: '13.5px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px',
                            borderLeft: activeTab === item.id ? '4px solid #2b5ce7' : '4px solid transparent',
                            cursor: 'pointer', transition: 'all 0.2s', position: 'relative'
                        }}
                    >
                        <item.icon size={16} />
                        <span>{item.label}</span>
                        <span style={{
                            marginLeft: 'auto', fontSize: '11px', backgroundColor: activeTab === item.id ? '#2b5ce7' : '#f0f0f0',
                            color: activeTab === item.id ? '#fff' : '#999', padding: '2px 8px', borderRadius: '10px'
                        }}>{item.count}</span>
                    </button>
                ))}

                <div style={{ padding: '25px 20px 10px 20px', fontSize: '11px', fontWeight: 'bold', color: '#bbb', textTransform: 'uppercase', letterSpacing: '1px' }}>Admin Settings</div>

                <button className="sidebar-nav-item" style={{
                    width: '100%', padding: '12px 20px', border: 'none', textAlign: 'left',
                    backgroundColor: 'transparent', color: '#666', fontSize: '13.5px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                    <Settings size={16} /> Document Configuration
                </button>
            </nav>
        </div>
    );

    const DashboardView = () => (
        <div style={{ flex: 1, backgroundColor: '#fcfcfc', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '25px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#333' }}>Income Calculator</h2>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <button className="btn btn-outline" style={{ backgroundColor: '#f0f7ff', border: '1px solid #d0e1ff', color: '#2b5ce7', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600' }} onClick={() => setActiveSection('section1')}>
                        <LayoutDashboard size={18} /> Back to Workbench
                    </button>
                    <div style={{ fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#333', backgroundColor: '#fff', padding: '10px 15px', borderRadius: '10px', border: '1px solid #eee' }}>
                        Tenant+SAdmin <ChevronDown size={16} />
                    </div>
                </div>
            </div>

            <div style={{ padding: '0 30px 20px 30px', fontSize: '12px', color: '#999' }}>
                Upload and manage income calculator cases
            </div>

            <div style={{ padding: '0 30px' }}>
                <div className="card" style={{ padding: '20px', display: 'flex', gap: '20px', alignItems: 'flex-end', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '12px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '11px', color: '#999', marginBottom: '8px', fontWeight: '500' }}>Search</label>
                        <input type="text" placeholder="Search cases" className="form-input" style={{ width: '100%', backgroundColor: '#fdfdfd', border: '1px solid #eee', fontSize: '13px' }} />
                    </div>
                    <div style={{ width: '180px' }}>
                        <label style={{ display: 'block', fontSize: '11px', color: '#999', marginBottom: '8px', fontWeight: '500' }}>Select Client</label>
                        <div style={{ position: 'relative' }}>
                            <select className="form-select" style={{ backgroundColor: '#fdfdfd', border: '1px solid #eee', fontSize: '13px' }}><option>All Clients</option></select>
                            <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '12px', color: '#999' }} />
                        </div>
                    </div>
                    <div style={{ width: '180px' }}>
                        <label style={{ display: 'block', fontSize: '11px', color: '#999', marginBottom: '8px', fontWeight: '500' }}>Select Status</label>
                        <div style={{ position: 'relative' }}>
                            <select className="form-select" style={{ backgroundColor: '#fdfdfd', border: '1px solid #eee', fontSize: '13px' }}><option>All Status</option></select>
                            <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '12px', color: '#999' }} />
                        </div>
                    </div>
                    <div style={{ paddingBottom: '12px', fontSize: '13px', color: '#666' }}>167 cases found</div>
                    <button className="btn btn-primary" style={{ backgroundColor: '#2b5ce7', border: 'none', padding: '10px 25px' }} onClick={() => setActiveSection('create-case')}>
                        Create Case
                    </button>
                </div>

                <div className="card" style={{ padding: 0, marginTop: '25px', backgroundColor: '#fff', border: '1px solid #eee', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#fcfcfc' }}>
                            <tr>
                                <th style={{ padding: '18px 20px', textAlign: 'left', fontSize: '12px', color: '#666', fontWeight: '600' }}>Case ID</th>
                                <th style={{ padding: '18px 20px', textAlign: 'left', fontSize: '12px', color: '#666', fontWeight: '600' }}>Case Number</th>
                                <th style={{ padding: '18px 20px', textAlign: 'left', fontSize: '12px', color: '#666', fontWeight: '600' }}>Client</th>
                                <th style={{ padding: '18px 20px', textAlign: 'left', fontSize: '12px', color: '#666', fontWeight: '600' }}>Assigned Reviewer</th>
                                <th style={{ padding: '18px 20px', textAlign: 'left', fontSize: '12px', color: '#666', fontWeight: '600' }}>Assigned Date</th>
                                <th style={{ padding: '18px 20px', textAlign: 'left', fontSize: '12px', color: '#666', fontWeight: '600' }}>Status</th>
                                <th style={{ padding: '18px 20px', textAlign: 'center', fontSize: '12px', color: '#666', fontWeight: '600' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cases.map(c => (
                                <tr key={c.id} style={{ borderTop: '1px solid #eee' }}>
                                    <td style={{ padding: '18px 20px', fontSize: '13px', fontWeight: '500' }}>{c.id}</td>
                                    <td style={{ padding: '18px 20px', fontSize: '13px', color: '#666' }}>{c.num}</td>
                                    <td style={{ padding: '18px 20px', fontSize: '13px', color: '#666' }}>{c.client}</td>
                                    <td style={{ padding: '18px 20px', fontSize: '13px', color: '#666' }}>{c.reviewer}</td>
                                    <td style={{ padding: '18px 20px', fontSize: '13px', color: '#999' }}>{c.date}</td>
                                    <td style={{ padding: '18px 20px' }}>
                                        <span style={{
                                            color: c.status === 'Extraction Pending' ? '#f59e0b' : c.status === 'Reviewing' ? '#10b981' : '#2b5ce7',
                                            fontSize: '12px', fontWeight: '600'
                                        }}>{c.status}</span>
                                    </td>
                                    <td style={{ padding: '18px 20px', textAlign: 'center', position: 'relative' }}>
                                        <MoreVertical size={16} style={{ cursor: 'pointer', color: '#999' }} onClick={() => setShowActions(showActions === c.id ? null : c.id)} />
                                        {showActions === c.id && (
                                            <div style={{
                                                position: 'absolute', right: '40px', top: '15px', backgroundColor: '#fff',
                                                boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '8px', zIndex: 10, width: '180px',
                                                border: '1px solid #eee', padding: '8px'
                                            }}>
                                                {[
                                                    { label: 'Review Case', icon: FileText, action: () => { setView('workflow'); setCurrentStep(1); setSelectedCase(c); } },
                                                    { label: 'Regenerate', icon: RotateCcw },
                                                    { label: 'Re-assign Case', icon: ExternalLink },
                                                    { label: 'Delete Case', icon: Trash2, color: 'red' }
                                                ].map((a, i) => (
                                                    <div key={i} onClick={a.action} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', fontSize: '12px', color: a.color || '#333', cursor: 'pointer' }} className="dropdown-item">
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

    const WorkflowContainer = () => (
        <div style={{ flex: 1, backgroundColor: '#fcfcfc', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 30px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ backgroundColor: '#f0f4ff', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#2b5ce7' }} onClick={() => setView('dashboard')}>
                        <RotateCcw size={18} transform="scaleX(-1)" />
                    </div>
                    <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Review Case : <span style={{ color: '#2b5ce7' }}>{selectedCase?.num}</span></h2>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button className="btn btn-outline" style={{ padding: '8px 25px', color: '#2b5ce7', border: '1px solid #2b5ce7' }} onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}>Back</button>
                    <button className="btn btn-primary" style={{ padding: '8px 25px', backgroundColor: '#2b5ce7', border: 'none' }} onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}>Next Step</button>
                </div>
            </div>

            <Stepper />

            <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
                <style>{animations}</style>
                {currentStep === 1 && <SelectCaseStep />}
                {currentStep === 2 && <DocExtractionStep />}
                {currentStep === 3 && <ReviewDataStep />}
                {currentStep === 4 && <CalculateIncomeStep />}
                {currentStep === 5 && <ReviewResultStep />}
                {currentStep === 6 && <FinishStep />}
            </div>
        </div>
    );

    const SelectCaseStep = () => (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="card" style={{ padding: '30px', backgroundColor: '#fff', borderRadius: '16px' }}>
                <div style={{ marginBottom: '30px' }}>
                    <div style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '0.5px' }}>Area spreadsheet column that shows borrower name and date of hire *</div>
                    <div style={{ display: 'flex', gap: '40px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', color: '#333' }}>
                            <input type="radio" name="borrower" checked readOnly style={{ width: '18px', height: '18px', accentColor: '#2b5ce7' }} /> Borrower 1 (Mac_Data_Borrower)
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', color: '#333' }}>
                            <input type="radio" name="borrower" style={{ width: '18px', height: '18px', accentColor: '#2b5ce7' }} /> Borrower 2 (Mac_Data_Borrower)
                        </label>
                    </div>
                </div>

                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#333' }}>Doc types found in case (2)</h3>
                        <span style={{ fontSize: '13px', color: '#2b5ce7', cursor: 'pointer', fontWeight: '600' }}>View Data Under Review</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {[
                            { type: 'Paystub', name: 'Paystub - 1', date: '01/05/2024' },
                            { type: 'W-2', name: 'W-2 2023', date: '01/01/2024' }
                        ].map((doc, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '18px 25px', border: '1px solid #eee', borderRadius: '16px', gap: '20px', transition: 'all 0.2s', backgroundColor: '#fdfdfd' }}>
                                <input type="checkbox" checked readOnly style={{ width: '20px', height: '20px', accentColor: '#2b5ce7' }} />
                                <div style={{ width: '48px', height: '48px', backgroundColor: '#f0f4ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2b5ce7' }}>
                                    <FileText size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#333' }}>{doc.type} ({doc.name})</div>
                                    <div style={{ fontSize: '13px', color: '#999', marginTop: '4px' }}>Analyzed on {doc.date}</div>
                                </div>
                                <button style={{ backgroundColor: 'transparent', border: 'none', color: '#2b5ce7', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>View PDF</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: '30px' }}>
                    <button className="btn btn-primary" style={{ padding: '14px 60px', backgroundColor: '#2b5ce7', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold' }} onClick={() => setCurrentStep(2)}>Review Case</button>
                </div>
            </div>
        </div>
    );

    const DocExtractionStep = () => (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Doc extraction details you want to extract for this case</h3>
            <p style={{ color: '#999', fontSize: '14px', marginBottom: '30px' }}>Select the documents and borrowers you want to include in the income calculation review.</p>

            <div className="card" style={{ padding: '30px', backgroundColor: '#fff', borderRadius: '16px' }}>
                <div style={{ marginBottom: '30px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px' }}>Do you want to extract all documents? <span style={{ color: 'red' }}>*</span></div>
                    <div style={{ display: 'flex', gap: '30px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <input type="radio" name="extractAll" checked readOnly style={{ accentColor: '#2b5ce7' }} /> Yes
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <input type="radio" name="extractAll" style={{ accentColor: '#2b5ce7' }} /> No
                        </label>
                    </div>
                </div>

                <div style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#fcfcfc', borderBottom: '1px solid #eee' }}>
                            <tr>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '12px', color: '#666', fontWeight: '600' }}>Extraction Document</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '12px', color: '#666', fontWeight: '600' }}>Source Document Type</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '12px', color: '#666', fontWeight: '600' }}>Extraction Document Type</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '12px', color: '#666', fontWeight: '600' }}>Assign Borrower</th>
                                <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '12px', color: '#666', fontWeight: '600' }}>Include in calculation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '20px', fontSize: '13px', fontWeight: '500' }}>Paystub - 1</td>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ position: 'relative' }}>
                                        <select className="form-select" style={{ fontSize: '13px', padding: '8px 12px', width: '150px' }}><option>Paystub</option></select>
                                    </div>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ position: 'relative' }}>
                                        <select className="form-select" style={{ fontSize: '13px', padding: '8px 12px', width: '150px' }}><option>Paystub</option></select>
                                    </div>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ position: 'relative' }}>
                                        <select className="form-select" style={{ fontSize: '13px', padding: '8px 12px', width: '150px' }}><option>Borrower 1</option></select>
                                    </div>
                                </td>
                                <td style={{ padding: '20px', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                                            <input type="radio" name="inc1" checked readOnly style={{ accentColor: '#2b5ce7' }} /> Yes
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                                            <input type="radio" name="inc1" style={{ accentColor: '#2b5ce7' }} /> No
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
                    <button className="btn btn-primary" style={{ padding: '12px 40px', backgroundColor: '#2b5ce7', border: 'none' }} onClick={() => setCurrentStep(3)}>Next Step</button>
                </div>
            </div>
        </div>
    );

    const ReviewDataStep = () => (
        <div style={{ display: 'flex', gap: '20px', height: '100%', minHeight: '700px' }}>
            {/* Left: Document Sidebar */}
            <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>Documents</h3>
                {[
                    { id: 1, name: 'Paystub - 1', status: 'verified' },
                    { id: 2, name: 'W-2 2023', status: 'pending' },
                    { id: 3, name: 'Tax Return', status: 'pending' }
                ].map((doc) => (
                    <div key={doc.id} style={{
                        padding: '12px 15px', borderRadius: '12px', border: '1px solid #eee', backgroundColor: doc.id === 1 ? '#f0f4ff' : '#fff',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s'
                    }}>
                        <input type="radio" checked={doc.id === 1} readOnly style={{ accentColor: '#2b5ce7' }} />
                        <div style={{ fontSize: '13px', fontWeight: '600', color: doc.id === 1 ? '#2b5ce7' : '#666' }}>{doc.name}</div>
                    </div>
                ))}
            </div>

            {/* Middle: Data Table */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Extraction data found</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-outline" style={{ fontSize: '11px', padding: '5px 12px', color: '#2b5ce7', border: '1px solid #2b5ce7' }}>Download CSV</button>
                        <button className="btn btn-primary" style={{ fontSize: '11px', padding: '5px 12px', backgroundColor: '#2b5ce7', border: 'none' }}>Save Changes</button>
                    </div>
                </div>

                <div className="card" style={{ padding: 0, backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #eee', flex: 1 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#fcfcfc', borderBottom: '1px solid #eee' }}>
                            <tr>
                                <th style={{ padding: '12px 15px', textAlign: 'left', fontSize: '11px', color: '#666', fontWeight: 'bold', textTransform: 'uppercase' }}>Field Name</th>
                                <th style={{ padding: '12px 15px', textAlign: 'left', fontSize: '11px', color: '#666', fontWeight: 'bold', textTransform: 'uppercase' }}>Result</th>
                                <th style={{ padding: '12px 15px', textAlign: 'left', fontSize: '11px', color: '#666', fontWeight: 'bold', textTransform: 'uppercase', width: '120px' }}>Confidence</th>
                                <th style={{ padding: '12px 15px', textAlign: 'center', fontSize: '11px', color: '#666', fontWeight: 'bold', textTransform: 'uppercase', width: '100px' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { field: 'GP Period', value: 'Bi-Weekly', score: 98, status: 'Verified' },
                                { field: 'GP Start Date', value: '01/01/2024', score: 95, status: 'Verified' },
                                { field: 'GP End Date', value: '14/01/2024', score: 92, status: 'Verified' },
                                { field: 'YTD GP', value: '$2,500.00', score: 45, status: 'Missing' },
                                { field: 'Hours', value: '40.00', score: 99, status: 'Verified' },
                                { field: 'Current Gross Pay', value: '$2,500.00', score: 75, status: 'Verified' },
                            ].map((row, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                    <td style={{ padding: '12px 15px', fontSize: '13px', fontWeight: '600', color: '#333' }}>{row.field} <span style={{ color: '#ef4444' }}>*</span></td>
                                    <td style={{ padding: '12px 15px' }}>
                                        <input type="text" defaultValue={row.value} style={{ width: '100%', padding: '6px 10px', border: row.status === 'Missing' ? '1.5px solid #ef4444' : '1px solid #eee', borderRadius: '6px', fontSize: '13px', backgroundColor: row.status === 'Missing' ? '#fff5f5' : '#fff' }} />
                                    </td>
                                    <td style={{ padding: '12px 15px' }}>
                                        <div style={{ width: '100%', height: '6px', backgroundColor: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ width: `${row.score}%`, height: '100%', backgroundColor: row.score > 80 ? '#10b981' : row.score > 60 ? '#f59e0b' : '#ef4444' }}></div>
                                        </div>
                                        <div style={{ fontSize: '10px', color: '#999', marginTop: '3px' }}>{row.score}%</div>
                                    </td>
                                    <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '3px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold',
                                            backgroundColor: row.status === 'Verified' ? '#f0fdf4' : '#fef2f2',
                                            color: row.status === 'Verified' ? '#10b981' : '#ef4444'
                                        }}>{row.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right: PDF Preview */}
            <div style={{ width: '35%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#333' }}>Review Document</h3>
                    <div style={{ fontSize: '11px', color: '#999', backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}>Page 1 of 1</div>
                </div>
                <div className="card" style={{ flex: 1, backgroundColor: '#f5f5f5', borderRadius: '16px', padding: '15px', border: '1px solid #eee', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>ADPay</div>
                            <div style={{ fontSize: '10px', color: '#999' }}>PAY STATEMENT</div>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div>
                                    <div style={{ fontSize: '9px', color: '#999' }}>Employee</div>
                                    <div style={{ fontSize: '11px', fontWeight: 'bold' }}>Mac Jones</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '9px', color: '#999' }}>Pay Period</div>
                                    <div style={{ fontSize: '10px' }}>01/01/2024 - 14/01/2024</div>
                                </div>
                            </div>
                            <div style={{ border: '1px solid #eee', padding: '10px' }}>
                                <table style={{ width: '100%', fontSize: '10px' }}>
                                    <thead style={{ borderBottom: '1px solid #eee' }}>
                                        <tr><th style={{ textAlign: 'left' }}>Description</th><th style={{ textAlign: 'right' }}>Amount</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Gross Pay</td><td style={{ textAlign: 'right' }}>$2,500.00</td></tr>
                                        <tr><td>Federal Tax</td><td style={{ textAlign: 'right' }}>-$250.00</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const CalculateIncomeStep = () => (
        <div style={{ textAlign: 'center', padding: '100px 20px', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #eee', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
            <div style={{ marginBottom: '40px', position: 'relative', display: 'inline-block' }}>
                <div style={{ position: 'absolute', top: '-10px', left: '-10px', right: '-10px', bottom: '-10px', border: '2px dashed #2b5ce7', borderRadius: '50%', animation: 'spin 10s linear infinite', opacity: 0.3 }}></div>
                <div style={{ width: '80px', height: '80px', backgroundColor: '#f0f4ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2b5ce7', animation: 'pulse 2s ease-in-out infinite' }}>
                    <Activity size={40} />
                </div>
            </div>
            <h3 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '12px', color: '#333' }}>Calculating Income Analysis</h3>
            <p style={{ color: '#999', marginBottom: '45px', fontSize: '15px' }}>AI is extracting deep insights from your documents...</p>
            <div style={{ width: '400px', height: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px', margin: '0 auto', overflow: 'hidden', border: '1px solid #eee' }}>
                <div style={{
                    width: '75%', height: '100%', backgroundColor: '#2b5ce7', borderRadius: '6px',
                    backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
                    backgroundSize: '40px 40px',
                    animation: 'shimmer 2s linear infinite'
                }}></div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: '50px', padding: '14px 50px', backgroundColor: '#2b5ce7', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '15px' }} onClick={() => setCurrentStep(5)}>Proceed to Results</button>
        </div>
    );

    const ReviewResultStep = () => (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Analysis for Borrower (Mac Jones)</h3>
            <p style={{ color: '#999', fontSize: '14px', marginBottom: '30px' }}>Final income calculation analysis based on provided documentation.</p>

            <div className="card" style={{ padding: 0, backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#2b5ce7', color: '#fff' }}>
                        <tr>
                            <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '13px', fontWeight: '600' }}>Extraction Field</th>
                            <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '600' }}>Paystub 1 (2024)</th>
                            <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '600' }}>W-2 (2023)</th>
                            <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '600', backgroundColor: '#1e45b3' }}>Final Income</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { field: 'GP Period', v1: 'Bi-Weekly', v2: 'Annual', vf: 'Bi-Weekly' },
                            { field: 'GP Start Date', v1: '01/01/2024', v2: '01/01/2023', vf: '-' },
                            { field: 'GP End Date', v1: '14/01/2024', v2: '31/12/2023', vf: '-' },
                            { field: 'Current Gross Pay', v1: '$2,500.00', v2: '-', vf: '$5,000.00' },
                            { field: 'YTD Gross Pay', v1: '$2,500.00', v2: '$60,000.00', vf: '-' },
                            { field: 'Average Gross Pay', v1: '$2,500.00', v2: '$5,000.00', vf: '$5,000.00' },
                        ].map((row, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '15px 20px', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>{row.field}</td>
                                <td style={{ padding: '15px 20px', textAlign: 'center', fontSize: '13px', color: '#666' }}>{row.v1}</td>
                                <td style={{ padding: '15px 20px', textAlign: 'center', fontSize: '13px', color: '#666' }}>{row.v2}</td>
                                <td style={{ padding: '15px 20px', textAlign: 'center', fontSize: '13px', fontWeight: 'bold', color: '#2b5ce7', backgroundColor: '#fcfdff' }}>{row.vf}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '30px', backgroundColor: '#f0f7ff', padding: '20px', borderRadius: '12px', border: '1px solid #d0e1ff' }}>
                <div style={{ fontWeight: 'bold', color: '#2b5ce7', marginBottom: '8px' }}>Analysis Remarks</div>
                <div style={{ fontSize: '13px', color: '#333', lineHeight: '1.6' }}>
                    The current gross pay from the paystub matches the average gross pay calculated from the W-2 2023.
                    Calculated bi-weekly income based on the documents is $2,500.00 which equates to $5,000.00 monthly.
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px', gap: '15px' }}>
                <button className="btn btn-outline" style={{ padding: '12px 30px', color: '#2b5ce7', border: '1px solid #2b5ce7' }} onClick={() => setView('dashboard')}>Close</button>
                <button className="btn btn-primary" style={{ padding: '12px 40px', backgroundColor: '#2b5ce7', border: 'none' }} onClick={() => setCurrentStep(6)}>Complete Review</button>
            </div>
        </div>
    );

    const FinishStep = () => (
        <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', margin: '0 auto 30px' }}>
                <CheckCircle2 size={48} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Review Successfully Completed!</h3>
            <p style={{ color: '#999', marginBottom: '40px' }}>The income analysis for Mac Jones has been saved and exported to Encompass.</p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <button className="btn btn-outline" style={{ padding: '12px 30px', color: '#2b5ce7', border: '1px solid #2b5ce7' }} onClick={() => setView('dashboard')}>Return to Dashboard</button>
                <button className="btn btn-primary" style={{ padding: '12px 30px', backgroundColor: '#10b981', border: 'none', color: '#fff' }} onClick={() => setView('dashboard')}>Finish</button>
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%', backgroundColor: '#fff' }}>
            <IncomeSidebar />
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {view === 'dashboard' && <DashboardView />}
                {view === 'workflow' && <WorkflowContainer />}
            </div>
        </div>
    );
};

export default IncomeCalculator;
