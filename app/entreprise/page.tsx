"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CV = {
  nom: string;
  url: string;
  campus: string;
  marque: string;
  niveau: string;
  promo?: string;
  statut?: "recherche" | "place";
  deposeParNom?: string;
  deposeParEmail?: string;
};

const villes = [
  "AIX-EN-PROVENCE",
  "BORDEAUX",
  "LE HAVRE",
  "LILLE",
  "LYON",
  "MONTPELLIER",
  "NANTES",
  "NICE",
  "ORLEANS",
  "PARIS",
  "POITIERS",
  "ROUEN",
  "TOURS",
  "RENNES",
  "TOULON",
  "TOULOUSE",
  "GRENOBLE",
  "REIMS",
];

const competencesDisponibles = [
  "Vente",
  "Prospection",
  "Phoning",
  "Négociation",
  "Relation client",
  "CRM",
  "Salesforce",
  "HubSpot",
  "Marketing",
  "Marketing digital",
  "SEO",
  "SEA",
  "Communication",
  "Réseaux sociaux",
  "Canva",
  "Ressources humaines",
  "Recrutement",
  "Sourcing",
  "Finance",
  "Comptabilité",
  "Management",
  "Gestion de projet",
  "Développement web",
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "SQL",
  "Cybersécurité",
  "Data",
  "Excel",
  "Power BI",
  "UX Design",
  "UI Design",
  "Figma",
  "Audiovisuel",
  "Journalisme",
  "Événementiel",
  "Immobilier",
  "Banque",
  "Assurance",
  "Tourisme",
  "Luxe",
  "Logistique",
  "Supply Chain",
  "Administratif",
  "Pack Office",
  "Word",
  "PowerPoint",
];

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

  return "";
}

