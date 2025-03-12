function showPage(page) {
    document.getElementById('home').style.display = (page === 'home') ? 'block' : 'none';
    document.getElementById('order').style.display = (page === 'order') ? 'block' : 'none';
}

function submitOrder() {
    const service = document.getElementById('service').value;
    const details = document.getElementById('details').value;
    if (details.trim() === "") {
        document.getElementById('orderStatus').textContent = "Harap isi detail pesanan Anda!";
        return;
    }
    document.getElementById('orderStatus').textContent = `Pesanan untuk ${service} telah dikirim!`;
}
