// pages/privacy-policy.tsx
import Layout from '@/components/Layout'

export default function PrivacyPolicy() {
    return (
        <Layout title='Politique de confidentialité - Portfolio CAudrel'>
            <section className='legal'>
                <div className='center'>
                    <h1>Politique de confidentialité</h1>
                </div>

                <div>
                    <h2>Objectif de cette politique de confidentialité</h2>
                    <p>
                        Cette politique de confidentialité vise à informer les
                        utilisateurs de mon site sur la manière dont je
                        collecte, utilise et protége leurs données personnelles.
                        Elle précise notamment :
                    </p>
                    <ul>
                        <li>
                            Les données personnelles collectées, le cas échéant
                        </li>
                        <li>L&apos;utilisation de ces données</li>
                        <li>Les personnes ayant accès à ces informations</li>
                        <li>
                            Les droits des utilisateurs concernant leurs données
                        </li>
                        <li>Notre politique relative aux cookies</li>
                    </ul>

                    <p>
                        Cette politique complète nos conditions générales
                        d&apos;utilisation.
                    </p>
                </div>

                <div>
                    <h2>Conformité aux règlements en vigueur</h2>
                    <p>
                        Nous nous conformons au Règlement Général sur la
                        Protection des Données (RGPD), garantissant que les
                        données personnelles sont :
                    </p>
                    <ul>
                        <li>
                            Traitées de manière licite, loyale et transparente
                        </li>
                        <li>
                            Collectées pour des finalités précises et légitimes
                        </li>
                        <li>Pertinentes et limitées au strict nécessaire</li>
                        <li>Exactes et mises à jour si besoin</li>
                        <li>
                            Conservées pour une durée n&apos;excédant pas celle
                            nécessaire
                        </li>
                        <li>
                            Protégées contre tout accès non autorisé ou
                            traitement illicite
                        </li>
                    </ul>
                    <p>
                        Le traitement des données est effectué uniquement
                        lorsque l&apos;une des conditions suivantes est remplie
                        :
                    </p>
                    <ul>
                        <li>L&apos;utilisateur a donné son consentement</li>
                        <li>
                            Il est nécessaire à l&apos;exécution d&apos;un
                            contrat ou d&apos;une obligation légale
                        </li>
                        <li>Il répond à un intérêt légitime</li>
                    </ul>
                </div>

                <div>
                    <h2>Consentement</h2>
                    <p>
                        En naviguant sur notre site, les utilisateurs acceptent
                        :
                    </p>
                    <ul>
                        <li>
                            Les termes de cette politique de confidentialité
                        </li>
                        <li>
                            La collecte, l&apos;utilisation et la conservation
                            des données mentionnées
                        </li>
                    </ul>
                </div>

                <div>
                    <h2>Données personnelles collectées</h2>
                    <p>
                        Nous ne collectons ni stockons aucune donnée utilisateur
                        sur notre site. Si nous devions recueillir des
                        informations personnelles, nous en informerions les
                        utilisateurs en amont.
                    </p>
                </div>

                <div>
                    <h2>Politique sur les cookies</h2>
                    <p>
                        Un cookie est un petit fichier stocké sur
                        l&apos;appareil de l&apos;utilisateur permettant de
                        suivre ses interactions avec le site. Nous utilisons
                        uniquement des cookies fonctionnels pour :{' '}
                    </p>
                    <ul>
                        <li>
                            Mémoriser les préférences des utilisateurs lors de
                            leur navigation
                        </li>
                    </ul>
                    <p>
                        Les utilisateurs peuvent gérer ou désactiver les cookies
                        via les paramètres de leur navigateur, bien que cela
                        puisse affecter certaines fonctionnalités du site.
                    </p>
                </div>

                <div>
                    <h2>Dispositions supplémentaires</h2>
                    <p>
                        Si un utilisateur crée un compte, nous collectons son
                        nom, prénom et adresse e-mail uniquement à des fins
                        d&apos;authentification et de démonstration de nos
                        compétences. Ces informations ne sont ni partagées ni
                        revendues.
                    </p>
                </div>

                <div>
                    <h2>Modifications</h2>
                    <p>
                        Cette politique peut être mise à jour pour rester
                        conforme aux lois en vigueur. Nous encourageons nos
                        utilisateurs à la consulter régulièrement. Toute
                        modification substantielle sera notifiée par e-mail.
                    </p>
                </div>

                <div>
                    <h2>Contact</h2>
                    <p>
                        Pour toute question concernant cette politique, vous
                        pouvez nous contacter :
                    </p>
                    <ul>
                        <li>
                            <b>Téléphone</b> : 06 84 65 04 90
                        </li>
                        <li>
                            <b>E-mail</b> : lozachaurelie@gmail.com
                        </li>
                        <li>
                            <b>Adresse</b> : 18 rue des Maraîchers
                        </li>
                        <li>
                            <b>Date d&apos;entrée en vigueur : 1er mars 2025</b>
                        </li>
                    </ul>
                </div>
            </section>
        </Layout>
    )
}
