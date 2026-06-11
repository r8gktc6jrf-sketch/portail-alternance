"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AccesInterne,
  accesInternes,
  peutVoirTousLesCampus,
} from "../data/access";
import {
  campusOptions,
  getMarquesPourCampus,
  getPromosPourCampusEtMarque,
} from "../data/filieres";

type Presentation = {
  offreId: string;
  nomEntreprise: string;
  titrePoste: string;
  ville: string;
  niveauRecherche: string;
  typeContrat: string;
  datePresentation: string;
};

type CV = {
  nom: string;
  url: string;
  campus: string;
  marque: string;
  niveau: string;
  promo: string;
  nomEtudiant: string;
  prenomEtudiant: string;
  deposeParNom: string;
  deposeParEmail: string;
  dateDepot: string;
  statut?: "recherche" | "place";
  presentations?: Presentation[];
};

type Offre = {
  id: string;
  nomEntreprise: string;
  nomContact: string;
  emailContact: string;
  telephoneContact: string;
  titrePoste: string;
  description: string;
  ville: string;
  niveau: string;
  typeContrat: string;
  dureeContrat: string;
  competences: string[];
  nombreCV: number;
  dateDepot: string;
  cvProposes: string[];
};

const niveaux = ["Bac +1", "Bac +2", "Bac +3", "Bac +4", "Bac +5"];

const pastel = {
  yellow: "#ffed73",
  blue: "#b7e4ff",
  purple: "#d9b8ff",
  peach: "#f3c7b0",
  green: "#a7e8c5",
  dark: "#242424",
  card: "#333333",
};

function estDireCo(role: string) {
  const r = role.toUpperCase();

  return (
    r === "DIRE CO" ||
    r === "DIRECO" ||
    r === "DIRECTION CO" ||
    r === "DIRECTION COMMERCIALE"
  );
}

function niveauEnNumero(niveau: string) {
  return niveau.replace("Bac +", "");
}

function villeDepuisCampus(campus: string) {
  const c = campus.toUpperCase();

  if (c.includes("PARIS")) return "PARIS";
  if (c.includes("LILLE")) return "LILLE";
  if (c.includes("LYON")) return "LYON";
  if (c.includes("AIX")) return "AIX-EN-PROVENCE";
  if (c.includes("BORDEAUX")) return "BORDEAUX";
  if (c.includes("NANTES")) return "NANTES";
  if (c.includes("TOULOUSE")) return "TOULOUSE";
  if (c.includes("RENNES")) return "RENNES";
  if (c.includes("TOULON")) return "TOULON";
  if (c.includes("GRENOBLE")) return "GRENOBLE";
  if (c.includes("REIMS")) return "REIMS";
  if (c.includes("MONTPELLIER")) return "MONTPELLIER";
  if (c.includes("NICE")) return "NICE";
  if (c.includes("ORLÉANS") || c.includes("ORLEANS")) return "ORLEANS";
  if (c.includes("POITIERS")) return "POITIERS";
  if (c.includes("ROUEN")) return "ROUEN";
  if (c.includes("TOURS")) return "TOURS";
  if (c.includes("LE HAVRE")) return "LE HAVRE";

  return campus.toUpperCase();
}

