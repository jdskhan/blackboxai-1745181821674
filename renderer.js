// Data files
const transactionsFile = 'transactions.json';
const vendorsFile = 'vendors.json';
const bankAccountsFile = 'bankAccounts.json';

let transactions = [];
let vendors = [];
let bankAccounts = [];

// Load data from files
function loadData() {
  const transactionsData = window.api.readData(transactionsFile);
  transactions = transactionsData ? JSON.parse(transactionsData) : [];

  const vendorsData = window.api.readData(vendorsFile);
  vendors = vendorsData ? JSON.parse(vendorsData) : [];

  const bankAccountsData = window.api.readData(bankAccountsFile);
  bankAccounts = bankAccountsData ? JSON.parse(bankAccountsData) : [];
}

// Save data to files
function saveData() {
  window.api.writeData(transactionsFile, JSON.stringify(transactions, null, 2));
  window.api.writeData(vendorsFile, JSON.stringify(vendors, null, 2));
  window.api.writeData(bankAccountsFile, JSON.stringify(bankAccounts, null, 2));
}

// Render transactions table
function renderTransactions() {
  const tbody = document.querySelector('#transactions-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  transactions.forEach((tx, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-4 py-2 whitespace-nowrap">${tx.date}</td>
      <td class="px-4 py-2 whitespace-nowrap">${tx.type}</td>
      <td class="px-4 py-2 whitespace-nowrap">${tx.vendor}</td>
      <td class="px-4 py-2 whitespace-nowrap text-right">${tx.usdt}</td>
      <td class="px-4 py-2 whitespace-nowrap text-right">₹ ${tx.rate}</td>
      <td class="px-4 py-2 whitespace-nowrap text-right">₹ ${tx.amount}</td>
      <td class="px-4 py-2 whitespace-nowrap">${tx.status}</td>
      <td class="px-4 py-2 whitespace-nowrap">
        <button data-index="${index}" class="edit-transaction text-blue-600 hover:underline mr-2">Edit</button>
        <button data-index="${index}" class="delete-transaction text-red-600 hover:underline">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Attach event listeners for edit and delete buttons
  document.querySelectorAll('.edit-transaction').forEach(button => {
    button.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      openTransactionModal(transactions[idx], idx);
    });
  });
  document.querySelectorAll('.delete-transaction').forEach(button => {
    button.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      if (confirm('Are you sure you want to delete this transaction?')) {
        transactions.splice(idx, 1);
        saveData();
        renderTransactions();
      }
    });
  });
}

// Render vendors table
function renderVendors() {
  const tbody = document.querySelector('#vendors-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  vendors.forEach((vendor, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-4 py-2 whitespace-nowrap">${vendor.name}</td>
      <td class="px-4 py-2 whitespace-nowrap">${vendor.totalVolume}</td>
      <td class="px-4 py-2 whitespace-nowrap">${vendor.type}</td>
      <td class="px-4 py-2 whitespace-nowrap">
        <button data-index="${index}" class="edit-vendor text-blue-600 hover:underline mr-2">Edit</button>
        <button data-index="${index}" class="delete-vendor text-red-600 hover:underline">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Attach event listeners for edit and delete buttons
  document.querySelectorAll('.edit-vendor').forEach(button => {
    button.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      // Implement vendor edit modal if needed
      alert('Vendor edit not implemented yet.');
    });
  });
  document.querySelectorAll('.delete-vendor').forEach(button => {
    button.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      if (confirm('Are you sure you want to delete this vendor?')) {
        vendors.splice(idx, 1);
        saveData();
        renderVendors();
      }
    });
  });
}

// Render bank accounts table
function renderBankAccounts() {
  const tbody = document.querySelector('#bankaccounts-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  bankAccounts.forEach((account, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-4 py-2 whitespace-nowrap">${account.bankName}</td>
      <td class="px-4 py-2 whitespace-nowrap">${account.accountNo}</td>
      <td class="px-4 py-2 whitespace-nowrap">${account.ifsc}</td>
      <td class="px-4 py-2 whitespace-nowrap text-right">₹ ${account.currentBalance}</td>
      <td class="px-4 py-2 whitespace-nowrap">${account.lastUpdated}</td>
      <td class="px-4 py-2 whitespace-nowrap">
        <button data-index="${index}" class="edit-bank text-blue-600 hover:underline mr-2">Edit</button>
        <button data-index="${index}" class="delete-bank text-red-600 hover:underline">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Attach event listeners for edit and delete buttons
  document.querySelectorAll('.edit-bank').forEach(button => {
    button.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      // Implement bank account edit modal if needed
      alert('Bank account edit not implemented yet.');
    });
  });
  document.querySelectorAll('.delete-bank').forEach(button => {
    button.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      if (confirm('Are you sure you want to delete this bank account?')) {
        bankAccounts.splice(idx, 1);
        saveData();
        renderBankAccounts();
      }
    });
  });
}

