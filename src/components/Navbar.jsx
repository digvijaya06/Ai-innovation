import React from 'react';

const Header = () => {
    return (
        <header style={{
            height: 'var(--header-height)',
            backgroundColor: 'var(--nav-bg)',
            borderBottom: '1px solid var(--border-color)',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000
        }}>
            <div>
                <h1 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#333'
                }}>
                    Altisource - <span style={{ color: 'var(--primary)' }}>AI Innovation</span>
                </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button className="btn btn-primary" style={{ padding: '6px 15px', fontSize: '13px' }}>
                    Share
                </button>
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'transparent',
                    border: '2px solid var(--primary)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '16px'
                }}>
                    A
                </div>
            </div>
        </header>
    );
};

export default Header;
