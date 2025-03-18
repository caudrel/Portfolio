import Layout from '@/components/Layout'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState, useEffect } from 'react'
import { useSendContactMessageMutation } from '@/graphql/generated/schema'

export default function ContactForm() {
    const schema = z.object({
        email: z.string().email({ message: 'Email invalide' }),
        subject: z.string().min(3, {
            message: 'Le sujet doit contenir au moins 3 caractères',
        }),
        message: z.string().min(10, {
            message: 'Le message doit contenir au moins 10 caractères',
        }),
        recaptcha: z
            .string()
            .min(1, { message: 'Veuillez valider le reCAPTCHA' }),
    })

    const [sendContactMessageMutation, { loading, error, data }] =
        useSendContactMessageMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) })

    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
    const [message, setMessage] = useState('')

    // Fonction pour exécuter reCAPTCHA et obtenir le token
    const executeReCaptcha = async () => {
        if (window.grecaptcha) {
            try {
                const token = await window.grecaptcha.enterprise.execute(
                    '6Lf8CfcqAAAAAPrDuO7-pMM-FfWnAXvyVzzqkFwi',
                    { action: 'contact_form_submission' }
                )
                setRecaptchaToken(token) // Sauvegarde du token dans l'état
            } catch (error) {
                console.error("Erreur lors de l'exécution de reCAPTCHA:", error)
            }
        }
    }

    // Utilisation de useEffect pour initialiser reCAPTCHA au montage du composant
    useEffect(() => {
        if (window.grecaptcha) {
            window.grecaptcha.enterprise.ready(() => {
                executeReCaptcha() // Appeler executeReCaptcha à l'initialisation
            })
        }
    }, [])

    // Fonction de soumission du formulaire
    const onSubmit = async (data: any) => {
        if (!recaptchaToken) {
            setMessage('Veuillez valider le reCAPTCHA')
            return
        }

        // Envoi du token reCAPTCHA à l'API de Google pour vérification
        const recaptchaResponse = await fetch(
            `https://recaptchaenterprise.googleapis.com/v1/projects/caudrel-portfolio/assessments?key=API_KEY`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    event: {
                        token: recaptchaToken,
                        action: 'contact_form_submission',
                    },
                }),
            }
        )

        const recaptchaVerificationResult = await recaptchaResponse.json()

        if (!recaptchaVerificationResult.tokenProperties.valid) {
            setMessage('reCAPTCHA invalide, veuillez réessayer.')
            return
        }

        // Si la vérification du reCAPTCHA est réussie, envoyer les données du formulaire
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, recaptchaToken }),
        })

        const result = await response.json()
        setMessage(result.message)
    }

    return (
        <Layout title='Formulaire de contact - Portfolio CAudrel'>
            <section className='login'>
                <h1>Formulaire de contact</h1>
                <div className='form-frame'>
                    <form onSubmit={handleSubmit(onSubmit)} className='form'>
                        <div className='labels'>
                            <div className='label'>
                                <label htmlFor='email'>
                                    <span>Email</span>
                                </label>
                                <input
                                    id='email'
                                    type='email'
                                    placeholder='Votre email'
                                    {...register('email')}
                                    required
                                />
                                {errors.email && (
                                    <p className='text-red-600'>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className='label'>
                                <label htmlFor='subject'>
                                    <span>Sujet</span>
                                </label>
                                <input
                                    {...register('subject')}
                                    placeholder='Sujet'
                                />
                                {errors.subject && (
                                    <p className='text-red-600'>
                                        {errors.subject.message}
                                    </p>
                                )}
                            </div>

                            <div className='label'>
                                <label htmlFor='subject'>
                                    <span>Votre message</span>
                                </label>
                                <textarea
                                    {...register('message')}
                                    className='p-2 border'
                                    rows={5}
                                />
                                {errors.message && (
                                    <p className='text-red-600'>
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Affichage du reCAPTCHA */}
                        <div className='g-recaptcha' />
                        <div className='form-validation'>
                            <button type='submit' className='btn-secondary'>
                                Envoyer
                            </button>
                        </div>

                        {message && <p className='text-green-700'>{message}</p>}
                    </form>
                </div>
            </section>
        </Layout>
    )
}
