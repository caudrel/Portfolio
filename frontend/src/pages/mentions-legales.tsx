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
                    <p>
                        Cette politique de confidentialité explique comment nous
                        collectons, utilisons et protégeons vos informations
                        personnelles lorsque vous utilisez notre site web.
                    </p>
                </div>

                <div>
                    <h2>COLLECTE DE DONNÉES</h2>
                    <p>
                        Nous collectons des informations personnelles lorsque
                        vous vous connectez via Google ou créez un compte
                        manuel. Vos données ne seront jamais partagées avec des
                        tiers sans votre consentement explicite.
                    </p>
                </div>

                <div>
                    <h2>UTILISATION DES DONNÉES</h2>
                    <p>
                        Vos informations sont utilisées uniquement pour
                        améliorer votre expérience utilisateur et assurer le bon
                        fonctionnement de notre plateforme.
                    </p>
                </div>

                <div>
                    <h2>SÉCURITÉ</h2>
                    <p>
                        Nous mettons en œuvre toutes les mesures nécessaires
                        pour protéger vos données contre tout accès non autorisé
                        ou utilisation abusive.
                    </p>
                </div>
            </section>
        </Layout>
    )
}
