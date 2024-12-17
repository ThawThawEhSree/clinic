// Get DOM elements
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const petnameInput = document.getElementById('petname');
const statusInput = document.getElementById('status');
const parentnameInput = document.getElementById('parentname');
const breedInput = document.getElementById('breed');
const genderInput = document.getElementById('gender');
const dobInput = document.getElementById('dob');
const addressInput = document.getElementById('address');
const contactInput = document.getElementById('contact');
const patientTable = document.querySelector('#patientTable tbody');
const filterSelect = document.getElementById('filter');
const BreedSelect = document.getElementById('breed-filter');
const searchInput = document.getElementById('search');
const alertBox = document.getElementById('alertBox');
const rowperpage = document.getElementById('rowsPerPage');

let isEditing = false;
let currentRow = null;
let currentPage = 1;

// Show modal
openModalBtn.addEventListener('click', () => {
    isEditing = false;
    modal.style.display = 'flex';
    document.getElementById('modalTitle').innerText = 'Add New Client';
    clearInputs();
});

// Close modal
cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Save data (Add/Edit)
saveBtn.addEventListener('click', () => {
    const petname = petnameInput.value.trim();
    const status = statusInput.value;
    const parentname = parentnameInput.value.trim();
    const breed = breedInput.value;
    const gender = genderInput.value;
    const dob = dobInput.value;
    const address = addressInput.value.trim();
    const contact = contactInput.value.trim(); 

    if (!petname || !parentname || !dob || !address || !contact ) {
        showAlert('Please fill out all fields.', 'alert-danger');
        return;
    }

    if (isEditing && currentRow) {
        // Update existing row
        currentRow.innerHTML = `
            <td>${Date.now()}</td>
            <td>${petname}</td>
            <td>${status}</td>
            <td>${parentname}</td>
            <td>${breed}</td>
            <td>${gender}</td>
            <td>${dob}</td>
            <td>${address}</td>
            <td>${contact}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;
        showAlert('Client updated successfully.', 'alert-success');
    } else {
        // Add new row
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${Date.now()}</td>
            <td>${petname}</td>
            <td>${status}</td>
            <td>${parentname}</td>
            <td>${breed}</td>
            <td>${gender}</td>
            <td>${dob}</td>
            <td>${address}</td>
            <td>${contact}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;
        patientTable.appendChild(newRow);
        showAlert('Client added successfully.', 'alert-success');
    }

    modal.style.display = 'none';
    attachRowListeners();
    clearInputs();
    renderPagination();
});

// Render pagination buttons
function renderPagination() {
    paginationDiv.innerHTML = '';
    const totalPages = Math.ceil(patients.length / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = i === currentPage ? 'active' : '';
        button.addEventListener('click', () => {
            currentPage = i;
            renderTable();
        });
        paginationDiv.appendChild(button);
    }
}

// Attach edit/delete listeners to table rows
function attachRowListeners() {
    const editButtons = document.querySelectorAll('.edit');
    const deleteButtons = document.querySelectorAll('.delete');

    editButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentRow = e.target.parentElement.parentElement;
            isEditing = true;
            modal.style.display = 'flex';
            document.getElementById('modalTitle').innerText = 'Edit Client';

            // Pre-fill inputs
            petnameInput.value = currentRow.cells[1].textContent;
            statusInput.value = currentRow.cells[2].textContent;
            parentnameInput.value = currentRow.cells[3].textContent;
            breedInput.value = currentRow.cells[4].textContent;
            genderInput.value = currentRow.cells[5].textContent;
            dobInput.value = currentRow.cells[6].textContent;
            addressInput.value = currentRow.cells[7].textContent;
            contactInput.value = currentRow.cells[8].textContent;  
        });
    });

    deleteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove();
            showAlert('Client deleted successfully.', 'alert-success');
        });
    });
}

// Clear input fields
function clearInputs() {
    petnameInput.value = '';
    statusInput.value = '';
    parentnameInput.value = '';
    breedInput.value = '';
    genderInput.value = '';
    dobInput.value = '';
    addressInput.value = '';
    contactInput.value = '';
}

// Show alert
function showAlert(message, className) {
    alertBox.textContent = message;
    alertBox.className = className;
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

// Filter by status
filterSelect.addEventListener('change', () => {
    const filterValue = filterSelect.value;
    const rows = patientTable.querySelectorAll('tr');

    rows.forEach(row => {
        const status = row.cells[2].textContent;
        row.style.display = filterValue === '' || status === filterValue ? '' : 'none';
    });
});

// Filter by breed
BreedSelect.addEventListener('change', () => {
    const breedValue = BreedSelect.value;
    const rows = patientTable.querySelectorAll('tr');

    rows.forEach(row => {
        const breed = row.cells[4].textContent;
        row.style.display = breedValue === '' || breed === breedValue ? '' : 'none';
    });
});

// Search functionality
searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    const rows = patientTable.querySelectorAll('tr');

    rows.forEach(row => {
        const Petname = row.cells[1].textContent.toLowerCase();
        const Parentname = row.cells[3].textContent.toLowerCase();
        const Gender = row.cells[5].textContent.toLowerCase();
        const DOB = row.cells[6].textContent.toLowerCase();
        const Address = row.cells[7].textContent.toLowerCase();
        const Contact = row.cells[8].textContent.toLowerCase();
        row.style.display = Petname.includes(searchValue) || Parentname.includes(searchValue) || Gender.includes(searchValue) || DOB.includes(searchValue) || Address.includes(searchValue) || Contact.includes(searchValue) ? '' : 'none';
    });
});

// Initialize table row listeners on page load
attachRowListeners();
