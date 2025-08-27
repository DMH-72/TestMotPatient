// // // --- Firebase ---

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDPzj-cl8ea7xXb_3QiJkPmVWOb02xTfUY",
  authDomain: "lebadiz-clinic.firebaseapp.com",
  projectId: "lebadiz-clinic",
  storageBucket: "lebadiz-clinic.firebasestorage.app",
  messagingSenderId: "1053524574093",
  appId: "1:1053524574093:web:65b3b120e4ee4ca82207c4",
};

// Initialisation Firebase
firebase.initializeApp(firebaseConfig);

// Récupération de Firestore
const db = firebase.firestore();

// Exemple simple : lire tous les documents d'une collection
db.collection("maCollection")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la lecture :", error);
  });

// Fonction pour extraire et afficher les titres
function extraireTitre() {
  db.collection("score")
    .get()
    .then((querySnapshot) => {
      // Construire le tableau HTML
      let tableHTML =
        "<table border='1' style='border-collapse: collapse; width: 100%;'>";
      tableHTML += "<tr><th>Titre</th></tr>";

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tableHTML += `
          <tr>
            <td>${data.titre || ""}</td>
            <td>${data.description || ""}</td>
          </tr>`;
      });

      tableHTML += "</table>";

      // Créer la structure de la modale
      const modalContent = `
        <div class="modal-overlay">
          <div class="modal-content">
            <button class="close-button" onclick="closeModal()">×</button>
            <br>
            <h2>Liste des scores</h2>
            ${tableHTML}
          </div>
        </div>
      `;

      // Ajouter la modale au DOM
      document.body.insertAdjacentHTML("beforeend", modalContent);
    })
    .catch((error) => {
      console.error("Erreur lors de la lecture :", error);
      alert("Impossible de récupérer les données.");
    });
}
// // --- End Firebase ---

