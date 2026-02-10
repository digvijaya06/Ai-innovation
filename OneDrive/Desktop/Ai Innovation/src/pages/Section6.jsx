import React, { useState } from 'react';
import {
    PlayCircle,
    BarChart3,
    Settings,
    History,
    RotateCcw,
    CheckCircle2,
    Trash2,
    ExternalLink,
    Activity,
    ChevronDown,
    Search,
    Eye,
    ChevronLeft,
    X
} from 'lucide-react';
import './Section.css';

const Section6 = () => {
    const [activeTab, setActiveTab] = useState('automate');
    const [isTestingModalOpen, setIsTestingModalOpen] = useState(false);

    const tests = [
        { id: '921', tasks: 12, questions: 45, desc: 'Rule Set V1.0', accuracy: '88% (AI)', time: '4.2s', status: 'Passed' },
        { id: '922', tasks: 8, questions: 32, desc: 'Model Alpha V.2', accuracy: '92% (AI)', time: '3.8s', status: 'In Review' },
        { id: '923', tasks: 15, questions: 60, desc: 'Logic Patch 09', accuracy: '76% (AI)', time: '5.1s', status: 'Failed' },
    ];

    const RunNewTestModal = () => (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '0', backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}>
                <div style={{ padding: '20px 30px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#1a1a1a' }}>Run New Test</h2>
                    <X size={20} style={{ cursor: 'pointer', color: '#999' }} onClick={() => setIsTestingModalOpen(false)} />
                </div>

                <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <div className="form-group">
                        <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '10px', display: 'flex' }}>Select Cases from Golden Set</label>
                        <div style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '8px 12px', border: '1px solid #eee', borderRadius: '8px', minHeight: '45px', alignItems: 'center' }}>
                                {['test-sbg-01', 'test-sbg-02'].map(tag => (
                                    <div key={tag} style={{ backgroundColor: '#f0f4ff', color: '#2b5ce7', padding: '4px 12px', borderRadius: '6px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
                                        {tag} <X size={12} style={{ cursor: 'pointer' }} />
                                    </div>
                                ))}
                                <span style={{ color: '#ccc', fontSize: '13px' }}>+select more</span>
                                <ChevronDown size={18} style={{ position: 'absolute', right: '12px', top: '12px', color: '#999' }} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group" style={{ border: '1px solid #eee', borderRadius: '12px', padding: '20px' }}>
                        <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '15px', display: 'flex' }}>Select Checklist Items</label>
                        <div style={{ position: 'relative', marginBottom: '20px' }}>
                            <Search size={14} style={{ position: 'absolute', left: '12px', top: '12px', color: '#ccc' }} />
                            <input type="text" placeholder="Search Items" className="form-input" style={{ paddingLeft: '35px', backgroundColor: '#fafafa', border: '1px solid #eee' }} />
                        </div>
                        <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                            {[
                                'Does the address in Encompass match the appraisal report? If no, add Collateral-address update condition',
                                "Does at least one of the borrower's names match the appraisal?",
                                'If the assignment type is a refinance, does the owner of public record match the borrower?',
                                'If it is a refinance, was the property off the market at the time of application?',
                                'If the refinance transaction is primary, does the appraisal reflect owner occupied?',
                                'Does the subject property have multiple parcels/lots? If yes, are all parcels listed on the Title report and Purchase agreement (when applicable)',
                                'Did the appraiser note there were special assessments? If yes, has the monthly payment been added to the housing expenses?',
                                'If a PUD/Condo, do the HOA fees on the appraisal match Encompass?',
                                'Is the property fee simple?'
                            ].map((text, i) => (
                                <div key={i} style={{ padding: '15px 0', borderBottom: i === 8 ? 'none' : '1px solid #f9f9f9', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <input type="checkbox" style={{ marginTop: '3px', accentColor: '#2b5ce7', width: '16px', height: '16px' }} />
                                    <div style={{ fontSize: '11px', color: '#999', paddingTop: '2px' }}>{i + 1}</div>
                                    <div style={{ fontSize: '13px', color: '#444', lineHeight: '1.5' }}>{text}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '10px' }}>
                        <button className="btn btn-outline" style={{ border: '1px solid #2b5ce7', color: '#2b5ce7', padding: '12px 30px' }} onClick={() => setIsTestingModalOpen(false)}>Cancel</button>
                        <button className="btn btn-primary" style={{ backgroundColor: '#ccc', color: '#fff', padding: '12px 30px', border: 'none' }}>Run Test</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="section-container" style={{ display: 'flex', height: 'calc(100vh - 100px)', gap: '0', padding: 0, backgroundColor: '#fff' }}>
            {isTestingModalOpen && <RunNewTestModal />}
            {/* Sub-Sidebar - Figma Sync */}
            <div style={{
                width: '240px',
                backgroundColor: '#fff',
                borderRight: '1px solid #eee',
                padding: '25px 0',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ padding: '0 20px 20px 20px', borderBottom: '1px solid #f9f9f9', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', backgroundColor: '#f59e0b', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                            <Activity size={18} />
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Testing</div>
                            <div style={{ fontSize: '11px', color: '#999' }}>Quality Assurance</div>
                        </div>
                    </div>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column' }}>
                    {[
                        { id: 'automate', label: 'Automate Testing', icon: PlayCircle },
                        { id: 'history', label: 'Test History', icon: History },
                        { id: 'metrics', label: 'Performance Metrics', icon: BarChart3 },
                        { id: 'config', label: 'Test Configuration', icon: Settings },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                padding: '12px 20px',
                                border: 'none',
                                textAlign: 'left',
                                backgroundColor: activeTab === item.id ? '#fff9f0' : 'transparent',
                                color: activeTab === item.id ? '#f59e0b' : '#666',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: activeTab === item.id ? '600' : '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                borderLeft: activeTab === item.id ? '4px solid #f59e0b' : '4px solid transparent',
                                transition: 'all 0.2s'
                            }}
                        >
                            <item.icon size={16} /> {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content - Light Theme Sync */}
            <div style={{ flex: 1, padding: '30px', overflowY: 'auto', backgroundColor: '#fcfcfc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#333' }}>Automate Testing Hub</h2>
                        <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                            Home / Admin / Advanced Tools / Testing Module
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn btn-outline" style={{ border: 'none', backgroundColor: '#fff', color: '#666' }}><RotateCcw size={16} style={{ marginRight: '8px' }} /> Clear Results</button>
                        <button className="btn btn-primary" onClick={() => setIsTestingModalOpen(true)} style={{ backgroundColor: '#f59e0b', color: '#fff' }}>
                            <PlayCircle size={18} style={{ marginRight: '8px' }} /> Run New Test Suite
                        </button>
                    </div>
                </div>

                <div className="card" style={{ padding: '20px', backgroundColor: '#fff', border: '1px solid #eee', display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '11px', color: '#999', marginBottom: '8px', fontWeight: '500' }}>Search Tests</label>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '15px', top: '12px', color: '#ccc' }} />
                            <input type="text" placeholder="Search by Test ID or Description" className="form-input" style={{ width: '100%', paddingLeft: '45px', border: '1px solid #eee', backgroundColor: '#fdfdfd' }} />
                        </div>
                    </div>
                    <div style={{ width: '220px' }}>
                        <label style={{ display: 'block', fontSize: '11px', color: '#999', marginBottom: '8px', fontWeight: '500' }}>Filter Status</label>
                        <div style={{ position: 'relative' }}>
                            <select className="form-select" style={{ border: '1px solid #eee', backgroundColor: '#fdfdfd' }}>
                                <option>All Status</option>
                                <option>Passed</option>
                                <option>Failed</option>
                            </select>
                            <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '12px', color: '#999' }} />
                        </div>
                    </div>
                </div>

                <div className="card" style={{ padding: 0, marginTop: '25px', backgroundColor: '#fff', border: '1px solid #eee', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#fcfcfc' }}>
                            <tr>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '12px', color: '#666' }}>Test ID</th>
                                <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '12px', color: '#666' }}>Tasks</th>
                                <th style={{ padding: '15px 20px', textAlign: 'center', fontSize: '12px', color: '#666' }}>Questions</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '12px', color: '#666' }}>Description</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '12px', color: '#666' }}>Accuracy (%)</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '12px', color: '#666' }}>Time Taken</th>
                                <th style={{ padding: '15px 20px', textAlign: 'left', fontSize: '12px', color: '#666' }}>Status</th>
                                <th style={{ textAlign: 'center', fontSize: '12px', color: '#666' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests.map(t => (
                                <tr key={t.id} style={{ borderTop: '1px solid #eee' }}>
                                    <td style={{ padding: '15px 20px', fontWeight: 'bold' }}>#{t.id}</td>
                                    <td style={{ padding: '15px 20px', textAlign: 'center', color: '#333' }}>{t.tasks}</td>
                                    <td style={{ padding: '15px 20px', textAlign: 'center', color: '#333' }}>{t.questions}</td>
                                    <td style={{ padding: '15px 20px', color: '#666' }}>{t.desc}</td>
                                    <td style={{ padding: '15px 20px', color: '#10b981', fontWeight: 'bold' }}>{t.accuracy}</td>
                                    <td style={{ padding: '15px 20px', color: '#999' }}>{t.time}</td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <span style={{
                                            color: t.status === 'Passed' ? '#10b981' : t.status === 'In Review' ? '#f59e0b' : '#ef4444',
                                            fontSize: '12px', fontWeight: 'bold'
                                        }}>{t.status}</span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer' }}><ExternalLink size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid-2" style={{ marginTop: '25px', gap: '20px' }}>
                    <div className="card" style={{ padding: '25px', backgroundColor: '#fff', border: '1px solid #eee' }}>
                        <h3 className="card-title" style={{ fontSize: '15px', color: '#333' }}>Accuracy Regression (V1.0 vs V2.0)</h3>
                        <div style={{ height: '150px', display: 'flex', alignItems: 'flex-end', gap: '20px', padding: '20px 0' }}>
                            {[65, 88, 92, 76, 95].map((h, i) => (
                                <div key={i} style={{ flex: 1, backgroundColor: i === 4 ? '#2b5ce7' : '#f0f4ff', height: `${h}%`, borderRadius: '4px' }}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section6;
