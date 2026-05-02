import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'

const desktopColumns: number[][] = [
    Array.from({ length: 10 }, (_, i) => i), // 0(caché), 1-9 ← ajouter le 0
    Array.from({ length: 10 }, (_, i) => i + 10),
    Array.from({ length: 10 }, (_, i) => i + 20),
    Array.from({ length: 10 }, (_, i) => i + 30),
    Array.from({ length: 10 }, (_, i) => i + 40),
    Array.from({ length: 10 }, (_, i) => i + 50),
    Array.from({ length: 10 }, (_, i) => i + 60),
    Array.from({ length: 10 }, (_, i) => i + 70),
    Array.from({ length: 10 }, (_, i) => i + 80),
    Array.from({ length: 10 }, (_, i) => i + 90),
]

const mobileColumns: number[][] = [
    Array.from({ length: 10 }, (_, i) => i), // 0(caché), 1-9 ← idem
    Array.from({ length: 10 }, (_, i) => i + 10),
    Array.from({ length: 10 }, (_, i) => i + 20),
    Array.from({ length: 10 }, (_, i) => i + 30),
    Array.from({ length: 10 }, (_, i) => i + 40),
    Array.from({ length: 10 }, (_, i) => i + 50),
    Array.from({ length: 10 }, (_, i) => i + 60),
    Array.from({ length: 10 }, (_, i) => i + 70),
    Array.from({ length: 11 }, (_, i) => i + 80),
]

export default function Bingo() {
    const [isMobile, setIsMobile] = useState(false)
    const [called, setCalled] = useState<Set<number>>(new Set())

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 750)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const columns = isMobile ? mobileColumns : desktopColumns

    const toggle = (num: number) => {
        setCalled(prev => {
            const next = new Set(prev)
            next.has(num) ? next.delete(num) : next.add(num)
            return next
        })
    }

    const handleReset = () => {
        if (
            window.confirm(
                'Êtes-vous sûr(e) de vouloir effacer toute la grille ?'
            )
        ) {
            setCalled(new Set())
        }
    }

    return (
        <Layout title='Bingo - Grille de tirage'>
            <section className={`bingo-section${isMobile ? ' mobile' : ''}`}>
                <h1>BINGO</h1>

                <div className='bingo-content'>
                    <div className='bingo-grid'>
                        {columns.map((col, colIndex) => (
                            <div key={colIndex} className='bingo-column'>
                                {col.map(num => (
                                    <button
                                        key={num}
                                        className={`bingo-cell${called.has(num) ? ' called' : ''}`}
                                        onClick={() => toggle(num)}
                                        aria-pressed={called.has(num)}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className='bingo-sidebar'>
                        <button className='btn-secondary' onClick={handleReset}>
                            🗑 Effacer
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