function toggleSection(checkboxId, sectionId) {
  var checkbox = document.getElementById(checkboxId).checked;
  if (checkbox === true) {
    document.getElementById(sectionId).style.display = "";
  } else {
    document.getElementById(sectionId).style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  function PAMCalc1() {
    const PASD = document.getElementById(
      "constante_pressionArterielleS1"
    ).value;
    const PADD = document.getElementById(
      "constante_pressionArterielleD1"
    ).value;
    document.getElementById("PAM1").innerHTML = `${(
      (1 / 3) * PASD +
      (2 / 3) * PADD
    ).toFixed(0)}`;
  }

  function PAMCalcControlat() {
    const PASD = document.getElementById(
      "constante_pressionArterielleSControlat"
    ).value;
    const PADD = document.getElementById(
      "constante_pressionArterielleDControlat"
    ).value;
    const cote = parseFloat(
      document.getElementById("constante_pressionArterielleCote1").value
    );

    document.getElementById("PAMControlat").innerHTML = `${(
      (1 / 3) * PASD +
      (2 / 3) * PADD
    ).toFixed(0)}`;

    if (cote == 1) {
      document.getElementById(
        "constante_pressionArterielleCoteControlat"
      ).innerHTML = `G`;
    } else {
      document.getElementById(
        "constante_pressionArterielleCoteControlat"
      ).innerHTML = `D`;
    }
  }

  function ageCalc() {
    // Récupérer la valeur de la date de naissance dans l'input
    var dateNaissanceInput = document.getElementById("dateNaissance").value;

    // Vérifier si une date a été entrée
    if (dateNaissanceInput) {
      // Créer un objet Date avec la date de naissance (le format est AAAA-MM-JJ)
      var dateNaissance = new Date(dateNaissanceInput);

      // Récupérer la date actuelle
      var today = new Date();

      // Calculer l'âge en années
      var age = today.getFullYear() - dateNaissance.getFullYear();
      var monthDiff = today.getMonth() - dateNaissance.getMonth();
      var dayDiff = today.getDate() - dateNaissance.getDate();

      // Ajustement si l'anniversaire n'est pas encore passé cette année
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      // Calculer l'âge en mois pour les enfants de moins de 3 ans
      var ageInMonths =
        (today.getFullYear() - dateNaissance.getFullYear()) * 12 +
        today.getMonth() -
        dateNaissance.getMonth();
      if (dayDiff < 0) {
        ageInMonths--;
      }

      // Afficher l'âge seulement si le résultat est entre 0 et 150 ans
      if (age >= 0 && age < 150) {
        if (age < 3) {
          document.getElementById("age").innerHTML = `(${ageInMonths} mois)`;
        } else {
          document.getElementById("age").innerHTML = `(${age} ans)`;
        }
      } else {
        document.getElementById("age").innerHTML = ""; // Ne rien afficher si hors de l'intervalle
      }
    } else {
      document.getElementById("age").innerHTML = "";
    }

    if (age >= 0 && age < 18) {
      document.getElementById(`identiteAccompagnant`).style.display = "block";
      document.getElementById(`ModuleVaccinEnfant`).style.display = "block";
      document.getElementById(`SectionClinicApprofondiPed`).style.display =
        "block";
    } else {
      document.getElementById(`identiteAccompagnant`).style.display = "none";
      document.getElementById(`ModuleVaccinEnfant`).style.display = "none";
      document.getElementById(`SectionClinicApprofondiPed`).style.display =
        "none";
    }

    if (age >= 0 && age < 5) {
      document.getElementById("btnPed").checked = true;
      addEventListener("input", toggleSection(`btnPed`, `sectionPed`));
    } else {
      document.getElementById("btnPed").checked = false;
      addEventListener("input", toggleSection(`btnPed`, `sectionPed`));
    }

    if (age >= 0 && age < 5) {
      document.getElementById(`ModuleAlimentationEnfant`).style.display =
        "block";
    } else {
      document.getElementById(`ModuleAlimentationEnfant`).style.display =
        "none";
    }
  }

  function DiureseCalc() {
    const diurese = document.getElementById("constant_diurese_jour").value / 24;
    const poids = document.getElementById("constante_poids").value;
    document.getElementById("constant_diurese_horraire").innerHTML = `${(
      diurese / poids
    ).toFixed(2)}`;
  }

  function variationPoids() {
    const poids = document.getElementById("constante_poids").value;
    const poids_ant = document.getElementById(
      "constante_poids_anterieur"
    ).value;
    document.getElementById("constante_pertePoids").innerHTML = `${Math.abs(
      ((poids_ant - poids) / poids_ant) * 100
    ).toFixed(1)}`;
  }

  function GlycemieCalc() {
    const uniteGlycemie = document.getElementById("uniteGlycemie").value;
    const glycemie = parseFloat(
      document.getElementById("constant_glycemie").value
    ); // Convertir en nombre
    if (uniteGlycemie === "0") {
      document.getElementById("constant_glycemieConvert").innerHTML = `${(
        glycemie * 5.5
      ).toFixed(2)} mmol/L`;
    } else {
      document.getElementById("constant_glycemieConvert").innerHTML = `${(
        glycemie * 0.18
      ).toFixed(2)} g/L`;
    }
  }

  // régler pb une des deux valeurs rentrer sans l'autre + limiter les valeurs rentrables (positif, pas plus de 250cm)
  function IMCCalc() {
    const taille = document.getElementById("constante_taille").value / 100;
    const poids = document.getElementById("constante_poids").value;
    const IMC = poids / (taille * taille);

    if (IMC > 0 && IMC < 100) {
      document.getElementById("constante_IMC").innerHTML = `${IMC.toFixed(2)}`;
    } else {
      document.getElementById("constante_IMC").innerHTML = `xx,x`;
    }

    if (taille != "" && taille != "" && IMC.toFixed(1) < 18.5) {
      document.getElementById(
        "interpretIMC"
      ).innerHTML = `<i style="font-size: 0.8em; color:red;">Maigreur</i>`;
    } else if (IMC.toFixed(1) < 25) {
      document.getElementById(
        "interpretIMC"
      ).innerHTML = `<i style="font-size: 0.8em; color:green;">Normal</i>`;
    } else if (IMC.toFixed(1) < 30) {
      document.getElementById(
        "interpretIMC"
      ).innerHTML = `<i style="font-size: 0.8em; color:red;">Surpoids</i>`;
    } else if (IMC.toFixed(1) < 35) {
      document.getElementById(
        "interpretIMC"
      ).innerHTML = `<i style="font-size: 0.8em; color:red;">Obésité modérée</i>`;
    } else if (IMC.toFixed(1) < 40) {
      document.getElementById(
        "interpretIMC"
      ).innerHTML = `<i style="font-size: 0.8em; color:red;">Obésité sévère</i>`;
    } else if (IMC.toFixed(1) > 40) {
      document.getElementById(
        "interpretIMC"
      ).innerHTML = `<i style="font-size: 0.8em; color:red;"><b>Obésité morbide</b></i>`;
    } else {
      document.getElementById(
        "interpretIMC"
      ).innerHTML = `<i style="font-size: 0.8em;">Interprétation</i>`;
    }
  }

  function paquetAnneeCal() {
    const nbAnneeTabacConst = document.getElementById("nbAnneeT").value;
    const cigParJourConst = document.getElementById("cParJour").value;

    const pa = nbAnneeTabacConst * (cigParJourConst / 20);
    document.getElementById("paquetAnneeConst").innerHTML = `Soit ${pa} PA`;
  }

  function grammeAlcoolCalc() {
    const const_volumeOH1 = document.getElementById("volumeOH1").value;
    const const_degre1 = document.getElementById("degre1").value;
    const const_volumeOH2 = document.getElementById("volumeOH2").value;
    const const_degre2 = document.getElementById("degre2").value;
    const const_volumeOH3 = document.getElementById("volumeOH3").value;
    const const_degre3 = document.getElementById("degre3").value;

    const grammeOH =
      0.08 *
      (const_volumeOH1 * const_degre1 +
        const_volumeOH2 * const_degre2 +
        const_volumeOH3 * const_degre3);

    document.getElementById(
      "grammeAlcoolConst"
    ).innerHTML = `${grammeOH} gramme/jour, soit ${(grammeOH / 10).toFixed(
      1
    )} U/j`;
  }

  dateNaissance.addEventListener("input", ageCalc);
  constante_pressionArterielleS1.addEventListener("input", PAMCalc1);
  constante_pressionArterielleD1.addEventListener("input", PAMCalc1);
  constante_pressionArterielleS1.addEventListener("input", PAMCalcControlat);
  constante_pressionArterielleD1.addEventListener("input", PAMCalcControlat);
  constante_pressionArterielleCote1.addEventListener(
    "change",
    PAMCalcControlat
  );
  constante_pressionArterielleSControlat.addEventListener(
    "input",
    PAMCalcControlat
  );
  constante_pressionArterielleDControlat.addEventListener(
    "input",
    PAMCalcControlat
  );
  constante_poids.addEventListener("input", IMCCalc);
  constante_taille.addEventListener("input", IMCCalc);
  constant_diurese_jour.addEventListener("input", DiureseCalc);
  constante_poids.addEventListener("input", DiureseCalc);
  constante_poids.addEventListener("input", variationPoids);
  constante_poids_anterieur.addEventListener("input", variationPoids);
  constant_glycemie.addEventListener("input", GlycemieCalc);
  uniteGlycemie.addEventListener("change", GlycemieCalc);
  document.getElementById("nbAnneeT").addEventListener("input", paquetAnneeCal);
  document.getElementById("cParJour").addEventListener("input", paquetAnneeCal);
  document
    .getElementById("volumeOH1")
    .addEventListener("input", grammeAlcoolCalc);
  document.getElementById("degre1").addEventListener("input", grammeAlcoolCalc);
  document
    .getElementById("volumeOH2")
    .addEventListener("input", grammeAlcoolCalc);
  document.getElementById("degre2").addEventListener("input", grammeAlcoolCalc);
  document
    .getElementById("volumeOH3")
    .addEventListener("input", grammeAlcoolCalc);
  document.getElementById("degre3").addEventListener("input", grammeAlcoolCalc);
  // document.getElementById("btnVaccin").addEventListener('onclick',calendrierVaccinal);
});

function paquetAnneeDisp() {
  var checkbox = document.getElementById(`tabac`).checked;
  if (checkbox === true) {
    document.getElementById(`paquetAnnee`).style.display = "block";
  } else {
    document.getElementById(`paquetAnnee`).style.display = "none";
  }
}

function grammeOHDisp() {
  var test = document.getElementById(`consoAlcool`).value;
  if (test == 0) {
    document.getElementById(`grammeAlcool`).style.display = "none";
    document.getElementById(`consoSemaine`).style.display = "none";
  } else if (test == 1) {
    document.getElementById(`grammeAlcool`).style.display = "none";
    document.getElementById(`consoSemaine`).style.display = "block";
  } else {
    document.getElementById(`grammeAlcool`).style.display = "block";
    document.getElementById(`consoSemaine`).style.display = "none";
  }
}

function InitialisationECG() {
  document.getElementById(
    "hold_ECG"
  ).innerHTML = `<div id="examenECG" contenteditable="true" class="clinic">Rythme sinusal et régulier à xx bpm, normo-axé<br>PR = ms, QRS = ms, QTc =  ms<br> Pas de troubles de la conduction <br> Pas de signes de sucharge / hypertrophie ventriculaire et atriale<br>Pas de signes d’ischiémie (pas d’ondes T négatives, pas d’anomalies du segment ST, pas d’ondes Q de nécrose)
ECG sans anomalie perçue</div>`;
}

