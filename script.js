// Autólista tömb
const autok = [
  { marka: "BMW", tipus: "M4", ev: 2023, ar: 35000000 },
  { marka: "Audi", tipus: "RS7", ev: 2022, ar: 40000000 },
  { marka: "Toyota", tipus: "Supra", ev: 2021, ar: 28000000 },
  { marka: "Mercedes", tipus: "AMG GT", ev: 2024, ar: 42000000 },
  { marka: "Ford", tipus: "Mustang", ev: 2020, ar: 25000000 }
];

// 1️⃣ Üdvözlés függvény
function udvozles() {
  alert("Üdvözöllek az Autó Infók és Kalkulátor oldalon!");
}

// 2️⃣ Autólista megjelenítése (betöltéskor)
window.onload = function() {
  const lista = document.getElementById("autoLista");
  if (lista) {
    autok.forEach(auto => {
      const li = document.createElement("li");
      li.textContent = `${auto.marka} ${auto.tipus} (${auto.ev}) - ${auto.ar.toLocaleString()} Ft`;
      lista.appendChild(li);
    });
  }
};

// 3️⃣ Keresés funkció
function autoKereses() {
  const keresett = document.getElementById("keresesInput").value.trim().toLowerCase();
  const lista = document.getElementById("autoLista");
  lista.innerHTML = "";

  let talalat = false;

  autok.forEach(auto => {
    if (auto.marka.toLowerCase().includes(keresett)) {
      const li = document.createElement("li");
      li.textContent = `${auto.marka} ${auto.tipus} (${auto.ev}) - ${auto.ar.toLocaleString()} Ft`;
      lista.appendChild(li);
      talalat = true;
    }
  });

  if (!talalat) {
    const li = document.createElement("li");
    li.textContent = "Nincs találat a keresésre.";
    lista.appendChild(li);
  }
}

// 4️⃣ Üzemanyagköltség számítás
function kiszamitKoltes() {
  const km = parseFloat(document.getElementById("km").value);
  const fogy = parseFloat(document.getElementById("fogyasztas").value);
  const ar = parseFloat(document.getElementById("ar").value);
  const eredmenyElem = document.getElementById("eredmeny");

  if (isNaN(km) || isNaN(fogy) || isNaN(ar) || km <= 0 || fogy <= 0 || ar <= 0) {
    eredmenyElem.textContent = "Kérlek, adj meg érvényes értékeket!";
    return;
  }

  const koltseg = (km / 100) * fogy * ar;
  eredmenyElem.textContent = `Az utazás várható költsége: ${koltseg.toLocaleString()} Ft`;
}

// 5️⃣ Átlagár számítás (programozási tétel)
function atlagArSzamitas() {
  let osszeg = 0;
  for (let i = 0; i < autok.length; i++) {
    osszeg += autok[i].ar;
  }
  const atlag = osszeg / autok.length;
  console.log("Az autók átlagára: " + atlag.toLocaleString() + " Ft");
}
// 🌙 Mód váltás (mentéssel és ikon frissítéssel)
const themeToggle = document.getElementById("themeToggle");

function applyTheme() {
  const savedTheme = localStorage.getItem("theme");
  const icon = themeToggle?.querySelector(".icon");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    if (icon) icon.textContent = "☀️";
  } else {
    document.body.classList.remove("light");
    if (icon) icon.textContent = "🌙";
  }
}

// betöltéskor alkalmazza a mentett beállítást
applyTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    const icon = themeToggle.querySelector(".icon");

    // mód váltása és mentése
    if (isLight) {
      icon.textContent = "☀️";
      localStorage.setItem("theme", "light");
    } else {
      icon.textContent = "🌙";
      localStorage.setItem("theme", "dark");
    }
  });
}



window.addEventListener("load", () => {
  const atlagElem = document.getElementById("atlagAr");
  if (atlagElem) {
    const osszeg = autok.reduce((sum, a) => sum + a.ar, 0);
    const atlag = osszeg / autok.length;
    atlagElem.textContent = `Az autók átlagára: ${atlag.toLocaleString()} Ft`;
  }
});
