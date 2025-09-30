const API_BASE = "http://localhost:8080/User";
const output = document.getElementById("output");
const formArea = document.getElementById("form-area");

// CREATE
function showCreateForm() {
    formArea.innerHTML = `
        <h3>Create New User</h3>
        <form id="createForm">
            <input type="number" id="userId" placeholder="User ID" required />
            <input type="text" id="userName" placeholder="Name" required />
            <input type="email" id="userEmail" placeholder="Email" required />
            <input type="password" id="userPassword" placeholder="Password" required />
            <input type="text" id="userAddress" placeholder="Address" required />
            <button type="submit">Create User</button>
        </form>
    `;
    document.getElementById("createForm").onsubmit = function(e) {
        e.preventDefault();
        const newUser = {
            id: parseInt(document.getElementById("userId").value),
            name: document.getElementById("userName").value,
            email: document.getElementById("userEmail").value,
            password: document.getElementById("userPassword").value,
            address: document.getElementById("userAddress").value
        };
        fetch(API_BASE, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        }).then(res => {
            output.innerText = res.ok ? "User created successfully!" : "Error creating user.";
            formArea.innerHTML = "";
        }).catch(err => {
            output.innerText = err;
        });
    };
}

// READ
function showReadForm() {
    formArea.innerHTML = `
        <h3>Read Users</h3>
        <form id="readForm">
            <input type="number" id="readId" placeholder="User ID (leave empty for all)" />
            <button type="submit">Fetch</button>
        </form>
    `;
    document.getElementById("readForm").onsubmit = function(e) {
        e.preventDefault();
        const id = document.getElementById("readId").value.trim();
        const url = id ? `${API_BASE}/${id}` : API_BASE;
        fetch(url).then(res => res.json()).then(data => {
            output.innerHTML = `<h3>Result</h3>`;
            if (!data || (Array.isArray(data) && data.length === 0)) {
                output.innerHTML += "<p>No data found.</p>";
                return;
            }
            const users = Array.isArray(data) ? data : [data];
            users.forEach(user => {
                output.innerHTML += `
                    <div>
                        <strong>ID:</strong> ${user.id}<br>
                        <strong>Name:</strong> ${user.name}<br>
                        <strong>Email:</strong> ${user.email}<br>
                        <strong>Password:</strong> ${user.password}<br>
                        <strong>Address:</strong> ${user.address}<br>
                    </div><hr>
                `;
            });
        }).catch(err => {
            output.innerText = err;
        });
    };
}

// DELETE
function showDeleteForm() {
    formArea.innerHTML = `
        <h3>Delete User</h3>
        <form id="deleteForm">
            <input type="number" id="deleteId" placeholder="User ID" required />
            <button type="submit">Delete User</button>
        </form>
    `;
    document.getElementById("deleteForm").onsubmit = function(e) {
        e.preventDefault();
        const id = parseInt(document.getElementById("deleteId").value);
        fetch(`${API_BASE}/${id}`, {
            method: "DELETE"
        }).then(res => {
            output.innerText = res.ok ? `User ${id} deleted successfully!` : "Error deleting user.";
            formArea.innerHTML = "";
        }).catch(err => {
            output.innerText = err;
        });
    };
}
