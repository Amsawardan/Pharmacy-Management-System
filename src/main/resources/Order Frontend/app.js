// const API_BASE = "http://localhost:8081/orders";
// const output = document.getElementById("output");
// const formArea = document.getElementById("form-area");
//
// // ================== CREATE ==================
// function showCreateForm() {
//     formArea.innerHTML = `
//         <h3>Create New Order</h3>
//         <form id="createForm">
//             <input type="text" id="orderName" placeholder="Order Name" required>
//             <input type="number" id="orderVal" placeholder="Order Value" required>
//             <input type="number" id="orderQuantity" placeholder="Order Quantity" required>
//             <button type="submit">Create Order</button>
//         </form>
//     `;
//
//     document.getElementById("createForm").onsubmit = function(e) {
//         e.preventDefault();
//
//         const newOrder = {
//             orderName: document.getElementById("orderName").value,
//             orderVal: parseInt(document.getElementById("orderVal").value),
//             orderQuantity: parseInt(document.getElementById("orderQuantity").value)
//         };
//
//         fetch(API_BASE, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(newOrder)
//         })
//         .then(res => res.ok ? "✅ Order created successfully!" : "❌ Error creating order")
//         .then(msg => {
//             output.innerText = msg;
//             formArea.innerHTML = "";
//         })
//         .catch(err => output.innerText = "❌ " + err);
//     };
// }
//
// // ================== READ ==================
// function showReadForm() {
//     formArea.innerHTML = `
//         <h3>Read Orders</h3>
//         <form id="readForm">
//             <input type="number" id="readId" placeholder="Order ID (leave empty for all)">
//             <button type="submit">Fetch</button>
//         </form>
//     `;
//
//     document.getElementById("readForm").onsubmit = function(e) {
//         e.preventDefault();
//         const id = document.getElementById("readId").value.trim();
//
//         const url = id ? `${API_BASE}/${id}` : API_BASE;
//
//         fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             output.innerHTML = "<h3>📋 Result:</h3>";
//
//             if (!data || (Array.isArray(data) && data.length === 0)) {
//                 output.innerHTML += "<p>No data found.</p>";
//                 return;
//             }
//
//             const orders = Array.isArray(data) ? data : [data];
//             orders.forEach(order => {
//                 output.innerHTML += `
//                     <div>
//                         <strong>ID:</strong> ${order.orderId} |
//                         <strong>Name:</strong> ${order.orderName} |
//                         <strong>Value:</strong> ${order.orderVal} |
//                         <strong>Quantity:</strong> ${order.orderQuantity}
//                     </div>
//                     <hr>
//                 `;
//             });
//         })
//         .catch(err => output.innerText = "❌ " + err);
//     };
// }
//
// // ================== UPDATE ==================
// function showUpdateForm() {
//     formArea.innerHTML = `
//         <h3>Update Order</h3>
//         <form id="updateForm">
//             <input type="number" id="updateId" placeholder="Order ID" required>
//             <input type="text" id="updateName" placeholder="New Order Name" required>
//             <input type="number" id="updateVal" placeholder="New Order Value" required>
//             <input type="number" id="updateQuantity" placeholder="New Quantity" required>
//             <button type="submit">Update Order</button>
//         </form>
//     `;
//
//     document.getElementById("updateForm").onsubmit = function(e) {
//         e.preventDefault();
//         const updatedOrder = {
//             orderId: parseInt(document.getElementById("updateId").value),
//             orderName: document.getElementById("updateName").value,
//             orderVal: parseInt(document.getElementById("updateVal").value),
//             orderQuantity: parseInt(document.getElementById("updateQuantity").value)
//         };
//
//         fetch(API_BASE, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(updatedOrder)
//         })
//         .then(res => res.ok ? "✅ Order updated successfully!" : "❌ Error updating order")
//         .then(msg => {
//             output.innerText = msg;
//             formArea.innerHTML = "";
//         })
//         .catch(err => output.innerText = "❌ " + err);
//     };
// }
//
// // ================== DELETE ==================
// function showDeleteForm() {
//     formArea.innerHTML = `
//         <h3>Delete Order</h3>
//         <form id="deleteForm">
//             <input type="number" id="deleteId" placeholder="Order ID" required>
//             <button type="submit">Delete Order</button>
//         </form>
//     `;
//
//     document.getElementById("deleteForm").onsubmit = function(e) {
//         e.preventDefault();
//         const id = parseInt(document.getElementById("deleteId").value);
//
//         fetch(`${API_BASE}/${id}`, { method: "DELETE" })
//         .then(res => res.ok ? `✅ Order ${id} deleted successfully!` : "❌ Error deleting order")
//         .then(msg => {
//             output.innerText = msg;
//             formArea.innerHTML = "";
//         })
//         .catch(err => output.innerText = "❌ " + err);
//     };
// }