function InitialisationRT() {
  document.getElementById(
    "hold_RT"
  ).innerHTML = `<div id="examenRT" contenteditable="true" class="clinic">Blablabla
    </div>`;
}

const editableDivs = document.querySelectorAll(".editable-div");

editableDivs.forEach((editableDiv) => {
  editableDiv.addEventListener("focus", () => {
    const fieldset = editableDiv.closest(".fieldsetText");
    if (fieldset) {
      fieldset.classList.add("focused");
    }
  });

  editableDiv.addEventListener("blur", () => {
    const fieldset = editableDiv.closest(".fieldsetText");
    if (fieldset) {
      fieldset.classList.remove("focused");
    }
  });
});

//

function burnFunction() {
  // Insertion du contenu dans le modal
  const modalContent = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="drawStyle">
                  <button class="close-button" onclick="closeModal()">×</button>
                  <h2>E-BURN Maison</h2>
                  <canvas id="surfaceCanvas" width="300" height="600"></canvas>
                  <div id="controls">
                  <button id="drawMode">Dessiner</button>
                  <button id="eraseMode">Effacer</button>
                  <button id="clearCanvas">Réinitialiser</button>
                  <p id="surfacePercent">Surface brûlée : 0%</p>
                  <label for="sizeSlider">Taille du pinceau/effaceur :</label>
                  <input type="range" id="sizeSlider" min="5" max="30" value="5">
                <!-- <button id="countRedPixelsButton">Compter les pixels rouges</button> -->
              </div>
            </div>
          </div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", modalContent);

  // // **E-BURN** SUPER mais légérement décaller
  const canvas = document.getElementById("surfaceCanvas");
  const context = canvas.getContext("2d");

  const drawCanvas = document.createElement("canvas");
  drawCanvas.width = canvas.width;
  drawCanvas.height = canvas.height;
  const drawContext = drawCanvas.getContext("2d");

  let isDrawing = false;
  let isErasing = false;

  // Charger l'image de la silhouette et l'afficher en fond du canvas principal
  const silhouetteImage = new Image();
  silhouetteImage.src = "humain.png";
  silhouetteImage.onload = () => {
    context.drawImage(silhouetteImage, 0, 0, canvas.width, canvas.height);
  };

  // Afficher le calque de dessin par-dessus le canvas principal
  canvas.parentElement.appendChild(drawCanvas);
  drawCanvas.style.position = "absolute";
  drawCanvas.style.top = canvas.offsetTop + 2 + "px";
  drawCanvas.style.left = canvas.offsetLeft + 2 + "px";

  // Événements de dessin et d'effacement sur le calque de dessin
  drawCanvas.addEventListener("mousedown", startDrawing);
  drawCanvas.addEventListener("mousemove", draw);
  drawCanvas.addEventListener("mouseup", endDrawing);

  // Gestion des boutons pour le mode dessin et effacement
  document.getElementById("drawMode").addEventListener("click", () => {
    isErasing = false;
    drawContext.globalCompositeOperation = "source-over"; // Mode de dessin normal
    drawContext.strokeStyle = "red";
  });

  document.getElementById("eraseMode").addEventListener("click", () => {
    isErasing = true;
    drawContext.globalCompositeOperation = "destination-out"; // Mode d'effacement
  });

  document.getElementById("clearCanvas").addEventListener("click", clearCanvas);

  // Ajustement de la taille du pinceau
  const sizeSlider = document.getElementById("sizeSlider");
  sizeSlider.addEventListener("input", () => {
    drawContext.lineWidth = sizeSlider.value;
  });

  function startDrawing(event) {
    isDrawing = true;
    drawContext.beginPath();
    drawContext.moveTo(event.offsetX, event.offsetY);
  }

  function draw(event) {
    if (!isDrawing) return;

    const x = event.offsetX;
    const y = event.offsetY;

    // Applique la taille du pinceau en fonction de la valeur du curseur
    drawContext.lineWidth = sizeSlider.value;

    // Limite le dessin ou l’effacement à la silhouette uniquement
    if (isInsideMask(x, y)) {
      drawContext.lineTo(x, y);
      drawContext.stroke();
    } else {
      drawContext.beginPath();
      drawContext.moveTo(x, y);
    }
  }

  function endDrawing() {
    isDrawing = false;
    drawContext.closePath();
    removeOutsideDrawing(); // Efface les pixels rouges en dehors de la silhouette
    countRedPixels(); // Met à jour le pourcentage de surface brûlée
  }

  // Fonction pour vérifier si un point est dans la silhouette
  function isInsideMask(x, y) {
    const maskData = context.getImageData(x, y, 1, 1).data;
    return maskData[3] > 0; // True si le pixel de la silhouette est non transparent
  }

  // Fonction pour effacer les zones rouges en dehors de la silhouette
  function removeOutsideDrawing() {
    const imageData = drawContext.getImageData(
      0,
      0,
      drawCanvas.width,
      drawCanvas.height
    );
    const maskData = context.getImageData(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const alpha = maskData.data[i + 3];

      // Si le pixel est rouge et en dehors de la silhouette, on l'efface
      if (r === 255 && g === 0 && b === 0 && alpha === 0) {
        imageData.data[i] = 0; // R
        imageData.data[i + 1] = 0; // G
        imageData.data[i + 2] = 0; // B
        imageData.data[i + 3] = 0; // Alpha
      }
    }

    drawContext.putImageData(imageData, 0, 0);
  }

  // Fonction pour compter les pixels rouges (surface brûlée)
  function countRedPixels() {
    const imageData = drawContext.getImageData(
      0,
      0,
      drawCanvas.width,
      drawCanvas.height
    );
    const maskData = context.getImageData(0, 0, canvas.width, canvas.height);
    let redPixelCount = 0;
    let silhouettePixelCount = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const alpha = maskData.data[i + 3];

      if (alpha > 0) {
        silhouettePixelCount++;
        if (r === 255 && g === 0 && b === 0) {
          redPixelCount++;
        }
      }
    }

    const burnPercent = (redPixelCount / silhouettePixelCount) * 100;
    document.getElementById(
      "surfacePercent"
    ).textContent = `Surface brûlée : ${burnPercent.toFixed(2)}%`;
  }

  // Réinitialise le canvas de dessin et redessine la silhouette
  function clearCanvas() {
    drawContext.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    document.getElementById("surfacePercent").textContent =
      "Surface brûlée : 0%";
  }
}

// ** PIED DE PAGE **

