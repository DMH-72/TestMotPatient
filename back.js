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

let contentAdvanceMap = {
  General: `Etat hydratation`,
  Cardio: `
        <u>A l’interrogatoire:</u> Pas de douleur thoracique, pas de dyspnée, pas de palpitation <br>
        <u>A l’inspection :</u> Pas de turgescence jugulaires, pas d’œdème des membres inférieurs/lombes, pas de troubles trophiques, en résumé, pas de signes d’insuffisance cardiaque<br>
        <u>A la palpation :</u>  Pas de reflux abdomino-jugulaire, Pouls périphériques perçus (Radiale, Ulnaire, Tibial postérieur et Pédieux), mollets indolores (tour de mollet droit/gauche)<br>
        <u>A l’auscultation </u>: pas de bruits surajoutés, pas de souffles cardiaques perçus, pas de souffles carotidiens, pas de crépitants en bases pulmonaires<br>
        <u>En résumé,</u> pas d’anomalies perçues à l’examen cardio-vasculaire, pas de signe d’insuffisance cardiaque ou vasculaire
        `,
  Pneumo: `
        <u>A l’interrogatoire :</u> Pas de douleur thoracique, pas de dyspnée, pas d’expectoration/bronchorrhée, pas de toux, pas d’ATCD de Syndrome d’Apnée Obstructive du Sommeil <br>
        <u>A l’inspection :</u> Mouvement thoracique normaux et synchrones, pas de signe de cyanose, pas d’hippocratisme digital, pas de syndrome cave supérieur <br>
        <u>A la palpation :</u> Vibrations Vocales perçues <br>
        <u>A l’auscultation :</u> Murmures vésiculaires symétriques et perçus clairement, sans bruits surajoutés <br>
        <u>En résumé :</u> Pas d’anomalie à l’examen pneumologique, pas de signe de détresse respiratoire
        `,
  Neuro: `TestNeuro`,
  Dig: `
        <u>A l’interrogatoire :</u> pas de douleur, pas de trouble transit, pas de signe d’hémorragie haute/basse , pas de signe de syndrome œsophagien ou rectal<br>
        <u>A l’inspection :</u> Pas d’hernie, pas de distension abdominale (TT=) pas d’ictère, pas de Circulation Veineuse Collatérale, aspect buccale sans particularité notable (pas d’érosion, langue humide et rosée) pas de signe d’insuffisance hépato-cellulaire (pas d’angiomes stellaires, pas de flapping tremor, pas de fetor hépatique, pas d’hippocratisme digitale)<br>
        <u>A l’auscultation :</u>  Bruits hydro-aériques perçus, pas de souffles perçus<br>
        <u>A la palpation :</u> Abdomen souple indolore et dépressible, pas de signe de Murphy, pas de douleur au point de Mc-Burnay, pas de signe de syndrome péritonéale (décompression indolore), pas d’anomalies des orifices herniaires, pas d’hépatomégalie perçu, pas de splénomégalie perçu<br>
        <u>A la percussion :</u> diffus panache matité/tympanisme, pas de signe du flot, pas de signe du glaçon
        `,
  Uro: `
        <u>A l’interrogatoire :</u> pas de signes fonctionnels urinaires, pas de troubles mictionnels, pas d’écoulements urétraux, aspect normal des urines<br>
        <u>A l’inspection :</u> Pas de voussure hypogastrique<br>
        <u>A la palpation :</u> pas de globe urinaire<br>
        <u>A la percussion:</u> signe de Giordano négatif
        `,
  Rhumato: `
        <u>A l’interrogatoire :</u> pas de douleur, pas de troubles de la marche et pas de troubles articulaires (à base de raideur, gonflement, blocage ou craquement)<br>
        <u>A l’examen du rachis :</u> pas d’anomalies des courbures rachidiennes, pas de troubles de la souplesse, pas de douleur  localisée ou projetée à la palpation des épineuses, pas de raideur des muscles paravertébraux<br>
        <u>A l’examen sacro-iliaque :</u> pas de troubles de la mobilisation<br>
        <u>Articulation périphérique :</u><br>
        <li>A l’inspection : pas de signes inflammatoires locaux , pas de déformation, pas d’amyotrophie perçue
        <li>A la palpation : pas d’épanchements ,
        <li>Pas de troubles de la mobilité active et passive
        <li>Pas de douleur ligamentaire ou méniscale
        `,
  Gyneco: `
        La patiente de pense pas avoir la nécessité d’un test de grossesse, et consent à la réalisation de l'examen.<br>
        <u>A l’interrogatoire :</u> pas de douleur rapportée (cyclique, dyspareunie, mammaire), pas d’écoulements génitaux et mammaires , pas d’aménorrhée, pas de prurit vulvaire<br>
        <u>A l’inspection :</u> pas de masse ou de douleurs abdominale<br>
        <u>Examen sénologique :</u> pas d’anomalies à l’inspection et à la palpation, pas d’écoulements provoqués, manœuvre de Tillaux négative, pas d’adénopathies
        `,
  Psy: `testPsy`,
  ORL: `testORL`,
  Dermato: `testDermato`,
  Ped: `testPed`,
};

