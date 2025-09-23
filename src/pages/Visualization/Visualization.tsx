import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Maximize2,
  RefreshCw,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';
import './Visualization.scss';

const Visualization: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6M');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data
  const spendingTrendData = [
    { month: 'Jul', amount: 2400, income: 4200, savings: 1800 },
    { month: 'Aug', amount: 1398, income: 4200, savings: 2802 },
    { month: 'Sep', amount: 2800, income: 4200, savings: 1400 },
    { month: 'Oct', amount: 3908, income: 4200, savings: 292 },
    { month: 'Nov', amount: 4800, income: 4200, savings: -600 },
    { month: 'Dec', amount: 3800, income: 4200, savings: 400 },
  ];

  const categoryBreakdownData = [
    { name: 'Food & Dining', value: 1200, color: '#8884d8', percentage: 35 },
    { name: 'Transportation', value: 800, color: '#82ca9d', percentage: 23 },
    { name: 'Shopping', value: 600, color: '#ffc658', percentage: 17 },
    { name: 'Entertainment', value: 400, color: '#ff7c7c', percentage: 12 },
    { name: 'Bills & Utilities', value: 300, color: '#8dd1e1', percentage: 9 },
    { name: 'Healthcare', value: 150, color: '#d084d0', percentage: 4 },
  ];

  const monthlyComparisonData = [
    { category: 'Food', thisMonth: 1200, lastMonth: 1100, budget: 1000 },
    { category: 'Transport', thisMonth: 800, lastMonth: 750, budget: 700 },
    { category: 'Shopping', thisMonth: 600, lastMonth: 800, budget: 500 },
    { category: 'Entertainment', thisMonth: 400, lastMonth: 350, budget: 300 },
    { category: 'Bills', thisMonth: 300, lastMonth: 320, budget: 350 },
  ];

  const dailySpendingData = [
    { day: '1', amount: 45 },
    { day: '2', amount: 120 },
    { day: '3', amount: 80 },
    { day: '4', amount: 200 },
    { day: '5', amount: 150 },
    { day: '6', amount: 90 },
    { day: '7', amount: 300 },
    { day: '8', amount: 75 },
    { day: '9', amount: 180 },
    { day: '10', amount: 220 },
    { day: '11', amount: 95 },
    { day: '12', amount: 160 },
    { day: '13', amount: 140 },
    { day: '14', amount: 250 },
    { day: '15', amount: 110 },
  ];

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
      className="visualization"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="visualization__header" variants={itemVariants}>
        <div className="header-content">
          <h1>Financial Visualization</h1>
          <p>Analyze your spending patterns and financial trends</p>
        </div>

        <div className="header-controls">
          <div className="control-group">
            <label>Period:</label>
            <select
              value={selectedPeriod}
              onChange={e => setSelectedPeriod(e.target.value)}
              className="form-input"
            >
              <option value="1M">1 Month</option>
              <option value="3M">3 Months</option>
              <option value="6M">6 Months</option>
              <option value="1Y">1 Year</option>
            </select>
          </div>

          <div className="control-group">
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="form-input"
            >
              <option value="all">All Categories</option>
              <option value="food">Food & Dining</option>
              <option value="transport">Transportation</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>

          <button className="btn btn--secondary">
            <Filter size={12} />
            More Filters
          </button>
        </div>
      </motion.div>

      {/* Main Charts Grid */}
      <div className="visualization__grid">
        {/* Spending Trend */}
        <motion.div
          className="chart-container chart-container--full-width"
          variants={itemVariants}
        >
          <div className="chart-header">
            <div className="chart-title">
              <TrendingUp className="chart-icon" size={16} />
              <h3>Spending Trend</h3>
            </div>
            <div className="chart-actions">
              <button className="action-btn" aria-label="Refresh">
                <RefreshCw size={16} />
              </button>
              <button className="action-btn" aria-label="Download">
                <Download size={16} />
              </button>
              <button className="action-btn" aria-label="Fullscreen">
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          <div className="chart-content">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={spendingTrendData}>
                <defs>
                  <linearGradient
                    id="colorSpending"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--primary-blue)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--primary-blue)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--success)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--success)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-200)" />
                <XAxis
                  dataKey="month"
                  stroke="var(--text-tertiary)"
                  fontSize={12}
                />
                <YAxis stroke="var(--text-tertiary)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="var(--success)"
                  fillOpacity={1}
                  fill="url(#colorIncome)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="var(--primary-blue)"
                  fillOpacity={1}
                  fill="url(#colorSpending)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="chart-legend">
              <div className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: 'var(--success)' }}
                />
                <span>Income</span>
              </div>
              <div className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: 'var(--primary-blue)' }}
                />
                <span>Spending</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary Charts Grid */}
        <div className="visualization__secondary-grid">
          {/* Category Breakdown */}
          <motion.div className="chart-container" variants={itemVariants}>
            <div className="chart-header">
              <div className="chart-title">
                <PieChart className="chart-icon" size={20} />
                <h3>Category Breakdown</h3>
              </div>
              <div className="chart-actions">
                <button className="action-btn" aria-label="Download">
                  <Download size={16} />
                </button>
              </div>
            </div>

            <div className="chart-content">
              <div className="pie-chart-wrapper">
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={categoryBreakdownData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`$${value}`, 'Amount']}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>

              <div className="category-list">
                {categoryBreakdownData.map((category, index) => (
                  <div key={index} className="category-item">
                    <div className="category-info">
                      <div
                        className="category-color"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="category-name">{category.name}</span>
                    </div>
                    <div className="category-stats">
                      <span className="category-amount">${category.value}</span>
                      <span className="category-percentage">
                        {category.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stacked Charts */}
          <div className="visualization__right-column">
            {/* Monthly Comparison */}
            <motion.div className="chart-container" variants={itemVariants}>
              <div className="chart-header">
                <div className="chart-title">
                  <BarChart3 className="chart-icon" size={20} />
                  <h3>Monthly Comparison</h3>
                </div>
                <div className="chart-actions">
                  <button className="action-btn" aria-label="Download">
                    <Download size={16} />
                  </button>
                </div>
              </div>

              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={monthlyComparisonData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--gray-200)"
                    />
                    <XAxis
                      dataKey="category"
                      stroke="var(--text-tertiary)"
                      fontSize={12}
                    />
                    <YAxis stroke="var(--text-tertiary)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--gray-200)',
                        borderRadius: 'var(--radius-md)',
                      }}
                    />
                    <Bar
                      dataKey="budget"
                      fill="var(--gray-300)"
                      name="Budget"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="lastMonth"
                      fill="var(--gray-400)"
                      name="Last Month"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="thisMonth"
                      fill="var(--primary-blue)"
                      name="This Month"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Daily Spending */}
            <motion.div className="chart-container" variants={itemVariants}>
              <div className="chart-header">
                <div className="chart-title">
                  <Calendar className="chart-icon" size={20} />
                  <h3>Daily Spending (This Month)</h3>
                </div>
                <div className="chart-actions">
                  <button className="action-btn" aria-label="Download">
                    <Download size={16} />
                  </button>
                </div>
              </div>

              <div className="chart-content">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailySpendingData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--gray-200)"
                    />
                    <XAxis
                      dataKey="day"
                      stroke="var(--text-tertiary)"
                      fontSize={12}
                    />
                    <YAxis stroke="var(--text-tertiary)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--gray-200)',
                        borderRadius: 'var(--radius-md)',
                      }}
                      formatter={(value: number) => [`$${value}`, 'Amount']}
                      labelFormatter={label => `Day ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="var(--secondary-orange)"
                      strokeWidth={3}
                      dot={{
                        fill: 'var(--secondary-orange)',
                        strokeWidth: 2,
                        r: 4,
                      }}
                      activeDot={{
                        r: 6,
                        stroke: 'var(--secondary-orange)',
                        strokeWidth: 2,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <motion.div className="visualization__summary" variants={itemVariants}>
        <div className="summary-card">
          <h4>Average Daily Spending</h4>
          <span className="summary-value">$156.67</span>
          <span className="summary-change summary-change--negative">
            +12% vs last month
          </span>
        </div>

        <div className="summary-card">
          <h4>Highest Spending Day</h4>
          <span className="summary-value">$300</span>
          <span className="summary-change summary-change--neutral">
            January 7th
          </span>
        </div>

        <div className="summary-card">
          <h4>Most Frequent Category</h4>
          <span className="summary-value">Food & Dining</span>
          <span className="summary-change summary-change--neutral">
            35% of transactions
          </span>
        </div>

        <div className="summary-card">
          <h4>Budget Performance</h4>
          <span className="summary-value">85%</span>
          <span className="summary-change summary-change--positive">
            Within budget
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Visualization;