async function annuaire() {
  const response = await fetch("annuaire.csv");
  const csvText = await response.text();

  // Conversion du CSV en tableau
  const rows = csvText.split("\n").map((row) => row.split(","));
  const headers = rows[0].map((header) => header.trim());
  const data = rows.slice(1).map((row) => row.map((cell) => cell.trim()));

  // Obtenir une liste unique des valeurs pour chaque colonne
  const typeValues = [...new Set(data.map((row) => row[0]))];
  const hopitaux = [...new Set(data.map((row) => row[1]))];
  const specialites = [...new Set(data.map((row) => row[2]))];
  const dects = [...new Set(data.map((row) => row[3]))];

  let checkboxesHTML = `<div id="filter-container">Filtrer par catégorie : `;
  typeValues.forEach((value) => {
    checkboxesHTML += `
            <label>
                <input type="checkbox" class="filter-type" value="${value}" onchange="filterTable()"> ${value}
            </label>
        `;
  });

  // Création des cases à cocher pour filtrer les hôpitaux
  checkboxesHTML += `<br>Filtrer par hôpital : `;
  hopitaux.forEach((hopital) => {
    checkboxesHTML += `
            <label>
                <input type="checkbox" class="filter-hospital" value="${hopital}" onchange="filterTable()"> ${hopital}
            </label>
        `;
  });

  // Création des champs de recherche pour la spécialité et DECT
  checkboxesHTML += `<br>Filtrer par spécialité : 
        <input type="text" id="specialty-search" placeholder="Rechercher une spécialité" oninput="filterTable()">
    `;
  checkboxesHTML += `Filtrer par DECT : 
        <input type="text" id="dect-search" placeholder="Rechercher un DECT" oninput="filterTable()">
    `;
  checkboxesHTML += `</div>`;

  // Création du tableau HTML
  const tableContainer = `<div id="table-container">${generateTableHTML(
    headers,
    data
  )}</div>`;

  // Insertion du contenu dans le modal
  const modalContent = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="close-button" onclick="closeModal()">×</button>
                <h2>Annuaire</h2>
                ${checkboxesHTML}
                ${tableContainer}
            </div>
        </div>
    `;
  document.body.insertAdjacentHTML("beforeend", modalContent);
}

// Fonction pour générer le tableau HTML
function generateTableHTML(headers, data) {
  let tableHTML = `<table border="1" class="tableAnnuaire"><tr>`;
  headers.forEach((header) => {
    tableHTML += `<th>${header}</th>`;
  });
  tableHTML += `</tr>`;

  data.forEach((row) => {
    tableHTML += `<tr class="data-row" data-type="${row[0]}" data-hospital="${row[1]}" data-specialty="${row[2]}" data-dect="${row[3]}">`;
    row.forEach((cell) => {
      tableHTML += `<td>${cell}</td>`;
    });
    tableHTML += `</tr>`;
  });
  tableHTML += `</table>`;

  return tableHTML;
}

// Fonction de filtrage
function filterTable() {
  // Récupérer les cases à cocher pour la première colonne (types)
  const checkboxestype = document.querySelectorAll(".filter-type:checked");
  const selectedtypeValues = Array.from(checkboxestype).map(
    (checkbox) => checkbox.value
  );

  // Récupérer les cases à cocher pour les hôpitaux
  const checkboxesHospital = document.querySelectorAll(
    ".filter-hospital:checked"
  );
  const selectedHopitaux = Array.from(checkboxesHospital).map(
    (checkbox) => checkbox.value
  );

  // Récupérer les valeurs de recherche pour spécialité et DECT
  const specialtySearch = document
    .getElementById("specialty-search")
    .value.toLowerCase();
  const dectSearch = document.getElementById("dect-search").value.toLowerCase();

  // Sélectionner toutes les lignes du tableau
  const rows = Array.from(
    document.querySelectorAll("#table-container table tr")
  ).slice(1);

  rows.forEach((row) => {
    const typeCell = row.getAttribute("data-type");
    const hospitalCell = row.getAttribute("data-hospital");
    const specialtyCell = row.getAttribute("data-specialty").toLowerCase();
    const dectCell = row.getAttribute("data-dect").toLowerCase();

    // Vérifier si chaque ligne correspond aux critères sélectionnés
    const matchtype =
      selectedtypeValues.length === 0 || selectedtypeValues.includes(typeCell);
    const matchHospital =
      selectedHopitaux.length === 0 || selectedHopitaux.includes(hospitalCell);
    const matchSpecialty =
      specialtySearch === "" || specialtyCell.includes(specialtySearch);
    const matchDect = dectSearch === "" || dectCell.includes(dectSearch);

    // Si tous les critères sont remplis, afficher la ligne, sinon la masquer
    if (matchtype && matchHospital && matchSpecialty && matchDect) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function ouvrirLien(onglet) {
  const element = document.getElementById(onglet);
  if (element.style.display === "none" || element.style.display === "") {
    element.style.display = "block"; // Afficher l'élément
    setTimeout(function () {
      element.style.opacity = "1"; // Appliquer la transition d'opacité
      element.style.pointerEvents = "auto"; // Permettre l'interaction
    }, 10); // Petite temporisation pour s'assurer que le display est défini avant de changer l'opacité
  } else {
    element.style.opacity = "0"; // Rendre l'élément invisible
    setTimeout(function () {
      element.style.display = "none"; // Cacher l'élément après la transition
      element.style.pointerEvents = "none"; // Désactiver l'interaction
    }, 300); // Attendre la fin de la transition d'opacité
  }
}

// Initialisation de la recherche (identique à ton code)
function initializeSearchInput(scores) {
  const searchInput = document.getElementById("ajoutScore");
  const localisationButton = document.getElementById("ajoutSelectionScore");
  suggestionsContainer = document.createElement("div");
  localisationButton.parentNode.insertBefore(
    suggestionsContainer,
    localisationButton.nextSibling
  );

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    showSuggestions(query, scores);
    selectedIndex = -1;
  });

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      navigateSuggestions(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      navigateSuggestions(-1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      selectSuggestion();
    }
  });

  suggestionsContainer.addEventListener("click", function (e) {
    const target = e.target.closest(".suggestion-item");
    if (target) {
      const selectedTitle = target.getAttribute("data-titre");
      searchInput.value = selectedTitle;
      suggestionsContainer.innerHTML = "";
    }
  });
}

// Suggestions → recherche sur "motsCle"
function showSuggestions(query, scores) {
  suggestionsContainer.innerHTML = "";
  if (query.length === 0) return;

  const matchingScores = scores.filter(
    (score) =>
      Array.isArray(score.motsCle) &&
      score.motsCle.some((tag) => tag.toLowerCase().includes(query))
  );

  matchingScores.forEach((score, index) => {
    const suggestion = document.createElement("div");
    suggestion.classList.add("suggestion-item");
    suggestion.innerHTML = `
      <div class="scoreSuggestion">${score.titre}</div>
      <div class="intituleRecherche">${score.description || ""}</div>
    `;
    suggestion.setAttribute("data-titre", score.titre);
    suggestionsContainer.appendChild(suggestion);

    if (index === selectedIndex) {
      suggestion.classList.add("selected");
    }
  });
}

// Naviguer dans les suggestions
function navigateSuggestions(direction) {
  const items = suggestionsContainer.querySelectorAll(".suggestion-item");
  if (items.length === 0) return;

  if (selectedIndex >= 0 && selectedIndex < items.length) {
    items[selectedIndex].classList.remove("selected");
  }

  selectedIndex = (selectedIndex + direction + items.length) % items.length;
  items[selectedIndex].classList.add("selected");
  items[selectedIndex].scrollIntoView({ block: "nearest" });
}

// Sélection
function selectSuggestion() {
  const items = suggestionsContainer.querySelectorAll(".suggestion-item");
  if (selectedIndex >= 0 && selectedIndex < items.length) {
    const selectedItem = items[selectedIndex];
    const selectedTitle = selectedItem.getAttribute("data-titre");
    document.getElementById("ajoutScore").value = selectedTitle;
    suggestionsContainer.innerHTML = "";
  }
}

// Ouverture modale simple
function addScore() {
  const scoreTitre = document.getElementById("ajoutScore").value;
  const selectedScore = scores.find((score) => score.titre === scoreTitre);

  if (selectedScore) {
    showScoreModal(selectedScore);
  } else {
    alert("Veuillez sélectionner un score valide.");
  }
}

function showScoreModal(score) {
  // Crée le conteneur modal
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Bouton fermer
  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.textContent = "×";
  closeButton.addEventListener("click", closeModal);

  // Titre
  const h2 = document.createElement("h2");
  h2.textContent = score.titre;

  // Description (respecte les retours à la ligne)
  const pDesc = document.createElement("p");
  pDesc.style.whiteSpace = "pre-line";
  pDesc.textContent = score.description || "";

  // Score -> utiliser DIV car le contenu peut contenir des <table>
  const pScore = document.createElement("div");
  pScore.style.whiteSpace = "pre-line";
  pScore.innerHTML = `<b>Score :</b> <br>${score.score || ""}`;

  // Appliquer un style aux tableaux éventuellement présents DANS pScore
  pScore.querySelectorAll("table").forEach((table) => {
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    // style cells
    table.querySelectorAll("td, th").forEach((cell) => {
      cell.style.textAlign = "left";
      cell.style.border = "1px solid black";
      cell.style.padding = "4px";
    });
  });

  // Préparer (mais ne pas "const" dans le bloc) l'image pour l'insérer plus tard
  let img = null;
  if (score.imageUrl) {
    img = document.createElement("img");
    img.src = score.imageUrl;
    img.alt = "Illustration du score";
    img.style.maxWidth = "50%";
    img.style.marginBottom = "10px";
    img.style.display = "block";
  }

  // Zone libre (préremplie si score.default existe)
  const textarea = document.createElement("textarea");
  textarea.id = "freeText";
  textarea.style.width = "100%";
  textarea.style.height = "80px";
  textarea.value = score.default || "";

  const existingScore = Array.from(
    document.querySelectorAll("#compteRendu .scoreP")
  ).find((p) => p.textContent.startsWith(score.titre));

  if (existingScore) {
    // extraire ce qui est après " : " si présent
    const parts = existingScore.textContent.split(" : ");
    textarea.value = parts[1] || "";
  } else {
    textarea.value = score.default || "";
  }

  // Bouton Ajouter au CR
  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.textContent = "Ajouter au CR";
  addButton.addEventListener("click", () => {
    addScoreToCR(score.titre);
  });

  // Ajoute tous les éléments dans la modal dans l'ordre voulu
  modalContent.appendChild(closeButton);
  modalContent.appendChild(h2);
  modalContent.appendChild(pDesc);
  modalContent.appendChild(pScore);
  if (img) modalContent.appendChild(img); // n'ajoute que si img != null
  modalContent.appendChild(textarea);
  modalContent.appendChild(addButton);

  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
}

// Ajout au CR
function addScoreToCR(titre) {
  const freeText = document.getElementById("freeText").value;

  // Cherche si le score est déjà présent
  const existingScoreDiv = Array.from(
    document.querySelectorAll("#compteRendu .score-entry")
  ).find((div) => div.querySelector(".scoreP").textContent.startsWith(titre));

  if (existingScoreDiv) {
    // Met à jour le texte libre existant
    const p = existingScoreDiv.querySelector(".scoreP");
    p.innerHTML = `<b>${titre}</b>${freeText ? " : " + freeText : ""}`;
  } else {
    // Sinon, crée une nouvelle entrée
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("score-entry");
    resultDiv.innerHTML = `
      <p class="scoreP"><b>${titre}</b>${freeText ? " : " + freeText : ""}</p>
      <button type="button" class="remove-score-btn" onclick="removeScore(this)">x</button>
    `;
    document.getElementById("compteRendu").appendChild(resultDiv);
  }

  document.getElementById("ajoutScore").value = "";
  closeModal();
}

// Quand un score dans le compte rendu est cliqué
document.getElementById("compteRendu").addEventListener("click", function (e) {
  // Vérifie si on a cliqué sur un <p> de score
  const scoreP = e.target.closest(".scoreP");
  if (!scoreP) return;

  // Récupère le titre du score
  const titre = scoreP.querySelector("b").textContent;

  // Récupère le texte libre existant (après les " : ")
  const freeText = scoreP.textContent.includes(" : ")
    ? scoreP.textContent.split(" : ")[1]
    : "";

  // Cherche l'objet score correspondant (dans ton tableau de scores)
  const score = scores.find((s) => s.titre === titre);
  if (!score) return;

  // Préremplir freeText dans l'objet score pour showScoreModal
  score.default = freeText;

  // Ouvre la modal
  showScoreModal(score);
});

function removeScore(button) {
  button.parentElement.remove();
}

// Fermer & supprimer
function closeModal() {
  const modal = document.querySelector(".modal-overlay");
  if (modal) modal.remove();
}

// Exposer globalement
window.addScore = addScore;
window.closeModal = closeModal;
window.removeScore = removeScore;

// --- Utilitaires ---
function slugify(s) {
  return String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // enlève accents
    .replace(/[^a-z0-9]+/g, "-") // remplace par des tirets
    .replace(/^-+|-+$/g, ""); // trim
}

// Crée les conteneurs si absents (compatible avec ton index.html actuel)
function ensureCliniqueContainers() {
  const examenBloc =
    document.querySelector("#examenClinique .subSectionTemporaire") ||
    document.getElementById("examenClinique") ||
    document.body;

  if (!document.getElementById("specialite-checkboxes")) {
    const fs = document.createElement("fieldset");
    fs.className = "fieldDeroulant";
    fs.innerHTML = `
      <legend>Choisir les spécialités</legend>
      <div id="specialite-checkboxes" style="display:flex;flex-wrap:wrap;gap:10px;"></div>
    `;
    examenBloc.prepend(fs);
  }

  if (!document.getElementById("specialite-zones")) {
    const zones = document.createElement("div");
    zones.id = "specialite-zones";
    examenBloc.appendChild(zones);
  }
}

// --- Chargement des spécialités + UI dynamique ---
function loadSpecialites() {
  ensureCliniqueContainers();

  const checkboxesContainer = document.getElementById("specialite-checkboxes");
  const zonesContainer = document.getElementById("specialite-zones");

  db.collection("clinique")
    .where("type", "==", "defaultContent")
    // .orderBy("titre") // optionnel si index Firestore OK
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const specialite = data.specialite; // utilisé pour Firestore
        const titre = data.titre || specialite;
        const key = slugify(specialite); // utilisé pour les IDs DOM

        // --- Case à cocher ---
        const container = document.createElement("div");
        container.classList.add("btnCt");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `chk_${key}`;
        checkbox.value = specialite;

        const label = document.createElement("label");
        label.htmlFor = `chk_${key}`;
        label.textContent = specialite;

        container.appendChild(checkbox);
        container.appendChild(label);
        checkboxesContainer.appendChild(container);

        // --- Zone de texte (cachée au départ) ---
        const fieldset = document.createElement("fieldset");
        fieldset.id = `zone_${key}`;
        fieldset.classList.add("fieldsetText");
        fieldset.style.display = "none";

        fieldset.innerHTML = `
          <legend>
            ${specialite}
            <button class="clinicButton" data-role="default">⏩</button>
            <button class="clinicButton" data-role="extra">🔎</button>
            <button class="clinicButton" data-role="tools">🧰</button>
          </legend>
          <div id="text_${key}" class="editable-div" contenteditable="true" style="white-space: pre-line;"></div>
        `;

        zonesContainer.appendChild(fieldset);

        // Affichage/masquage au clic
        checkbox.addEventListener("change", () => {
          fieldset.style.display = checkbox.checked ? "block" : "none";
        });

        // Boutons ⏩ / 🔎 / 🧰 branchés en JS (pas d'onclick inline)
        const btnDefault = fieldset.querySelector(
          'button[data-role="default"]'
        );
        const btnExtra = fieldset.querySelector('button[data-role="extra"]');
        const btnTools = fieldset.querySelector('button[data-role="tools"]');

        btnDefault.addEventListener("click", () =>
          addDefaultContent(specialite)
        );
        btnExtra.addEventListener("click", () =>
          openExtraContentModal(specialite)
        );
        btnTools.addEventListener("click", () => {
          // Appelle une fonction 'nomDeLaSpeSansAccentEtMinusculesOutils' si elle existe
          const fnName = slugify(specialite) + "outils"; // ex: pediatrieoutils()
          const fn = window[fnName];
          if (typeof fn === "function") fn();
          else alert("Outil non encore disponible pour " + specialite);
        });
      });
    });
}

// --- ⏩ : insérer le defaultContent ---
function addDefaultContent(specialite) {
  const key = slugify(specialite);
  db.collection("clinique")
    .where("specialite", "==", specialite)
    .where("type", "==", "defaultContent")
    .get()
    .then((snapshot) => {
      const zone = document.getElementById(`text_${key}`);
      snapshot.forEach((doc) => {
        const data = doc.data();
        zone.innerHTML +=
          (zone.innerHTML.trim() ? "<br>" : "") + (data.contenu || "");
      });
    });
}

// --- 🔎 : modal des extraContent ---
function openExtraContentModal(specialite) {
  const key = slugify(specialite);

  db.collection("clinique")
    .where("specialite", "==", specialite)
    .where("type", "==", "extraContent")
    .get()
    .then((snapshot) => {
      const old = document.getElementById("extraModal");
      if (old) old.remove();

      if (snapshot.empty) {
        alert("Aucun contenu supplémentaire trouvé pour cette spécialité.");
        return;
      }

      let modalItems = "";
      snapshot.forEach((doc) => {
        const data = doc.data();
        modalItems += `
          <div class="extra-item" data-docid="${
            doc.id
          }" data-key="${key}" data-specialite="${specialite}">
            <strong>${data.titre || "(Sans titre)"}</strong><br>
            <em>${data.description || ""}</em>
          </div>
        `;
      });

      const modalHTML = `
        <div class="modal-overlay" id="extraModal">
          <div class="modal-content">
            <button class="close-button" onclick="closeModal()">×</button>
            <h2>Contenu supplémentaire - ${specialite}</h2>
            ${modalItems}
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML("beforeend", modalHTML);

      // Brancher chaque item
      document.querySelectorAll("#extraModal .extra-item").forEach((item) => {
        item.addEventListener("click", () => {
          const docId = item.getAttribute("data-docid");
          const spec = item.getAttribute("data-specialite");
          const key = item.getAttribute("data-key");
          addExtraContent(spec, docId, key);
        });
      });
    });
}