export default function EntreprisePage() {
  const [cvs, setCvs] = useState<CV[]>([]);

  const [nomEntreprise, setNomEntreprise] = useState("");
  const [nomContact, setNomContact] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [telephoneContact, setTelephoneContact] = useState("");
  const [titrePoste, setTitrePoste] = useState("");
  const [description, setDescription] = useState("");

  const [ville, setVille] = useState("");
  const [niveau, setNiveau] = useState("");
  const [typeContrat, setTypeContrat] = useState("");
  const [dureeContrat, setDureeContrat] = useState("");

  const [competences, setCompetences] = useState<string[]>([]);
  const [nombreCV, setNombreCV] = useState(5);

  const [resultats, setResultats] = useState<CV[]>([]);
  const [messageErreur, setMessageErreur] = useState("");
  const [fichePoste, setFichePoste] = useState<File | null>(null);

  useEffect(() => {
    const sauvegarde = localStorage.getItem("cvs-cre");

    if (sauvegarde) {
      const cvsCharges: CV[] = JSON.parse(sauvegarde).map((cv: CV) => ({
        ...cv,
        statut: cv.statut || "recherche",
      }));

      setCvs(cvsCharges);
    }
  }, []);

  function ajouterCompetence(comp: string) {
    if (comp && comp !== "Ajouter une compétence" && !competences.includes(comp)) {
      setCompetences([...competences, comp]);
    }
  }

  function supprimerCompetence(comp: string) {
    setCompetences(competences.filter((c) => c !== comp));
  }

  function calculerScores(limite: number) {
    const scores = cvs
      .filter((cv) => {
        const villeCV = villeDepuisCampus(cv.campus || "");

        return (
          villeCV === ville &&
          cv.niveau === niveau &&
          (cv.statut || "recherche") === "recherche"
        );
      })
      .map((cv) => {
        let score = 40;

        competences.forEach(() => {
          score += 5;
        });

        if (score > 100) score = 100;

        return {
          ...cv,
          score,
        };
      })
      .sort((a: any, b: any) => (b.score || 0) - (a.score || 0));

    const nombreDisponible = scores.length;
    const nombreFinal = limite > nombreDisponible ? nombreDisponible : limite;

    setResultats(scores.slice(0, nombreFinal));

    if (nombreDisponible === 0) {
      setMessageErreur(
        "Aucun CV en recherche d’alternance ne correspond à cette ville et à ce niveau."
      );
      return;
    }

    if (nombreDisponible < limite) {
      setMessageErreur(
        `Seulement ${nombreDisponible} CV compatible(s) disponible(s).`
      );
      return;
    }

    setMessageErreur("");
  }

  function analyserOffre() {
    setMessageErreur("");

    if (
      !nomEntreprise ||
      !nomContact ||
      !emailContact ||
      !telephoneContact ||
      !titrePoste ||
      !description ||
      !ville ||
      !niveau ||
      !typeContrat ||
      !dureeContrat ||
      competences.length === 0 ||
      nombreCV < 1
    ) {
      setResultats([]);
      setMessageErreur("Veuillez renseigner tous les champs obligatoires.");
      return;
    }

    calculerScores(nombreCV);
  }

  function proposerDavantage() {
    if (resultats.length === 0) {
      analyserOffre();
      return;
    }

    calculerScores(resultats.length + nombreCV);
  }

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial",
        color: "black",
        backgroundColor: "#f6f2ea",
        minHeight: "100vh",
      }}
    >
      <Link href="/">
        <button style={{ marginBottom: "25px" }}>🏠 Accueil</button>
      </Link>

      <h1>Déposer une offre</h1>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "750px",
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "16px",
        }}
      >
        <input placeholder="Nom entreprise" value={nomEntreprise} onChange={(e) => setNomEntreprise(e.target.value)} />
        <input placeholder="Nom du contact" value={nomContact} onChange={(e) => setNomContact(e.target.value)} />
        <input placeholder="Email du contact" value={emailContact} onChange={(e) => setEmailContact(e.target.value)} />
        <input placeholder="Téléphone du contact" value={telephoneContact} onChange={(e) => setTelephoneContact(e.target.value)} />
        <input placeholder="Titre du poste" value={titrePoste} onChange={(e) => setTitrePoste(e.target.value)} />

        <textarea
          placeholder="Description du poste"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={ville} onChange={(e) => setVille(e.target.value)}>
          <option value="">Ville de l'offre</option>
          {villes.map((villeOption) => (
            <option key={villeOption}>{villeOption}</option>
          ))}
        </select>

        <select value={niveau} onChange={(e) => setNiveau(e.target.value)}>
          <option value="">Niveau recherché</option>
          <option>Bac +1</option>
          <option>Bac +2</option>
          <option>Bac +3</option>
          <option>Bac +4</option>
          <option>Bac +5</option>
        </select>

        <select value={typeContrat} onChange={(e) => setTypeContrat(e.target.value)}>
          <option value="">Type de contrat</option>
          <option>Alternance</option>
          <option>Stage</option>
          <option>CDI</option>
        </select>

        <select value={dureeContrat} onChange={(e) => setDureeContrat(e.target.value)}>
          <option value="">Durée du contrat</option>
          <option>6 mois</option>
          <option>12 mois</option>
          <option>24 mois</option>
          <option>36 mois</option>
          <option>Autre</option>
        </select>

        <select onChange={(e) => ajouterCompetence(e.target.value)}>
          <option>Ajouter une compétence</option>
          {competencesDisponibles.map((comp) => (
            <option key={comp}>{comp}</option>
          ))}
        </select>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {competences.map((comp) => (
            <div
              key={comp}
              style={{
                backgroundColor: "#dbeafe",
                padding: "8px 12px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {comp}
              <button
                type="button"
                onClick={() => supprimerCompetence(comp)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "red",
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <input
          type="number"
          min="1"
          value={nombreCV}
          onChange={(e) => setNombreCV(Number(e.target.value))}
          placeholder="Nombre de CV souhaités"
        />

        <label>Importer une fiche de poste PDF</label>

        <input
          type="file"
          accept=".pdf"
          onChange={(event) => {
            const fichier = event.target.files?.[0];

            if (fichier) {
              setFichePoste(fichier);
            }
          }}
        />

        {fichePoste && (
          <p>
            Fiche de poste importée : <strong>{fichePoste.name}</strong>
          </p>
        )}

        <button type="button" onClick={analyserOffre}>
          Valider et proposer des CV
        </button>

        {messageErreur && (
          <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
            {messageErreur}
          </p>
        )}
      </form>

      {resultats.length > 0 && (
        <section style={{ marginTop: "40px" }}>
          <h2>CV proposés</h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {resultats.map((cv, index) => (
              <div
                key={index}
                style={{
                  width: "240px",
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  padding: "15px",
                  backgroundColor: "white",
                }}
              >
                <strong>{cv.nom}</strong>
                <p>{cv.campus}</p>
                <p>{villeDepuisCampus(cv.campus)}</p>
                <p>{cv.marque}</p>
                <p>{cv.niveau}</p>
                <p>{cv.promo}</p>

                <a href={cv.url} target="_blank">
                  Ouvrir le CV
                </a>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={proposerDavantage}
            style={{ marginTop: "25px" }}
          >
            Proposer davantage de CV
          </button>
        </section>
      )}
    </main>
  );
}