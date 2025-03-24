import Layout from '@/components/Layout'
import { useRef } from 'react'

export default function Quiz() {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play()
        }
    }

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause()
        }
    }

    return (
        <Layout title='Quiz - Portfolio CAudrel'>
            <section className='login'>
                <h1>Quiz Time!</h1>
                <button className='btn-primary' onClick={handlePlay}>
                    🎶 Jouer la musique
                </button>
                <button className='btn-primary' onClick={handlePause}>
                    ⏸️ Pause
                </button>
                <audio ref={audioRef} src='/sounds/kahoot.mp3' loop />
            </section>
        </Layout>
    )
}
