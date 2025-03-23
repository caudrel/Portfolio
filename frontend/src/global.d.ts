export {}

declare global {
    interface Window {
        mailgoInitialized?: boolean
        grecaptcha: any
        YT: any
        onYouTubeIframeAPIReady: () => void
    }
}
