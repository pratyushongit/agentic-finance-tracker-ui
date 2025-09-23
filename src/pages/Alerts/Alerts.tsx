import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Calendar,
  Settings,
  Plus,
  X,
  CheckCircle,
  Zap,
} from 'lucide-react';
import './Alerts.scss';

interface Alert {
  id: string;
  type: 'budget' | 'anomaly' | 'goal' | 'bill' | 'income';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  category?: string;
  amount?: number;
  actionRequired?: boolean;
}

interface AlertRule {
  id: string;
  name: string;
  type: 'budget' | 'spending' | 'income' | 'goal';
  condition: string;
  threshold: number;
  category?: string;
  isActive: boolean;
}

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'budget',
      severity: 'high',
      title: 'Budget Exceeded',
      message:
        'You have exceeded your Food & Dining budget by $200 this month.',
      timestamp: new Date('2024-01-15T10:30:00'),
      isRead: false,
      category: 'Food & Dining',
      amount: 200,
      actionRequired: true,
    },
    {
      id: '2',
      type: 'anomaly',
      severity: 'medium',
      title: 'Unusual Spending Pattern',
      message: 'Your shopping expenses are 150% higher than usual this week.',
      timestamp: new Date('2024-01-15T09:15:00'),
      isRead: false,
      category: 'Shopping',
      actionRequired: false,
    },
    {
      id: '3',
      type: 'goal',
      severity: 'low',
      title: 'Savings Goal Progress',
      message: "Great job! You're 75% towards your emergency fund goal.",
      timestamp: new Date('2024-01-14T16:45:00'),
      isRead: true,
      amount: 7500,
      actionRequired: false,
    },
    {
      id: '4',
      type: 'bill',
      severity: 'critical',
      title: 'Upcoming Bill Payment',
      message: 'Your credit card payment of $1,250 is due in 2 days.',
      timestamp: new Date('2024-01-13T08:00:00'),
      isRead: false,
      amount: 1250,
      actionRequired: true,
    },
    {
      id: '5',
      type: 'income',
      severity: 'low',
      title: 'Income Received',
      message: 'Salary deposit of $3,500 has been processed.',
      timestamp: new Date('2024-01-12T12:00:00'),
      isRead: true,
      amount: 3500,
      actionRequired: false,
    },
  ]);

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: '1',
      name: 'Food Budget Alert',
      type: 'budget',
      condition: 'exceeds',
      threshold: 1000,
      category: 'Food & Dining',
      isActive: true,
    },
    {
      id: '2',
      name: 'High Spending Day',
      type: 'spending',
      condition: 'daily_exceeds',
      threshold: 200,
      isActive: true,
    },
    {
      id: '3',
      name: 'Low Income Month',
      type: 'income',
      condition: 'below',
      threshold: 3000,
      isActive: true,
    },
    {
      id: '4',
      name: 'Savings Goal Milestone',
      type: 'goal',
      condition: 'reaches',
      threshold: 10000,
      isActive: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState<'alerts' | 'rules'>('alerts');
  const [showNewRuleForm, setShowNewRuleForm] = useState(false);

  const getAlertIcon = (type: string, severity: string) => {
    const iconProps = { size: 20 };

    switch (type) {
      case 'budget':
        return <DollarSign {...iconProps} />;
      case 'anomaly':
        return <AlertTriangle {...iconProps} />;
      case 'goal':
        return <TrendingUp {...iconProps} />;
      case 'bill':
        return <Calendar {...iconProps} />;
      case 'income':
        return <Zap {...iconProps} />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'var(--error)';
      case 'high':
        return '#ff6b35';
      case 'medium':
        return 'var(--warning)';
      case 'low':
        return 'var(--info)';
      default:
        return 'var(--text-tertiary)';
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const toggleRule = (ruleId: string) => {
    setAlertRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;
  const criticalCount = alerts.filter(
    alert => alert.severity === 'critical'
  ).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="alerts"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="alerts__header" variants={itemVariants}>
        <div className="header-content">
          <h1>Alerts & Notifications</h1>
          <p>Stay informed about your financial activity and goals</p>
        </div>

        <div className="header-stats">
          <div className="stat-badge stat-badge--primary">
            <Bell size={16} />
            <span>{unreadCount} unread</span>
          </div>
          {criticalCount > 0 && (
            <div className="stat-badge stat-badge--critical">
              <AlertTriangle size={16} />
              <span>{criticalCount} critical</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div className="alerts__tabs" variants={itemVariants}>
        <button
          className={`tab-btn ${
            activeTab === 'alerts' ? 'tab-btn--active' : ''
          }`}
          onClick={() => setActiveTab('alerts')}
        >
          <Bell size={16} />
          Recent Alerts
        </button>
        <button
          className={`tab-btn ${
            activeTab === 'rules' ? 'tab-btn--active' : ''
          }`}
          onClick={() => setActiveTab('rules')}
        >
          <Settings size={16} />
          Alert Rules
        </button>
      </motion.div>

      {activeTab === 'alerts' && (
        <motion.div className="alerts__content" variants={itemVariants}>
          {/* Quick Actions */}
          <div className="quick-actions">
            <button className="btn btn--secondary">
              <CheckCircle size={16} />
              Mark All Read
            </button>
            <button className="btn btn--secondary">Clear Dismissed</button>
          </div>

          {/* Alerts List */}
          <div className="alerts-list">
            {alerts.length === 0 ? (
              <div className="empty-state">
                <Bell size={48} />
                <h3>No alerts</h3>
                <p>You're all caught up! New alerts will appear here.</p>
              </div>
            ) : (
              alerts.map(alert => (
                <motion.div
                  key={alert.id}
                  className={`alert-item alert-item--${
                    alert.type
                  } alert-item--${alert.severity} ${
                    !alert.isRead ? 'alert-item--unread' : ''
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="alert-item__indicator"
                    style={{
                      backgroundColor: getSeverityColor(alert.severity),
                    }}
                  />

                  <div className="alert-item__icon">
                    {getAlertIcon(alert.type, alert.severity)}
                  </div>

                  <div className="alert-item__content">
                    <div className="alert-item__header">
                      <h4>{alert.title}</h4>
                      <div className="alert-item__meta">
                        {alert.category && (
                          <span className="alert-category">
                            {alert.category}
                          </span>
                        )}
                        <span className="alert-time">
                          {alert.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <p className="alert-item__message">{alert.message}</p>

                    {alert.amount && (
                      <div className="alert-item__amount">
                        <DollarSign size={14} />
                        <span>${alert.amount.toLocaleString()}</span>
                      </div>
                    )}

                    {alert.actionRequired && (
                      <div className="alert-item__actions">
                        <button className="btn btn--sm btn--primary">
                          Take Action
                        </button>
                        <button className="btn btn--sm btn--secondary">
                          View Details
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="alert-item__controls">
                    {!alert.isRead && (
                      <button
                        className="control-btn"
                        onClick={() => markAsRead(alert.id)}
                        aria-label="Mark as read"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    <button
                      className="control-btn control-btn--danger"
                      onClick={() => dismissAlert(alert.id)}
                      aria-label="Dismiss alert"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}

      {activeTab === 'rules' && (
        <motion.div className="alerts__content" variants={itemVariants}>
          {/* Rules Header */}
          <div className="rules-header">
            <div>
              <h3>Alert Rules</h3>
              <p>Configure when and how you want to be notified</p>
            </div>
            <button
              className="btn btn--primary"
              onClick={() => setShowNewRuleForm(true)}
            >
              <Plus size={16} />
              New Rule
            </button>
          </div>

          {/* Rules List */}
          <div className="rules-list">
            {alertRules.map(rule => (
              <div key={rule.id} className="rule-item">
                <div className="rule-item__content">
                  <div className="rule-item__header">
                    <h4>{rule.name}</h4>
                  </div>

                  <div className="rule-item__details">
                    <span className="rule-type">{rule.type}</span>
                    <span className="rule-condition">
                      {rule.condition} ${rule.threshold.toLocaleString()}
                    </span>
                    {rule.category && (
                      <span className="rule-category">in {rule.category}</span>
                    )}
                  </div>
                </div>

                <div className="rule-item__actions">
                  <div className="rule-item__toggle">
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={rule.isActive}
                        onChange={() => toggleRule(rule.id)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <button className="control-btn" aria-label="Edit rule">
                    <Settings size={20} />
                  </button>
                  <button
                    className="control-btn control-btn--danger"
                    aria-label="Delete rule"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* New Rule Form */}
          {showNewRuleForm && (
            <motion.div
              className="new-rule-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="form-header">
                <h4>Create New Alert Rule</h4>
                <button
                  className="control-btn"
                  onClick={() => setShowNewRuleForm(false)}
                >
                  <X size={16} />
                </button>
              </div>

              <form className="form-content">
                <div className="form-group">
                  <label className="form-label">Rule Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter rule name"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Type</label>
                    <select className="form-input">
                      <option value="budget">Budget</option>
                      <option value="spending">Spending</option>
                      <option value="income">Income</option>
                      <option value="goal">Goal</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Condition</label>
                    <select className="form-input">
                      <option value="exceeds">Exceeds</option>
                      <option value="below">Below</option>
                      <option value="reaches">Reaches</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Threshold ($)</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category (Optional)</label>
                    <select className="form-input">
                      <option value="">All Categories</option>
                      <option value="food">Food & Dining</option>
                      <option value="transport">Transportation</option>
                      <option value="shopping">Shopping</option>
                      <option value="entertainment">Entertainment</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => setShowNewRuleForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn--primary">
                    Create Rule
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Alerts;
