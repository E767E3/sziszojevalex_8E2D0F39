const autok = [
  { marka: "BMW", tipus: "M4", ev: 2023, ar: 35000000 },
  { marka: "Audi", tipus: "RS7", ev: 2022, ar: 40000000 },
  { marka: "Toyota", tipus: "Supra", ev: 2021, ar: 28000000 },
  { marka: "Mercedes", tipus: "AMG GT", ev: 2024, ar: 42000000 },
  { marka: "Ford", tipus: "Mustang", ev: 2020, ar: 25000000 },
  {}
];

function udvozles() {
  alert("Üdvözöllek az Autó Infók és Kalkulátor oldalon!");
}

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

const carList = document.getElementById("carList");
const carSearch = document.getElementById("carSearch");
const addCarBtn = document.getElementById("addCarBtn");

if (carList) {
  loadCars();

  carSearch.addEventListener("input", () => {
    loadCars(carSearch.value.toLowerCase());
  });

  addCarBtn.addEventListener("click", () => {
    window.location.href = "ujauto.html";
  });
}

function loadCars(filter = "") {
  let cars = JSON.parse(localStorage.getItem("cars")) || [];
  carList.innerHTML = "";
  const filtered = cars.filter(
    c =>
      c.brand.toLowerCase().includes(filter) ||
      c.model.toLowerCase().includes(filter)
  );

  if (filtered.length === 0) {
    carList.innerHTML = "<p>Nincs találat.</p>";
    return;
  }

  filtered.forEach((car, index) => {
    const div = document.createElement("div");
    div.classList.add("car-card");
    div.innerHTML = `
      <img src="${car.image}" alt="${car.brand} ${car.model}">
      <div class="car-info">
        <h3>${car.brand} ${car.model}</h3>
        <p>Évjárat: ${car.year}</p>
        <p>Fogyasztás: ${car.consumption} L / 100 km</p>
        <p>Ár: ${car.price} Ft</p>
      </div>
      <button class="delete-btn">❌ Törlés</button>
    `;
    carList.appendChild(div);

    const deleteBtn = div.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      cars.splice(index, 1);
      localStorage.setItem("cars", JSON.stringify(cars));
      loadCars(filter);
    });
  });
}

const addCarForm = document.getElementById("addCarForm");
if (addCarForm) {
  addCarForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const brand = document.getElementById("brand").value.trim();
    const model = document.getElementById("model").value.trim();
    const year = document.getElementById("year").value.trim();
    const consumption = document.getElementById("consumption").value.trim();
    const price = document.getElementById("price").value.trim();
    const image = document.getElementById("image").value.trim();

    if (!brand || !model || !year || !consumption || !price) {
      alert("Minden kötelező mezőt ki kell tölteni!");
      return;
    }

    const defaultImages = {
      bmw: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUcv2W6ItO5XID3ayBZBjmt_mrg4yz1sQokg&s",
      audi: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjF38LPza4RGyHQH6LQ96Piz-4Gzq2fnMWvQ&s",
      mercedes: "https://www.autonavigator.hu/wp-content/uploads/2023/02/337355_source.jpg",
      toyota: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9OInVNBeXsiiThroLo2JjSMp36eKuSIzK7Q&s",
      honda: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK4RzZG6-BEciIakhnYNUoDerTMWDpizJZYQ&s",
      ford: "https://www.amerikaivasak.hu/wp-content/uploads/2024/09/UJ_FordF150Raptor_2024_1-500x286.jpg",
    };

    let carImage = image;
    if (!carImage) {
      const key = brand.toLowerCase();
      carImage = defaultImages[key] || "https://cdn.pixabay.com/photo/2017/03/27/13/56/car-2179220_1280.jpg";
    }

    const newCar = { brand, model, year, consumption, price, image: carImage };
    const cars = JSON.parse(localStorage.getItem("cars")) || [];
    cars.push(newCar);
    localStorage.setItem("cars", JSON.stringify(cars));

    window.location.href = "autok.html";
  });
}

