// Function to load saved data from local storage
function loadAndDisplaySavedData() {
  const savedOrders = JSON.parse(localStorage.getItem('Todos')) || [];
  const submittedDataDiv = document.getElementById('submittedData');

  savedOrders.forEach(order => {
      const dataContainer = document.createElement('div');
      dataContainer.classList.add('order');
      dataContainer.innerHTML = `
          <p class="user">Username: ${order.username}</p>
          <p class="order-name">Todo Item: ${order.orderName}</p>
          <p class="order-date">Start Date: ${order.orderDate}</p>
          <span class="btns edit">Edit<span class="bg"></span><span class="bg bg2"></span><span class="bg1"></span><span class="bg1 bg3"></span></span>
      <span class="btns delete">Delete<span class="bg"></span><span class="bg bg2"></span><span class="bg1"></span><span class="bg1 bg3"></span></span>
          <hr>
      `;
      submittedDataDiv.appendChild(dataContainer);
  });
}

// Call loadAndDisplaySavedData when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  loadAndDisplaySavedData();
});

// Function to handle form submission
document.getElementById('bakeryForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get input values
  const username = document.getElementById('username').value;
  const orderName = document.getElementById('orderName').value;
  const startDate = document.getElementById('orderDate').value;

  // Check for empty fields
  if (username === '' || orderName === '' || startDate === '') {
      alert('Fields cannot be empty');
      return;
  }

  // Create a new order container
  const submittedDataDiv = document.getElementById('submittedData');
  const dataContainer = document.createElement('div');
  dataContainer.classList.add('order');
  dataContainer.innerHTML = `
      <p class="user">Username: ${username}</p>
      <p class="order-name">Todo Item: ${orderName}</p>
      <p class="order-date">Start Date: ${startDate}</p>
      <button class="btn delete">Delete</button>
      <span class="btns edit">Edit<span class="bg"></span><span class="bg bg2"></span><span class="bg1"></span><span class="bg1 bg3"></span></span>
      <span class="btns delete">Delete<span class="bg"></span><span class="bg bg2"></span><span class="bg1"></span><span class="bg1 bg3"></span></span>
      <hr>
  `;
  submittedDataDiv.appendChild(dataContainer);

  // Clear the form
  event.target.reset();

  // Save new order to local storage
  saveOrdersToLocalStorage();
});

// Function to save orders to local storage
function saveOrdersToLocalStorage() {
  const orders = [];
  const orderElements = document.querySelectorAll('.order');

  orderElements.forEach(order => {
      const username = order.querySelector('.user').textContent.split(': ')[1];
      const orderName = order.querySelector('.order-name').textContent.split(': ')[1];
      const orderDate = order.querySelector('.order-date').textContent.split(': ')[1];
      orders.push({ username, orderName, orderDate });
  });

  localStorage.setItem('Todos', JSON.stringify(orders));
}

// Function to delete order
function deleteData(event) {
  const order = event.target.closest('.order');
  order.remove();
  saveOrdersToLocalStorage();
}

// Function to handle editing of data
function editData(event) {
  const target = event.target;
  const order = target.closest('.order');
  const editButton = order.querySelector('.edit');

  if (editButton.textContent === 'Edit') {
      // Switch to edit mode
      const fields = order.querySelectorAll('p:not(.order-date)');

      fields.forEach(field => {
          const text = field.textContent.split(': ')[1].trim();
          const label = field.textContent.split(': ')[0].trim(); // Extract label from text
          const input = document.createElement('input');
          input.value = text;
          field.textContent = ''; // Clear existing content
          field.appendChild(input); // Append input field
          field.dataset.label = label; // Store label in dataset
      });

      editButton.textContent = 'Save'; // Change button text to "Save"
  } else {
      // Save changes and switch to display mode
      const inputs = order.querySelectorAll('input');

      inputs.forEach(input => {
          const field = input.parentElement;
          const label = field.dataset.label || field.textContent.split(': ')[0].trim(); // Use text content as label if dataset label is undefined
          const newValue = input.value;

          // Update the UI with the new value
          field.textContent = `${label}: ${newValue}`;
      });

      editButton.textContent = 'Edit'; // Change button text back to "Edit"
      saveOrdersToLocalStorage(); // Save changes to local storage
  }
}


// Add event listeners for delete and edit buttons
document.getElementById('submittedData').addEventListener('click', function(event) {
  if (event.target.classList.contains('delete')) {
      deleteData(event);
  } else if (event.target.classList.contains('edit')) {
      editData(event);
  }
});
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the search query
    const searchInput = document.getElementById("searchInput").value.toLowerCase().trim();

    // Get all order elements
    const orderElements = document.querySelectorAll(".order");

    // Loop through each order element
    orderElements.forEach(order => {
        const username = order.querySelector(".user").textContent.toLowerCase();
        const orderName = order.querySelector(".order-name").textContent.toLowerCase();
        const orderDate = order.querySelector(".order-date").textContent.toLowerCase();

        // Check if any field matches the search query
        const match = username.includes(searchInput) || orderName.includes(searchInput) || orderDate.includes(searchInput);

        // Show or hide the order element based on the match
        if (match) {
            order.style.display = "block"; // Show the order element
        } else {
            order.style.display = "none"; // Hide the order element
        }
    });
});

