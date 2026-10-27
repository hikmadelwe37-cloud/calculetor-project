// Default Preset Categories
const CATEGORIES = {
  expense: [
    { name: 'Food & Dining', icon: 'fa-utensils', color: '#ef4444' },
    { name: 'Transportation', icon: 'fa-car', color: '#f59e0b' },
    { name: 'Housing & Utilities', icon: 'fa-house', color: '#3b82f6' },
    { name: 'Entertainment', icon: 'fa-gamepad', color: '#8b5cf6' },
    { name: 'Shopping', icon: 'fa-bag-shopping', color: '#ec4899' },
    { name: 'Health & Medical', icon: 'fa-heart-pulse', color: '#10b981' },
    { name: 'Other Expense', icon: 'fa-ellipsis', color: '#6b7280' }
  ],
  income: [
    { name: 'Salary', icon: 'fa-money-bill-wave', color: '#10b981' },
    { name: 'Freelance', icon: 'fa-laptop-code', color: '#06b6d4' },
    { name: 'Investments', icon: 'fa-chart-line', color: '#8b5cf6' },
    { name: 'Gifts & Allowance', icon: 'fa-gift', color: '#f59e0b' },
    { name: 'Other Income', icon: 'fa-wallet', color: '#64748b' }
  ]
};

// Initial Sample Data
const SAMPLE_TRANSACTIONS = [
  { id: '1', title: 'Monthly Salary', amount: 3500.00, type: 'income', category: 'Salary', date: '2026-10-01' },
  { id: '2', title: 'Grocery Supermarket', amount: 142.50, type: 'expense', category: 'Food & Dining', date: '2026-10-03' },
  { id: '3', title: 'Electricity & Water Bill', amount: 95.00, type: 'expense', category: 'Housing & Utilities', date: '2026-10-05' },
  { id: '4', title: 'Freelance Web Design', amount: 600.00, type: 'income', category: 'Freelance', date: '2026-10-10' },
  { id: '5', title: 'Movie Night & Dinner', amount: 65.20, type: 'expense', category: 'Entertainment', date: '2026-10-12' },
  { id: '6', title: 'Gas Station', amount: 45.00, type: 'expense', category: 'Transportation', date: '2026-10-15' }
];

// App State
let transactions = JSON.parse(localStorage.getItem('et_transactions')) || [...SAMPLE_TRANSACTIONS];
let categoryChart = null;

// DOM Element References
const form = document.getElementById('transactionForm');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');

const totalBalanceEl = document.getElementById('totalBalance');
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpenseEl = document.getElementById('totalExpense');
const balanceStatusEl = document.getElementById('balanceStatus');
const incomeCountEl = document.getElementById('incomeCount');
const expenseCountEl = document.getElementById('expenseCount');

const transactionListEl = document.getElementById('transactionList');
const emptyStateEl = document.getElementById('emptyState');

const searchInput = document.getElementById('searchInput');
const filterCategorySelect = document.getElementById('filterCategory');
const filterDateFromInput = document.getElementById('filterDateFrom');
const filterDateToInput = document.getElementById('filterDateTo');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const loadSampleBtn = document.getElementById('loadSampleBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  // Set default date to today
  dateInput.value = new Date().toISOString().split('T')[0];

  initTheme();
  populateCategorySelects();
  updateUI();

  // Event Listeners
  typeInput.addEventListener('change', updateCategoryOptions);
  form.addEventListener('submit', handleAddTransaction);
  searchInput.addEventListener('input', updateUI);
  filterCategorySelect.addEventListener('change', updateUI);
  filterDateFromInput.addEventListener('change', updateUI);
  filterDateToInput.addEventListener('change', updateUI);
  resetFiltersBtn.addEventListener('click', resetFilters);
  clearAllBtn.addEventListener('click', clearAllTransactions);
  loadSampleBtn.addEventListener('click', loadSampleData);
  themeToggleBtn.addEventListener('click', toggleTheme);
});

// Category Dropdown Handlers
function updateCategoryOptions() {
  const selectedType = typeInput.value;
  categoryInput.innerHTML = '';
  CATEGORIES[selectedType].forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.name;
    opt.textContent = cat.name;
    categoryInput.appendChild(opt);
  });
}

function populateCategorySelects() {
  updateCategoryOptions();

  // Populate Filter Dropdown
  const incomeGroup = document.createElement('optgroup');
  incomeGroup.label = 'Income Categories';
  CATEGORIES.income.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.name;
    opt.textContent = cat.name;
    incomeGroup.appendChild(opt);
  });

  const expenseGroup = document.createElement('optgroup');
  expenseGroup.label = 'Expense Categories';
  CATEGORIES.expense.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.name;
    opt.textContent = cat.name;
    expenseGroup.appendChild(opt);
  });

  filterCategorySelect.appendChild(incomeGroup);
  filterCategorySelect.appendChild(expenseGroup);
}

// Transaction Handlers
function handleAddTransaction(e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;
  const category = categoryInput.value;
  const date = dateInput.value;

  if (!title || isNaN(amount) || amount <= 0 || !date) return;

  const newTx = {
    id: Date.now().toString(),
    title,
    amount,
    type,
    category,
    date
  };

  transactions.unshift(newTx);
  saveAndRefresh();

  // Reset Form
  titleInput.value = '';
  amountInput.value = '';
  titleInput.focus();
}

function deleteTransaction(id) {
  transactions = transactions.filter(tx => tx.id !== id);
  saveAndRefresh();
}

function clearAllTransactions() {
  if (confirm('Are you sure you want to clear all transactions?')) {
    transactions = [];
    saveAndRefresh();
  }
}