function retrouverCampusReference(campusUtilisateur: string) {
  const campusMaj = campusUtilisateur.toUpperCase();

  const trouve = campusOptions.find((campus) =>
    campusMaj.includes(
      campus
        .toUpperCase()
        .replace("CAMPUS ", "")
        .replace("EDUCTIVE ", "")
        .replace("SKOLAE ", "")
    )
  );

  if (trouve) return trouve;

  if (campusMaj.includes("PPA PARIS")) return "Campus PPA Paris";
  if (campusMaj.includes("ESGI PARIS")) return "Campus ESGI Paris";
  if (campusMaj.includes("EIML PARIS")) return "Campus EIML Paris";
  if (campusMaj.includes("MODART PARIS")) return "Campus MODART Paris";
  if (campusMaj.includes("ISFJ PARIS")) return "Campus ISFJ Paris";
  if (campusMaj.includes("ENGDE")) return "Campus ENGDE Paris";
  if (campusMaj.includes("EFAB")) return "Campus EFAB Paris";
  if (campusMaj.includes("ESIS")) return "Campus ESIS Paris";
  if (campusMaj.includes("ISA PARIS")) return "Campus ISA Paris";
  if (campusMaj.includes("CFPJ")) return "Campus C.F.P.J Paris";
  if (campusMaj.includes("ECOLE W")) return "Campus Ecole W Paris";
  if (campusMaj.includes("ICAN")) return "Campus ICAN Paris";
  if (campusMaj.includes("ROUEN")) return "Campus SKOLAE Rouen";
  if (campusMaj.includes("LE HAVRE")) return "Campus SKOLAE Le Havre";
  if (campusMaj.includes("NICE")) return "Campus SKOLAE Nice";
  if (campusMaj.includes("MONTPELLIER")) return "Campus SKOLAE Montpellier";
  if (campusMaj.includes("AIX")) return "Campus Eductive Aix";
  if (campusMaj.includes("BORDEAUX")) return "Campus Eductive Bordeaux";
  if (campusMaj.includes("LYON")) return "Campus Sciences-U Lyon";
  if (campusMaj.includes("NANTES")) return "Campus Eductive Nantes";
  if (campusMaj.includes("RENNES")) return "Campus Eductive Rennes";
  if (campusMaj.includes("TOULON")) return "Campus Eductive Toulon";
  if (campusMaj.includes("TOULOUSE")) return "Campus Eductive Toulouse";
  if (campusMaj.includes("GRENOBLE")) return "Campus Eductive Grenoble";
  if (campusMaj.includes("REIMS")) return "Campus Eductive Reims";

  return campusUtilisateur;
}

