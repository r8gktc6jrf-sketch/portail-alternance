"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CV = {
  nom: string;
  url: string;
  ville: string;
  marque: string;
  niveau: string;
};

export default function CrePage() {
  const [ville, setVille] = useState("");
  const [marque, setMarque] = useState("");
  const [niveau, setNiveau] = useState("");
  const [cvs, setCvs] = useState<CV[]>([]);
  const [fichierSelectionne, setFichierSelectionne] = useState<File | null>(null);
  const [nomFichier, setNomFichier] = useState("");

  useEffect(() => {
    const sauvegarde = localStorage.getItem("cvs-cre");
    if (sauvegarde) setCvs(JSON.parse(sauvegarde));
  }, []);

  function enregistrerCV() {
    if (!fichierSelectionne || !ville || !marque || !niveau) {
      alert("Choisis une ville, une marque, un niveau et un CV.");
      return;
    }

    const nouveauCV: CV = {
      nom: nomFichier || fichierSelectionne.name,
      url: URL.createObjectURL(fichierSelectionne),
      ville,
      marque,
      niveau,
    };

    const nouveauxCV = [...cvs, nouveauCV];

    setCvs(nouveauxCV);
    localStorage.setItem("cvs-cre", JSON.stringify(nouveauxCV));

    setFichierSelectionne(null);
    setNomFichier("");
  }

  function supprimerCV(indexGlobal: number) {
    const nouveauxCV = cvs.filter((_, index) => index !== indexGlobal);
    setCvs(nouveauxCV);
    localStorage.setItem("cvs-cre", JSON.stringify(nouveauxCV));
  }

  const cvsDuDossier = cvs
    .map((cv, indexGlobal) => ({ ...cv, indexGlobal }))
    .filter(
      (cv) =>
        cv.ville === ville &&
        cv.marque === marque &&
        cv.niveau === niveau
    );

  return (
    <main style={{ padding: "40px", fontFamily: "Arial", color: "black" }}>
      <Link href="/">
        <button style={{ marginBottom: "25px" }}>🏠 Accueil</button>
      </Link>

      <h1>Dossiers CV</h1>

      <select value={ville} onChange={(e) => setVille(e.target.value)}>
        <option value="">Choisir une ville</option>
        <option>AIX-EN-PROVENCE</option>
        <option>BORDEAUX</option>
        <option>LE HAVRE</option>
        <option>LILLE</option>
        <option>LYON</option>
        <option>MONTPELLIER</option>
        <option>NANTES</option>
        <option>NICE</option>
        <option>ORLEANS</option>
        <option>PARIS</option>
        <option>POITIERS</option>
        <option>ROUEN</option>
        <option>TOURS</option>
        <option>RENNES</option>
        <option>TOULON</option>
        <option>TOULOUSE</option>
        <option>GRENOBLE</option>
        <option>REIMS</option>
      </select>

      {ville && (
        <select
          value={marque}
          onChange={(e) => setMarque(e.target.value)}
          style={{ marginLeft: "15px" }}
        >
          <option value="">Choisir une marque</option>
          <option>IIA</option>
          <option>AWA</option>
          <option>CFJ</option>
          <option>ETV</option>
          <option>WAY</option>
          <option>EFB</option>
          <option>ESC</option>
          <option>EPH</option>
          <option>EFM</option>
          <option>EML</option>
          <option>EGD</option>
          <option>EGI</option>
          <option>ESS</option>
          <option>ESM</option>
          <option>ICN</option>
          <option>IDR</option>
          <option>ISA</option>
          <option>ISJ</option>
          <option>MAE</option>
          <option>PPM</option>
          <option>MPS</option>
          <option>MDT</option>
          <option>PPA</option>
          <option>PPS</option>
          <option>SKO</option>
        </select>
      )}

      {marque && (
        <select
          value={niveau}
          onChange={(e) => setNiveau(e.target.value)}
          style={{ marginLeft: "15px" }}
        >
          <option value="">Choisir un niveau</option>
          <option>Bac</option>
          <option>Bac +1</option>
          <option>Bac +2</option>
          <option>Bac +3</option>
          <option>Bac +4</option>
          <option>Bac +5</option>
        </select>
      )}

      {niveau && (
        <div style={{ marginTop: "30px" }}>
          <h2>
            Dossier : {ville} / {marque} / {niveau}
          </h2>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(event) => {
              const fichier = event.target.files?.[0];
              if (!fichier) return;

              setFichierSelectionne(fichier);
              setNomFichier(fichier.name);
            }}
          />

          {fichierSelectionne && (
            <div style={{ marginTop: "15px" }}>
              <input
                value={nomFichier}
                onChange={(e) => setNomFichier(e.target.value)}
                style={{
                  width: "300px",
                  padding: "10px",
                  marginRight: "10px",
                }}
              />

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
                  width: "170px",
                  minHeight: "150px",
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  padding: "12px",
                  backgroundColor: "white",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    fontSize: "12px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginBottom: "10px",
                  }}
                >
                  {cv.nom}
                </strong>

                <a href={cv.url} target="_blank">
                  Ouvrir le CV
                </a>

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
        </div>
      )}
    </main>
  );
}