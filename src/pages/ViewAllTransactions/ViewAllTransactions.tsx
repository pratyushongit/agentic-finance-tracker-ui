import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Filter,
  Search,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  ShoppingBag,
  Car,
  Home,
  Coffee,
  Gamepad2,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ViewAllTransactions.scss';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
  merchant?: string;
  account?: string;
}

const ViewAllTransactions: React.FC = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      description: 'Grocery Store',
      amount: -85.5,
      category: 'Food',
      date: '2024-01-15',
      type: 'expense',
      merchant: 'Whole Foods Market',
      account: 'Chase Checking',
    },
    {
      id: 2,
      description: 'Salary Deposit',
      amount: 3500.0,
      category: 'Income',
      date: '2024-01-15',
      type: 'income',
      merchant: 'ABC Company',
      account: 'Chase Checking',
    },
    {
      id: 3,
      description: 'Gas Station',
      amount: -45.2,
      category: 'Transport',
      date: '2024-01-14',
      type: 'expense',
      merchant: 'Shell Gas Station',
      account: 'Chase Checking',
    },
    {
      id: 4,
      description: 'Netflix Subscription',
      amount: -15.99,
      category: 'Entertainment',
      date: '2024-01-14',
      type: 'expense',
      merchant: 'Netflix Inc.',
      account: 'Chase Credit Card',
    },
    {
      id: 5,
      description: 'Online Shopping',
      amount: -129.99,
      category: 'Shopping',
      date: '2024-01-13',
      type: 'expense',
      merchant: 'Amazon',
      account: 'Chase Credit Card',
    },
    {
      id: 6,
      description: 'Freelance Payment',
      amount: 750.0,
      category: 'Income',
      date: '2024-01-12',
      type: 'income',
      merchant: 'XYZ Client',
      account: 'Chase Checking',
    },
    {
      id: 7,
      description: 'Coffee Shop',
      amount: -12.45,
      category: 'Food',
      date: '2024-01-12',
      type: 'expense',
      merchant: 'Starbucks',
      account: 'Chase Checking',
    },
    {
      id: 8,
      description: 'Uber Ride',
      amount: -18.75,
      category: 'Transport',
      date: '2024-01-11',
      type: 'expense',
      merchant: 'Uber Technologies',
      account: 'Chase Credit Card',
    },
    {
      id: 9,
      description: 'Rent Payment',
      amount: -1200.0,
      category: 'Housing',
      date: '2024-01-10',
      type: 'expense',
      merchant: 'Property Management Co.',
      account: 'Chase Checking',
    },
    {
      id: 10,
      description: 'Investment Dividend',
      amount: 85.3,
      category: 'Income',
      date: '2024-01-09',
      type: 'income',
      merchant: 'Vanguard',
      account: 'Investment Account',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'all',
    'Food',
    'Transport',
    'Entertainment',
    'Shopping',
    'Income',
    'Housing',
  ];
  const types = ['all', 'income', 'expense'];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'food':
        return <Coffee size={16} />;
      case 'transport':
        return <Car size={16} />;
      case 'entertainment':
        return <Gamepad2 size={16} />;
      case 'shopping':
        return <ShoppingBag size={16} />;
      case 'income':
        return <TrendingUp size={16} />;
      case 'housing':
        return <Home size={16} />;
      default:
        return <DollarSign size={16} />;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.merchant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || transaction.category === selectedCategory;
    const matchesType =
      selectedType === 'all' || transaction.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      className="view-all-transactions"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="view-all-transactions__header"
        variants={itemVariants}
      >
        <div className="header-top">
          <button
            className="btn btn--ghost btn--icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="header-content">
            <h1>All Transactions</h1>
            <p>Complete transaction history and details</p>
          </div>
          <button className="btn btn--secondary btn--icon">
            <Download size={20} />
          </button>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card summary-card--income">
            <div className="summary-card__icon">
              <TrendingUp size={20} />
            </div>
            <div className="summary-card__content">
              <span className="summary-card__label">Total Income</span>
              <span className="summary-card__value">
                +${totalIncome.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="summary-card summary-card--expense">
            <div className="summary-card__icon">
              <TrendingDown size={20} />
            </div>
            <div className="summary-card__content">
              <span className="summary-card__label">Total Expenses</span>
              <span className="summary-card__value">
                -${totalExpenses.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="summary-card summary-card--net">
            <div className="summary-card__icon">
              <DollarSign size={20} />
            </div>
            <div className="summary-card__content">
              <span className="summary-card__label">Net Amount</span>
              <span
                className={`summary-card__value ${
                  totalIncome - totalExpenses >= 0 ? 'positive' : 'negative'
                }`}
              >
                {totalIncome - totalExpenses >= 0 ? '+' : ''}$
                {(totalIncome - totalExpenses).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        className="view-all-transactions__controls"
        variants={itemVariants}
      >
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <button
          className={`btn btn--secondary ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} />
          Filters
        </button>
      </motion.div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          className="filter-panel"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          variants={itemVariants}
        >
          <div className="filter-group">
            <label>Category</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Type</label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="filter-select"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all'
                    ? 'All Types'
                    : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn--ghost btn--sm"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedType('all');
              setSearchTerm('');
            }}
          >
            <X size={16} />
            Clear Filters
          </button>
        </motion.div>
      )}

      {/* Results Count */}
      <motion.div className="results-info" variants={itemVariants}>
        <span>
          Showing {filteredTransactions.length} of {transactions.length}{' '}
          transactions
        </span>
      </motion.div>

      {/* Transactions List */}
      <motion.div className="transactions-list" variants={itemVariants}>
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <DollarSign size={48} className="empty-state__icon" />
            <h3>No transactions found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              className="transaction-row"
              variants={itemVariants}
              custom={index}
            >
              <div className="transaction-row__icon">
                {getCategoryIcon(transaction.category)}
              </div>

              <div className="transaction-row__main">
                <div className="transaction-row__info">
                  <h4 className="transaction-row__description">
                    {transaction.description}
                  </h4>
                  <div className="transaction-row__details">
                    <span className="transaction-row__merchant">
                      {transaction.merchant}
                    </span>
                    <span className="transaction-row__separator">•</span>
                    <span className="transaction-row__account">
                      {transaction.account}
                    </span>
                  </div>
                </div>

                <div className="transaction-row__meta">
                  <div className="transaction-row__amount">
                    <span
                      className={`amount ${
                        transaction.type === 'income' ? 'positive' : 'negative'
                      }`}
                    >
                      {transaction.amount > 0 ? '+' : ''}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                  <div className="transaction-row__secondary">
                    <span className="transaction-row__category">
                      {transaction.category}
                    </span>
                    <span className="transaction-row__date">
                      {transaction.date}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default ViewAllTransactions;
