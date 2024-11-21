import Image from "next/image";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

export default function Home() {
  const languages = ["Laravel", "Symfony", "Next.js", "Node.js", "SQL"];
  const [currentLanguage, setCurrentLanguage] = useState<string>(""); // Stocke la langue actuelle
  const [index, setIndex] = useState<number>(0); // Suivi de l'index

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguage(languages[index]); // Met à jour la langue actuelle
      setIndex((prevIndex) => (prevIndex + 1) % languages.length); // Passe à l'index suivant, revient au début si nécessaire
    }, 2000); // 2000ms = 2 secondes

    return () => clearInterval(interval); // Nettoyage au démontage
  }, [index, languages]);

  return (
    <>
      <Layout title="Accueil - Portfolio CAudrel">
        <div className="title">
          <Image className="profil profilPic" src="/profil.jpg" alt="Photo Aurelie" width={180} height={180} priority />
          <h1>AURELIE LOZACH</h1>
          <h2>Full Stack</h2>

          <ul>
            <li key={currentLanguage}>{currentLanguage}</li>
          </ul>

          <footer />
        </div>
      </Layout>
    </>
  );
}
