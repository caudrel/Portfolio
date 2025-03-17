export {}

declare global {
    interface Window {
        mailgoInitialized?: boolean
        grecaptcha: any
    }
}
