"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AccesInterne,
  peutVoirTousLesCampus,
  trouverAcces,
} from "./data/access";

type CVDepose = {
  nom: string;
  url: string;
  campus: string;
  marque: string;
  niveau: string;
  deposeParNom: string;
  deposeParEmail: string;
  dateDepot: string;
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [utilisateur, setUtilisateur] =
    useState<AccesInterne | null>(null);
  const [erreur, setErreur] = useState("");
  const [cvs, setCvs] = useState<CVDepose[]>([]);

  useEffect(() => {
    const session = localStorage.getItem("session-interne");

    if (session) {
      setUtilisateur(JSON.parse(session));
    }

    const sauvegardeCV = localStorage.getItem("cvs-cre");

    if (sauvegardeCV) {
      setCvs(JSON.parse(sauvegardeCV));
    }
  }, []);

  function verifierEmail() {
    const acces = trouverAcces(email);

    if (acces) {
      setUtilisateur(acces);
      localStorage.setItem("session-interne", JSON.stringify(acces));
      setErreur("");
    } else {
      setUtilisateur(null);
      setErreur("Email non autorisé.");
    }
  }

  function deconnexion() {
    localStorage.removeItem("session-interne");
    setUtilisateur(null);
    setEmail("");
  }

  function getStatsUtilisateur() {
    if (!utilisateur) return [];

    if (peutVoirTousLesCampus(utilisateur.role)) {
      const stats: Record<string, number> = {};

      cvs.forEach((cv) => {
        if (!stats[cv.campus]) {
          stats[cv.campus] = 0;
        }

        stats[cv.campus]++;
      });

      return Object.entries(stats).map(([campus, total]) => ({
        campus,
        total,
      }));
    }

    const total = cvs.filter(
      (cv) => cv.campus === utilisateur.campus
    ).length;

    return [
      {
        campus: utilisateur.campus,
        total,
      },
    ];
  }

  const statsUtilisateur = getStatsUtilisateur();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f6f2ea",
        color: "#111",
        fontFamily: "Arial",
        padding: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding: "20px 30px",
          borderRadius: "16px",
          marginBottom: "40px",
        }}
      >
        <img
          src="/logo.png"
          alt="Logo Skolae"
          style={{
            height: "90px",
            maxWidth: "300px",
            objectFit: "contain",
          }}
        />

        <h1
          style={{
            margin: 0,
            fontSize: "42px",
          }}
        >
          Portail Alternance
        </h1>
      </div>

      <p
        style={{
          fontSize: "20px",
          maxWidth: "760px",
          marginBottom: "40px",
        }}
      >
        La plateforme de mise en relation entre entreprises et talents en
        alternance.
      </p>

      {utilisateur && (
        <section
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            marginBottom: "30px",
            maxWidth: "760px",
          }}
        >
          <h2>👤 Profil connecté</h2>

          <p>
            <strong>{utilisateur.nom}</strong>
          </p>

          <p>{utilisateur.email}</p>
          <p>Rôle : {utilisateur.role}</p>
          <p>Campus de référence : {utilisateur.campus}</p>

          <h3>CV déposés</h3>

          {statsUtilisateur.length === 0 && (
            <p>Aucun CV déposé pour le moment.</p>
          )}

          {statsUtilisateur.map((stat) => (
            <div
              key={stat.campus}
              style={{
                backgroundColor: "#f6f2ea",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "8px",
              }}
            >
              <strong>{stat.campus}</strong> : {stat.total} CV
            </div>
          ))}

          <button type="button" onClick={deconnexion}>
            Se déconnecter
          </button>
        </section>
      )}

      <section
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "16px",
            width: "350px",
            minHeight: "220px",
          }}
        >
          <h2>Accès interne</h2>

          {!utilisateur && (
            <>
              <p>Renseignez votre email pour accéder au dépôt de CV.</p>

              <input
                placeholder="Email interne"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "15px",
                  boxSizing: "border-box",
                }}
              />

              <button type="button" onClick={verifierEmail}>
                Valider
              </button>

              {erreur && <p style={{ color: "red" }}>{erreur}</p>}
            </>
          )}

          {utilisateur && (
            <div style={{ marginTop: "15px" }}>
              <Link href="/cre?mode=mon">
                <button
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                  }}
                >
                  Mon campus : {utilisateur.campus}
                </button>
              </Link>

              <Link href="/cre?mode=autre">
                <button>Autre campus</button>
              </Link>
            </div>
          )}
        </div>

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "16px",
            width: "350px",
            minHeight: "220px",
          }}
        >
          <h2>Accès entreprise</h2>

          <p>Déposez une offre et recevez des CV compatibles.</p>

          <div
            style={{
              marginTop: "36px",
            }}
          >
            <Link href="/entreprise">
              <button>Déposer une offre</button>
            </Link>
          </div>
        </div>
      </section>

      <section
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "40px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            width: "220px",
          }}
        >
          <h2>23</h2>
          <p>écoles</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            width: "220px",
          }}
        >
          <h2>+21 000</h2>
          <p>étudiants</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            width: "220px",
          }}
        >
          <h2>10 000</h2>
          <p>entreprises d’accueil</p>
        </div>
      </section>
    </main>
  );
}