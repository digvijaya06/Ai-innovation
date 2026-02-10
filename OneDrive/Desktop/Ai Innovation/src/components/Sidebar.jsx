import React from 'react';
import {
    Layout,
    Layers,
    Activity,
    PlusSquare,
    Box,
    Table,
    CheckSquare,
    Calculator,
    FileText,
    Workflow,
    Settings
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
    const menuItems = [
        { id: 'section1', label: 'Workbench Dashboard', icon: Layout },
        { id: 'section2', label: 'Transaction Hub', icon: Layers },
        { id: 'view-high', label: 'Priority Insights', icon: Activity },
        { id: 'create-case', label: 'Create Case', icon: PlusSquare },
        { id: 'section6', label: 'Section 6', icon: Box },
        { id: 'rule-engine', label: 'Rule Engine', icon: Table },
        { id: 'review-case', label: 'Review Case', icon: CheckSquare },
        { id: 'income-calc', label: 'Income Calculator', icon: Calculator },
        { id: 'admin-center', label: 'Admin Center', icon: Settings },
        { id: 'user-flow', label: 'User Flow Diagram', icon: Workflow },
    ];

    return (
        <aside style={{
            width: 'var(--sidebar-width)',
            backgroundColor: 'var(--nav-bg)',
            borderRight: '1px solid var(--border-color)',
            paddingTop: 'var(--header-height)',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 900
        }}>
            <div style={{ padding: '20px 15px 10px 15px' }}>
                <h2 style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>Navigation</h2>
            </div>
            <nav style={{ flex: 1, overflowY: 'auto', padding: '0 10px' }}>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        style={{
                            padding: '12px 15px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: activeSection === item.id ? 'var(--primary)' : 'transparent',
                            color: activeSection === item.id ? '#fff' : 'var(--text-gray)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s',
                            width: '100%',
                            fontWeight: '600',
                            fontSize: '13px',
                            marginBottom: '4px',
                            boxShadow: activeSection === item.id ? '0 4px 10px rgba(43, 92, 231, 0.2)' : 'none'
                        }}
                    >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
