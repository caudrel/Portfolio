export interface SendMailOptions {
    Messages: Message[]
}

export interface Message {
    From: Contact
    To: Contact[]
    Cc?: Contact[]
    Bcc?: Contact[]
    Subject: string
    TextPart?: string
    HTMLPart?: string
}

export interface Contact {
    Name: string
    Email: string
}

const credentials =
    `${process.env.SMTP_USER}:${process.env.SMTP_PASSWORD}` as String

export default async function sendMail(
    options: SendMailOptions
): Promise<{ success: boolean; response?: any; error?: string }> {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
        console.error('❌ Erreur : SMTP_USER ou SMTP_PASSWORD non défini')
        return { success: false, error: 'Configuration SMTP manquante' }
    }

    if (!options || !options.Messages || options.Messages.length === 0) {
        console.error('❌ Erreur : Aucune donnée de mail fournie')
        return { success: false, error: 'Données de mail invalides' }
    }

    const authToken = Buffer.from(credentials).toString('base64')

    try {
        const response = await fetch('https://api.mailjet.com/v3.1/send', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(options),
        })

        const data = await response.json()

        if (!response.ok) {
            console.error(`❌ Erreur d'envoi:`, data)
            return { success: false, error: data }
        }

        return { success: true, response: data }
    } catch (error) {
        console.error('❌ Erreur de connexion à Mailjet:', error)
        return { success: false, error: 'Erreur de connexion à Mailjet' }
    }
}

// Exemple d'utilisation
// await sendMail({
//     Messages: [
//         {
//             From: { Name: 'Mon App', Email: 'no-reply@monapp.com' },
//             To: [{ Name: 'Jean Dupont', Email: 'jean@example.com' }],
//             Cc: [{ Name: 'Paul Martin', Email: 'paul@example.com' }],
//             Subject: 'Bienvenue sur Mon App !',
//             TextPart: 'Merci de vous être inscrit.',
//             HTMLPart: '<h1>Bienvenue !</h1><p>Merci de vous être inscrit.</p>',
//         },
//     ],
// })