// Ajoute le contenu choisi à la zone d'édition
function addExtraContent(specialite, docId, key) {
  db.collection("clinique")
    .doc(docId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const zone = document.getElementById(`text_${key}`);
        if (!zone) {
          console.error("Zone introuvable pour", specialite, `(text_${key})`);
          return;
        }
        zone.innerHTML +=
          (zone.innerHTML.trim() ? "<br>" : "") + (data.contenu || "");
        closeModal();
      }
    });
}

// Fermer le modal
function closeModal() {
  const modal = document.getElementById("extraModal");
  if (modal) modal.remove();
}

// --- init ---
document.addEventListener("DOMContentLoaded", () => {
  ensureCliniqueContainers();
  loadSpecialites();
});

let inlineScoreSuggestions = null;
let selectedInlineIndex = -1;
let currentEditableElement = null;
let scores = [];

// Charger les scores depuis Firebase
function loadScores() {
  console.log("🔍 Début du chargement des scores...");

  db.collection("score")
    .get()
    .then((querySnapshot) => {
      scores = querySnapshot.docs.map((doc) => doc.data());
      console.log("✅ Scores chargés:", scores.length, "scores trouvés");
      if (scores.length > 0) {
        console.log("📊 Premier score:", scores[0]);
      }

      initializeSearchInput(scores); // Fonction déjà existante
      initializeInlineScoreSystem(); // Nouvelle initialisation
      console.log("🚀 Système inline initialisé");
    })
    .catch((error) => {
      alert("Impossible de charger les données depuis Firebase.");
    });
}