function loadSampleData() {
  transactions = [...SAMPLE_TRANSACTIONS];
  saveAndRefresh();
}

function saveAndRefresh() {
  localStorage.setItem('et_transactions', JSON.stringify(transactions));
  updateUI();
}

// Filtering Logic
function getFilteredTransactions() {
  const query = searchInput.value.toLowerCase().trim();
  const categoryFilter = filterCategorySelect.value;
  const dateFrom = filterDateFromInput.value;
  const dateTo = filterDateToInput.value;

  return transactions.filter(tx => {
    // Search Query
    const matchesSearch = tx.title.toLowerCase().includes(query) || tx.category.toLowerCase().includes(query);

    // Category Filter
    let matchesCategory = true;
    if (categoryFilter === 'income-all') matchesCategory = tx.type === 'income';
    else if (categoryFilter === 'expense-all') matchesCategory = tx.type === 'expense';
    else if (categoryFilter !== 'all') matchesCategory = tx.category === categoryFilter;

    // Date Filter
    let matchesDate = true;
    if (dateFrom && tx.date < dateFrom) matchesDate = false;
    if (dateTo && tx.date > dateTo) matchesDate = false;

    return matchesSearch && matchesCategory && matchesDate;
  });
}

function resetFilters() {
  searchInput.value = '';
  filterCategorySelect.value = 'all';
  filterDateFromInput.value = '';
  filterDateToInput.value = '';
  updateUI();
}

// UI Update Controller
function updateUI() {
  const filtered = getFilteredTransactions();

  calculateTotals();
  renderList(filtered);
  renderChart(filtered);
}

// Calculate Summary Cards
function calculateTotals() {
  const incomeTotal = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expenseTotal = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = incomeTotal - expenseTotal;

  totalBalanceEl.textContent = formatCurrency(balance);
  totalIncomeEl.textContent = formatCurrency(incomeTotal);
  totalExpenseEl.textContent = formatCurrency(expenseTotal);

  const incomeCount = transactions.filter(t => t.type === 'income').length;
  const expenseCount = transactions.filter(t => t.type === 'expense').length;

  incomeCountEl.textContent = `${incomeCount} entry${incomeCount === 1 ? '' : 's'}`;
  expenseCountEl.textContent = `${expenseCount} entry${expenseCount === 1 ? '' : 's'}`;

  if (balance > 0) {
    balanceStatusEl.textContent = 'Surplus';
    balanceStatusEl.className = 'badge badge-success';
  } else if (balance < 0) {
    balanceStatusEl.textContent = 'Deficit';
    balanceStatusEl.className = 'badge badge-danger';
  } else {
    balanceStatusEl.textContent = 'Balanced';
    balanceStatusEl.className = 'badge badge-neutral';
  }
}

// Render Transactions List
function renderList(list) {
  transactionListEl.innerHTML = '';

  if (list.length === 0) {
    emptyStateEl.classList.remove('hidden');
    return;
  }

  emptyStateEl.classList.add('hidden');

  list.forEach(tx => {
    const li = document.createElement('li');
    li.className = `transaction-item tx-${tx.type}`;

    const catObj = [...CATEGORIES.expense, ...CATEGORIES.income].find(c => c.name === tx.category) || {
      icon: 'fa-receipt',
      color: '#6b7280'
    };

    li.innerHTML = `
      <div class="tx-main">
        <div class="tx-icon-bg" style="background-color: ${catObj.color}20; color: ${catObj.color};">
          <i class="fa-solid ${catObj.icon}"></i>
        </div>
        <div class="tx-details">
          <span class="tx-title">${escapeHTML(tx.title)}</span>
          <div class="tx-meta">
            <span>${tx.category}</span>
            <span>•</span>
            <span>${formatDate(tx.date)}</span>
          </div>
        </div>
      </div>
      <div class="tx-amount-group">
        <span class="tx-amount">${tx.type === 'income' ? '+' : '-'}${formatCurrency(tx.amount)}</span>
        <button class="delete-btn" title="Delete Transaction" onclick="deleteTransaction('${tx.id}')">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    transactionListEl.appendChild(li);
  });
}

// Chart Visualization
function renderChart(list) {
  const expenseList = list.filter(t => t.type === 'expense');
  const noDataMsg = document.getElementById('noChartData');

  if (expenseList.length === 0) {
    if (categoryChart) categoryChart.destroy();
    noDataMsg.classList.remove('hidden');
    return;
  }

  noDataMsg.classList.add('hidden');

  // Aggregate by Category
  const categoryTotals = {};
  expenseList.forEach(tx => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);
  const backgroundColors = labels.map(label => {
    const cat = CATEGORIES.expense.find(c => c.name === label);
    return cat ? cat.color : '#94a3b8';
  });

  const ctx = document.getElementById('categoryChart').getContext('2d');

  if (categoryChart) {
    categoryChart.destroy();
  }

  categoryChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors,
        borderWidth: 2,
        borderColor: getComputedStyle(document.body).getPropertyValue('--bg-card')
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 12,
            font: { family: 'Inter', size: 11 },
            color: getComputedStyle(document.body).getPropertyValue('--text-main')
          }
        }
      },
      cutout: '70%'
    }
  });
}

// Utility Functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

function formatDate(dateString) {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Theme Handling
function initTheme() {
  const savedTheme = localStorage.getItem('et_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('et_theme', newTheme);
  updateThemeIcon(newTheme);
  updateUI(); // Re-render chart with new themes
}

function updateThemeIcon(theme) {
  const icon = themeToggleBtn.querySelector('i');
  if (theme === 'dark') {
    icon.className = 'fa-solid fa-sun';
  } else {
    icon.className = 'fa-solid fa-moon';
  }
}