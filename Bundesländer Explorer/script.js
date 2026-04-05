const bundeslaender = [
  {
    name: "Baden-Württemberg",
    hauptstadt: "Stuttgart",
    einwohner: 11100000,
    region: "Süd",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Baden-W%C3%BCrttemberg.svg"
  },
  {
    name: "Bayern",
    hauptstadt: "München",
    einwohner: 13100000,
    region: "Süd",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Bavaria%20%28lozengy%29.svg"
  },
  {
    name: "Berlin",
    hauptstadt: "Berlin",
    einwohner: 3700000,
    region: "Ost",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Berlin.svg"
  },
  {
    name: "Brandenburg",
    hauptstadt: "Potsdam",
    einwohner: 2600000,
    region: "Ost",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Brandenburg.svg"
  },
  {
    name: "Bremen",
    hauptstadt: "Bremen",
    einwohner: 700000,
    region: "Nord",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Bremen.svg"
  },
  {
    name: "Hamburg",
    hauptstadt: "Hamburg",
    einwohner: 1900000,
    region: "Nord",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Hamburg.svg"
  },
  {
    name: "Hessen",
    hauptstadt: "Wiesbaden",
    einwohner: 6300000,
    region: "West",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Hesse.svg"
  },
  {
    name: "Niedersachsen",
    hauptstadt: "Hannover",
    einwohner: 8000000,
    region: "Nord",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Lower%20Saxony.svg"
  },
  {
    name: "Mecklenburg-Vorpommern",
    hauptstadt: "Schwerin",
    einwohner: 1600000,
    region: "Nord",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Mecklenburg-Western%20Pomerania.svg"
  },
  {
    name: "Nordrhein-Westfalen",
    hauptstadt: "Düsseldorf",
    einwohner: 17900000,
    region: "West",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20North%20Rhine-Westphalia.svg"
  },
  {
    name: "Rheinland-Pfalz",
    hauptstadt: "Mainz",
    einwohner: 4100000,
    region: "West",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Rhineland-Palatinate.svg"
  },
  {
    name: "Saarland",
    hauptstadt: "Saarbrücken",
    einwohner: 990000,
    region: "West",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Saarland.svg"
  },
  {
    name: "Sachsen",
    hauptstadt: "Dresden",
    einwohner: 4000000,
    region: "Ost",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Saxony.svg"
  },
  {
    name: "Sachsen-Anhalt",
    hauptstadt: "Magdeburg",
    einwohner: 2200000,
    region: "Ost",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Saxony-Anhalt.svg"
  },
  {
    name: "Schleswig-Holstein",
    hauptstadt: "Kiel",
    einwohner: 2900000,
    region: "Nord",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Schleswig-Holstein.svg"
  },
  {
    name: "Thüringen",
    hauptstadt: "Erfurt",
    einwohner: 2100000,
    region: "Ost",
    bild: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Thuringia.svg"
  }
];

const ergebnisse = document.getElementById("results");
const statusNachricht = document.getElementById("statusMessage");
const suchFormular = document.getElementById("searchForm");
const suchEingabe = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const favoritenButtonAnzeigen = document.getElementById("showFavorites");
const vorlage = document.getElementById("stateCardTemplate");

let nurFavoritenAnzeigen = false;

function favoritenAbrufen() {
  return JSON.parse(localStorage.getItem("favoriteStates") || "[]");
}

function favoritenSpeichern(favoriten) {
  localStorage.setItem("favoriteStates", JSON.stringify(favoriten));
}

function favoritUmschalten(bundeslandName) {
  const favoriten = favoritenAbrufen();

  const aktualisierteFavoriten = favoriten.includes(bundeslandName)
    ? favoriten.filter((name) => name !== bundeslandName)
    : [...favoriten, bundeslandName];

  favoritenSpeichern(aktualisierteFavoriten);
  bundeslaenderRendern();
}

function leerenZustandAnzeigen(nachricht) {
  ergebnisse.innerHTML = `<div class="empty-state">${nachricht}</div>`;
}

function gefilterteBundeslaenderAbrufen() {
  const suchText = suchEingabe.value.trim().toLowerCase();
  const ausgewaehlteRegion = regionFilter.value;
  const favoriten = favoritenAbrufen();

  return bundeslaender.filter((bundesland) => {
    const passtZurSuche = bundesland.name.toLowerCase().includes(suchText);
    const passtZurRegion =
      ausgewaehlteRegion === "all" || bundesland.region === ausgewaehlteRegion;
    const passtZuFavoriten =
      !nurFavoritenAnzeigen || favoriten.includes(bundesland.name);

    return passtZurSuche && passtZurRegion && passtZuFavoriten;
  });
}

function bundeslandKarteErstellen(bundesland, favoriten) {
  const fragment = vorlage.content.cloneNode(true);

  const bild = fragment.querySelector(".state-image");
  const titel = fragment.querySelector("h2");
  const favoritenButton = fragment.querySelector(".favorite-btn");
  const regionText = fragment.querySelector(".state-region");
  const details = fragment.querySelector(".state-details");

  bild.src = bundesland.bild;
  bild.alt = `${bundesland.name} Flagge`;

  titel.textContent = bundesland.name;
  regionText.textContent = `Region: ${bundesland.region}`;

  favoritenButton.textContent = favoriten.includes(bundesland.name) ? "★" : "☆";
  favoritenButton.setAttribute("aria-label", `Favorit umschalten für ${bundesland.name}`);
  favoritenButton.addEventListener("click", function () {
    favoritUmschalten(bundesland.name);
  });

  details.innerHTML = `
    <li><strong>Hauptstadt:</strong> ${bundesland.hauptstadt}</li>
    <li><strong>Einwohner:</strong> ${bundesland.einwohner.toLocaleString()}</li>
  `;

  return fragment;
}

function bundeslaenderRendern() {
  const gefilterteBundeslaender = gefilterteBundeslaenderAbrufen();
  const favoriten = favoritenAbrufen();

  ergebnisse.innerHTML = "";

  if (gefilterteBundeslaender.length === 0) {
    leerenZustandAnzeigen("Keine deutschen Bundesländer passen zu den aktuellen Filtern.");
    statusNachricht.textContent = "0 Bundesländer gefunden.";
    return;
  }

  gefilterteBundeslaender.forEach((bundesland) => {
    const karte = bundeslandKarteErstellen(bundesland, favoriten);
    ergebnisse.appendChild(karte);
  });

  statusNachricht.textContent = `${gefilterteBundeslaender.length} Bundesland/Bundesländer werden angezeigt.`;
}

suchFormular.addEventListener("submit", function (event) {
  event.preventDefault();
  bundeslaenderRendern();
});

suchEingabe.addEventListener("input", function () {
  bundeslaenderRendern();
});

regionFilter.addEventListener("change", function () {
  bundeslaenderRendern();
});

favoritenButtonAnzeigen.addEventListener("click", function () {
  nurFavoritenAnzeigen = !nurFavoritenAnzeigen;
  favoritenButtonAnzeigen.textContent = nurFavoritenAnzeigen
    ? "Alle anzeigen"
    : "Favoriten anzeigen";
  bundeslaenderRendern();
});

bundeslaenderRendern();