import React, { useState } from 'react';
import {
    FileText,
    ShieldCheck,
    Layout,
    LayoutDashboard,
    ChevronRight,
    Maximize2,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Clock,
    ArrowLeft,
    BrainCircuit,
    Download,
    Search,
    ChevronDown,
    Plus,
    Minus,
    Printer,
    FileSearch,
    Trash2,
    RefreshCw,
    Eye,
    ChevronLeft,
    X
} from 'lucide-react';
import './Section.css';

const ReviewCaseSection = ({ setActiveSection }) => {
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [showActions, setShowActions] = useState(false);

    const checklist = [
        { id: '#01', q: 'Does the address in Encompass match the appraisal report? If no, add Collateral-address update condition', answer: 'No', confidence: '98%', analysis: 'The property address in Encompass is 2007 7th Ave E, Hibbing, MN 55746, and the address in the appraisal report is also 2007 7th Ave E, Hibbing, MN 55746-2539. The addresses match with only a minor formatting difference in the zip code.' },
        { id: '#02', q: 'Does the address in Encompass match the appraisal report? If no, add Collateral-address update condition', answer: 'No', confidence: '95%', analysis: 'The property address in Encompass is 2007 7th Ave E, Hibbing, MN 55746, and the address in the appraisal report is also 2007 7th Ave E, Hibbing, MN 55746-2539. The addresses match with only a minor formatting difference in the zip code.' },
        { id: '#03', q: 'Does the address in Encompass match the appraisal report? If no, add Collateral-address update condition', answer: 'Yes', confidence: '99%', analysis: 'The addresses match with only a minor formatting difference in the zip code.' },
        { id: '#04', q: 'Does the address in Encompass match the appraisal report? If no, add Collateral-address update condition', answer: 'No', confidence: '92%', analysis: 'The property address in Encompass is 2007 7th Ave E, Hibbing, MN 55746, and the address in the appraisal report is also 2007 7th Ave E, Hibbing, MN 55746-2539. The addresses match with only a minor formatting difference in the zip code.' },
    ];

    const DetailPanel = () => (
        <div className="detail-panel">
            <div className="detail-panel-header">
                <h2>Question ID - {selectedDetail + 1}</h2>
                <X size={24} className="close-icon" onClick={() => setSelectedDetail(null)} />
            </div>

            <div className="form-group">
                <label className="form-label">Condition</label>
                <div style={{ position: 'relative' }}>
                    <div className="form-select" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        Collateral - Appraisal Update (1 comp or 2 pending sales)
                        <ChevronDown size={16} color="#999" />
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Condition Description</label>
                <div className="form-read-only">
                    Appraiser to provide atleast 1 comp or 2 pending sales from inside the neighborhood that supports the subject's estimated appraised value.
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Reviewer Comments</label>
                <textarea
                    defaultValue="Updated the answer to NA as per the document requirement"
                    className="form-input"
                    style={{ width: '100%', height: '120px', resize: 'none' }}
                />
            </div>

            <div className="detail-panel-actions">
                <button className="btn btn-outline" onClick={() => setSelectedDetail(null)}>Cancel</button>
                <button className="btn btn-primary">Update</button>
            </div>
        </div>
    );

    return (
        <div style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', backgroundColor: '#fcfcfc', position: 'relative' }}>
            {selectedDetail !== null && <DetailPanel />}

            <div className="review-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button className="btn-icon-back" onClick={() => setActiveSection('section1')}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="review-title">
                        <h2>Case Review - 666777</h2>
                        <div className="review-subtitle">AI-generated Appraisal Review Checklist</div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => setActiveSection('section1')}>
                        <LayoutDashboard size={18} /> Back to Workbench
                    </button>
                    <div style={{ fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#333', backgroundColor: '#fff', padding: '8px 15px', borderRadius: '8px', border: '1px solid #eee' }}>
                        Tenant+SAdmin <ChevronDown size={16} />
                    </div>
                    <button className="btn btn-primary" style={{ backgroundColor: '#ccc', color: '#fff', border: 'none', cursor: 'not-allowed' }}>Complete Review</button>
                    <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Action <ChevronDown size={14} />
                    </button>
                </div>
            </div>

            <div style={{ padding: '25px 30px', flex: 1, overflowY: 'auto' }}>
                <div className="card">
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#333', marginBottom: '20px', margin: '0 0 20px 0' }}>Appraisal Checklist</h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ position: 'relative' }}>
                                <label style={{ fontSize: '10px', color: '#999', position: 'absolute', top: '-8px', left: '10px', backgroundColor: '#fff', padding: '0 5px', fontWeight: 'bold' }}>Filter by Answer:</label>
                                <div style={{ minWidth: '160px', padding: '10px 35px 10px 15px', borderRadius: '8px', border: '1px solid #eee', fontSize: '13px', color: '#333', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                                    All (69) <ChevronDown size={14} color="#999" />
                                </div>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <label style={{ fontSize: '10px', color: '#999', position: 'absolute', top: '-8px', left: '10px', backgroundColor: '#fff', padding: '0 5px', fontWeight: 'bold' }}>Filter by AI Confidence:</label>
                                <div style={{ minWidth: '160px', padding: '10px 35px 10px 15px', borderRadius: '8px', border: '1px solid #eee', fontSize: '13px', color: '#333', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                                    All (69) <ChevronDown size={14} color="#999" />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '13px', color: '#666', fontWeight: '600' }}>Show Conditions Only</span>
                            <div style={{ width: '38px', height: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', position: 'relative', border: '1px solid #eee', cursor: 'pointer' }}>
                                <div style={{ width: '14px', height: '14px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}></div>
                            </div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: '#f0f4ff', padding: '15px 25px', borderRadius: '10px 10px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #dce4ff', borderBottom: 'none' }}>
                        <button className="btn btn-primary" style={{ fontSize: '12px', padding: '8px 25px' }}>Redo AI Review</button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span style={{ fontSize: '12px', color: '#2b5ce7', fontWeight: '700' }}>1 of 30 Selected</span>
                            <XCircle size={18} style={{ cursor: 'pointer', color: '#2b5ce7' }} />
                        </div>
                    </div>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}><input type="checkbox" style={{ accentColor: '#2b5ce7', width: '16px', height: '16px' }} /></th>
                                    <th style={{ width: '70px' }}>Q ID</th>
                                    <th>Question</th>
                                    <th style={{ width: '120px', textAlign: 'center' }}>Answer</th>
                                    <th>AI Analysis</th>
                                    <th style={{ width: '100px', textAlign: 'center' }}>More Info</th>
                                </tr>
                            </thead>
                            <tbody>
                                {checklist.map((item, i) => (
                                    <tr key={i} style={{ backgroundColor: i === 0 ? '#fcfdff' : '#fff' }}>
                                        <td><input type="checkbox" checked={i === 0} style={{ accentColor: '#2b5ce7', width: '16px', height: '16px' }} /></td>
                                        <td style={{ fontSize: '13px', color: '#666', fontWeight: '600' }}>{item.id}</td>
                                        <td style={{ fontSize: '13px', color: '#333', lineHeight: '1.6', width: '300px' }}>
                                            <div style={{ fontWeight: '600' }}>{item.q}</div>
                                            <div style={{ marginTop: '10px', color: '#999', fontSize: '12px', fontWeight: '500' }}>Collateral-address update condition</div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}>
                                                    <input type="radio" checked={item.answer === 'Yes'} style={{ accentColor: '#2b5ce7', width: '16px', height: '16px' }} /> Yes
                                                </label>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}>
                                                    <input type="radio" checked={item.answer === 'No'} style={{ accentColor: '#2b5ce7', width: '16px', height: '16px' }} /> No
                                                </label>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}>
                                                    <input type="radio" checked={item.answer === 'NA'} style={{ accentColor: '#2b5ce7', width: '16px', height: '16px' }} /> NA
                                                </label>
                                            </div>
                                        </td>
                                        <td style={{ fontSize: '12px', color: '#666', lineHeight: '1.7' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <span style={{ backgroundColor: '#f0f4ff', color: '#2b5ce7', padding: '3px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: '800' }}>Review Updated</span>
                                                <span style={{ color: '#bbb', fontWeight: '600' }}>Confidence - {item.confidence}</span>
                                            </div>
                                            {item.analysis} <span style={{ color: '#2b5ce7', cursor: 'pointer', fontWeight: 'bold' }}>View more</span>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div
                                                onClick={() => setSelectedDetail(i)}
                                                style={{ width: '36px', height: '36px', border: '1px solid #eee', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', cursor: 'pointer', color: '#666', position: 'relative', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                                                <FileSearch size={18} />
                                                {i === 0 && <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '10px', height: '10px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid #fff' }}></div>}
                                            </div>
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

export default ReviewCaseSection;
