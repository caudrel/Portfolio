import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Méthode non autorisée' })
    }

    try {
        const { email, subject, message, recaptchaToken } = req.body

        const response = await fetch(process.env.BACKEND_GRAPHQL_URL!, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                mutation {
                    sendContactMessage(email: "${email}", subject: "${subject}", message: """${message}""", recaptchaToken: "${recaptchaToken}") {
                        message
                    }
                }`,
            }),
        })

        const data = await response.json()
        return res.status(200).json(data.data.sendContactMessage)
    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur' })
    }
}
