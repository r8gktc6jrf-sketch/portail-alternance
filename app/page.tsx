"use client";

import Link from "next/link";
import { useState } from "react";

const emailsValides = [
  "xcorcelle1@skolae.fr",
];

export default function Home() {
  const [email, setEmail] =
    useState("");

  const [accesValide, setAccesValide] =
    useState(false);

  const [erreur, setErreur] =
    useState("");

  function verifierEmail() {
    const emailNettoye =
      email
        .trim()
        .toLowerCase();

    if (
      emailsValides.includes(
        emailNettoye
      )
    ) {
      setAccesValide(true);
      setErreur("");
    } else {
      setAccesValide(false);
      setErreur(
        "Email non autorisé"
      );
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "white",
        color: "black",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>
        Portail Alternance
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          maxWidth: "600px",
          marginTop: "40px",
        }}
      >
        <section
          style={{
            border:
              "1px solid #ccc",
            borderRadius: "12px",
            padding: "25px",
          }}
        >
          <h2>
            Accès interne
          </h2>

          <p>
            Renseignez votre
            email pour accéder
            au dépôt de CV.
          </p>

          <input
            type="email"
            placeholder="Email interne"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          />

          <button
            type="button"
            onClick={verifierEmail}
          >
            Valider
          </button>

          {erreur && (
            <p
              style={{
                color: "red",
                marginTop: "15px",
              }}
            >
              {erreur}
            </p>
          )}

          {accesValide && (
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <Link href="/cre">
                <button>
                  Accéder au dépôt
                  de CV
                </button>
              </Link>
            </div>
          )}
        </section>

        <section
          style={{
            border:
              "1px solid #ccc",
            borderRadius: "12px",
            padding: "25px",
          }}
        >
          <h2>
            Je suis une entreprise
          </h2>

          <Link href="/entreprise">
            <button>
              Déposer une offre
            </button>
          </Link>
        </section>
      </div>
    </main>
  );
}