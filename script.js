let orders = [];
const adminPassword = "123321s"; // Ubah password di sini

function showPage(page) {
    document.getElementById('home').style.display = (page === 'home') ? 'block' : 'none';
    document.getElementById('order').style.display = (page === 'order') ? 'block' : 'none';
    document.getElementById('adminPanel').style.display = (page === 'admin') ? 'block' : 'none';
}

function submitOrder() {
    const service = document.getElementById('service').value;
    const details = document.getElementById('details').value;

    if (details.trim() === "") {
        document.getElementById('orderStatus').textContent = "Harap isi detail pesanan Anda!";
        return;
    }

    orders.push({ service, details });
    document.getElementById('details').value = "";
    document.getElementById('orderStatus').textContent = `Pesanan untuk ${service} telah dikirim!`;
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
        orderList.innerHTML = "<h3>Daftar Pesanan:</h3>";
        if (orders.length === 0) {
            orderList.innerHTML += "<p>Tidak ada pesanan.</p>";
        } else {
            orders.forEach((order, index) => {
                const orderItem = document.createElement("li");
                orderItem.textContent = `(${index + 1}) ${order.service} - ${order.details}`;
                orderList.appendChild(orderItem);
            });
        }
    } else {
        alert("Password salah!");
    }
}

function logoutAdmin() {
    document.getElementById('adminPass').value = "";
    document.getElementById('orderList').innerHTML = "";
    showPage('home');
}