export default function CrePage() {
  const [utilisateur, setUtilisateur] = useState<AccesInterne | null>(null);
  const [mode, setMode] = useState("");

  const [campus, setCampus] = useState("");
  const [marque, setMarque] = useState("");
  const [niveau, setNiveau] = useState("");
  const [promo, setPromo] = useState("");

  const [nomEtudiant, setNomEtudiant] = useState("");
  const [prenomEtudiant, setPrenomEtudiant] = useState("");

  const [cvs, setCvs] = useState<CV[]>([]);
  const [offres, setOffres] = useState<Offre[]>([]);
  const [resultatsRecherche, setResultatsRecherche] = useState<
    (CV & { indexGlobal: number })[]
  >([]);

  const [rechercheEffectuee, setRechercheEffectuee] = useState(false);
  const [fichierSelectionne, setFichierSelectionne] = useState<File | null>(null);

  const [voirMesCV, setVoirMesCV] = useState(false);
  const [voirToutesOffres, setVoirToutesOffres] = useState(false);

  const [nomRechercheEquipe, setNomRechercheEquipe] = useState("");
  const [resultatEquipe, setResultatEquipe] = useState<{
    nom: string;
    email: string;
    campus: string;
    total: number;
    recherche: number;
    places: number;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modeUrl = params.get("mode") || "";
    setMode(modeUrl);

    const session = localStorage.getItem("session-interne");

    if (session) {
      const user = JSON.parse(session) as AccesInterne;
      setUtilisateur(user);

      if (modeUrl === "mon") {
        setCampus(retrouverCampusReference(user.campus));
      }
    }

    const sauvegardeCV = localStorage.getItem("cvs-cre");

    if (sauvegardeCV) {
      const cvsCharges: CV[] = JSON.parse(sauvegardeCV)
        .filter((cv: CV) => cv && cv.campus && cv.campus !== "undefined")
        .map((cv: CV) => ({
          ...cv,
          statut: cv.statut || "recherche",
          presentations: cv.presentations || [],
        }));

      setCvs(cvsCharges);
      localStorage.setItem("cvs-cre", JSON.stringify(cvsCharges));
    }

    const sauvegardeOffres = localStorage.getItem("offres-entreprises");

    if (sauvegardeOffres) {
      setOffres(JSON.parse(sauvegardeOffres));
    }
  }, []);

  function sauvegarderCV(nouveauxCV: CV[]) {
    setCvs(nouveauxCV);
    localStorage.setItem("cvs-cre", JSON.stringify(nouveauxCV));
  }

  function genererNomCV(fichier: File) {
    const extension = fichier.name.includes(".")
      ? "." + fichier.name.split(".").pop()
      : "";

    const numero = niveauEnNumero(niveau);
    const ville = villeDepuisCampus(campus);

    return `${nomEtudiant.trim().toUpperCase()} ${prenomEtudiant.trim()} ${marque} ${numero}${promo} ${ville}${extension}`;
  }

  function enregistrerCV() {
    if (!utilisateur) {
      alert("Vous devez être connecté.");
      return;
    }

    if (
      !fichierSelectionne ||
      !campus ||
      !marque ||
      !niveau ||
      !promo ||
      !nomEtudiant ||
      !prenomEtudiant
    ) {
      alert(
        "Renseigne le campus, la marque, le niveau, la filière, le nom, le prénom et le CV."
      );
      return;
    }

    const nouveauCV: CV = {
      nom: genererNomCV(fichierSelectionne),
      url: URL.createObjectURL(fichierSelectionne),
      campus,
      marque,
      niveau,
      promo,
      nomEtudiant: nomEtudiant.trim().toUpperCase(),
      prenomEtudiant: prenomEtudiant.trim(),
      deposeParNom: utilisateur.nom,
      deposeParEmail: utilisateur.email,
      dateDepot: new Date().toLocaleString("fr-FR"),
      statut: "recherche",
      presentations: [],
    };

    sauvegarderCV([...cvs, nouveauCV]);

    setFichierSelectionne(null);
    setNomEtudiant("");
    setPrenomEtudiant("");
  }

  function rechercherCV(sourceCV: CV[] = cvs) {
    if (!utilisateur) return;

    const campusReference = retrouverCampusReference(utilisateur.campus);
    const visionGlobale = peutVoirTousLesCampus(utilisateur.role);
    const visionCampus = utilisateur.role === "RRE";

    const resultats = sourceCV
      .map((cv, indexGlobal) => ({ ...cv, indexGlobal }))
      .filter((cv) => {
        if (!cv.campus || cv.campus === "undefined") return false;

        if (!visionGlobale && visionCampus && cv.campus !== campusReference) {
          return false;
        }

        if (!visionGlobale && utilisateur.role === "CRE" && cv.campus !== campusReference) {
          return false;
        }

        if (campus && cv.campus !== campus) return false;
        if (marque && cv.marque !== marque) return false;
        if (niveau && cv.niveau !== niveau) return false;
        if (promo && cv.promo !== promo) return false;

        return true;
      });

    setResultatsRecherche(resultats);
    setRechercheEffectuee(true);
  }

  function supprimerCV(indexGlobal: number) {
    const cv = cvs[indexGlobal];

    if (!utilisateur || !cv || cv.deposeParEmail !== utilisateur.email) {
      alert("Tu peux supprimer uniquement les CV que tu as déposés.");
      return;
    }

    const nouveauxCV = cvs.filter((_, index) => index !== indexGlobal);

    sauvegarderCV(nouveauxCV);
    rechercherCV(nouveauxCV);
  }

  function basculerStatut(indexGlobal: number) {
    const cv = cvs[indexGlobal];

    if (!utilisateur || !cv || cv.deposeParEmail !== utilisateur.email) {
      alert("Tu peux modifier uniquement les CV que tu as déposés.");
      return;
    }

    const nouveauxCV: CV[] = cvs.map((cvItem, index) => {
      if (index !== indexGlobal) return cvItem;

      return {
        ...cvItem,
        statut: cvItem.statut === "place" ? "recherche" : "place",
      };
    });

    sauvegarderCV(nouveauxCV);
    rechercherCV(nouveauxCV);
  }

  function exporterCSV() {
    if (!rechercheEffectuee) {
      alert("Lance d’abord une recherche.");
      return;
    }

    if (marque === "") {
      alert("Sélectionne au minimum une marque avant d’exporter.");
      return;
    }

    const lignes = [
      [
        "CV",
        "Nom étudiant",
        "Prénom étudiant",
        "Campus",
        "Ville",
        "Marque",
        "Niveau",
        "Filière",
        "Statut",
        "Déposé par",
        "Email déposant",
        "Date dépôt",
        "Nombre de présentations",
      ],
      ...resultatsRecherche.map((cv) => [
        cv.nom,
        cv.nomEtudiant || "",
        cv.prenomEtudiant || "",
        cv.campus,
        villeDepuisCampus(cv.campus),
        cv.marque,
        cv.niveau,
        cv.promo || "",
        cv.statut === "place" ? "Placé" : "En recherche d'alternance",
        cv.deposeParNom,
        cv.deposeParEmail,
        cv.dateDepot,
        String((cv.presentations || []).length),
      ]),
    ];

    const contenu = lignes
      .map((ligne) => ligne.map((valeur) => `"${valeur}"`).join(";"))
      .join("\n");

    const blob = new Blob([contenu], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const lien = document.createElement("a");

    lien.href = url;
    lien.download = "export-cv.csv";
    lien.click();
  }

  if (!utilisateur) {
    return (
      <main style={pageStyle}>
        <style>{animations}</style>
        <Background />
        <div style={contentStyle}>
          <Link href="/">
            <button style={secondaryButtonStyle}>🏠 Accueil</button>
          </Link>
          <section style={{ ...cardStyle, borderTop: `8px solid ${pastel.blue}` }}>
            <h1 style={titleStyle}>Accès refusé</h1>
            <p style={textStyle}>Connecte-toi depuis la page d’accueil.</p>
          </section>
        </div>
      </main>
    );
  }

  const visionGlobale = peutVoirTousLesCampus(utilisateur.role);
  const visionCampus = utilisateur.role === "RRE";
  const accesToutesOffres = estDireCo(utilisateur.role);
  const campusReference = retrouverCampusReference(utilisateur.campus);
  const modeMonCampus = mode === "mon";

  const cvsVisibles = cvs
    .map((cv, indexGlobal) => ({ ...cv, indexGlobal }))
    .filter((cv) => {
      if (!cv.campus || cv.campus === "undefined") return false;
      if (visionGlobale) return true;
      return cv.campus === campusReference;
    });

  const mesCV = cvs
    .map((cv, indexGlobal) => ({ ...cv, indexGlobal }))
    .filter((cv) => cv.deposeParEmail === utilisateur.email);

  const nombreCVCampusSelectionne = campus
    ? cvs.filter((cv) => cv.campus === campus).length
    : 0;

  const nombreRechercheCampusSelectionne = campus
    ? cvs.filter(
        (cv) =>
          cv.campus === campus && (cv.statut || "recherche") === "recherche"
      ).length
    : 0;

  const nombrePlacesCampusSelectionne = campus
    ? cvs.filter((cv) => cv.campus === campus && cv.statut === "place").length
    : 0;

  const marquesDisponibles = campus ? getMarquesPourCampus(campus) : [];
  const promosDisponibles =
    campus && marque ? getPromosPourCampusEtMarque(campus, marque) : [];

  function rechercherEquipe() {
    const texte = nomRechercheEquipe.trim().toLowerCase();

    if (!texte) {
      setResultatEquipe(null);
      return;
    }

    const personnesVisibles = accesInternes.filter((personne) => {
      if (personne.role !== "CRE") return false;
      if (visionGlobale) return true;

      return retrouverCampusReference(personne.campus) === campusReference;
    });

    const personne = personnesVisibles.find(
      (p) =>
        p.nom.toLowerCase().includes(texte) ||
        p.email.toLowerCase().includes(texte)
    );

    if (!personne) {
      setResultatEquipe(null);
      alert("Aucun CRE trouvé.");
      return;
    }

    const depots = cvs.filter((cv) => cv.deposeParEmail === personne.email);

    setResultatEquipe({
      nom: personne.nom,
      email: personne.email,
      campus: personne.campus,
      total: depots.length,
      recherche: depots.filter((cv) => (cv.statut || "recherche") === "recherche")
        .length,
      places: depots.filter((cv) => cv.statut === "place").length,
    });
  }

  const listeAAfficher = rechercheEffectuee ? resultatsRecherche : cvsVisibles;

  return (
    <main style={pageStyle}>
      <style>{animations}</style>
      <Background />

      <div style={contentStyle}>
        <Link href="/">
          <button style={{ ...secondaryButtonStyle, marginBottom: "28px" }}>
            🏠 Accueil
          </button>
        </Link>

        <section style={{ marginBottom: "28px" }}>
          <p style={eyebrowStyle}>Espace CRE</p>
          <h1 style={titleStyle}>Dossiers CV</h1>
          <p style={heroTextStyle}>
            Suivi des CV, des placements, des offres et de l’activité campus.
          </p>
        </section>

        <section style={{ ...cardStyle, borderTop: `8px solid ${pastel.blue}` }}>
          <strong style={{ fontSize: "22px", color: "white" }}>
            👤 {utilisateur.nom}
          </strong>
          <p style={textStyle}>{utilisateur.email}</p>
          <p style={textStyle}>Rôle : {utilisateur.role}</p>
          <p style={textStyle}>Campus de référence : {utilisateur.campus}</p>

          <div style={statsGridStyle}>
            {visionGlobale && (
              <StatCard
                label="Total CV visibles tous campus"
                value={cvsVisibles.length}
                color={pastel.purple}
              />
            )}

            {campus && (
              <>
                <StatCard
                  label={`Campus sélectionné : ${campus}`}
                  value={nombreCVCampusSelectionne}
                  color={pastel.peach}
                />
                <StatCard
                  label="En recherche d’alternance"
                  value={nombreRechercheCampusSelectionne}
                  color={pastel.blue}
                />
                <StatCard
                  label="Placés"
                  value={nombrePlacesCampusSelectionne}
                  color={pastel.green}
                />
              </>
            )}
          </div>

          <div style={rowStyle}>
            <button
              type="button"
              onClick={() => setVoirMesCV(!voirMesCV)}
              style={primaryButtonStyle}
            >
              {voirMesCV ? "Masquer mes CV" : "Voir mes CV"}
            </button>

            {accesToutesOffres && (
              <button
                type="button"
                onClick={() => setVoirToutesOffres(!voirToutesOffres)}
                style={outlineButtonStyle}
              >
                {voirToutesOffres ? "Masquer toutes les offres" : "Toutes les offres"}
              </button>
            )}
          </div>
        </section>

        {accesToutesOffres && voirToutesOffres && (
          <section style={{ ...cardStyle, borderTop: `8px solid ${pastel.green}` }}>
            <h2 style={sectionTitleStyle}>Toutes les offres déposées</h2>

            {offres.length === 0 && <p style={textStyle}>Aucune offre déposée pour le moment.</p>}

            <div style={gridStyle}>
              {offres.map((offre) => (
                <div key={offre.id} style={{ ...miniCardStyle, borderTop: `6px solid ${pastel.green}` }}>
                  <strong>{offre.nomEntreprise}</strong>
                  <p>Poste : {offre.titrePoste}</p>
                  <p>Ville : {offre.ville}</p>
                  <p>Niveau recherché : {offre.niveau}</p>
                  <p>Contrat : {offre.typeContrat}</p>
                  <p>Durée : {offre.dureeContrat}</p>
                  <p>Contact : {offre.nomContact}</p>
                  <p>Email : {offre.emailContact}</p>
                  <p>Téléphone : {offre.telephoneContact}</p>
                  <p>Date dépôt : {offre.dateDepot}</p>
                  <p>CV proposés : {offre.cvProposes.length}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {(visionCampus || visionGlobale) && (
          <section style={{ ...cardStyle, borderTop: `8px solid ${pastel.purple}` }}>
            <h2 style={sectionTitleStyle}>Suivi de mes équipes</h2>

            <div style={rowStyle}>
              <input
                placeholder="Nom, prénom ou email du CRE"
                value={nomRechercheEquipe}
                onChange={(e) => setNomRechercheEquipe(e.target.value)}
                style={inputStyle}
              />

              <button type="button" onClick={rechercherEquipe} style={primaryButtonStyle}>
                Rechercher
              </button>
            </div>

            {resultatEquipe && (
              <div style={{ ...miniCardStyle, borderTop: `6px solid ${pastel.purple}`, marginTop: "18px" }}>
                <strong>{resultatEquipe.nom}</strong>
                <p>{resultatEquipe.email}</p>
                <p>Campus : {resultatEquipe.campus}</p>
                <p>Total CV déposés : {resultatEquipe.total}</p>
                <p>En recherche : {resultatEquipe.recherche}</p>
                <p>Placés : {resultatEquipe.places}</p>
              </div>
            )}
          </section>
        )}

        {voirMesCV && (
          <section style={blockStyle}>
            <h2 style={sectionTitleStyle}>Mes CV déposés</h2>

            {mesCV.length === 0 && <p style={textStyle}>Aucun CV déposé par vous pour le moment.</p>}

            <div style={gridStyle}>
              {mesCV.map((cv) => (
                <CvCard
                  key={cv.indexGlobal}
                  cv={cv}
                  utilisateurEmail={utilisateur.email}
                  onToggle={() => basculerStatut(cv.indexGlobal)}
                  onDelete={() => supprimerCV(cv.indexGlobal)}
                  villeDepuisCampus={villeDepuisCampus}
                  showActions
                />
              ))}
            </div>
          </section>
        )}

        <section style={{ ...cardStyle, borderTop: `8px solid ${pastel.yellow}` }}>
          <div style={rowStyle}>
            <button type="button" onClick={exporterCSV} style={outlineButtonStyle}>
              Exporter les résultats
            </button>
          </div>

          {modeMonCampus && (
            <div style={selectedCampusStyle}>
              <strong>Mon campus sélectionné :</strong> {campus}
            </div>
          )}

          <div style={rowStyle}>
            {!modeMonCampus && (
              <select
                value={campus}
                onChange={(e) => {
                  setCampus(e.target.value);
                  setMarque("");
                  setNiveau("");
                  setPromo("");
                }}
                style={inputStyle}
              >
                <option value="">Choisir un campus</option>

                {campusOptions.map((campusOption) => (
                  <option key={campusOption}>{campusOption}</option>
                ))}
              </select>
            )}

            {campus && (
              <select
                value={marque}
                onChange={(e) => {
                  setMarque(e.target.value);
                  setNiveau("");
                  setPromo("");
                }}
                style={inputStyle}
              >
                <option value="">Choisir une marque</option>

                {marquesDisponibles.map((marqueOption) => (
                  <option key={marqueOption}>{marqueOption}</option>
                ))}
              </select>
            )}

            {marque && (
              <select
                value={niveau}
                onChange={(e) => {
                  setNiveau(e.target.value);
                  setPromo("");
                }}
                style={inputStyle}
              >
                <option value="">Choisir un niveau</option>

                {niveaux.map((niveauOption) => (
                  <option key={niveauOption}>{niveauOption}</option>
                ))}
              </select>
            )}

            {niveau && (
              <select value={promo} onChange={(e) => setPromo(e.target.value)} style={inputStyle}>
                <option value="">Choisir une filière</option>

                {promosDisponibles.map((promoOption) => (
                  <option key={promoOption}>{promoOption}</option>
                ))}
              </select>
            )}

            <button type="button" onClick={() => rechercherCV()} style={primaryButtonStyle}>
              Rechercher
            </button>
          </div>
        </section>

        {promo && (
          <section style={{ ...cardStyle, borderTop: `8px solid ${pastel.peach}` }}>
            <h2 style={sectionTitleStyle}>
              Déposer un CV : {campus} / {marque} / {niveau} / {promo}
            </h2>

            <div style={rowStyle}>
              <input
                placeholder="NOM étudiant"
                value={nomEtudiant}
                onChange={(e) => setNomEtudiant(e.target.value)}
                style={inputStyle}
              />

              <input
                placeholder="Prénom étudiant"
                value={prenomEtudiant}
                onChange={(e) => setPrenomEtudiant(e.target.value)}
                style={inputStyle}
              />
            </div>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(event) => {
                const fichier = event.target.files?.[0];

                if (!fichier) return;

                setFichierSelectionne(fichier);
              }}
              style={{ ...inputStyle, marginTop: "16px" }}
            />

            {fichierSelectionne && (
              <div style={{ ...miniCardStyle, borderTop: `6px solid ${pastel.peach}`, marginTop: "18px" }}>
                <p>
                  Nom généré :{" "}
                  <strong>
                    {nomEtudiant && prenomEtudiant
                      ? genererNomCV(fichierSelectionne)
                      : "Renseigne NOM et Prénom"}
                  </strong>
                </p>

                <button type="button" onClick={enregistrerCV} style={primaryButtonStyle}>
                  Enregistrer le CV
                </button>
              </div>
            )}
          </section>
        )}

        <section style={blockStyle}>
          <h2 style={sectionTitleStyle}>CV affichés : {listeAAfficher.length}</h2>

          <div style={gridStyle}>
            {listeAAfficher.map((cv) => (
              <CvCard
                key={cv.indexGlobal}
                cv={cv}
                utilisateurEmail={utilisateur.email}
                onToggle={() => basculerStatut(cv.indexGlobal)}
                onDelete={() => supprimerCV(cv.indexGlobal)}
                villeDepuisCampus={villeDepuisCampus}
                showActions={cv.deposeParEmail === utilisateur.email}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Background() {
  return (
    <div className="background-animation">
      <div className="bubble bubble-1" />
      <div className="bubble bubble-2" />
      <div className="bubble bubble-3" />
      <div className="bubble bubble-4" />
      <div className="bubble bubble-5" />
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div style={{ ...statBoxStyle, borderTop: `5px solid ${color}` }}>
      <span style={{ color: "#e8e8e8", display: "block", marginBottom: "12px" }}>
        {label}
      </span>
      <strong style={{ fontSize: "42px", color }}>{value}</strong>
    </div>
  );
}

function CvCard({
  cv,
  utilisateurEmail,
  onToggle,
  onDelete,
  villeDepuisCampus,
  showActions,
}: {
  cv: CV & { indexGlobal: number };
  utilisateurEmail: string;
  onToggle: () => void;
  onDelete: () => void;
  villeDepuisCampus: (campus: string) => string;
  showActions: boolean;
}) {
  const isPlaced = cv.statut === "place";
  const color = isPlaced ? pastel.green : pastel.purple;

  return (
    <div style={{ ...cvCardStyle, borderTop: `6px solid ${color}` }}>
      <strong style={{ fontSize: "18px", color: "white" }}>{cv.nom}</strong>

      <p>Campus : {cv.campus}</p>
      <p>Ville : {villeDepuisCampus(cv.campus)}</p>
      <p>Marque : {cv.marque}</p>
      <p>Niveau : {cv.niveau}</p>
      <p>Filière : {cv.promo}</p>

      <p>
        Statut :{" "}
        <strong style={{ color }}>
          {isPlaced ? "Placé" : "En recherche d'alternance"}
        </strong>
      </p>

      <p>Déposé par : {cv.deposeParNom}</p>
      <p>{cv.deposeParEmail}</p>
      <p>Présentations : {(cv.presentations || []).length}</p>

      <a href={cv.url} target="_blank" style={linkStyle}>
        Ouvrir le CV
      </a>

      {showActions && cv.deposeParEmail === utilisateurEmail && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "14px" }}>
          <button type="button" onClick={onToggle} style={primaryButtonStyle}>
            {isPlaced ? "Remettre en recherche" : "Marquer comme placé"}
          </button>

          <button type="button" onClick={onDelete} style={dangerButtonStyle}>
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#242424",
  color: "white",
  fontFamily: "Arial, Helvetica, sans-serif",
  overflowX: "hidden",
  position: "relative",
  padding: "36px 48px 80px",
};

const contentStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: "1180px",
  margin: "0 auto",
};

const cardStyle: React.CSSProperties = {
  background: "rgba(51, 51, 51, 0.94)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "28px",
  boxShadow: "0 22px 45px rgba(0,0,0,0.25)",
  backdropFilter: "blur(8px)",
  padding: "32px",
  marginBottom: "24px",
};

const miniCardStyle: React.CSSProperties = {
  background: "rgba(36, 36, 36, 0.9)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "20px",
  padding: "20px",
};

const cvCardStyle: React.CSSProperties = {
  background: "rgba(51, 51, 51, 0.96)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "22px",
  padding: "22px",
  boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
};

const statBoxStyle: React.CSSProperties = {
  background: "rgba(36, 36, 36, 0.74)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "20px",
  padding: "18px",
  minHeight: "125px",
};

const selectedCampusStyle: React.CSSProperties = {
  background: "rgba(36, 36, 36, 0.8)",
  color: "white",
  padding: "18px",
  borderRadius: "16px",
  marginTop: "20px",
  borderLeft: `8px solid ${pastel.purple}`,
};

const inputStyle: React.CSSProperties = {
  minWidth: "220px",
  padding: "13px 14px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.18)",
  background: "#242424",
  color: "white",
  outline: "none",
};

const primaryButtonStyle: React.CSSProperties = {
  background: pastel.yellow,
  color: "#111",
  border: "none",
  padding: "13px 20px",
  borderRadius: "999px",
  fontWeight: 800,
  cursor: "pointer",
};

const secondaryButtonStyle: React.CSSProperties = {
  background: "transparent",
  color: "white",
  border: "1px solid rgba(255,255,255,0.35)",
  padding: "13px 20px",
  borderRadius: "999px",
  fontWeight: 800,
  cursor: "pointer",
};

const outlineButtonStyle: React.CSSProperties = {
  background: "transparent",
  color: "white",
  border: `1px solid ${pastel.yellow}`,
  padding: "13px 20px",
  borderRadius: "999px",
  fontWeight: 800,
  cursor: "pointer",
};

const dangerButtonStyle: React.CSSProperties = {
  background: "rgba(255, 80, 80, 0.18)",
  color: "#ff8a8a",
  border: "1px solid rgba(255, 80, 80, 0.45)",
  padding: "11px 16px",
  borderRadius: "999px",
  fontWeight: 800,
  cursor: "pointer",
};

const linkStyle: React.CSSProperties = {
  display: "inline-block",
  color: pastel.yellow,
  fontWeight: "bold",
  marginTop: "10px",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  flexWrap: "wrap",
  marginTop: "18px",
};

const statsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  gap: "16px",
  marginTop: "24px",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "18px",
  marginTop: "18px",
};

const blockStyle: React.CSSProperties = {
  marginTop: "28px",
  marginBottom: "32px",
};

const eyebrowStyle: React.CSSProperties = {
  textTransform: "uppercase",
  letterSpacing: "2px",
  color: pastel.yellow,
  fontSize: "13px",
  fontWeight: "bold",
  marginBottom: "12px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "52px",
  lineHeight: 1,
  margin: 0,
  fontStyle: "italic",
  fontWeight: 900,
  color: "white",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "28px",
  marginTop: 0,
  color: "white",
};

const heroTextStyle: React.CSSProperties = {
  color: "#e8e8e8",
  fontSize: "18px",
  lineHeight: 1.5,
  maxWidth: "760px",
};

const textStyle: React.CSSProperties = {
  color: "#e8e8e8",
};

const animations = `
  * { box-sizing: border-box; }
  body { margin: 0; background: #242424; }
  p { color: #e8e8e8; }
  select option { color: black; }

  .background-animation {
    position: fixed;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .bubble {
    position: absolute;
    border-radius: 999px;
    opacity: 0.18;
    filter: blur(2px);
    animation: floatBubble 13s ease-in-out infinite;
  }

  .bubble-1 {
    width: 220px;
    height: 220px;
    background: #ffed73;
    top: 8%;
    left: 6%;
  }

  .bubble-2 {
    width: 150px;
    height: 150px;
    background: #b7e4ff;
    top: 22%;
    right: 8%;
    animation-delay: 2s;
  }

  .bubble-3 {
    width: 260px;
    height: 260px;
    background: #f3c7b0;
    top: 52%;
    left: 16%;
    animation-delay: 4s;
  }

  .bubble-4 {
    width: 180px;
    height: 180px;
    background: #d9b8ff;
    bottom: 12%;
    right: 14%;
    animation-delay: 6s;
  }

  .bubble-5 {
    width: 130px;
    height: 130px;
    background: #a7e8c5;
    bottom: 28%;
    left: 70%;
    animation-delay: 8s;
  }

  @keyframes floatBubble {
    0%, 100% {
      transform: translateY(0) translateX(0) scale(1);
    }
    50% {
      transform: translateY(-34px) translateX(22px) scale(1.08);
    }
  }

  section,
  button,
  a,
  input,
  select {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  section:hover {
    transform: translateY(-3px);
  }

  button:hover,
  a:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 700px) {
    main {
      padding: 24px !important;
    }

    input,
    select,
    button {
      width: 100%;
      min-width: 0 !important;
    }
  }
`;