// Fonction générale pour ajouter le contenu selon la spécialité
function advenceClinic(specialite) {
  // On récupère l'élément en fonction de la spécialité
  let element = document.getElementById("examenClinique" + specialite);

  // Vérifier si l'élément existe
  if (!element) {
    console.error(
      "L'élément avec l'ID 'examenClinique" + specialite + "' n'existe pas."
    );
    return;
  }

  // Récupérer le contenu actuel de l'élément
  let curentTexte = element.innerHTML;

  // Récupérer le contenu associé à la spécialité depuis l'objet contentAdvanceMap
  let contentAdvance = contentAdvanceMap[specialite];

  // Vérifier si du contenu existe pour cette spécialité
  if (!contentAdvance) {
    console.error("Pas de contenu défini pour la spécialité :", specialite);
    return;
  }

  // Ajouter le nouveau contenu en fonction de l'état actuel
  if (curentTexte.trim() != "") {
    element.innerHTML = `${curentTexte}<br>${contentAdvance}`;
  } else {
    element.innerHTML = `${contentAdvance}`;
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

let scores = [];
let selectedIndex = -1; // Index de l'élément sélectionné
let suggestionsContainer;

fetch("score.json") // Remplacez par le chemin de votre fichier JSON
  .then((response) => response.json())
  .then((data) => {
    scores = data;
    initializeSearchInput(scores);
    const searchInput = document.getElementById("ajoutScore");
    if (searchInput) {
      // searchInput.focus();
      console.log("Focus placé sur l'input après interaction utilisateur");
    }
  })
  .catch((error) => {
    console.error("Erreur lors du chargement du fichier JSON:", error);
    alert("Impossible de charger les données des scores.");
  });

// Initialisation de la recherche
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
    selectedIndex = -1; // Réinitialiser l'index sélectionné
  });

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      navigateSuggestions(1); // Aller au résultat suivant
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      navigateSuggestions(-1); // Aller au résultat précédent
    } else if (e.key === "Enter") {
      e.preventDefault();
      selectSuggestion(); // Sélectionner l'élément sélectionné
    }
  });

  suggestionsContainer.addEventListener("click", function (e) {
    const target = e.target.closest(".suggestion-item");
    if (target) {
      const selectedTitle = target.getAttribute("data-titre");
      searchInput.value = selectedTitle;
      suggestionsContainer.innerHTML = ""; // Vider les suggestions après sélection
    }
  });
}

