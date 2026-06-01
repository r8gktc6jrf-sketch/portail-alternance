"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AccesInterne, peutVoirTousLesCampus } from "../data/access";
import {
  campusOptions,
  getMarquesPourCampus,
  getPromosPourCampusEtMarque,
} from "../data/filieres";

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
};

const niveaux = ["Bac +1", "Bac +2", "Bac +3", "Bac +4", "Bac +5"];

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
  const [fichierSelectionne, setFichierSelectionne] = useState<File | null>(null);
  const [voirMesCV, setVoirMesCV] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modeUrl = params.get("mode") || "";
    setMode(modeUrl);

    const session = localStorage.getItem("session-interne");

    if (session) {
      const user = JSON.parse(session);
      setUtilisateur(user);

      if (modeUrl === "mon") {
        setCampus(retrouverCampusReference(user.campus));
      }
    }

    const sauvegarde = localStorage.getItem("cvs-cre");

    if (sauvegarde) {
      const cvsCharges: CV[] = JSON.parse(sauvegarde).map((cv: CV) => ({
        ...cv,
        statut: cv.statut || "recherche",
      }));

      setCvs(cvsCharges);
      localStorage.setItem("cvs-cre", JSON.stringify(cvsCharges));
    }
  }, []);

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
      alert("Renseigne le campus, la marque, le niveau, la filière, le nom, le prénom et le CV.");
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
    };

    const nouveauxCV = [...cvs, nouveauCV];

    setCvs(nouveauxCV);
    localStorage.setItem("cvs-cre", JSON.stringify(nouveauxCV));

    setFichierSelectionne(null);
    setNomEtudiant("");
    setPrenomEtudiant("");
  }

  function supprimerCV(indexGlobal: number) {
    const cv = cvs[indexGlobal];

    if (!utilisateur || cv.deposeParEmail !== utilisateur.email) {
      alert("Tu peux supprimer uniquement les CV que tu as déposés.");
      return;
    }

    const nouveauxCV = cvs.filter((_, index) => index !== indexGlobal);
    setCvs(nouveauxCV);
    localStorage.setItem("cvs-cre", JSON.stringify(nouveauxCV));
  }

  function basculerStatut(indexGlobal: number) {
    const cv = cvs[indexGlobal];

    if (!utilisateur || cv.deposeParEmail !== utilisateur.email) {
      alert("Tu peux modifier uniquement les CV que tu as déposés.");
      return;
    }

    const nouveauxCV = cvs.map((cvItem, index) => {
      if (index !== indexGlobal) return cvItem;

      return {
        ...cvItem,
        statut: cvItem.statut === "place" ? "recherche" : "place",
      };
    });

    setCvs(nouveauxCV);
    localStorage.setItem("cvs-cre", JSON.stringify(nouveauxCV));
  }

  function exporterCSV() {
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
      ],
      ...cvsVisibles.map((cv) => [
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
      <main style={{ padding: "40px", fontFamily: "Arial", color: "black" }}>
        <Link href="/">
          <button>🏠 Accueil</button>
        </Link>

        <h1>Accès refusé</h1>
        <p>Connecte-toi depuis la page d’accueil.</p>
      </main>
    );
  }

  const visionGlobale = peutVoirTousLesCampus(utilisateur.role);
  const visionCampus = utilisateur.role === "RRE";
  const campusReference = retrouverCampusReference(utilisateur.campus);
  const modeMonCampus = mode === "mon";

  const cvsVisibles = cvs
    .map((cv, indexGlobal) => ({
      ...cv,
      indexGlobal,
    }))
    .filter((cv) => {
      if (visionGlobale) return true;
      if (visionCampus) return cv.campus === campusReference;
      return cv.campus === campusReference;
    });

  const cvsDuDossier = cvsVisibles.filter(
    (cv) =>
      cv.campus === campus &&
      cv.marque === marque &&
      cv.niveau === niveau &&
      cv.promo === promo
  );

  const mesCV = cvs
    .map((cv, indexGlobal) => ({ ...cv, indexGlobal }))
    .filter((cv) => cv.deposeParEmail === utilisateur.email);

  const nombreCVCampusSelectionne = campus
    ? cvs.filter((cv) => cv.campus === campus).length
    : 0;

  const nombreRechercheCampusSelectionne = campus
    ? cvs.filter((cv) => cv.campus === campus && (cv.statut || "recherche") === "recherche").length
    : 0;

  const nombrePlacesCampusSelectionne = campus
    ? cvs.filter((cv) => cv.campus === campus && cv.statut === "place").length
    : 0;

  const nombreCVCampusReference = cvs.filter(
    (cv) => cv.campus === campusReference
  ).length;

  const nombreCVMesDepotsCampusReference = cvs.filter(
    (cv) =>
      cv.campus === campusReference &&
      cv.deposeParEmail === utilisateur.email
  ).length;

  const marquesDisponibles = campus ? getMarquesPourCampus(campus) : [];
  const promosDisponibles =
    campus && marque ? getPromosPourCampusEtMarque(campus, marque) : [];

  return (
    <main style={{ padding: "40px", fontFamily: "Arial", color: "black" }}>
      <Link href="/">
        <button style={{ marginBottom: "25px" }}>🏠 Accueil</button>
      </Link>

      <h1>Dossiers CV</h1>

      <section
        style={{
          backgroundColor: "#f6f2ea",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <strong>👤 {utilisateur.nom}</strong>
        <p>{utilisateur.email}</p>
        <p>Rôle : {utilisateur.role}</p>
        <p>Campus de référence : {utilisateur.campus}</p>

        {visionGlobale && <p>Total CV visibles tous campus : {cvs.length}</p>}

        {visionCampus && (
          <p>Nombre de CV sur mon campus : {nombreCVCampusReference}</p>
        )}

        {utilisateur.role === "CRE" && (
          <>
            <p>Nombre de CV sur mon campus : {nombreCVCampusReference}</p>
            <p>Mes CV déposés sur mon campus : {nombreCVMesDepotsCampusReference}</p>
          </>
        )}

        {campus && (
          <>
            <p>
              Campus sélectionné : <strong>{campus}</strong> —{" "}
              {nombreCVCampusSelectionne} CV déposé(s)
            </p>
            <p>En recherche d’alternance : {nombreRechercheCampusSelectionne}</p>
            <p>Placés : {nombrePlacesCampusSelectionne}</p>
          </>
        )}

        <button
          type="button"
          onClick={() => setVoirMesCV(!voirMesCV)}
          style={{ marginTop: "10px" }}
        >
          {voirMesCV ? "Masquer mes CV" : "Voir mes CV"}
        </button>
      </section>

      {voirMesCV && (
        <section style={{ marginBottom: "30px" }}>
          <h2>Mes CV déposés</h2>

          {mesCV.length === 0 && <p>Aucun CV déposé par vous pour le moment.</p>}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {mesCV.map((cv) => (
              <div
                key={cv.indexGlobal}
                style={{
                  width: "260px",
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  padding: "12px",
                  backgroundColor: "white",
                }}
              >
                <strong>{cv.nom}</strong>
                <p>{cv.campus}</p>
                <p>{villeDepuisCampus(cv.campus)}</p>
                <p>{cv.marque}</p>
                <p>{cv.niveau}</p>
                <p>{cv.promo}</p>
                <p>
                  Statut :{" "}
                  <strong>
                    {cv.statut === "place"
                      ? "Placé"
                      : "En recherche d'alternance"}
                  </strong>
                </p>

                <a href={cv.url} target="_blank">
                  Ouvrir le CV
                </a>

                <br />

                <button
                  type="button"
                  onClick={() => basculerStatut(cv.indexGlobal)}
                  style={{ marginTop: "10px" }}
                >
                  {cv.statut === "place"
                    ? "Remettre en recherche"
                    : "Marquer comme placé"}
                </button>

                <br />

                <button
                  type="button"
                  onClick={() => supprimerCV(cv.indexGlobal)}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {(visionGlobale || visionCampus) && (
        <button
          type="button"
          onClick={exporterCSV}
          style={{ marginBottom: "20px" }}
        >
          Exporter les CV visibles
        </button>
      )}

      {modeMonCampus && (
        <div
          style={{
            backgroundColor: "#dbeafe",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "20px",
            maxWidth: "600px",
          }}
        >
          <strong>Mon campus sélectionné :</strong> {campus}
        </div>
      )}

      {!modeMonCampus && (
        <select
          value={campus}
          onChange={(e) => {
            setCampus(e.target.value);
            setMarque("");
            setNiveau("");
            setPromo("");
          }}
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
          style={{ marginLeft: modeMonCampus ? "0px" : "15px" }}
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
          style={{ marginLeft: "15px" }}
        >
          <option value="">Choisir un niveau</option>

          {niveaux.map((niveauOption) => (
            <option key={niveauOption}>{niveauOption}</option>
          ))}
        </select>
      )}

      {niveau && (
        <select
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          style={{ marginLeft: "15px" }}
        >
          <option value="">Choisir une filière</option>

          {promosDisponibles.map((promoOption) => (
            <option key={promoOption}>{promoOption}</option>
          ))}
        </select>
      )}

      {promo && (
        <div style={{ marginTop: "30px" }}>
          <h2>
            Dossier : {campus} / {marque} / {niveau} / {promo}
          </h2>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginBottom: "15px",
            }}
          >
            <input
              placeholder="NOM étudiant"
              value={nomEtudiant}
              onChange={(e) => setNomEtudiant(e.target.value)}
              style={{
                padding: "10px",
                width: "220px",
              }}
            />

            <input
              placeholder="Prénom étudiant"
              value={prenomEtudiant}
              onChange={(e) => setPrenomEtudiant(e.target.value)}
              style={{
                padding: "10px",
                width: "220px",
              }}
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
          />

          {fichierSelectionne && (
            <div style={{ marginTop: "15px" }}>
              <p>
                Nom généré :{" "}
                <strong>
                  {nomEtudiant && prenomEtudiant
                    ? genererNomCV(fichierSelectionne)
                    : "Renseigne NOM et Prénom"}
                </strong>
              </p>

              <button type="button" onClick={enregistrerCV}>
                Enregistrer le CV
              </button>
            </div>
          )}

          <h3 style={{ marginTop: "30px" }}>CV déposés</h3>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {cvsDuDossier.map((cv) => (
              <div
                key={cv.indexGlobal}
                style={{
                  width: "260px",
                  minHeight: "260px",
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  padding: "12px",
                  backgroundColor: "white",
                }}
              >
                <strong>{cv.nom}</strong>

                <p style={{ fontSize: "12px" }}>{cv.campus}</p>
                <p style={{ fontSize: "12px" }}>{villeDepuisCampus(cv.campus)}</p>
                <p style={{ fontSize: "12px" }}>{cv.marque}</p>
                <p style={{ fontSize: "12px" }}>{cv.niveau}</p>
                <p style={{ fontSize: "12px" }}>{cv.promo}</p>

                <p style={{ fontSize: "12px" }}>
                  Statut :{" "}
                  <strong>
                    {cv.statut === "place"
                      ? "Placé"
                      : "En recherche d'alternance"}
                  </strong>
                </p>

                <p style={{ fontSize: "12px" }}>
                  Déposé par : {cv.deposeParNom}
                </p>

                <p style={{ fontSize: "12px" }}>{cv.deposeParEmail}</p>

                <a href={cv.url} target="_blank">
                  Ouvrir le CV
                </a>

                {cv.deposeParEmail === utilisateur.email && (
                  <>
                    <br />

                    <button
                      type="button"
                      onClick={() => basculerStatut(cv.indexGlobal)}
                      style={{ marginTop: "10px" }}
                    >
                      {cv.statut === "place"
                        ? "Remettre en recherche"
                        : "Marquer comme placé"}
                    </button>

                    <br />

                    <button
                      type="button"
                      onClick={() => supprimerCV(cv.indexGlobal)}
                      style={{
                        marginTop: "10px",
                        backgroundColor: "red",
                        color: "white",
                      }}
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}