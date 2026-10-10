const intro = {
  judul: "Selamat datang",
  isi: "Putar model dengan menyeret mouse atau jari. Klik titik bernomor pada model, atau pilih dari daftar di bawah, untuk membaca penjelasan tiap bagian pura."
};

const info = {
  gapura: {
    judul: "Gapura",
    isi: "Gapura adalah pintu masuk pura yang menjadi batas antara ruang luar dan ruang yang lebih suci. Dalam arsitektur tradisional Bali ada dua jenis utama: candi bentar, gerbang terbelah tanpa atap penghubung yang biasanya berada di pintu masuk halaman terluar, dan kori agung (paduraksa), gerbang beratap yang menjadi jalan masuk ke halaman yang lebih dalam. Gapura juga dimaknai sebagai simbol peralihan dari dunia luar menuju ruang suci."
  },
  bale: {
    judul: "Bale",
    isi: "Bale adalah bangunan berbentuk pavilion terbuka tanpa dinding penuh yang berdiri di dalam kompleks pura. Fungsinya beragam, misalnya tempat menyiapkan sesajen, tempat berkumpul dan beristirahat umat saat upacara, tempat menabuh gamelan, atau tempat menyimpan perlengkapan upacara. Setiap jenis bale punya nama dan fungsi sendiri sesuai letaknya di halaman pura, dan struktur tiangnya biasanya mengikuti aturan ukuran tradisional Bali."
  }
};

const viewer = document.getElementById("viewer");
const panel = document.getElementById("panel");
const judul = document.getElementById("judul");
const isi = document.getElementById("isi");
const daftar = document.getElementById("daftar");
const hotspots = document.querySelectorAll(".hotspot");

function tampil(data, id) {
  judul.textContent = data.judul;
  isi.textContent = data.isi;
  panel.classList.toggle("detail", Boolean(id));
  panel.classList.remove("muncul");
  void panel.offsetWidth;
  panel.classList.add("muncul");
  hotspots.forEach((h) => h.classList.toggle("aktif", h.dataset.id === id));
  document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("aktif", c.dataset.id === id));
}

const buka = (id) => info[id] && tampil(info[id], id);
const awal = () => tampil(intro, null);

hotspots.forEach((h) => h.addEventListener("click", () => buka(h.dataset.id)));
document.getElementById("kembali").addEventListener("click", awal);
document.addEventListener("keydown", (e) => e.key === "Escape" && awal());

Object.keys(info).forEach((id, i) => {
  const b = document.createElement("button");
  b.className = "chip";
  b.type = "button";
  b.dataset.id = id;
  b.textContent = `${i + 1}. ${info[id].judul}`;
  b.addEventListener("click", () => buka(id));
  daftar.appendChild(b);
});

document.getElementById("reset").addEventListener("click", () => {
  viewer.cameraOrbit = "0deg 75deg 105%";
  viewer.cameraTarget = "auto auto auto";
  viewer.fieldOfView = "auto";
  awal();
});

document.getElementById("layar").addEventListener("click", () => {
  document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
});

// indikator loading
const bar = document.getElementById("bar");
const persen = document.getElementById("persen");
viewer.addEventListener("progress", (e) => {
  const p = Math.round(e.detail.totalProgress * 100);
  bar.style.width = p + "%";
  persen.textContent = p + "%";
});
viewer.addEventListener("load", () => {
  document.getElementById("loading").classList.add("hide");
  document.getElementById("progress").classList.add("hide");
});

// alat bantu: klik model untuk melihat koordinat hotspot di Console
viewer.addEventListener("click", (e) => {
  const hit = viewer.positionAndNormalFromPoint(e.clientX, e.clientY);
  if (hit) console.log(`data-position="${hit.position.toString()}" data-normal="${hit.normal.toString()}"`);
});

awal();