// Initialisation du système inline
function initializeInlineScoreSystem() {
  document.addEventListener("input", handleInlineInput, true);
  document.addEventListener("keydown", handleInlineKeydown, true);
  document.addEventListener("click", handleInlineClick, true);

  // Gestion du scroll pour repositionner les suggestions
  document.addEventListener(
    "scroll",
    () => {
      if (
        inlineScoreSuggestions &&
        inlineScoreSuggestions.style.display !== "none" &&
        currentEditableElement
      ) {
        positionInlineSuggestions(currentEditableElement);
      }
    },
    true
  );

  // Gestion du redimensionnement de la fenêtre
  window.addEventListener("resize", () => {
    if (
      inlineScoreSuggestions &&
      inlineScoreSuggestions.style.display !== "none" &&
      currentEditableElement
    ) {
      positionInlineSuggestions(currentEditableElement);
    }
  });
}

// Gestion de la saisie
function handleInlineInput(event) {
  const element = event.target;
  if (!isEditableElement(element)) return;

  currentEditableElement = element;
  const text = getTextContent(element);
  const caretPos = getCaretPosition(element);

  const beforeCaret = text.substring(0, caretPos);
  const doubleSlashMatch = beforeCaret.match(/\/\/([^\/\s]*)$/);

  if (doubleSlashMatch) {
    const query = doubleSlashMatch[1];
    const startPos = caretPos - doubleSlashMatch[0].length;
    showInlineScoreSuggestions(query, element, startPos, caretPos);
  } else {
    hideInlineScoreSuggestions();
  }
}

