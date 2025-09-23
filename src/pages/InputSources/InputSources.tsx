import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  FileText,
  Mail,
  Smartphone,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Plus,
  Settings,
  Download,
  Trash2,
} from 'lucide-react';
import './InputSources.scss';

interface DataSource {
  id: string;
  type: 'sms' | 'email' | 'bank' | 'file';
  name: string;
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  lastSync?: Date;
  transactionCount?: number;
  description: string;
}

const InputSources: React.FC = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: '1',
      type: 'bank',
      name: 'Chase Bank',
      status: 'connected',
      lastSync: new Date('2024-01-15T10:30:00'),
      transactionCount: 156,
      description: 'Primary checking account',
    },
    {
      id: '2',
      type: 'email',
      name: 'Gmail Account',
      status: 'connected',
      lastSync: new Date('2024-01-15T09:15:00'),
      transactionCount: 43,
      description: 'Transaction receipts and confirmations',
    },
    {
      id: '3',
      type: 'sms',
      name: 'SMS Banking Alerts',
      status: 'disconnected',
      description: 'Bank transaction notifications',
    },
  ]);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
    },
  });

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'sms':
        return <Smartphone size={24} />;
      case 'email':
        return <Mail size={24} />;
      case 'bank':
        return <CreditCard size={24} />;
      case 'file':
        return <FileText size={24} />;
      default:
        return <FileText size={24} />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return (
          <CheckCircle className="status-icon status-icon--success" size={16} />
        );
      case 'syncing':
        return <div className="spinner" />;
      case 'error':
        return (
          <AlertCircle className="status-icon status-icon--error" size={16} />
        );
      default:
        return (
          <AlertCircle className="status-icon status-icon--warning" size={16} />
        );
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'disconnected':
        return 'Disconnected';
      case 'syncing':
        return 'Syncing...';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

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
      className="input-sources"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="input-sources__header" variants={itemVariants}>
        <h1>Data Input Sources</h1>
        <p>Connect and manage your financial data sources</p>
      </motion.div>

      {/* Connected Sources */}
      <motion.section
        className="input-sources__section"
        variants={itemVariants}
      >
        <div className="section-header">
          <h2>Connected Sources</h2>
          <button className="btn btn--primary">
            <Plus size={16} />
            Add Source
          </button>
        </div>

        <div className="sources-grid">
          {dataSources.map(source => (
            <motion.div
              key={source.id}
              className="source-card"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="source-card__header">
                <div className="source-card__icon">
                  {getSourceIcon(source.type)}
                </div>
                <div className="source-card__actions">
                  <button className="action-btn" aria-label="Settings">
                    <Settings size={16} />
                  </button>
                </div>
              </div>

              <div className="source-card__content">
                <h3>{source.name}</h3>
                <p>{source.description}</p>

                <div className="source-card__status">
                  {getStatusIcon(source.status)}
                  <span className={`status-text status-text--${source.status}`}>
                    {getStatusText(source.status)}
                  </span>
                </div>

                {source.lastSync && (
                  <div className="source-card__sync">
                    <span>
                      Last sync: {source.lastSync.toLocaleDateString()}
                    </span>
                  </div>
                )}

                {source.transactionCount && (
                  <div className="source-card__stats">
                    <span>{source.transactionCount} transactions</span>
                  </div>
                )}
              </div>

              <div className="source-card__footer">
                <button className="btn btn--sm btn--secondary">Sync Now</button>
                <button className="btn btn--sm btn--secondary">
                  View Data
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* File Upload */}
      <motion.section
        className="input-sources__section"
        variants={itemVariants}
      >
        <div className="section-header">
          <h2>File Upload</h2>
          <p>Upload CSV, PDF, or Excel files containing transaction data</p>
        </div>

        <div className="upload-section">
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'dropzone--active' : ''}`}
          >
            <input {...getInputProps()} />
            <div className="dropzone__content">
              <Upload className="dropzone__icon" size={48} />
              <h3>
                {isDragActive
                  ? 'Drop files here...'
                  : 'Drag & drop files here, or click to select'}
              </h3>
              <p>Supports CSV, PDF, TXT, XLS, XLSX files up to 10MB</p>
              <button className="btn btn--primary">Choose Files</button>
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="uploaded-files">
              <h3>Uploaded Files ({uploadedFiles.length})</h3>
              <div className="file-list">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <div className="file-item__info">
                      <FileText className="file-item__icon" size={20} />
                      <div>
                        <span className="file-item__name">{file.name}</span>
                        <span className="file-item__size">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                    <div className="file-item__actions">
                      <button
                        className="action-btn action-btn--danger"
                        onClick={() => removeFile(index)}
                        aria-label="Remove file"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="uploaded-files__actions">
                <button className="btn btn--primary">Process Files</button>
                <button
                  className="btn btn--secondary"
                  onClick={() => setUploadedFiles([])}
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.section>

      {/* Available Integrations */}
      <motion.section
        className="input-sources__section"
        variants={itemVariants}
      >
        <div className="section-header">
          <h2>Available Integrations</h2>
          <p>Connect to popular financial services and platforms</p>
        </div>

        <div className="integrations-grid">
          {[
            {
              name: 'Bank of America',
              type: 'bank',
              icon: CreditCard,
              status: 'available',
            },
            {
              name: 'Wells Fargo',
              type: 'bank',
              icon: CreditCard,
              status: 'available',
            },
            {
              name: 'PayPal',
              type: 'payment',
              icon: CreditCard,
              status: 'available',
            },
            {
              name: 'Venmo',
              type: 'payment',
              icon: Smartphone,
              status: 'available',
            },
            {
              name: 'Apple Pay',
              type: 'payment',
              icon: Smartphone,
              status: 'coming-soon',
            },
            {
              name: 'Google Pay',
              type: 'payment',
              icon: Smartphone,
              status: 'coming-soon',
            },
          ].map((integration, index) => (
            <div key={index} className="integration-card">
              <div className="integration-card__icon">
                <integration.icon size={24} />
              </div>
              <div className="integration-card__content">
                <h4>{integration.name}</h4>
                <span
                  className={`integration-status integration-status--${integration.status}`}
                >
                  {integration.status === 'available'
                    ? 'Available'
                    : 'Coming Soon'}
                </span>
              </div>
              <button
                className={`btn btn--sm ${
                  integration.status === 'available'
                    ? 'btn--primary'
                    : 'btn--secondary'
                }`}
                disabled={integration.status !== 'available'}
              >
                {integration.status === 'available' ? 'Connect' : 'Notify Me'}
              </button>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Data Processing Status */}
      <motion.section
        className="input-sources__section"
        variants={itemVariants}
      >
        <div className="section-header">
          <h2>Recent Processing Activity</h2>
        </div>

        <div className="activity-list">
          {[
            {
              id: 1,
              action: 'Processed bank statement',
              source: 'Chase Bank',
              status: 'completed',
              timestamp: new Date('2024-01-15T10:30:00'),
              count: 23,
            },
            {
              id: 2,
              action: 'Imported CSV file',
              source: 'transactions_december.csv',
              status: 'completed',
              timestamp: new Date('2024-01-15T09:15:00'),
              count: 156,
            },
            {
              id: 3,
              action: 'Email sync',
              source: 'Gmail Account',
              status: 'processing',
              timestamp: new Date('2024-01-15T08:45:00'),
              count: 12,
            },
          ].map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-item__status">
                {activity.status === 'completed' ? (
                  <CheckCircle
                    className="status-icon status-icon--success"
                    size={20}
                  />
                ) : activity.status === 'processing' ? (
                  <div className="spinner" />
                ) : (
                  <AlertCircle
                    className="status-icon status-icon--error"
                    size={20}
                  />
                )}
              </div>
              <div className="activity-item__content">
                <div className="activity-item__main">
                  <span className="activity-item__action">
                    {activity.action}
                  </span>
                  <span className="activity-item__source">
                    from {activity.source}
                  </span>
                </div>
                <div className="activity-item__meta">
                  <span>{activity.count} transactions</span>
                  <span>{activity.timestamp.toLocaleString()}</span>
                </div>
              </div>
              <button className="action-btn" aria-label="Download report">
                <Download size={16} />
              </button>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default InputSources;