// Afficher les suggestions basées sur la requête
function showSuggestions(query, scores) {
  suggestionsContainer.innerHTML = ""; // Vider les suggestions précédentes

  if (query.length === 0) return;

  const matchingScores = scores.filter((score) =>
    score.tag_recherche.some((tag) => tag.id.toLowerCase().includes(query))
  );

  matchingScores.forEach((score, index) => {
    const suggestion = document.createElement("div");
    suggestion.classList.add("suggestion-item");

    // Ajout de l'intitulé_recherche sous le titre
    suggestion.innerHTML = `
            <div class="scoreSuggestion">${score.titre}</div>
            <div class="intituleRecherche">${
              score.intitulé_recherche || ""
            }</div>
        `;
    suggestion.setAttribute("data-titre", score.titre);
    suggestionsContainer.appendChild(suggestion);

    if (index === selectedIndex) {
      suggestion.classList.add("selected"); // Mettre en surbrillance l'élément sélectionné
    }
  });
}

// Naviguer entre les suggestions avec les touches fléchées
function navigateSuggestions(direction) {
  const items = suggestionsContainer.querySelectorAll(".suggestion-item");
  if (items.length === 0) return;

  // Désélectionner l'élément actuel
  if (selectedIndex >= 0 && selectedIndex < items.length) {
    items[selectedIndex].classList.remove("selected");
  }

  // Calculer le nouvel index sélectionné
  selectedIndex = (selectedIndex + direction + items.length) % items.length;

  // Sélectionner le nouvel élément
  items[selectedIndex].classList.add("selected");
  items[selectedIndex].scrollIntoView({ block: "nearest" }); // Faire défiler jusqu'à l'élément sélectionné
}

// Sélectionner l'élément suggéré
function selectSuggestion() {
  const items = suggestionsContainer.querySelectorAll(".suggestion-item");
  if (selectedIndex >= 0 && selectedIndex < items.length) {
    const selectedItem = items[selectedIndex];
    const selectedTitle = selectedItem.getAttribute("data-titre");

    const searchInput = document.getElementById("ajoutScore");
    searchInput.value = selectedTitle;

    suggestionsContainer.innerHTML = ""; // Vider les suggestions après sélection
  }
}

// Fonction appelée lorsque l'utilisateur clique sur "Ajouter le score"
function addScore() {
  const searchInput = document.getElementById("ajoutScore");
  const scoreTitre = searchInput.value;

  // Récupérer le score correspondant à partir de la liste de scores (ceux chargés depuis JSON)
  const selectedScore = scores.find((score) => score.titre === scoreTitre);

  if (selectedScore) {
    // Afficher la fenêtre modale pour compléter le score
    showScoreModal(selectedScore);
  } else {
    alert("Veuillez sélectionner un score valide.");
  }
}

