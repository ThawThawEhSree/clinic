// Modal and Button References for Add Patient
const addBtn = document.querySelector(".add-button"); // Add new patient button
const modal = document.querySelector("#add-patient-form"); // Modal form container
const closeBtn = document.querySelector("#close-btn"); // Close button on modal
const cancelBtn = document.querySelector("#cancel-btn"); // Cancel button
const saveBtn = document.querySelector("#save-btn"); // Save button
const updateBtn = document.querySelector("#update-btn"); // Update button
const tableBody = document.querySelector("#patient-table tbody"); // Table body
let currentEditRow = null; // Variable to track the row being edited
let currentDeleteRow = null; // Variable to track the row being deleted

// Modal and Button References for Delete Confirmation
const deleteModal = document.getElementById("delete-confirmation-modal");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");

// Notification Popup References
const notification = document.getElementById("notification");
const notificationMessage = document.getElementById("notification-message");
const notificationClose = document.getElementById("notification-close");

// Function to show notification
function showNotification(message, timeout = 3000) {
  notificationMessage.textContent = message; 
  notification.classList.remove("hidden"); 
  const hideTimeout = setTimeout(() => {
    notification.classList.add("hidden"); 
  }, timeout);

  // Manual close button functionality
  notificationClose.onclick = () => {
    notification.classList.add("hidden");
    clearTimeout(hideTimeout); 
  };
}

// Open Add Patient Modal when "Add new patient" button is clicked
addBtn.addEventListener("click", () => {
  currentEditRow = null; 
  document.querySelector("#patient-form").reset();
  saveBtn.classList.remove("hidden"); 
  updateBtn.classList.add("hidden"); 
  modal.classList.remove("hidden"); 
});

// Close Add Patient Modal when "close" or "cancel" button is clicked
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden"); 
});
cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden"); 
});

// Function to generate random ID for new patients
function generateRandomID() {
  const prefixes = ["B", "S", "G"];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return `${randomPrefix}-${randomNumber}`;
}

// Function to open delete confirmation modal
function openDeleteModal() {
  deleteModal.classList.remove("hidden"); 
}

// Function to close delete confirmation modal
function closeDeleteModal() {
  deleteModal.classList.add("hidden"); 
}

// Event listener for "Delete" button (confirm delete)
confirmDeleteBtn.addEventListener("click", function () {
  if (currentDeleteRow) {
    currentDeleteRow.remove();
    showNotification("Patient successfully deleted!");
  }
  closeDeleteModal(); // Close the modal
});

// Event listener for "Cancel" button (cancel delete)
cancelDeleteBtn.addEventListener("click", function () {
  closeDeleteModal(); // Close the modal without deleting
});

