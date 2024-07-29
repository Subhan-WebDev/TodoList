document.getElementById('bakeryForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission
  // Get input values
  const username = document.getElementById('username').value;
  const orderName = document.getElementById('orderName').value;
  // const quantity = document.getElementById('quantity').value;
  const startDate = document.getElementById('orderDate').value;
  if (username == "" || orderName == "" || startDate == "" ){
      alert('Filed cannot be empty')
  }  
  else{     
    
      const submittedDataDiv = document.getElementById('submittedData');
      const dataContainer = document.createElement('div');
      dataContainer.classList.add("order")
      dataContainer.innerHTML = `<p class = "user">Username: ${username}</p>
      <p class = "order-name">Todo Item: ${orderName}</p>
      <p class = "order-date">Start Date: ${startDate}</p>`;
      dataContainer.classList.add('containers');
      submittedDataDiv.appendChild(dataContainer);
      
      // Create buttons for delete, edit, and export
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('btn');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click',deleteData);
        dataContainer.appendChild(deleteButton);
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn');
        editButton.classList.add('Edit');
        editButton.addEventListener('click', editData);
          dataContainer.appendChild(editButton);
          
          const exportButton = document.createElement('button');
          exportButton.textContent = 'Export';
          exportButton.classList.add('btn');
          // exportButton.addEventListener('click', exportData);
          dataContainer.appendChild(exportButton);
          
          const line = document.createElement('hr');
          dataContainer.appendChild(line);
          
          this.reset(); // Reset the for
          saveOrdersToLocalStorage()
        }
      }
      );
      function saveOrdersToLocalStorage() {
        const orders = [];
        const orderElements = document.querySelectorAll(".order");
        console.log(orderElements)
        orderElements.forEach(order => {
          const username = order.querySelector(".user").textContent.split(": ")[1];
          const orderName = order.querySelector(".order-name").textContent.split(": ")[1];
          const orderDate = order.querySelector(".order-date").textContent.split(": ")[1];
          orders.push({ username, orderName, orderDate });
        });
        localStorage.setItem("Todos", JSON.stringify(orders));
      }
      function deleteData(event) {
        const target = event.target;
        const order = target.closest(".order");
      order.remove();
      saveOrdersToLocalStorage();
      }

      function editData(event) {
        const target = event.target;
        const order = target.closest(".order")
    const fields = order.querySelectorAll('p');

    // Check if the data entry is in edit mode
    const isInEditMode = order.dataset.editMode === 'true';

    if (isInEditMode) {
        // If already in edit mode, save the changes back to <p> elements
        fields.forEach(field => {
            const input = field.querySelector('input');
            const button = field.querySelector('.Edit');
            if (input) {
                // Get the label and new value from the input field
                const label = field.dataset.label;
                const newValue = input.value;

                // Update the corresponding value in the data object

                // Update the UI with the new value
                field.textContent = `${label}: ${newValue}`;
                
            }
        });

        // Update local storage with the updated data
      saveOrdersToLocalStorage();
        order.dataset.editMode = 'false'; // Exit edit mode
        
    } else {
        // If not in edit mode, switch to edit mode
        fields.forEach(field => {
            const text = field.textContent;
            const [label, value] = text.split(': '); // Split label and value
            const input = document.createElement('input');
            input.value = value.trim();
            field.textContent = ''; // Clear existing content
            field.appendChild(input); // Append input field
            field.dataset.label = label.trim(); // Store label in dataset
        });

        order.dataset.editMode = 'true'; // Set edit mode flag
    }
}

// Function to update local storage with the updated data
// Function to delete data from local storage
// // Function to edit data in local storage
// function editData(dataContainer, newData) {
//   // Your edit functionality to update the UI and local storage
// }

// // Function to delete data from UI
// function deleteData(dataContainer) {
//   // Your delete functionality to remove the data entry from UI
// }
