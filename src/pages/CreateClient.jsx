import React from 'react';
import {
    Plus,
    Globe,
    Shield,
    Key,
    Settings,
    ChevronDown
} from 'lucide-react';
import './Section.css';

const Section6 = () => {
    return (
        <div className="section-container">
            <h2 className="section-header">Section 6</h2>

            <div className="grid-2">
                {/* Create Client Form */}
                <div className="card" style={{ padding: '0' }}>
                    <div style={{
                        padding: '15px 20px',
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: 'var(--nav-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <Globe size={18} style={{ color: 'var(--primary)' }} />
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Create New Client</h3>
                    </div>

                    <div style={{ padding: '25px' }}>
                        <div className="grid-2">
                            <div className="form-group">
                                <label className="form-label">Client Name *</label>
                                <input type="text" className="form-input" placeholder="Enter client legal name" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Domain</label>
                                <input type="text" className="form-input" placeholder="example.com, lending.org etc" />
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label className="form-label">Service</label>
                                <div style={{ position: 'relative' }}>
                                    <select className="form-select">
                                        <option>Select Service</option>
                                        <option>Income Analysis</option>
                                        <option>Asset Review</option>
                                    </select>
                                    <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--text-gray)', pointerEvents: 'none' }} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">LOS</label>
                                <div style={{ position: 'relative' }}>
                                    <select className="form-select">
                                        <option>Select LOS</option>
                                        <option>Encompass</option>
                                        <option>BytePro</option>
                                    </select>
                                    <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--text-gray)', pointerEvents: 'none' }} />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                            <button className="btn btn-outline">Cancel</button>
                            <button className="btn btn-primary">Create Client</button>
                        </div>
                    </div>
                </div>

                {/* Namespace Configuration */}
                <div className="card" style={{ padding: '0' }}>
                    <div style={{
                        padding: '15px 20px',
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: 'var(--nav-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <Settings size={18} style={{ color: 'var(--secondary)' }} />
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Namespace Configuration</h3>
                    </div>

                    <div style={{ padding: '25px' }}>
                        <div className="form-group">
                            <label className="form-label">Client Key *</label>
                            <div style={{ position: 'relative' }}>
                                <input type="text" className="form-input" defaultValue="altisource_main_01" style={{ color: 'var(--secondary)' }} />
                                <Key size={14} style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--text-gray)' }} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Client Secret *</label>
                            <div style={{ position: 'relative' }}>
                                <input type="password" className="form-input" defaultValue="••••••••••••••••" />
                                <Shield size={14} style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--text-gray)' }} />
                            </div>
                        </div>

                        <div style={{ backgroundColor: 'rgba(245, 197, 66, 0.05)', border: '1px dashed var(--secondary)', borderRadius: '4px', padding: '15px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--secondary)', fontWeight: 'bold', marginBottom: '5px' }}>Security Note</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-gray)' }}>
                                Secrets are hashed upon creation. Ensure you have copied the secret key before finalizing the namespace setup.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section6;