// Event listener for Save button (add new patient)
saveBtn.addEventListener("click", () => {
  const petName = document.querySelector("#pet-name").value;
  const status = document.querySelector("#modal-status").value;
  const parent = document.querySelector("#parent").value;
  const breed = document.querySelector("#modal-breed").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const dob = document.querySelector("#dob").value;
  const phone = document.querySelector("#phone").value;
  const address = document.querySelector("#address").value;

  // Validate form data
  if (!petName || !parent || !breed || !status || !gender || !dob || !phone || !address) {
    showNotification("All fields are required!", 4000);
    return;
  }

  const statusIcon =
    status === "Under Treatment"
      ? "images/allergy.png"
      : "images/picky eater.png"; 

  
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="checkbox"></td>
    <td>${generateRandomID()}</td>
    <td>${petName}</td>
    <td><img src="${statusIcon}" alt="Status" class="icon"></td>
    <td>${parent}</td>
    <td>${breed}</td>
    <td>${gender}</td>
    <td>${dob}</td>
    <td>${phone}</td>
    <td>${address}</td>
    <td>
      <button class="action-btn-edit">Edit</button>
      <button class="action-btn-delete">Delete</button>
    </td>
  `;
  tableBody.appendChild(newRow);

  // Add event listeners for edit and delete buttons
  newRow.querySelector(".action-btn-edit").addEventListener("click", () => {
    currentEditRow = newRow;
    document.querySelector("#pet-name").value = petName;
    document.querySelector("#modal-status").value = status;
    document.querySelector("#parent").value = parent;
    document.querySelector("#modal-breed").value = breed;
    document.querySelector(`input[name="gender"][value="${gender}"]`).checked = true;
    document.querySelector("#dob").value = dob;
    document.querySelector("#phone").value = phone;
    document.querySelector("#address").value = address;
    saveBtn.classList.add("hidden"); 
    updateBtn.classList.remove("hidden"); 
    modal.classList.remove("hidden");
  });

  newRow.querySelector(".action-btn-delete").addEventListener("click", () => {
    currentDeleteRow = newRow;
    openDeleteModal();
  });

  showNotification("Patient added successfully!");
  modal.classList.add("hidden");
  document.querySelector("#patient-form").reset();
});

// Event listener for Update button (edit existing patient)
updateBtn.addEventListener("click", () => {
  const petName = document.querySelector("#pet-name").value;
  const status = document.querySelector("#modal-status").value;
  const parent = document.querySelector("#parent").value;
  const breed = document.querySelector("#modal-breed").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const dob = document.querySelector("#dob").value;
  const phone = document.querySelector("#phone").value;
  const address = document.querySelector("#address").value;

  // Validate form data
  if (!petName || !parent || !breed || !status || !gender || !dob || !phone || !address) {
    showNotification("All fields are required!", 4000);
    return;
  }

  const statusIcon =
    status === "Under Treatment"
      ? "images/allergy.png"
      : "images/picky eater.png";

  currentEditRow.children[2].textContent = petName;
  currentEditRow.children[3].innerHTML = `<img src="${statusIcon}" alt="Status" class="icon">`;
  currentEditRow.children[4].textContent = parent;
  currentEditRow.children[5].textContent = breed;
  currentEditRow.children[6].textContent = gender;
  currentEditRow.children[7].textContent = dob;
  currentEditRow.children[8].textContent = phone;
  currentEditRow.children[9].textContent = address;

  showNotification("Patient successfully updated!");
  modal.classList.add("hidden");
  document.querySelector("#patient-form").reset();
});

const patientTable = document.getElementById('patient-table');
const filterSelect = document.getElementById('filter');
const BreedSelect = document.getElementById('breed-filter');
const searchInput = document.getElementById('search');

// Filter by status
filterSelect.addEventListener('change', () => {
  const filterValue = filterSelect.value;
  const rows = patientTable.querySelectorAll('tr');

  rows.forEach(row => {
      const status = row.cells[3].textContent;
      row.style.display = filterValue === '' || status === filterValue ? '' : 'none';
  });
});

// Filter by breed
BreedSelect.addEventListener('change', () => {
  const breedValue = BreedSelect.value;
  const rows = patientTable.querySelectorAll('tr');

  rows.forEach(row => {
      const breed = row.cells[5].textContent;
      row.style.display = breedValue === '' || breed === breedValue ? '' : 'none';
  });
});

// Search functionality
searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase();
  const rows = patientTable.querySelectorAll('tr');

  rows.forEach(row => {
      const Petname = row.cells[2].textContent.toLowerCase();
      const Parentname = row.cells[4].textContent.toLowerCase();
      const Gender = row.cells[6].textContent.toLowerCase();
      const DOB = row.cells[7].textContent.toLowerCase();
      const Contact = row.cells[8].textContent.toLowerCase();
      const Address = row.cells[9].textContent.toLowerCase();
      row.style.display = Petname.includes(searchValue) || Parentname.includes(searchValue) || Gender.includes(searchValue) || DOB.includes(searchValue) || Contact.includes(searchValue) || Address.includes(searchValue) ? '' : 'none';
  });
});

// Initialize table row listeners on page load
attachRowListeners();