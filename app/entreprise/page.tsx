"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  promo?: string;
  statut?: "recherche" | "place";
  deposeParNom?: string;
  deposeParEmail?: string;
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
  fichePoste?: string;
  dateDepot: string;
  cvProposes: string[];
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

function niveauInferieur(niveau: string) {
  if (niveau === "Bac +5") return "Bac +4";
  if (niveau === "Bac +4") return "Bac +3";
  if (niveau === "Bac +3") return "Bac +2";
  if (niveau === "Bac +2") return "Bac +1";
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

  const [resultats, setResultats] = useState<(CV & { score?: number })[]>([]);
  const [messageErreur, setMessageErreur] = useState("");
  const [fichePoste, setFichePoste] = useState<File | null>(null);

  useEffect(() => {
    const sauvegarde = localStorage.getItem("cvs-cre");

    if (sauvegarde) {
      const cvsCharges: CV[] = JSON.parse(sauvegarde)
        .filter((cv: CV) => cv && cv.campus && cv.campus !== "undefined")
        .map((cv: CV) => ({
          ...cv,
          statut: cv.statut || "recherche",
          presentations: cv.presentations || [],
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

  function sauvegarderOffre(cvProposes: CV[]) {
    const offresSauvegardees = localStorage.getItem("offres-entreprises");
    const offres: Offre[] = offresSauvegardees ? JSON.parse(offresSauvegardees) : [];

    const offreId = `OFFRE-${Date.now()}`;

    const nouvelleOffre: Offre = {
      id: offreId,
      nomEntreprise,
      nomContact,
      emailContact,
      telephoneContact,
      titrePoste,
      description,
      ville,
      niveau,
      typeContrat,
      dureeContrat,
      competences,
      nombreCV,
      fichePoste: fichePoste?.name,
      dateDepot: new Date().toLocaleString("fr-FR"),
      cvProposes: cvProposes.map((cv) => cv.nom),
    };

    localStorage.setItem("offres-entreprises", JSON.stringify([...offres, nouvelleOffre]));

    const cvsMisAJour = cvs.map((cv) => {
      const presente = cvProposes.some((cvPropose) => cvPropose.nom === cv.nom);

      if (!presente) return cv;

      const nouvellePresentation: Presentation = {
        offreId,
        nomEntreprise,
        titrePoste,
        ville,
        niveauRecherche: niveau,
        typeContrat,
        datePresentation: new Date().toLocaleString("fr-FR"),
      };

      return {
        ...cv,
        presentations: [...(cv.presentations || []), nouvellePresentation],
      };
    });

    setCvs(cvsMisAJour);
    localStorage.setItem("cvs-cre", JSON.stringify(cvsMisAJour));
  }

  function calculerScores(limite: number) {
    const niveauBas = niveauInferieur(niveau);

    const cvsCompatibles = cvs.filter((cv) => {
      const villeCV = villeDepuisCampus(cv.campus || "");

      return (
        villeCV === ville &&
        (cv.niveau === niveau || cv.niveau === niveauBas) &&
        (cv.statut || "recherche") === "recherche"
      );
    });

    const scores = cvsCompatibles
      .map((cv) => {
        let score = cv.niveau === niveau ? 75 : 50;

        competences.forEach(() => {
          score += 3;
        });

        if (score > 100) score = 100;

        return {
          ...cv,
          score,
        };
      })
      .sort((a, b) => {
        if (a.niveau === niveau && b.niveau !== niveau) return -1;
        if (a.niveau !== niveau && b.niveau === niveau) return 1;

        return (b.score || 0) - (a.score || 0);
      });

    const selection = scores.slice(0, Math.min(limite, scores.length));

    setResultats(selection);
    sauvegarderOffre(selection);

    if (scores.length === 0) {
      setMessageErreur("Aucun CV en recherche d’alternance ne correspond à cette ville et à ce niveau.");
      return;
    }

    if (scores.length < limite) {
      setMessageErreur(`Seulement ${scores.length} CV compatible(s) disponible(s).`);
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
    <main className="page">
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        .page {
          min-height: 100vh;
          background: #242424;
          color: white;
          font-family: Arial, Helvetica, sans-serif;
          overflow-x: hidden;
          position: relative;
          padding: 36px 48px 70px;
        }
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
        .bubble-1 { width: 220px; height: 220px; background: #ffed73; top: 8%; left: 6%; }
        .bubble-2 { width: 150px; height: 150px; background: #b7e4ff; top: 22%; right: 8%; animation-delay: 2s; }
        .bubble-3 { width: 260px; height: 260px; background: #f3c7b0; top: 52%; left: 16%; animation-delay: 4s; }
        .bubble-4 { width: 180px; height: 180px; background: #d9b8ff; bottom: 12%; right: 14%; animation-delay: 6s; }
        .bubble-5 { width: 130px; height: 130px; background: #a7e8c5; bottom: 28%; left: 70%; animation-delay: 8s; }
        @keyframes floatBubble {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); }
          50% { transform: translateY(-34px) translateX(22px) scale(1.08); }
        }
        .content { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; }
        .fade-up { opacity: 0; transform: translateY(32px); animation: fadeUp 0.9s ease forwards; }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.45s; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        .card {
          background: rgba(51, 51, 51, 0.92);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 28px;
          box-shadow: 0 22px 45px rgba(0,0,0,0.25);
          backdrop-filter: blur(8px);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(255,255,255,0.13), transparent 42%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .card:hover { transform: translateY(-7px); box-shadow: 0 30px 60px rgba(0,0,0,0.38); }
        .card:hover::after { opacity: 1; }
        .card > * { position: relative; z-index: 1; }
        .button {
          background: #ffed73;
          color: #111;
          border: none;
          padding: 14px 22px;
          border-radius: 999px;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .button:hover { transform: translateY(-3px); box-shadow: 0 10px 22px rgba(255,237,115,0.28); }
        .button-secondary {
          background: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.35);
          padding: 14px 22px;
          border-radius: 999px;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .button-secondary:hover { transform: translateY(-3px); border-color: #ffed73; }
        input, textarea, select {
          width: 100%;
          height: 46px;
          padding: 0 14px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.15);
          background: #242424;
          color: white;
          outline: none;
        }
        textarea { height: auto; padding: 14px; resize: vertical; }
        input::placeholder, textarea::placeholder { color: #bdbdbd; }
        label { color: #e8e8e8; font-weight: 700; display: block; margin-bottom: 8px; }
        .grid-form {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          align-items: center;
        }
        .tag {
          background: rgba(255,237,115,0.12);
          border: 1px solid rgba(255,237,115,0.45);
          color: #ffed73;
          padding: 9px 13px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .cv-card {
          background: rgba(51, 51, 51, 0.96);
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 22px;
          box-shadow: 0 18px 40px rgba(0,0,0,0.22);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cv-card:hover { transform: translateY(-7px); box-shadow: 0 28px 55px rgba(0,0,0,0.32); }
        @media (max-width: 1050px) { .grid-form { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 700px) {
          .page { padding: 24px; }
          .hero-title { font-size: 38px !important; }
          .grid-form { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="background-animation">
        <div className="bubble bubble-1" />
        <div className="bubble bubble-2" />
        <div className="bubble bubble-3" />
        <div className="bubble bubble-4" />
        <div className="bubble bubble-5" />
      </div>

      <div className="content">
        <Link href="/">
          <button className="button-secondary" style={{ marginBottom: "30px" }}>
            🏠 Accueil
          </button>
        </Link>

        <section className="fade-up delay-1" style={{ marginBottom: "36px" }}>
          <p style={{ textTransform: "uppercase", letterSpacing: "2px", color: "#ffed73", fontSize: "13px", fontWeight: "bold", marginBottom: "12px" }}>
            Entreprises partenaires
          </p>

          <h1 className="hero-title" style={{ fontSize: "58px", lineHeight: "1", margin: 0, fontStyle: "italic", fontWeight: 900 }}>
            Déposer une offre
          </h1>

          <p style={{ color: "#e8e8e8", fontSize: "20px", lineHeight: "1.5", maxWidth: "760px", marginTop: "22px" }}>
            Déposez une offre et recevez automatiquement des CV compatibles selon la ville, le niveau recherché, le type de contrat et les compétences.
          </p>
        </section>

        <section className="card fade-up delay-2" style={{ padding: "34px", borderTop: "8px solid #f3c7b0", marginBottom: "36px" }}>
          <h2 style={{ marginTop: 0, fontSize: "30px" }}>Informations de l’offre</h2>

          <div className="grid-form">
            <input placeholder="Nom entreprise" value={nomEntreprise} onChange={(e) => setNomEntreprise(e.target.value)} />
            <input placeholder="Nom du contact" value={nomContact} onChange={(e) => setNomContact(e.target.value)} />
            <input placeholder="Email du contact" value={emailContact} onChange={(e) => setEmailContact(e.target.value)} />
            <input placeholder="Téléphone du contact" value={telephoneContact} onChange={(e) => setTelephoneContact(e.target.value)} />

            <input placeholder="Titre du poste" value={titrePoste} onChange={(e) => setTitrePoste(e.target.value)} />

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

            <input type="number" min="1" value={nombreCV} onChange={(e) => setNombreCV(Number(e.target.value))} placeholder="Nombre de CV souhaités" />
            <div />
            <div />
          </div>

          <textarea placeholder="Description du poste" rows={6} value={description} onChange={(e) => setDescription(e.target.value)} style={{ marginTop: "16px" }} />

          <div style={{ marginTop: "18px" }}>
            <label>Compétences recherchées</label>
            <select
              onChange={(e) => {
                ajouterCompetence(e.target.value);
                e.target.value = "Ajouter une compétence";
              }}
              style={{ marginTop: "10px" }}
            >
              <option>Ajouter une compétence</option>
              {competencesDisponibles.map((comp) => (
                <option key={comp}>{comp}</option>
              ))}
            </select>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "14px" }}>
              {competences.map((comp) => (
                <span className="tag" key={comp}>
                  {comp}
                  <button type="button" onClick={() => supprimerCompetence(comp)} style={{ background: "transparent", border: "none", color: "#ff8a8a", cursor: "pointer", fontWeight: "bold" }}>
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "22px" }}>
            <label>Importer une fiche de poste PDF</label>
            <input type="file" accept=".pdf" onChange={(event) => {
              const fichier = event.target.files?.[0];
              if (fichier) setFichePoste(fichier);
            }} style={{ marginTop: "10px", paddingTop: "10px" }} />

            {fichePoste && (
              <p style={{ color: "#a7e8c5" }}>Fiche de poste importée : <strong>{fichePoste.name}</strong></p>
            )}
          </div>

          <button className="button" type="button" onClick={analyserOffre} style={{ marginTop: "26px" }}>
            Valider et proposer des CV
          </button>

          {messageErreur && <p style={{ color: "#ff8a8a", fontWeight: "bold", marginTop: "18px" }}>{messageErreur}</p>}
        </section>

        {resultats.length > 0 && (
          <section className="fade-up delay-3">
            <h2 style={{ fontSize: "32px" }}>CV proposés</h2>
            <p style={{ color: "#e8e8e8", maxWidth: "760px", lineHeight: "1.5" }}>
              Les profils du niveau demandé sont priorisés. Des profils de l’année inférieure peuvent aussi être proposés pour élargir le vivier.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px", marginTop: "22px" }}>
              {resultats.map((cv, index) => (
                <div key={index} className="cv-card" style={{ borderTop: `6px solid ${cv.niveau === niveau ? "#a7e8c5" : "#f3c7b0"}` }}>
                  <strong style={{ fontSize: "18px" }}>{cv.nom}</strong>
                  <p style={{ color: "#e8e8e8" }}>{cv.campus}</p>
                  <p>{villeDepuisCampus(cv.campus)}</p>
                  <p>{cv.marque}</p>
                  <p>{cv.niveau}</p>
                  <p>{cv.promo}</p>

                  {cv.niveau !== niveau && <p style={{ color: "#f3c7b0", fontWeight: "bold" }}>Proposition année inférieure</p>}

                  <p style={{ color: "#ffed73", fontWeight: "bold" }}>Score : {cv.score || 0} %</p>

                  <a href={cv.url} target="_blank" style={{ color: "#ffed73", fontWeight: "bold" }}>
                    Ouvrir le CV
                  </a>
                </div>
              ))}
            </div>

            <button className="button" type="button" onClick={proposerDavantage} style={{ marginTop: "28px" }}>
              Proposer davantage de CV
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
