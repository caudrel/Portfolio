import Layout from '@/components/Layout'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useEffect, useState } from 'react'
import {
    useSendContactMessageMutation,
    MutationSendContactMessageArgs,
} from '@/graphql/generated/schema'
import { toast } from 'react-toastify'

export default function ContactForm() {
    const schema = z.object({
        email: z.string().email({ message: 'Email invalide' }),
        subject: z.string().min(3, {
            message: 'Le sujet doit contenir au moins 3 caractères',
        }),
        message: z
            .string()
            .min(10, {
                message: 'Le message doit contenir au moins 10 caractères',
            })
            .max(1000, {
                message: 'Le message ne peut pas dépasser 1000 caractères',
            }),
        honeypot: z.string().optional(),
        // recaptcha: z
        //     .string()
        //     .min(1, { message: 'Veuillez valider le reCAPTCHA' }),
    })

    type ContactFormInput = MutationSendContactMessageArgs & {
        honeypot?: string
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormInput>({
        resolver: zodResolver(schema),
    })

    const [sendContactMessageMutation, { loading, error, data }] =
        useSendContactMessageMutation()

    //const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
    const [message, setMessage] = useState('')
    const [charCount, setCharCount] = useState(0)
    const [canSubmit, setCanSubmit] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setCanSubmit(true), 3000)
        return () => clearTimeout(timer)
    }, [])

    const onSubmit = async (formData: ContactFormInput) => {
        console.log('FormData:', formData) // Voir ce qui est envoyé

        const spamKeywords = [
            'http',
            'https',
            'viagra',
            'casino',
            'crypto',
            'érection',
            'erection',
        ]
        if (spamKeywords.some(word => formData.message.includes(word))) {
            toast.error('Votre message contient des mots interdits.')
            return
        }

        if (formData.honeypot) {
            console.warn('Bot détecté !')
            return // Stoppe l'envoi
        }

        try {
            const response = await sendContactMessageMutation({
                variables: { ...formData },
            })

            if (response.data?.sendContactMessage.success) {
                setMessage(response.data.sendContactMessage.message)
                toast.success('Message envoyé avec succès !')
                reset()
                setCharCount(0)
            } else {
                setMessage(
                    "Une erreur est survenue lors de l'envoi du message."
                )
            }
        } catch (err) {
            console.error(err)
            setMessage('Une erreur est survenue. Veuillez réessayer.')
        }
    }

    // Fonction pour exécuter reCAPTCHA et obtenir le token
    // const executeReCaptcha = async () => {
    //     if (window.grecaptcha) {
    //         try {
    //             const token = await window.grecaptcha.enterprise.execute(
    //                 '6Lf8CfcqAAAAAPrDuO7-pMM-FfWnAXvyVzzqkFwi',
    //                 { action: 'contact_form_submission' }
    //             )
    //             setRecaptchaToken(token) // Sauvegarde du token dans l'état
    //         } catch (error) {
    //             console.error("Erreur lors de l'exécution de reCAPTCHA:", error)
    //         }
    //     }
    // }

    // Utilisation de useEffect pour initialiser reCAPTCHA au montage du composant
    // useEffect(() => {
    //     if (window.grecaptcha) {
    //         window.grecaptcha.enterprise.ready(() => {
    //             executeReCaptcha() // Appeler executeReCaptcha à l'initialisation
    //         })
    //     }
    // }, [])

    // Fonction de soumission du formulaire
    // const onSubmit = async (data: any) => {
    //     if (!recaptchaToken) {
    //         setMessage('Veuillez valider le reCAPTCHA')
    //         return
    //     }

    //     // Envoi du token reCAPTCHA à l'API de Google pour vérification
    //     const recaptchaResponse = await fetch(
    //         `https://recaptchaenterprise.googleapis.com/v1/projects/caudrel-portfolio/assessments?key=API_KEY`,
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 event: {
    //                     token: recaptchaToken,
    //                     action: 'contact_form_submission',
    //                 },
    //             }),
    //         }
    //     )

    //     const recaptchaVerificationResult = await recaptchaResponse.json()

    //     if (!recaptchaVerificationResult.tokenProperties.valid) {
    //         setMessage('reCAPTCHA invalide, veuillez réessayer.')
    //         return
    //     }

    //     // Si la vérification du reCAPTCHA est réussie, envoyer les données du formulaire
    //     const response = await fetch('/api/contact', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ ...data, recaptchaToken }),
    //     })

    //     const result = await response.json()
    //     setMessage(result.message)
    // }

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
                                <label htmlFor='message' className='word-count'>
                                    <span>Votre message</span>
                                    <p>{charCount} / 1000</p>
                                </label>
                                <textarea
                                    {...register('message')}
                                    className='p-2 border'
                                    rows={5}
                                    placeholder='Votre message doit contenir au minimum 10 caractères'
                                    maxLength={1000}
                                    onChange={e =>
                                        setCharCount(e.target.value.length)
                                    }
                                />
                                {errors.message && (
                                    <p className='text-red-600'>
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'none' }}>
                            <label htmlFor='honeypot'>
                                <span>
                                    Vous accepter de recevoir une réponse par
                                    téléphone ?
                                </span>
                            </label>
                            <input
                                type='text'
                                style={{ display: 'none' }}
                                tabIndex={-1}
                                autoComplete='off'
                                {...register('honeypot')}
                            />
                        </div>

                        {/* Affichage du reCAPTCHA */}
                        {/* <div className='g-recaptcha' /> */}
                        <div className='form-validation'>
                            <button
                                type='submit'
                                className='btn-secondary'
                                disabled={!canSubmit}
                            >
                                {loading ? 'Envoi en cours...' : 'Envoyer'}
                            </button>
                        </div>

                        {message && <p className='text-green-700'>{message}</p>}
                        {error && (
                            <p className='text-red-600'>
                                Une erreur est survenue : {error.message}
                            </p>
                        )}
                    </form>
                </div>
            </section>
        </Layout>
    )
}
