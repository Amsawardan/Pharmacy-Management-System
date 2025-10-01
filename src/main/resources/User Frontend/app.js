const API_BASE = "http://localhost:8081/user";
const output = document.getElementById("output");
const formArea = document.getElementById("form-area");

// ================== CREATE ==================
function showCreateForm() {
    formArea.innerHTML = `
        <h3>Create New User</h3>
        <form id="createForm">
            <input type="text" id="userName" placeholder="Name" required>
            <input type="email" id="userEmail" placeholder="Email" required>
            <input type="password" id="userPassword" placeholder="Password" required>
            <input type="text" id="userAddress" placeholder="Address" required>
            <button type="submit">Create User</button>
        </form>
    `;

    document.getElementById("createForm").onsubmit = function(e) {
        e.preventDefault();

        const newUser = {
            name: document.getElementById("userName").value,
            email: document.getElementById("userEmail").value,
            password: document.getElementById("userPassword").value,
            address: document.getElementById("userAddress").value
        };

        fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
        .then(res => res.ok ? "✅ User created successfully!" : "❌ Error creating user")
        .then(msg => {
            output.innerText = msg;
            formArea.innerHTML = "";
        })
        .catch(err => output.innerText = "❌ " + err);
    };
}

// ================== READ ==================
function showReadForm() {
    formArea.innerHTML = `
        <h3>Read Users</h3>
        <form id="readForm">
            <input type="number" id="readId" placeholder="User ID (leave empty for all)">
            <button type="submit">Fetch</button>
        </form>
    `;

    document.getElementById("readForm").onsubmit = function(e) {
        e.preventDefault();
        const id = document.getElementById("readId").value.trim();
        const url = id ? `${API_BASE}/${id}` : API_BASE;

        fetch(url)
        .then(res => res.json())
        .then(data => {
            output.innerHTML = "<h3>📋 Result:</h3>";

            if (!data || (Array.isArray(data) && data.length === 0)) {
                output.innerHTML += "<p>No data found.</p>";
                return;
            }

            const users = Array.isArray(data) ? data : [data];
            users.forEach(user => {
                output.innerHTML += `
                    <div class="user-card">
                        <div>
                            <strong>ID:</strong> ${user.id} |
                            <strong>Name:</strong> ${user.name} |
                            <strong>Email:</strong> ${user.email} |
                            <strong>Address:</strong> ${user.address}
                        </div>
                        <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
                    </div>
                `;
            });
        })
        .catch(err => output.innerText = "❌ " + err);
    };
}

// ================== UPDATE ==================
function showUpdateForm() {
    formArea.innerHTML = `
        <h3>Update User</h3>
        <form id="updateForm">
            <input type="number" id="updateId" placeholder="User ID" required>
            <input type="text" id="updateName" placeholder="New Name" required>
            <input type="email" id="updateEmail" placeholder="New Email" required>
            <input type="password" id="updatePassword" placeholder="New Password" required>
            <input type="text" id="updateAddress" placeholder="New Address" required>
            <button type="submit">Update User</button>
        </form>
    `;

    document.getElementById("updateForm").onsubmit = function(e) {
        e.preventDefault();

        const updatedUser = {
            id: parseInt(document.getElementById("updateId").value),
            name: document.getElementById("updateName").value,
            email: document.getElementById("updateEmail").value,
            password: document.getElementById("updatePassword").value,
            address: document.getElementById("updateAddress").value
        };

        fetch(API_BASE, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.ok ? "✅ User updated successfully!" : "❌ Error updating user")
        .then(msg => {
            output.innerText = msg;
            formArea.innerHTML = "";
        })
        .catch(err => output.innerText = "❌ " + err);
    };
}

// ================== DELETE ==================
function showDeleteForm() {
    formArea.innerHTML = `
        <h3>Delete User</h3>
        <form id="deleteForm">
            <input type="number" id="deleteId" placeholder="User ID" required>
            <button type="submit" class="delete">Delete User</button>
        </form>
    `;

    document.getElementById("deleteForm").onsubmit = function(e) {
        e.preventDefault();
        const id = document.getElementById("deleteId").value;

        deleteUser(id);
    };
}

// helper function (used in form + read list)
function deleteUser(id) {
    fetch(`${API_BASE}/${id}`, {
        method: "DELETE"
    })
    .then(res => res.ok ? "✅ User deleted successfully!" : "❌ Error deleting user")
    .then(msg => {
        output.innerText = msg;
        formArea.innerHTML = "";
    })
    .catch(err => output.innerText = "❌ " + err);
}