// Open transaction modal for add/edit
function openTransactionModal(transaction = null, index = null) {
  const modal = document.getElementById('transaction-modal');
  const form = document.getElementById('transaction-form');

  if (transaction) {
    form['date'].value = transaction.date;
    form['type'].value = transaction.type;
    form['vendor'].value = transaction.vendor;
    form['usdt'].value = transaction.usdt;
    form['rate'].value = transaction.rate;
    form['paymentMethod'].value = transaction.paymentMethod;
    form['bankAccount'].value = transaction.bankAccount;
    form['tdsApplicable'].value = transaction.tdsApplicable;
    form['status'].value = transaction.status;
    form['referenceId'].value = transaction.referenceId;
    form['notes'].value = transaction.notes;
  } else {
    form.reset();
  }

  modal.classList.remove('hidden');

  form.onsubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      date: form['date'].value,
      type: form['type'].value,
      vendor: form['vendor'].value,
      usdt: parseFloat(form['usdt'].value),
      rate: parseFloat(form['rate'].value),
      paymentMethod: form['paymentMethod'].value,
      bankAccount: form['bankAccount'].value,
      tdsApplicable: form['tdsApplicable'].value,
      status: form['status'].value,
      referenceId: form['referenceId'].value,
      notes: form['notes'].value,
      amount: parseFloat(form['usdt'].value) * parseFloat(form['rate'].value),
    };

    if (index !== null) {
      transactions[index] = newTransaction;
    } else {
      transactions.push(newTransaction);
    }
    saveData();
    renderTransactions();
    modal.classList.add('hidden');
  };

  document.getElementById('cancel-transaction').onclick = () => {
    modal.classList.add('hidden');
  };
}

  
// Invoice modal elements
const invoiceModal = document.getElementById('invoice-modal');
const invoiceContent = document.getElementById('invoice-content');
const closeInvoiceBtn = document.getElementById('close-invoice');
const printInvoiceBtn = document.getElementById('print-invoice');

// Function to generate invoice HTML for a transaction
function generateInvoice(transaction) {
  return `
    <h2 class="text-2xl font-bold mb-4">Invoice</h2>
    <p><strong>Date:</strong> ${transaction.date}</p>
    <p><strong>Transaction Type:</strong> ${transaction.type}</p>
    <p><strong>Vendor/Client:</strong> ${transaction.vendor}</p>
    <p><strong>USDT Amount:</strong> ${transaction.usdt}</p>
    <p><strong>Rate (INR/USDT):</strong> ₹ ${transaction.rate}</p>
    <p><strong>Total Amount:</strong> ₹ ${transaction.amount}</p>
    <p><strong>Payment Method:</strong> ${transaction.paymentMethod}</p>
    <p><strong>Bank Account:</strong> ${transaction.bankAccount}</p>
    <p><strong>TDS Applicable:</strong> ${transaction.tdsApplicable}</p>
    <p><strong>Status:</strong> ${transaction.status}</p>
    <p><strong>Reference ID:</strong> ${transaction.referenceId}</p>
    <p><strong>Notes:</strong> ${transaction.notes}</p>
  `;
}

// Show invoice modal for a transaction
function showInvoice(transaction) {
  invoiceContent.innerHTML = generateInvoice(transaction);
  invoiceModal.classList.remove('hidden');
}

// Close invoice modal
closeInvoiceBtn.onclick = () => {
  invoiceModal.classList.add('hidden');
};

// Print invoice
printInvoiceBtn.onclick = () => {
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write('<html><head><title>Invoice</title></head><body>');
  printWindow.document.write(invoiceContent.innerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
};

// Modify renderTransactions to add "View Invoice" button
function renderTransactions() {
  const tbody = document.querySelector('#transactions-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  transactions.forEach((tx, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-4 py-2 whitespace-nowrap">${tx.date}</td>
      <td class="px-4 py-2 whitespace-nowrap">${tx.type}</td>
      <td class="px-4 py-2 whitespace-nowrap">${tx.vendor}</td>
      <td class="px-4 py-2 whitespace-nowrap text-right">${tx.usdt}</td>
      <td class="px-4 py-2 whitespace-nowrap text-right">₹ ${tx.rate}</td>
      <td class="px-4 py-2 whitespace-nowrap text-right">₹ ${tx.amount}</td>
      <td class="px-4 py-2 whitespace-nowrap">${tx.status}</td>
      <td class="px-4 py-2 whitespace-nowrap">
        <button data-index="${index}" class="edit-transaction text-blue-600 hover:underline mr-2">Edit</button>
        <button data-index="${index}" class="delete-transaction text-red-600 hover:underline mr-2">Delete</button>
        <button data-index="${index}" class="view-invoice text-green-600 hover:underline">Invoice</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Attach event listeners for edit, delete, and invoice buttons
  document.querySelectorAll('.edit-transaction').forEach(button => {
    button.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      openTransactionModal(transactions[idx], idx);
    });
  });
  document.querySelectorAll('.delete-transaction').forEach(button => {
    button.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      if (confirm('Are you sure you want to delete this transaction?')) {
        transactions.splice(idx, 1);
        saveData();
        renderTransactions();
      }
    });
  });
  document.querySelectorAll('.view-invoice').forEach(button => {
    button.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      showInvoice(transactions[idx]);
    });
  });
}

  
// Export data to CSV
function exportToCSV(filename, rows) {
  if (!rows || !rows.length) {
    alert('No data to export');
    return;
  }
  const separator = ',';
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows
      .map(row => {
        return keys
          .map(k => {
            let cell = row[k] === null || row[k] === undefined ? '' : row[k];
            cell = cell.toString().replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          })
          .join(separator);
      })
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
  loadData();
  renderTransactions();
  renderVendors();
  renderBankAccounts();

  // Add button to open add transaction modal
  const addTxBtn = document.createElement('button');
  addTxBtn.textContent = 'Add Transaction';
  addTxBtn.className = 'mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700';
  addTxBtn.onclick = () => openTransactionModal();
  document.querySelector('section.mb-8').prepend(addTxBtn);

  // Export buttons
  document.getElementById('export-transactions').addEventListener('click', () => {
    exportToCSV('transactions.csv', transactions);
  });
  document.getElementById('export-vendors').addEventListener('click', () => {
    exportToCSV('vendors.csv', vendors);
  });
  document.getElementById('export-bankaccounts').addEventListener('click', () => {
    exportToCSV('bank_accounts.csv', bankAccounts);
  });
});
