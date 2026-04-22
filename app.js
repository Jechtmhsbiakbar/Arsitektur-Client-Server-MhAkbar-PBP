fetch("api-toko/get_barang.php")
  .then((response) => response.json())
  .then((responseObject) => {
    const dataBarang = responseObject.data;

    const tbody = document.getElementById("isi-tabel");
    let baris = "";

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

// ============================================================
// ✅ PWA: Registrasi Service Worker
// ============================================================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((registration) => {
        console.log("✅ Service Worker Berhasil Didaftarkan!", registration.scope);
      })
      .catch((err) => {
        console.error("❌ Service Worker Gagal:", err);
      });
  });
}

// ... kode fetch data barang tetap sama di sini ...

// ============================================================
// ✅ LOGIKA CEK INSTALASI & DIALOG
// ============================================================

let deferredPrompt;
const overlay = document.getElementById("pwa-overlay");

// 1. Fungsi cek apakah sudah terinstal
function checkInstallation() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    
    if (isStandalone) {
        console.log("🚀 App sudah terinstal (Standalone Mode)");
        if (overlay) overlay.style.setProperty('display', 'none', 'important');
        return true;
    }
    return false;
}

// 2. Tangkap event install prompt
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Jika BELUM terinstal, tampilkan overlay full screen
    if (!checkInstallation()) {
        overlay.style.display = "flex";
    }
});

// 3. Fungsi eksekusi instalasi
function installPWA() {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
            console.log("✅ User menginstall app");
            hideOverlay();
        }
        deferredPrompt = null;
    });
}

function hideOverlay() {
    if (overlay) overlay.style.display = "none";
}

// 4. Sembunyikan jika berhasil diinstall lewat titik tiga browser
window.addEventListener("appinstalled", () => {
    hideOverlay();
});

// 5. Cek ulang saat halaman dimuat
window.addEventListener('load', () => {
    checkInstallation();
});