function atlagArSzamitas() {
  let osszeg = 0;
  for (let i = 0; i < autok.length; i++) {
    osszeg += autok[i].ar;
  }
  const atlag = osszeg / autok.length;
  console.log("Az autók átlagára: " + atlag.toLocaleString() + " Ft");
}
document.addEventListener("DOMContentLoaded", () => {

  const themeToggle = document.getElementById("themeToggle");
  const icon = themeToggle.querySelector(".icon");
  const label = themeToggle.querySelector(".label");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
  }

  updateThemeAppearance();

  function updateThemeAppearance() {
    if (document.body.classList.contains("light")) {
      icon.textContent = "☀️";
      label.textContent = "Sötét mód";
      document.body.style.transition = "background-color 0.4s ease, color 0.4s ease";
    } else {
      icon.textContent = "🌙";
      label.textContent = "Világos mód";
      document.body.style.transition = "background-color 0.4s ease, color 0.4s ease";
    }
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const currentTheme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
    updateThemeAppearance();
  });

  themeToggle.addEventListener("mouseenter", () => {
    themeToggle.classList.add("expanded");
  });
  themeToggle.addEventListener("mouseleave", () => {
    themeToggle.classList.remove("expanded");
  });

  const calcType = document.getElementById("calcType");
  const calcInputs = document.getElementById("calcInputs");
  const calcBtn = document.getElementById("calcBtn");
  const calcResult = document.getElementById("calcResult");

  function loadPriceCalc() {
    calcInputs.innerHTML = `
      <label>Megteendő út hossza (km):</label>
      <input type="number" id="distance" placeholder="pl. 250">

      <label>Átlagfogyasztás (liter / 100 km):</label>
      <input type="number" id="consumption" placeholder="pl. 7.5">

      <label>Üzemanyag ára (Ft / liter):</label>
      <input type="number" id="fuelPrice" placeholder="pl. 650">
    `;
  }

  function loadAvgCalc() {
    calcInputs.innerHTML = `
      <label>Megtett út (km):</label>
      <input type="number" id="traveled" placeholder="pl. 350">

      <label>Felhasznált üzemanyag (liter):</label>
      <input type="number" id="usedFuel" placeholder="pl. 25">
    `;
  }

  function showResultAnimation(text) {
    calcResult.style.opacity = 0;
    calcResult.textContent = text;
    setTimeout(() => {
      calcResult.style.transition = "opacity 0.6s ease";
      calcResult.style.opacity = 1;
    }, 100);
  }

  if (calcType) {
    calcType.addEventListener("change", () => {
      calcResult.textContent = "";
      if (calcType.value === "ar") {
        loadPriceCalc();
      } else {
        loadAvgCalc();
      }
    });
  }

  if (calcBtn) {
    calcBtn.addEventListener("click", () => {
      if (calcType.value === "ar") {
        const distance = parseFloat(document.getElementById("distance").value);
        const consumption = parseFloat(document.getElementById("consumption").value);
        const fuelPrice = parseFloat(document.getElementById("fuelPrice").value);

        if (isNaN(distance) || isNaN(consumption) || isNaN(fuelPrice)) {
          showResultAnimation("⚠️ Kérlek, tölts ki minden mezőt!");
          return;
        }

        const totalCost = (distance / 100) * consumption * fuelPrice;
        showResultAnimation(`💰 Az út ára: ${totalCost.toFixed(0)} Ft`);
      } else {
        const traveled = parseFloat(document.getElementById("traveled").value);
        const usedFuel = parseFloat(document.getElementById("usedFuel").value);

        if (isNaN(traveled) || isNaN(usedFuel)) {
          showResultAnimation("⚠️ Kérlek, tölts ki minden mezőt!");
          return;
        }

        const avg = (usedFuel / traveled) * 100;
        showResultAnimation(`⛽ Az átlagfogyasztás: ${avg.toFixed(2)} liter / 100 km`);
      }
    });
  }

  if (calcInputs) {
    loadPriceCalc();
  }
});

