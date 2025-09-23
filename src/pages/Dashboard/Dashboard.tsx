import React from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts'
import './Dashboard.scss'

const Dashboard: React.FC = () => {
  // Mock data
  const spendingData = [
    { month: 'Jan', amount: 2400 },
    { month: 'Feb', amount: 1398 },
    { month: 'Mar', amount: 9800 },
    { month: 'Apr', amount: 3908 },
    { month: 'May', amount: 4800 },
    { month: 'Jun', amount: 3800 },
  ]

  const categoryData = [
    { name: 'Food', value: 400, color: '#8884d8' },
    { name: 'Transport', value: 300, color: '#82ca9d' },
    { name: 'Entertainment', value: 200, color: '#ffc658' },
    { name: 'Shopping', value: 278, color: '#ff7c7c' },
    { name: 'Bills', value: 189, color: '#8dd1e1' },
  ]

  const monthlySpending = [
    { category: 'Food', amount: 1200 },
    { category: 'Transport', amount: 800 },
    { category: 'Entertainment', amount: 600 },
    { category: 'Shopping', amount: 900 },
    { category: 'Bills', amount: 1500 },
  ]

  const recentTransactions = [
    { id: 1, description: 'Grocery Store', amount: -85.50, category: 'Food', date: '2024-01-15' },
    { id: 2, description: 'Salary Deposit', amount: 3500.00, category: 'Income', date: '2024-01-15' },
    { id: 3, description: 'Gas Station', amount: -45.20, category: 'Transport', date: '2024-01-14' },
    { id: 4, description: 'Netflix Subscription', amount: -15.99, category: 'Entertainment', date: '2024-01-14' },
    { id: 5, description: 'Online Shopping', amount: -129.99, category: 'Shopping', date: '2024-01-13' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 0,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <motion.div 
      className="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="dashboard__header" variants={itemVariants}>
        <h1>Financial Overview</h1>
        <p>Track your spending patterns and financial health</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div className="dashboard__stats" variants={itemVariants}>
        <div className="stat-card stat-card--primary">
          <div className="stat-card__icon">
            <DollarSign size={20} />
          </div>
          <div className="stat-card__content">
            <h3>Total Balance</h3>
            <p className="stat-card__value">$12,450.00</p>
            <span className="stat-card__change stat-card__change--positive">
              <ArrowUpRight size={12} />
              +2.5% from last month
            </span>
          </div>
        </div>

        <div className="stat-card stat-card--success">
          <div className="stat-card__icon">
            <TrendingUp size={20} />
          </div>
          <div className="stat-card__content">
            <h3>Monthly Income</h3>
            <p className="stat-card__value">$4,200.00</p>
            <span className="stat-card__change stat-card__change--positive">
              <ArrowUpRight size={12} />
              +5.2% from last month
            </span>
          </div>
        </div>

        <div className="stat-card stat-card--warning">
          <div className="stat-card__icon">
            <TrendingDown size={20} />
          </div>
          <div className="stat-card__content">
            <h3>Monthly Expenses</h3>
            <p className="stat-card__value">$3,150.00</p>
            <span className="stat-card__change stat-card__change--negative">
              <ArrowDownRight size={12} />
              +8.1% from last month
            </span>
          </div>
        </div>

        <div className="stat-card stat-card--info">
          <div className="stat-card__icon">
            <CreditCard size={20} />
          </div>
          <div className="stat-card__content">
            <h3>Savings Rate</h3>
            <p className="stat-card__value">25%</p>
            <span className="stat-card__change stat-card__change--positive">
              <ArrowUpRight size={12} />
              +1.2% from last month
            </span>
          </div>
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="dashboard__charts">
        {/* Left Column - Charts */}
        <div className="dashboard__left-column">
          {/* Monthly Spending by Category - Top Right */}
          <motion.div className="chart-card" variants={itemVariants}>
            <div className="chart-card__header">
              <h3>Monthly Spending by Category</h3>
              <BarChart3 className="chart-card__icon" size={16} />
            </div>
            <div className="chart-card__content">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlySpending}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-200)" />
                  <XAxis dataKey="category" stroke="var(--text-tertiary)" />
                  <YAxis stroke="var(--text-tertiary)" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  />
                  <Bar dataKey="amount" fill="var(--primary-blue)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Breakdown - Bottom Right */}
          <motion.div className="chart-card" variants={itemVariants}>
            <div className="chart-card__header">
              <h3>Category Breakdown</h3>
              <PieChart className="chart-card__icon" size={16} />
            </div>
            <div className="chart-card__content">
              <div className="pie-chart-container">
                <div className="chart-wrapper">
                  <ResponsiveContainer width={200} height={200}>
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="chart-legend">
                  {categoryData.map((item, index) => (
                    <div key={index} className="chart-legend__item">
                      <div 
                        className="chart-legend__color" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                      <span className="chart-legend__value">${item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Transactions - Right Half */}
        <motion.div className="transactions-card" variants={itemVariants}>
          <div className="transactions-card__header">
            <h3>Recent Transactions</h3>
            <button className="btn btn--sm btn--secondary">View All</button>
          </div>
          <div className="transactions-card__content">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-item__info">
                  <span className="transaction-item__description">
                    {transaction.description}
                  </span>
                  <span className="transaction-item__category">
                    {transaction.category}
                  </span>
                </div>
                <div className="transaction-item__amount">
                  <span className={`transaction-item__value ${
                    transaction.amount > 0 ? 'transaction-item__value--positive' : 'transaction-item__value--negative'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                  <span className="transaction-item__date">{transaction.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Spending Trend */}
      <div className="dashboard__bottom">
        <motion.div className="chart-card" variants={itemVariants}>
          <div className="chart-card__header">
            <h3>Spending Trend</h3>
            <div className="chart-card__actions">
              <button className="btn btn--sm btn--secondary">6M</button>
              <button className="btn btn--sm btn--primary">1Y</button>
            </div>
          </div>
          <div className="chart-card__content">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-200)" />
                <XAxis dataKey="month" stroke="var(--text-tertiary)" />
                <YAxis stroke="var(--text-tertiary)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--radius-md)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="var(--primary-blue)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--primary-blue)', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Dashboard
