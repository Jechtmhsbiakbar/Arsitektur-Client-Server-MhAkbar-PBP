fetch("../api-toko/get_barang.php")
  .then((response) => response.json())
  .then((responseObject) => {
    const dataBarang = responseObject.data;

    const tbody = document.getElementById("isi-tabel");
    let baris = "";

    // Contoh potongan kode di dalam app.js
    dataBarang.forEach((barang, index) => {
      baris += `
        <tr>
            <td class="ps-4 fw-bold text-muted">${index + 1}</td>
            <td class="fw-semibold">${barang.nama_barang}</td>
            <td class="price-tag">Rp ${parseInt(barang.harga).toLocaleString("id-ID")}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-primary btn-action">Detail</button>
            </td>
        </tr>`;
    });

    tbody.innerHTML = baris;
  })
  .catch((error) => {
    console.error("Gagal memuat data:", error);
  });
