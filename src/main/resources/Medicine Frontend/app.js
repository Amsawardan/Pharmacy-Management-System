const API_URL = "http://localhost:8081/api/medicines";

                                                           // Init
document.addEventListener("DOMContentLoaded", async () => {
    await loadMedicines();
    await loadLowStockMedicines();
    await loadExpiredMedicines();
});

                                                        // Add Medicine
document.getElementById("medicineForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const medicine = {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        batchNo: document.getElementById("batchNo").value,
        stock: parseInt(document.getElementById("stock").value),
        price: parseFloat(document.getElementById("price").value),
        expiryDate: document.getElementById("expiryDate").value,
        supplierId: parseInt(document.getElementById("supplierId").value),
        description: document.getElementById("description").value,
        dosageInstructions: document.getElementById("dosageInstructions").value,
        sideEffects: document.getElementById("sideEffects").value,
    };

    await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medicine)
    });

    alert("Medicine Added!");
    document.getElementById("medicineForm").reset();
    await reloadAll();
});

                                                     // Load All Medicines
async function loadMedicines() {
    const res = await fetch(`${API_URL}/list`);
    const medicines = await res.json();
    const list = document.getElementById("medicineList");
    list.innerHTML = "";
    medicines.forEach((med) => {
        const li = document.createElement("li");
        li.innerHTML = `
      <div>
        <strong>${med.name}</strong> (${med.category}) - Stock: ${med.stock}, Price: ${med.price}, Expiry: ${med.expiryDate}
      </div>
      <div class="actions">
        <button class="update-btn" onclick="updateMedicine(${med.id})">Update</button>
        <button class="delete-btn" onclick="deleteMedicine(${med.id})">Delete</button>
      </div>
    `;
        list.appendChild(li);
    });
}

                                                       // Load Low Stock
async function loadLowStockMedicines() {
    const res = await fetch(`${API_URL}/low-stock`);
    const lowStock = await res.json();
    const list = document.getElementById("lowStockList");
    list.innerHTML = "";
    lowStock.forEach((med) => list.appendChild(Object.assign(document.createElement("li"), { textContent: `${med.name} - Stock: ${med.stock}` })));
}

                                                        // Load Expired
async function loadExpiredMedicines() {
    const res = await fetch(`${API_URL}/expired`);
    const expired = await res.json();
    const list = document.getElementById("expiredList");
    list.innerHTML = "";
    expired.forEach((med) => list.appendChild(Object.assign(document.createElement("li"), { textContent: `${med.name} - Expired: ${med.expiryDate}` })));
}

                                                           // Delete
async function deleteMedicine(id) {
    if (confirm("Are you sure?")) {
        await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
        await reloadAll();
    }
}

                                            // Update (prompt-based)
async function updateMedicine(id) {
    const newStock = prompt("Enter new stock:");
    const newPrice = prompt("Enter new price:");
    if (!newStock || !newPrice) return;

    const res = await fetch(`${API_URL}/${id}`);
    const medicine = await res.json();
    medicine.stock = parseInt(newStock);
    medicine.price = parseFloat(newPrice);

    await fetch(`${API_URL}/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medicine)
    });
    alert("Medicine updated!");
    await reloadAll();
}

                                            // Get Medicine by ID
async function getMedicineById() {
    const id = document.getElementById("medicineIdInput").value;
    if (!id) return alert("Enter ID");
    const res = await fetch(`${API_URL}/${id}`);
    const med = await res.json();
    document.getElementById("medicineByIdResult").textContent = res.status === 404 ? "Medicine not found" : `${med.name} (${med.category}) - Stock: ${med.stock}, Price: ${med.price}, Expiry: ${med.expiryDate}`;
}

                                    // Reload all lists
async function reloadAll() {
    await loadMedicines();
    await loadLowStockMedicines();
    await loadExpiredMedicines();
}


