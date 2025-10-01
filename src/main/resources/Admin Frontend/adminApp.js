const API_BASE = "http://localhost:8081/admin";  
const output = document.getElementById("output");
const formArea = document.getElementById("form-area");

// ================== CREATE ==================
function showCreateForm() {
    formArea.innerHTML = `
        <h3><b>Create New Admin</b></h3>
        <form id="createForm">
            <input type="text" id="fullName" placeholder="Full Name" required>
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <select id="role" required>
                <option value="">Select Role</option>
                <option value="ADMIN">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
                <option value="STAFF">STAFF</option>
            </select>
            <button type="submit">Create Admin</button>
        </form>
    `;

    document.getElementById("createForm").onsubmit = function(e) {
        e.preventDefault();

        const newAdmin = {
            fullName: document.getElementById("fullName").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            role: document.getElementById("role").value
        };

        fetch(`${API_BASE}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAdmin)
        })
        .then(res => res.ok ? "✅ Admin created successfully!" : "❌ Error creating admin")
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
        <h3>Read Admins</h3>
        <form id="readForm">
            <input type="number" id="readId" placeholder="Admin ID (leave empty for all)">
            <button type="submit">Fetch</button>
        </form>
    `;

    document.getElementById("readForm").onsubmit = function(e) {
        e.preventDefault();
        const id = document.getElementById("readId").value.trim();
        const url = id ? `${API_BASE}/${id}` : `${API_BASE}/all`;

        fetch(url)
        .then(res => res.json())
        .then(data => {
            output.innerHTML = "<h3>📋 Admins:</h3>";

            if (!data || (Array.isArray(data) && data.length === 0)) {
                output.innerHTML += "<p>No admins found.</p>";
                return;
            }

            const admins = Array.isArray(data) ? data : [data];

            let table = `
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
            `;

            admins.forEach(admin => {
                table += `
                    <tr>
                        <td>${admin.staffID}</td>
                        <td>${admin.fullName}</td>
                        <td>${admin.username}</td>
                        <td>${admin.role}</td>
                    </tr>
                `;
            });

            table += "</table>";
            output.innerHTML += table;
        })
        .catch(err => output.innerText = "❌ " + err);
    };
}

// ================== UPDATE ==================
function showUpdateForm() {
    formArea.innerHTML = `
        <h3>Update Admin</h3>
        <form id="updateForm">
            <input type="number" id="updateId" placeholder="Admin ID" required>
            <input type="text" id="updateFullName" placeholder="New Full Name" required>
            <input type="text" id="updateUsername" placeholder="New Username" required>
            <input type="password" id="updatePassword" placeholder="New Password" required>
            <select id="updateRole" required>
                <option value="ADMIN">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
                <option value="STAFF">STAFF</option>
            </select>
            <button type="submit">Update Admin</button>
        </form>
    `;

    document.getElementById("updateForm").onsubmit = function(e) {
        e.preventDefault();

        const updatedAdmin = {
            staffID: parseInt(document.getElementById("updateId").value),
            fullName: document.getElementById("updateFullName").value,
            username: document.getElementById("updateUsername").value,
            password: document.getElementById("updatePassword").value,
            role: document.getElementById("updateRole").value
        };

        fetch(`${API_BASE}/update/${updatedAdmin.staffID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedAdmin)
        })
        .then(res => res.ok ? "✅ Admin updated successfully!" : "❌ Error updating admin")
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
        <h3>Delete Admin</h3>
        <form id="deleteForm">
            <input type="number" id="deleteId" placeholder="Admin ID" required>
            <button type="submit">Delete Admin</button>
        </form>
    `;

    document.getElementById("deleteForm").onsubmit = function(e) {
        e.preventDefault();
        const id = parseInt(document.getElementById("deleteId").value);

        fetch(`${API_BASE}/delete/${id}`, { method: "DELETE" })
        .then(res => res.ok ? `✅ Admin ${id} deleted successfully!` : "❌ Error deleting admin")
        .then(msg => {
            output.innerText = msg;
            formArea.innerHTML = "";
        })
        .catch(err => output.innerText = "❌ " + err);
    };
}
