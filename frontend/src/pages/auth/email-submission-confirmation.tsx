import Layout from '@/components/Layout'

export default function EmailSubmissionConfirmation() {
    return (
        <Layout title='Créer un compte - Portfolio CAudrel'>
            <section className='login'>
                <h1>Confirmation</h1>
                <p>
                    Un email de validation vous a été envoyé. Merci de vérifier
                    votre boîte mail pour continuer votre création de compte.
                </p>
            </section>
        </Layout>
    )
}
