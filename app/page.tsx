"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AccesInterne, trouverAcces } from "./data/access";

export default function Home() {
  const [email, setEmail] = useState("");
  const [utilisateur, setUtilisateur] = useState<AccesInterne | null>(null);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("session-interne");

    if (session) {
      setUtilisateur(JSON.parse(session));
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

  return (
    <main className="page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .page {
          min-height: 100vh;
          background: #242424;
          color: white;
          font-family: Arial, Helvetica, sans-serif;
          overflow-x: hidden;
        }

        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          animation: fadeUp 0.9s ease forwards;
        }

        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.45s; }
        .delay-4 { animation-delay: 0.6s; }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-logo {
          animation: floatLogo 4s ease-in-out infinite;
        }

        @keyframes floatLogo {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 28px 50px rgba(0,0,0,0.35);
        }

        .button {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 22px rgba(255,237,115,0.25);
        }

        .stat-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .stat-card:hover {
          transform: scale(1.04);
          box-shadow: 0 24px 50px rgba(0,0,0,0.14);
        }

        .value-card {
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          transition: transform 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;
        }

        .value-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top, rgba(255,255,255,0.18), transparent 45%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-12px) scale(1.04) rotateX(4deg);
          background-color: #3a3a3a;
          box-shadow: 0 24px 45px rgba(0,0,0,0.3);
        }

        .value-card:hover::after {
          opacity: 1;
        }

        .value-card h3 {
          position: relative;
          z-index: 1;
          transition: transform 0.25s ease, letter-spacing 0.25s ease;
        }

        .value-card:hover h3 {
          transform: translateY(-6px);
          letter-spacing: 1px;
        }

        input::placeholder {
          color: #bdbdbd;
        }

        @media (max-width: 700px) {
          .hero-title {
            font-size: 42px !important;
          }

          .section-padding {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }

          .header {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
      `}</style>

      <header
        className="header fade-up"
        style={{
          padding: "36px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        <img
          className="hero-logo"
          src="/logo.png"
          alt="Logo Skolae"
          style={{
            height: "78px",
            maxWidth: "300px",
            objectFit: "contain",
            filter: "invert(1)",
          }}
        />

        {utilisateur && (
          <div
            style={{
              backgroundColor: "#333",
              padding: "14px 20px",
              borderRadius: "18px",
            }}
          >
            <strong>{utilisateur.nom}</strong>
            <p style={{ margin: "6px 0" }}>{utilisateur.email}</p>

            <button
              className="button"
              type="button"
              onClick={deconnexion}
              style={{
                backgroundColor: "#ffed73",
                color: "#111",
                border: "none",
                padding: "10px 16px",
                borderRadius: "999px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Se déconnecter
            </button>
          </div>
        )}
      </header>

      <section
        className="section-padding fade-up delay-1"
        style={{
          padding: "40px 48px 70px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontSize: "13px",
            fontWeight: "bold",
            color: "#ffed73",
            marginBottom: "18px",
          }}
        >
          Portail relations entreprises
        </p>

        <h1
          className="hero-title"
          style={{
            fontSize: "64px",
            lineHeight: "1",
            margin: "0 auto",
            maxWidth: "950px",
            fontStyle: "italic",
            fontWeight: 900,
          }}
        >
          Connecter les entreprises aux talents SKOLAE.
        </h1>

        <p
          style={{
            fontSize: "21px",
            lineHeight: "1.5",
            maxWidth: "780px",
            margin: "28px auto 0",
            color: "#e8e8e8",
          }}
        >
          Une plateforme dédiée au dépôt de CV, au suivi des candidats et à la
          proposition de profils qualifiés.
        </p>
      </section>

      <section
        id="acces"
        className="section-padding"
        style={{
          padding: "0 48px 70px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "28px",
        }}
      >
        <div
          className="card fade-up delay-2"
          style={{
            backgroundColor: "#333",
            borderRadius: "26px",
            padding: "36px",
            minHeight: "310px",
            borderTop: "8px solid #f3c7b0",
            boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "1.6px",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#f3c7b0",
            }}
          >
            Entreprises partenaires
          </p>

          <h2
            style={{
              fontSize: "34px",
              marginBottom: "18px",
              fontWeight: 900,
            }}
          >
            Déposer une offre
          </h2>

          <p
            style={{
              lineHeight: "1.5",
              color: "#e8e8e8",
              minHeight: "70px",
            }}
          >
            Déposez une offre de stage, d’alternance ou d’emploi afin de
            recevoir des profils adaptés à vos besoins.
          </p>

          <Link href="/entreprise">
            <button
              className="button"
              style={{
                backgroundColor: "#ffed73",
                color: "#111",
                border: "none",
                padding: "14px 22px",
                borderRadius: "999px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "28px",
              }}
            >
              Déposer une offre
            </button>
          </Link>
        </div>

        <div
          className="card fade-up delay-3"
          style={{
            backgroundColor: "#333",
            borderRadius: "26px",
            padding: "36px",
            minHeight: "310px",
            borderTop: "8px solid #b7e4ff",
            boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "1.6px",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#b7e4ff",
            }}
          >
            Équipe interne
          </p>

          <h2
            style={{
              fontSize: "34px",
              marginBottom: "18px",
              fontWeight: 900,
            }}
          >
            Accès interne
          </h2>

          {!utilisateur && (
            <>
              <p
                style={{
                  lineHeight: "1.5",
                  color: "#e8e8e8",
                  minHeight: "70px",
                }}
              >
                Connectez-vous avec votre email interne pour déposer des CV,
                suivre les candidats et piloter les campus.
              </p>

              <input
                placeholder="Email interne"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px",
                  marginTop: "12px",
                  marginBottom: "14px",
                  borderRadius: "12px",
                  border: "1px solid #555",
                  backgroundColor: "#242424",
                  color: "white",
                  outline: "none",
                }}
              />

              <button
                className="button"
                type="button"
                onClick={verifierEmail}
                style={{
                  backgroundColor: "#ffed73",
                  color: "#111",
                  border: "none",
                  padding: "14px 22px",
                  borderRadius: "999px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Valider
              </button>

              {erreur && <p style={{ color: "#ff8a8a" }}>{erreur}</p>}
            </>
          )}

          {utilisateur && (
            <div style={{ marginTop: "30px" }}>
              <p>
                Connecté : <strong>{utilisateur.nom}</strong>
              </p>

              <Link href="/cre?mode=mon">
                <button
                  className="button"
                  style={{
                    backgroundColor: "#ffed73",
                    color: "#111",
                    border: "none",
                    padding: "14px 22px",
                    borderRadius: "999px",
                    marginRight: "10px",
                    marginBottom: "10px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Mon campus
                </button>
              </Link>

              <Link href="/cre?mode=autre">
                <button
                  className="button"
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    border: "1px solid white",
                    padding: "14px 22px",
                    borderRadius: "999px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Autre campus
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section
        id="chiffres"
        className="section-padding"
        style={{
          backgroundColor: "#f4f0e8",
          color: "#111",
          padding: "70px 48px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "22px",
        }}
      >
        {[
          ["23", "écoles"],
          ["+21 000", "étudiants"],
          ["10 000", "entreprises d’accueil"],
          ["43 000", "alumni en activité"],
        ].map(([nombre, label], index) => (
          <div
            key={label}
            className={`stat-card fade-up delay-${Math.min(index + 1, 4)}`}
            style={{
              backgroundColor: "white",
              borderRadius: "24px",
              padding: "30px",
              minHeight: "145px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                fontSize: "42px",
                margin: "0 0 16px",
                fontWeight: 900,
              }}
            >
              {nombre}
            </h2>

            <p style={{ margin: 0, fontSize: "17px" }}>{label}</p>
          </div>
        ))}
      </section>

      <section
        className="section-padding"
        style={{
          backgroundColor: "#242424",
          padding: "70px 48px",
          textAlign: "center",
        }}
      >
        <h2
          className="fade-up"
          style={{
            fontSize: "36px",
            fontStyle: "italic",
            fontWeight: 900,
            marginBottom: "40px",
          }}
        >
          NOS VALEURS
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "26px",
            maxWidth: "1120px",
            margin: "0 auto",
          }}
        >
          {[
            ["Engagement", "#b7e4ff"],
            ["Innovation", "#d9b8ff"],
            ["Agilité", "#f3c7b0"],
            ["Collectif", "#a7e8c5"],
          ].map(([valeur, couleur], index) => (
            <div
              key={valeur}
              className={`value-card fade-up delay-${Math.min(index + 1, 4)}`}
              style={{
                backgroundColor: "#333",
                borderRadius: "18px",
                padding: "42px 20px",
                borderTop: `8px solid ${couleur}`,
                minHeight: "150px",
                cursor: "pointer",
              }}
            >
              <h3
                style={{
                  textTransform: "uppercase",
                  fontSize: "15px",
                  marginTop: "35px",
                }}
              >
                {valeur}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}