// Gestion du clavier
function handleInlineKeydown(event) {
  if (
    !inlineScoreSuggestions ||
    inlineScoreSuggestions.style.display === "none"
  )
    return;

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      navigateInlineSuggestions(1);
      break;
    case "ArrowUp":
      event.preventDefault();
      navigateInlineSuggestions(-1);
      break;
    case "Enter":
    case "Tab":
      event.preventDefault();
      selectInlineSuggestion();
      break;
    case "Escape":
      event.preventDefault();
      hideInlineScoreSuggestions();
      break;
  }
}

// Gestion des clics
function handleInlineClick(event) {
  if (
    inlineScoreSuggestions &&
    !inlineScoreSuggestions.contains(event.target)
  ) {
    hideInlineScoreSuggestions();
  }
}

// Vérifications utilitaires
function isEditableElement(element) {
  const isEditable =
    element &&
    (element.tagName === "TEXTAREA" ||
      (element.tagName === "INPUT" && element.type === "text") ||
      element.isContentEditable);
  return isEditable;
}

function getTextContent(el) {
  if (
    el.tagName === "TEXTAREA" ||
    (el.tagName === "INPUT" && el.type === "text")
  ) {
    return el.value;
  }
  return el.innerText || el.textContent || "";
}

function getCaretPosition(editableDiv) {
  let caretPos = 0;
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return caretPos;

  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(editableDiv);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  caretPos = preCaretRange.toString().length;
  return caretPos;
}

function setCaretPosition(element, position) {
  if (element.tagName === "TEXTAREA" || element.tagName === "INPUT") {
    element.focus();
    element.setSelectionRange(position, position);
  } else {
    const range = document.createRange();
    const selection = window.getSelection();
    let currentPos = 0;
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while ((node = walker.nextNode())) {
      const nodeLength = node.textContent.length;
      if (currentPos + nodeLength >= position) {
        range.setStart(node, position - currentPos);
        range.collapse(true);
        break;
      }
      currentPos += nodeLength;
    }

    selection.removeAllRanges();
    selection.addRange(range);
    element.focus();
  }
}

// Afficher les suggestions inline
function showInlineScoreSuggestions(query, element, startPos, endPos) {
  console.log("🎯 Recherche suggestions pour:", query);
  console.log("📊 Scores disponibles:", scores ? scores.length : 0);

  if (!scores || scores.length === 0) {
    console.log("❌ Aucun score disponible");
    return;
  }

  // Filtrer les scores selon la requête
  const matchingScores = scores.filter((score) => {
    if (!Array.isArray(score.motsCle)) {
      console.log("⚠️ Score sans motsCle array:", score.titre);
      return false;
    }

    const match = score.motsCle.some((tag) =>
      tag.toLowerCase().includes(query.toLowerCase())
    );

    if (match) {
      console.log(
        "✅ Score correspondant:",
        score.titre,
        "motsCle:",
        score.motsCle
      );
    }

    return match;
  });

  console.log("🎯 Scores correspondants trouvés:", matchingScores.length);

  if (matchingScores.length === 0) {
    hideInlineScoreSuggestions();
    return;
  }

  // Créer ou mettre à jour le conteneur de suggestions
  if (!inlineScoreSuggestions) {
    console.log("🆕 Création du conteneur de suggestions");
    inlineScoreSuggestions = document.createElement("div");
    inlineScoreSuggestions.className = "inline-score-suggestions";
    inlineScoreSuggestions.style.cssText = `
      position: fixed !important;
      background: white !important;
      border: 2px solid #007bff !important;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
      max-height: 200px;
      overflow-y: auto;
      z-index: 99999 !important;
      font-size: 14px;
      min-width: 250px;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    `;
    document.body.appendChild(inlineScoreSuggestions);
    console.log(
      "📦 Conteneur ajouté au DOM, style:",
      inlineScoreSuggestions.style.cssText
    );
  }

  // Vider et remplir les suggestions
  inlineScoreSuggestions.innerHTML = "";
  selectedInlineIndex = -1;

  matchingScores.forEach((score, index) => {
    const item = document.createElement("div");
    item.className = "inline-suggestion-item";
    item.style.cssText = `
      padding: 8px 12px;
      cursor: pointer;
      border-bottom: 1px solid #eee;
    `;
    item.innerHTML = `
      <div style="font-weight: bold; color: #333;">${score.titre}</div>
      <div style="font-size: 12px; color: #666; margin-top: 2px;">${
        score.description || ""
      }</div>
    `;

    item.addEventListener("click", () => {
      console.log("👆 Clic sur suggestion:", score.titre);
      selectedInlineIndex = index;
      selectInlineSuggestion();
    });

    item.addEventListener("mouseenter", () => {
      // Retirer la sélection précédente
      inlineScoreSuggestions
        .querySelectorAll(".inline-suggestion-item")
        .forEach((el) => {
          el.style.backgroundColor = "";
        });
      item.style.backgroundColor = "#f0f0f0";
      selectedInlineIndex = index;
    });

    inlineScoreSuggestions.appendChild(item);
  });

  // Positionner les suggestions près du curseur
  positionInlineSuggestions(element, startPos);
  inlineScoreSuggestions.style.display = "block";

  // Stocker les informations pour la sélection
  inlineScoreSuggestions.matchingScores = matchingScores;
  inlineScoreSuggestions.startPos = startPos;
  inlineScoreSuggestions.endPos = endPos;

  console.log("✅ Suggestions affichées");
}