// Fonction pour afficher la fenêtre modale
function showScoreModal(score) {
  // Créer une structure HTML pour la modale
  const modalContent = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="close-button" onclick="closeModal()">×</button>
                <h2>${score.titre}</h2>
                <p>${score.description}</p>
                <form id="scoreForm" oninput="updateScorePreview('${
                  score.affichage_debutResultat
                }', '${score.unite}')">
                    ${generateScoreFormFields(score.contenu_critere)}
                    <div id="scorePreview"></div>
                    <button type="button" onclick="addScoreToCR('${
                      score.titre
                    }', '${score.affichage_debutResultat}', '${
    score.unite
  }')">Ajouter le score au CR</button>
                </form>
                <p><i style="font-size: 0.9em;"><u>Interprétation :</u> ${
                  score.interpretation
                }</i></p>
            </div>
        </div>
    `;

  // Ajouter la modale au DOM
  document.body.insertAdjacentHTML("beforeend", modalContent);

  // Appeler updateScorePreview pour afficher l'aperçu initial dès l'ouverture de la modale
  updateScorePreview(score.affichage_debutResultat, score.unite);
}

// Fonction pour fermer la modale
function closeModal() {
  const modal = document.querySelector(".modal-overlay");
  if (modal) {
    modal.remove();
  }
}

// Fonction pour générer les champs de formulaire en fonction des critères
function generateScoreFormFields(criteria) {
  return criteria
    .map((critere) => {
      // Si c'est un menu déroulant
      if (critere.menu_deroulant.actif) {
        return `
                <div class="form-group">
                    <label>${critere.titre}</label>
                    <select name="${critere.titre}">
                        ${Object.values(critere.menu_deroulant.options)
                          .map(
                            (option) => `
                            <option value="${option.valeur}" data-affichage="${option.affichage_score_final}">${option.description}</option>
                        `
                          )
                          .join("")}
                    </select>
                    <br><i style="font-size: 0.8em;">${critere.description}</i>
                </div>
            `;
      }

      // Si c'est une case à cocher
      if (critere.case_cocher.actif) {
        return `
                <div class="form-group">
                    <label>
                        <input type="checkbox" name="${critere.titre}" value="${critere.case_cocher.options.coche_true.valeur}">
                        ${critere.titre} (${critere.case_cocher.options.coche_true.valeur})
                        <br><i style="font-size: 0.8em;">${critere.description}</i>
                    </label>
                </div>
            `;
      }

      return ""; // Retourner une chaîne vide si aucun critère actif
    })
    .join("");
}

function addScoreToCR(titre, affichage_debutResultat, unite) {
  const form = document.getElementById("scoreForm");
  const formData = new FormData(form);
  let scoreTotal = 0;
  let scoreDetail = "";

  // Parcourir tous les champs du formulaire
  formData.forEach((value, key) => {
    const inputElement = form.querySelector(`[name="${key}"]`);

    // Si c'est un menu déroulant
    if (inputElement.tagName === "SELECT") {
      scoreTotal += parseInt(value);
      const selectedOption = inputElement.selectedOptions[0];
      scoreDetail += `${selectedOption.dataset.affichage}, `;
    }

    // Si c'est une case à cocher
    if (inputElement.type === "checkbox") {
      if (inputElement.checked) {
        const checkboxValue = parseInt(inputElement.value);
        scoreTotal += checkboxValue;
        scoreDetail += `${key}, `;
      }
    }
  });

  // Créer une div pour afficher le score dans le CR avec un bouton de suppression
  const resultDiv = document.createElement("div");
  resultDiv.classList.add("score-entry"); // Ajouter une classe pour pouvoir styliser le score et le bouton de suppression
  resultDiv.innerHTML = `
        <p class="scoreP">${affichage_debutResultat} ${scoreTotal} ${unite} (${scoreDetail
    .trim()
    .slice(0, -1)})</p>
        <button type="button" class="remove-score-btn" onclick="removeScore(this)">x</button>
    `;
  document.getElementById("compteRendu").appendChild(resultDiv);

  // Fermer la modale
  document.querySelector(".modal-overlay").remove();
}

// Fonction pour supprimer un score du compte rendu
function removeScore(button) {
  button.parentElement.remove();
}

// Fonction pour mettre à jour l'aperçu du score
function updateScorePreview(affichage_debutResultat, unite) {
  const form = document.getElementById("scoreForm");
  const formData = new FormData(form);
  let scoreTotal = 0;
  let scoreDetail = "";

  // Parcourir tous les champs du formulaire
  formData.forEach((value, key) => {
    const inputElement = form.querySelector(`[name="${key}"]`);

    // Si c'est un menu déroulant
    if (inputElement.tagName === "SELECT") {
      scoreTotal += parseInt(value);
      const selectedOption = inputElement.selectedOptions[0];
      scoreDetail += `${selectedOption.dataset.affichage}, `;
    }

    // Si c'est une case à cocher
    if (inputElement.type === "checkbox") {
      if (inputElement.checked) {
        const checkboxValue = parseInt(inputElement.value);
        scoreTotal += checkboxValue;
        scoreDetail += `${key}, `;
      }
    }
  });

  // Mettre à jour l'aperçu du score
  const scorePreview = document.getElementById("scorePreview");
  scorePreview.innerHTML = `<p>Aperçu: ${affichage_debutResultat} ${scoreTotal} ${unite} (${scoreDetail
    .trim()
    .slice(0, -1)})</p>`;
}

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
