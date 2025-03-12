let orders = JSON.parse(localStorage.getItem('orders')) || [];
const adminPassword = "123321";

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
    localStorage.setItem('orders', JSON.stringify(orders)); // Simpan ke localStorage
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

// Tambahkan info kontak di halaman Order Jasa
document.addEventListener("DOMContentLoaded", () => {
    const orderSection = document.getElementById('order');
    if (orderSection) {
        const contactInfo = document.createElement("div");
        contactInfo.innerHTML = `
            <p>Untuk info lebih lanjut, hubungi:</p>
            <p>📞 WhatsApp: <a href='tel:+6281818160725'>+62 8181 8160 725</a></p>
            <p>📸 Instagram: <a href='https://instagram.com/divzz_neverlouse' target='_blank'>@Divzz</a></p>
        `;
        orderSection.appendChild(contactInfo);
    }
});
