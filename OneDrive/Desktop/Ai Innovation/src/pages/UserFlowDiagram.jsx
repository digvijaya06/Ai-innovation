import React, { useState } from 'react';
import {
    Database,
    Cpu,
    ShieldCheck,
    Eye,
    Settings,
    ArrowRight,
    Maximize2,
    FileSearch,
    Zap,
    Layout,
    ChevronDown,
    MoreVertical
} from 'lucide-react';
import './Section.css';

const UserFlowDiagram = () => {
    const [hoveredNode, setHoveredNode] = useState(null);

    const services = [
        { title: 'Intake Service', desc: 'Secure ingestion', icon: Database, color: '#2b5ce7' },
        { title: 'Extraction AI', desc: 'LLM Processing', icon: Cpu, color: '#f59e0b' },
        { title: 'Validation Check', desc: 'Auto checks', icon: ShieldCheck, color: '#10b981' },
        { title: 'Human Review', desc: 'Expert sign-off', icon: Eye, color: '#2b5ce7' },
    ];

    const nodes = [
        { id: 1, label: 'Income Doc Ingestion', type: 'start', top: 40, left: 20, markers: ['S'] },
        { id: 2, label: 'OCR Processing', type: 'proc', top: 40, left: 240, markers: [] },
        { id: 3, label: 'Document Classification', type: 'proc', top: 120, left: 240, markers: ['K'] },
        { id: 4, label: 'Extraction AI Hub', type: 'proc', top: 80, left: 460, markers: ['S'] },
        { id: 5, label: 'Zillow Property API', type: 'service', top: 220, left: 20, markers: ['S'] },
        { id: 6, label: 'Borrower ID Verify', type: 'service', top: 220, left: 210, markers: ['K'] },
        { id: 7, label: 'Employer Audit', type: 'service', top: 220, left: 400, markers: ['S'] },
        { id: 8, label: 'Tax Return Scan', type: 'service', top: 220, left: 590, markers: [] },
        { id: 9, label: 'Credit Score AI', type: 'service', top: 220, left: 780, markers: ['K'] },
        { id: 10, label: 'Asset Verification', type: 'service', top: 220, left: 970, markers: ['S'] },
        { id: 11, label: 'Fraud Detection', type: 'service', top: 220, left: 1160, markers: ['E'] },
        { id: 12, label: 'Rule Execution', type: 'logic', top: 380, left: 300, markers: ['E'] },
        { id: 13, label: 'Confidence Score Check', type: 'logic', top: 380, left: 550, markers: ['K'] },
        { id: 14, label: 'Exception Handling', type: 'logic', top: 380, left: 800, markers: ['S'] },
        { id: 15, label: 'Final Decisioning', type: 'result', top: 520, left: 550, markers: ['K', 'S'] },
    ];

    const connections = [
        { from: 1, to: 2 }, { from: 1, to: 3 },
        { from: 2, to: 4 }, { from: 3, to: 4 },
        { from: 4, to: 5 }, { from: 4, to: 6 }, { from: 4, to: 7 }, { from: 4, to: 8 }, { from: 4, to: 9 }, { from: 4, to: 10 }, { from: 4, to: 11 },
        { from: 5, to: 12 }, { from: 6, to: 12 }, { from: 7, to: 13 }, { from: 8, to: 13 }, { from: 9, to: 14 }, { from: 10, to: 14 }, { from: 11, to: 14 },
        { from: 12, to: 15 }, { from: 13, to: 15 }, { from: 14, to: 15 }
    ];

    const NodeCard = ({ node }) => (
        <div
            style={{
                position: 'absolute',
                top: node.top,
                left: node.left,
                width: '170px',
                backgroundColor: '#fff',
                border: `1px solid ${hoveredNode === node.id ? '#2b5ce7' : '#eee'}`,
                borderRadius: '8px',
                padding: '12px',
                zIndex: 20,
                boxShadow: hoveredNode === node.id ? '0 10px 25px rgba(43, 92, 231, 0.1)' : '0 4px 12px rgba(0,0,0,0.03)',
                cursor: 'pointer',
                transition: 'all 0.2s'
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                    {node.markers.map(m => (
                        <div key={m} className={`status-indicator status-${m.toLowerCase()}`} style={{
                            width: '18px', height: '18px', fontSize: '10px', fontWeight: '900',
                            backgroundColor: m === 'S' ? '#e0f2fe' : m === 'K' ? '#fef3c7' : '#fee2e2',
                            color: m === 'S' ? '#2b5ce7' : m === 'K' ? '#f59e0b' : '#ef4444',
                            border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>{m}</div>
                    ))}
                    {node.markers.length === 0 && <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: '1px solid #eee' }}></div>}
                </div>
                <Layout size={12} style={{ color: '#ccc' }} />
            </div>

            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{node.label}</div>

            <div style={{ backgroundColor: '#fcfcfc', height: '30px', borderRadius: '4px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f0f0f0' }}>
                <div style={{ width: '80%', height: '3px', backgroundColor: '#eee', position: 'relative', borderRadius: '2px' }}>
                    <div style={{ position: 'absolute', left: '40%', width: '10px', height: '10px', backgroundColor: '#2b5ce7', borderRadius: '50%', top: '-3.5px', border: '2px solid #fff' }}></div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '9px', color: '#999', fontWeight: '500' }}>Confidence</span>
                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 'bold' }}>{Math.floor(Math.random() * (100 - 85) + 85)}%</span>
            </div>
        </div>
    );

    return (
        <div className="section-container" style={{ backgroundColor: '#fcfcfc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#333' }}>User Flow Diagram</h2>
                    <div style={{ fontSize: '13px', color: '#999', marginTop: '4px' }}>Visual Architecture & Real-time Processing Map</div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button className="btn btn-outline" style={{ border: 'none', backgroundColor: '#fff', color: '#666' }}><Maximize2 size={16} style={{ marginRight: '8px' }} /> View Map</button>
                    <button className="btn btn-primary" style={{ backgroundColor: '#2b5ce7', color: '#fff' }}><Zap size={16} style={{ marginRight: '8px' }} /> Run Simulation</button>
                </div>
            </div>

            {/* Service Grid Header */}
            <div className="grid-4" style={{ marginBottom: '25px', gap: '20px' }}>
                {services.map((s, i) => (
                    <div key={i} className="card" style={{
                        marginBottom: 0,
                        padding: '20px',
                        display: 'flex',
                        gap: '15px',
                        alignItems: 'center',
                        borderBottom: `3px solid ${s.color}`,
                        backgroundColor: '#fff',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{ backgroundColor: `${s.color}15`, padding: '10px', borderRadius: '8px', color: s.color }}><s.icon size={24} /></div>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>{s.title}</div>
                            <div style={{ fontSize: '11px', color: '#999' }}>{s.desc}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Large Scrollable Diagram Canvas */}
            <div className="card" style={{
                height: '550px',
                position: 'relative',
                overflow: 'auto',
                padding: 0,
                backgroundColor: '#fff',
                border: '1px solid #eee',
                borderRadius: '12px'
            }}>
                <div style={{
                    width: '1400px',
                    height: '650px',
                    position: 'relative',
                    backgroundImage: 'radial-gradient(#f0f0f0 1.5px, transparent 1.5px)',
                    backgroundSize: '30px 30px'
                }}>
                    <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orientation="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#eee" />
                            </marker>
                        </defs>
                        {connections.map((conn, idx) => {
                            const from = nodes.find(n => n.id === conn.from);
                            const to = nodes.find(n => n.id === conn.to);
                            if (!from || !to) return null;

                            const x1 = from.left + 170 / 2;
                            const y1 = from.top + 110;
                            const x2 = to.left + 170 / 2;
                            const y2 = to.top;

                            return (
                                <path
                                    key={idx}
                                    d={`M ${x1} ${y1} C ${x1} ${y1 + 40}, ${x2} ${y2 - 40}, ${x2} ${y2}`}
                                    stroke={hoveredNode === conn.from || hoveredNode === conn.to ? '#2b5ce7' : '#f0f0f0'}
                                    strokeWidth="1.5"
                                    fill="none"
                                    markerEnd="url(#arrowhead)"
                                    style={{ transition: 'stroke 0.2s', strokeDasharray: hoveredNode === conn.from ? 'none' : '4 4' }}
                                />
                            );
                        })}
                    </svg>

                    {nodes.map(node => (
                        <NodeCard key={node.id} node={node} />
                    ))}
                </div>
            </div>

            <div className="card" style={{ marginTop: '25px', padding: '20px', backgroundColor: '#fff', border: '1px solid #eee' }}>
                <h3 className="card-title" style={{ fontSize: '14px', color: '#333', marginBottom: '15px' }}>System Legend</h3>
                <div style={{ display: 'flex', gap: '50px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ backgroundColor: '#e0f2fe', color: '#2b5ce7', width: '24px', height: '24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>S</div>
                        <span style={{ fontSize: '13px', color: '#666' }}>Source Match Verified</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ backgroundColor: '#fef3c7', color: '#f59e0b', width: '24px', height: '24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>K</div>
                        <span style={{ fontSize: '13px', color: '#666' }}>Knowledge Base Reference</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', width: '24px', height: '24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>E</div>
                        <span style={{ fontSize: '13px', color: '#666' }}>Exception / Flag Found</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserFlowDiagram;