// Positionner les suggestions près du curseur
function positionInlineSuggestions(element, textPosition) {
  const rect = element.getBoundingClientRect();
  // Pour position: fixed, on utilise directement les coordonnées du viewport
  let left = rect.left + 10; // Petit décalage
  let top = rect.bottom + 5;

  console.log("📍 Position élément:", rect);
  console.log("📍 Position calculée initiale:", { left, top });
  console.log(
    "📍 Dimensions fenêtre:",
    window.innerWidth,
    "x",
    window.innerHeight
  );

  // S'assurer que les suggestions restent visibles
  const suggestionsWidth = 250;
  const suggestionsHeight = 200;

  if (left + suggestionsWidth > window.innerWidth) {
    left = window.innerWidth - suggestionsWidth - 10;
    console.log("📍 Ajusté à gauche:", left);
  }

  if (top + suggestionsHeight > window.innerHeight) {
    top = rect.top - suggestionsHeight - 5;
    console.log("📍 Ajusté vers le haut:", top);
  }

  // Assurer des valeurs minimales positives
  left = Math.max(10, left);
  top = Math.max(10, top);

  console.log("📍 Position finale:", { left, top });

  inlineScoreSuggestions.style.left = left + "px";
  inlineScoreSuggestions.style.top = top + "px";

  // Vérification finale
  console.log("📍 Style appliqué:", {
    left: inlineScoreSuggestions.style.left,
    top: inlineScoreSuggestions.style.top,
    display: inlineScoreSuggestions.style.display,
    visibility: inlineScoreSuggestions.style.visibility,
    zIndex: inlineScoreSuggestions.style.zIndex,
  });
}
// Navigation & sélection
function navigateInlineSuggestions(direction) {
  const items = inlineScoreSuggestions.querySelectorAll(
    ".inline-suggestion-item"
  );
  if (items.length === 0) return;

  if (selectedInlineIndex >= 0) {
    items[selectedInlineIndex].style.backgroundColor = "";
  }

  selectedInlineIndex =
    (selectedInlineIndex + direction + items.length) % items.length;
  items[selectedInlineIndex].style.backgroundColor = "#f0f0f0";
  items[selectedInlineIndex].scrollIntoView({ block: "nearest" });
}

function selectInlineSuggestion() {
  if (!inlineScoreSuggestions || selectedInlineIndex < 0) return;

  const matchingScores = inlineScoreSuggestions.matchingScores;
  const startPos = inlineScoreSuggestions.startPos;
  const endPos = inlineScoreSuggestions.endPos;

  if (!matchingScores || selectedInlineIndex >= matchingScores.length) return;

  const selectedScore = matchingScores[selectedInlineIndex];

  // 🔑 Sauvegarde avant d’ouvrir la modal
  const targetElement = currentEditableElement;
  const targetStart = startPos;
  const targetEnd = endPos;

  showInlineScoreModal(selectedScore, (result) => {
    console.log("⚡ Callback reçu avec result :", result);
    insertScoreResult(targetElement, targetStart, targetEnd, result);
  });

  hideInlineScoreSuggestions();
}

// Modal d'insertion
function showInlineScoreModal(score, onComplete) {
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.textContent = "×";
  closeButton.addEventListener("click", () => {
    modalOverlay.remove();
  });

  const h2 = document.createElement("h2");
  h2.textContent = score.titre;

  const pDesc = document.createElement("p");
  pDesc.style.whiteSpace = "pre-line";
  pDesc.textContent = score.description || "";

  const pScore = document.createElement("div");
  pScore.style.whiteSpace = "pre-line";
  pScore.innerHTML = `<b>Score :</b><br>${score.score || ""}`;

  modalContent.append(closeButton, h2, pDesc, pScore);

  if (score.imageUrl) {
    const img = document.createElement("img");
    img.src = score.imageUrl;
    img.alt = "Illustration du score";
    img.style.maxWidth = "50%";
    img.style.display = "block";
    modalContent.appendChild(img);
  }

  const textarea = document.createElement("textarea");
  textarea.style.width = "100%";
  textarea.style.height = "80px";
  textarea.value = score.default || "";

  const insertButton = document.createElement("button");
  insertButton.textContent = "Insérer ici";
  insertButton.addEventListener("click", () => {
    const result = score.titre + " " + textarea.value;
    console.log("💾 Bouton Insérer cliqué, résultat :", result);

    if (typeof onComplete === "function") {
      console.log("👉 Appel du callback onComplete");
      onComplete(result);
    } else {
      console.error("❌ Pas de callback onComplete défini !");
    }

    modalOverlay.remove();
  });

  modalContent.append(textarea, insertButton);
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
}

// Insertion du texte choisi
function insertScoreResult(element, startPos, endPos, result) {
  console.log("📝 Insertion demandé:", { element, startPos, endPos, result });

  if (!element) {
    console.error("❌ Aucun élément cible trouvé pour l’insertion !");
    return;
  }

  if (element.tagName === "TEXTAREA" || element.tagName === "INPUT") {
    const text = element.value;
    element.value =
      text.substring(0, startPos) + result + text.substring(endPos);
    setCaretPosition(element, startPos + result.length);
    console.log("✅ Texte inséré dans input/textarea");
  } else {
    const text = element.textContent;
    element.textContent =
      text.substring(0, startPos) + result + text.substring(endPos);
    setCaretPosition(element, startPos + result.length);
    console.log("✅ Texte inséré dans contenteditable");
  }

  element.focus();
}

// Masquer les suggestions
function hideInlineScoreSuggestions() {
  if (inlineScoreSuggestions) {
    inlineScoreSuggestions.style.display = "none";
  }
  selectedInlineIndex = -1;
}

// Ajouter le CSS
if (!document.getElementById("inline-score-styles")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "inline-score-styles";
  styleSheet.textContent = `
    .inline-score-suggestions { font-family: Arial, sans-serif; }
    .inline-suggestion-item:last-child { border-bottom: none; }
    .inline-suggestion-item:hover { background-color: #f0f0f0 !important; }
  `;
  document.head.appendChild(styleSheet);
}

// Lancement
console.log("🚀 Système inline de scores chargé");
loadScores();
