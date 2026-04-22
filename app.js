// ============================================================
// 🛒 DATA FETCHING
// ============================================================
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
  .catch((error) => console.error("Gagal memuat data:", error));

// ============================================================
// 🛠️ SERVICE WORKER REGISTRATION
// ============================================================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js")
      .then((reg) => console.log("✅ SW Terdaftar:", reg.scope))
      .catch((err) => console.error("❌ SW Gagal:", err));
  });
}

// ============================================================
// 📲 LOGIKA PWA (OVERLAY & BANNER)
// ============================================================
let deferredPrompt;
const overlay = document.getElementById("pwa-overlay");
const banner = document.getElementById("pwa-banner");

// Fungsi cek status instalasi
function checkInstallation() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (isStandalone) {
    console.log("🚀 Standalone Mode: Menyembunyikan semua prompt.");
    hideAllPrompts();
    return true;
  }
  return false;
}

// Tangkap event install
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Tampilkan overlay jika belum terinstall
  if (!checkInstallation()) {
    overlay.style.display = "flex";
  }
});

// Fungsi saat klik "Instal Sekarang"
function installPWA() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      console.log("✅ User menginstall");
      hideAllPrompts();
    }
    deferredPrompt = null;
  });
}

// Fungsi saat klik "Nanti Saja" (Tutup Overlay, Munculkan Banner)
function hideOverlay() {
  if (overlay) overlay.style.display = "none";
  if (banner && !checkInstallation()) {
    banner.style.display = "block"; // Munculkan tombol kecil di bawah
  }
}

function hideAllPrompts() {
  if (overlay) overlay.style.display = "none";
  if (banner) banner.style.display = "none";
}

window.addEventListener("appinstalled", () => {
  hideAllPrompts();
});

window.addEventListener('load', checkInstallation);