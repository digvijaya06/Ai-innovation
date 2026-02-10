import React, { useState } from 'react';
import { ChevronDown, Upload } from 'lucide-react';
import './Section.css';

const mockFields = [
    { id: 1, docType: 'Appraisal Document', field: 'Name of the borrower', value: 'Katylin & Renike Harrison', confidence: 95 },
    { id: 2, docType: '1003 Final', field: 'Applicant Borrower 1', value: 'Katylin Harrison', confidence: 65 },
    { id: 3, docType: 'Purchase Agreement', field: 'Purchase Date', value: '05/21/2023', confidence: 30 },
    { id: 4, docType: 'Title Report', field: 'Title Name', value: '2807, Rockwood Rd, CA,80924', confidence: 86 },
];

const Confidence = ({ value }) => {
    const c = value;
    const color = c >= 85 ? '#16a34a' : c >= 60 ? '#d97706' : '#ef4444';
    return <span style={{ color, fontWeight: '700' }}>{c}%</span>;
};

const TopProgress = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: '#2b5ce7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>1</div>
            <div style={{ color: '#999' }}>Document upload</div>
        </div>
        <div style={{ width: 80, height: 2, background: '#e6eefc' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, border: '2px solid #2b5ce7', color: '#2b5ce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>2</div>
            <div style={{ color: '#333', fontWeight: '700' }}>Data Extraction Review</div>
        </div>
        <div style={{ width: 80, height: 2, background: '#eef0f3' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, border: '1px solid #ddd', color: '#aaa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
            <div style={{ color: '#aaa' }}>Case Review</div>
        </div>
    </div>
);

const DataExtractionReview = ({ setActiveSection }) => {
    const [fields, setFields] = useState(mockFields);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    const filtered = fields.filter(f => (f.docType + f.field + f.value).toLowerCase().includes(search.toLowerCase()) && (filter === 'All' || (filter === 'Low' && f.confidence < 60) || (filter === 'Medium' && f.confidence >= 60 && f.confidence < 85) || (filter === 'High' && f.confidence >= 85)));

    return (
        <div style={{ padding: '25px 30px', background: '#fcfcfc', minHeight: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: 24 }}>Data Extraction Review</h1>
                    <div style={{ color: '#888', marginTop: 6 }}>Verify and correct extracted values before AI review begins</div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => setActiveSection('section1')} style={{ background: 'none', border: '1px solid #e6eefc', color: '#2b5ce7', padding: '10px 18px', borderRadius: 8 }}>Back to Workbench</button>
                    <button style={{ background: '#2b5ce7', color: '#fff', padding: '10px 18px', borderRadius: 8 }}>Confirm & Proceed</button>
                </div>
            </div>

            <TopProgress />

            <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 20 }}>
                <div style={{ flex: 1 }}>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by document type, field..." style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #eee', background: '#fff' }} />
                </div>
                <div style={{ width: 220 }}>
                    <div style={{ position: 'relative' }}>
                        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #eee', background: '#fff' }}>
                            <option>All</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: 12, color: '#999' }} />
                    </div>
                </div>
                <div style={{ alignSelf: 'center', color: '#666' }}>{filtered.length} fields found</div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '16px 20px', color: '#666' }}>Document Type</th>
                            <th style={{ textAlign: 'left', padding: '16px 20px', color: '#666' }}>Field</th>
                            <th style={{ textAlign: 'left', padding: '16px 20px', color: '#666' }}>Value</th>
                            <th style={{ textAlign: 'center', padding: '16px 20px', color: '#666' }}>Confidence Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(f => (
                            <tr key={f.id} style={{ borderBottom: '1px solid #f6f6f6', background: '#fff' }}>
                                <td style={{ padding: '16px 20px', color: '#333' }}>{f.docType}</td>
                                <td style={{ padding: '16px 20px', color: '#333' }}>{f.field}</td>
                                <td style={{ padding: '12px 20px' }}>
                                    <input defaultValue={f.value} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #f0f0f0', background: '#fafafa' }} />
                                </td>
                                <td style={{ textAlign: 'center', padding: '16px 20px' }}><Confidence value={f.confidence} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
                <button style={{ background: 'none', border: '1px solid #e6eefc', color: '#2b5ce7', padding: '10px 18px', borderRadius: 8, marginRight: 12 }} onClick={() => setActiveSection('admin-center')}>Cancel</button>
                <button style={{ background: '#2b5ce7', border: 'none', color: '#fff', padding: '10px 18px', borderRadius: 8 }}>Confirm & Proceed</button>
            </div>
        </div>
    );
};

export default DataExtractionReview;
