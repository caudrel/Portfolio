import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise'

export default async function verifyRecaptcha(
    recaptchaToken: string
): Promise<boolean> {
    const client = new RecaptchaEnterpriseServiceClient()
    const projectID = 'caudrel-portfolio' // ID de ton projet Google Cloud
    const recaptchaKey = process.env.RECAPTCHA_SITE_KEY! // Ta clé reCAPTCHA
    const recaptchaAction = 'contact_form_submission' // Action que tu as définie pour ton formulaire

    const projectPath = client.projectPath(projectID)

    const request = {
        assessment: {
            event: {
                token: recaptchaToken,
                siteKey: recaptchaKey,
            },
        },
        parent: projectPath,
    }

    try {
        const [response] = await client.createAssessment(request)

        // Vérification si les propriétés de la réponse existent
        if (!response.tokenProperties || !response.tokenProperties.valid) {
            console.log(
                `Le jeton est invalide : ${response.tokenProperties?.invalidReason}`
            )
            return false
        }

        // Vérification de l'action attendue
        if (response.tokenProperties.action !== recaptchaAction) {
            console.log("L'action attendue n'a pas été exécutée.")
            return false
        }

        // Vérification si 'riskAnalysis' existe
        if (response.riskAnalysis) {
            // Vérification du score et s'il est valide
            const score = response.riskAnalysis.score
            if (score !== undefined && score !== null) {
                console.log(`Le score reCAPTCHA est : ${score}`)

                // Vérification de l'existence et du type de 'reasons'
                if (Array.isArray(response.riskAnalysis.reasons)) {
                    response.riskAnalysis.reasons.forEach(reason => {
                        console.log(reason) // Tu peux loguer tout l'objet 'reason' ou afficher des propriétés spécifiques
                    })
                }

                // Retourner true si le score est acceptable
                return score > 0.5
            } else {
                console.log('Le score reCAPTCHA est introuvable ou nul.')
                return false
            }
        }

        console.log("L'évaluation du risque (riskAnalysis) est introuvable.")
        return false
    } catch (error) {
        console.error('Erreur lors de la validation reCAPTCHA :', error)
        return false
    }
}
