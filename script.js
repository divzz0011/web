let orders = JSON.parse(localStorage.getItem('orders')) || [];
const adminPassword = "123321";

function showPage(page) {
    document.getElementById('home').style.display = (page === 'home') ? 'block' : 'none';
    document.getElementById('order').style.display = (page === 'order') ? 'block' : 'none';
    document.getElementById('adminPanel').style.display = (page === 'admin') ? 'block' : 'none';
}

function submitOrder() {
    const name = document.getElementById('name').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const service = document.getElementById('service').value;
    const details = document.getElementById('details').value.trim().replace(/\n/g, '<br>');
    const orderStatus = document.getElementById('orderStatus');

    if (name === "" || whatsapp === "" || details === "") {
        orderStatus.innerHTML = "⚠️ Harap isi semua data dengan benar!";
        orderStatus.style.color = "red";
        return;
    }

    orders.push({ name, whatsapp, service, details, status: "Pending" });
    localStorage.setItem('orders', JSON.stringify(orders));

    document.getElementById('orderForm').reset();
    orderStatus.innerHTML = `<span style="color: green; font-weight: bold;">✔ Pesanan untuk ${service} telah dikirim!</span>`;
    showNotification("Pesanan baru telah dibuat!");
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

function checkAdminAccess() {
    const inputPass = document.getElementById('adminPass').value;
    const orderList = document.getElementById('orderList');

    if (inputPass === adminPassword) {
        orderList.innerHTML = "<h3>📋 Daftar Pesanan:</h3>";
        if (orders.length === 0) {
            orderList.innerHTML += "<p style='color: gray;'>Tidak ada pesanan.</p>";
        } else {
            const orderTable = document.createElement("table");
            orderTable.style.width = "100%";
            orderTable.style.borderCollapse = "collapse";
            orderTable.innerHTML = `
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>WhatsApp</th>
                    <th>Jasa</th>
                    <th>Detail</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            `;
            orders.forEach((order, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${order.name}</td>
                    <td><a href="https://wa.me/${order.whatsapp}" target="_blank">${order.whatsapp}</a></td>
                    <td>${order.service}</td>
                    <td>${order.details}</td>
                    <td style="color: ${order.status === "Selesai" ? "green" : "red"};">${order.status}</td>
                    <td>
                        <button onclick="markAsCompleted(${index})" style='background: green; color: white;'>Selesai</button>
                        <button onclick="deleteOrder(${index})" style='background: red; color: white;'>Hapus</button>
                    </td>
                `;
                orderTable.appendChild(row);
            });
            orderList.appendChild(orderTable);
        }
    } else {
        alert("Password salah!");
    }
}

function markAsCompleted(index) {
    orders[index].status = "Selesai";
    localStorage.setItem('orders', JSON.stringify(orders));
    checkAdminAccess();
}

function deleteOrder(index) {
    if (confirm("Apakah Anda yakin ingin menghapus pesanan ini?")) {
        orders.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        checkAdminAccess();
    }
}

function logoutAdmin() {
    document.getElementById('adminPass').value = "";
    document.getElementById('orderList').innerHTML = "";
    showPage('home');
}

// Tambahkan info kontak di halaman Order Jasa
document.addEventListener("DOMContentLoaded", () => {
    const orderSection = document.getElementById('order');
    if (orderSection) {
        const contactInfo = document.createElement("div");
        contactInfo.style.marginTop = "20px";
        contactInfo.innerHTML = `
            <p><strong>📞 Untuk info lebih lanjut, hubungi:</strong></p>
            <p>📞 WhatsApp: <a href='tel:+6281818160725'>+62 8181 8160 725</a></p>
            <p>📸 Instagram: <a href='https://instagram.com/divzz_neverlouse' target='_blank'>@Divzz</a></p>
        `;
        orderSection.appendChild(contactInfo);
    }
});
