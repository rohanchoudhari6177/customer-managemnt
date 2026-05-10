const customerForm = document.getElementById("customerForm");
const customerList = document.getElementById("customerList");
const totalCount = document.getElementById("totalCount");
const activeCount = document.getElementById("activeCount");
const inactiveCount = document.getElementById("inactiveCount");

let customers = JSON.parse(localStorage.getItem("customers")) || [];

displayCustomers();

customerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  const customer = {
    id: Date.now(),
    name,
    email,
    phone,
    status: "Active"
  };

  customers.push(customer);
  saveCustomers();
  displayCustomers();
  customerForm.reset();
});

function displayCustomers() {
  customerList.innerHTML = "";

  if (customers.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = '<td colspan="5" class="empty-state">No customers yet. Add the first customer to begin.</td>';
    customerList.appendChild(row);
  }

  customers.forEach((customer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${customer.name}</td>
      <td>${customer.email}</td>
      <td>${customer.phone}</td>
      <td><span class="status-pill ${customer.status === "Active" ? "active" : "inactive"}">${customer.status}</span></td>
      <td>
        <button class="edit-btn" onclick="editCustomer(${customer.id})">Edit</button>
        <button class="delete-btn" onclick="deleteCustomer(${customer.id})">Deactivate</button>
      </td>
    `;
    customerList.appendChild(row);
  });

  updateSummary();
}

function editCustomer(id) {
  const customer = customers.find((c) => c.id === id);
  if (!customer) return;

  const newName = prompt("Enter New Name", customer.name);
  const newEmail = prompt("Enter New Email", customer.email);
  const newPhone = prompt("Enter New Phone", customer.phone);

  if (newName !== null && newName.trim()) {
    customer.name = newName.trim();
  }
  if (newEmail !== null && newEmail.trim()) {
    customer.email = newEmail.trim();
  }
  if (newPhone !== null && newPhone.trim()) {
    customer.phone = newPhone.trim();
  }

  saveCustomers();
  displayCustomers();
}

function deleteCustomer(id) {
  const customer = customers.find((c) => c.id === id);
  if (!customer) return;

  customer.status = "Inactive";
  saveCustomers();
  displayCustomers();
}

function updateSummary() {
  const total = customers.length;
  const active = customers.filter((c) => c.status === "Active").length;
  const inactive = total - active;

  totalCount.textContent = total;
  activeCount.textContent = active;
  inactiveCount.textContent = inactive;
}

function saveCustomers() {
  localStorage.setItem("customers", JSON.stringify(customers));
}

window.updateSummary = updateSummary;
