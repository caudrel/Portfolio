import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface IconProps {
    name: string
    src_icon: string
    linkedin?: string | null
    slug?: string | null
}

const Icon: React.FC<IconProps> = ({ src_icon, name, linkedin, slug }) => {
    const [isHovered, setIsHovered] = useState(false)

    return slug ? (
        // Icon pour un Team Member

        <div className='icon-component'>
            <Link href={linkedin || `/projet/${slug}`} target='_blank'>
                <div
                    className='icon'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className='icon-container'>
                        <Image
                            src={src_icon || '/projects_pics/default-image.png'}
                            alt={`Photo de ${name || 'non spécifiée'}`}
                            width={30}
                            height={30}
                            style={{
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </div>
            </Link>
            {isHovered && (
                <span className={`tooltip ${isHovered ? 'visible' : ''}`}>
                    {name}
                </span>
            )}
        </div>
    ) : (
        // Icon pour une technologie
        <div className='icon-component'>
            <div
                className='icon'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className='icon-container'>
                    <Image
                        src={src_icon || '/projects_pics/default-image.png'}
                        alt={`Logo ${name || 'non spécifiée'}`}
                        width={30}
                        height={30}
                    />
                </div>
            </div>
            {isHovered && (
                <span className={`tooltip ${isHovered ? 'visible' : ''}`}>
                    {name}
                </span>
            )}
        </div>
    )
}

export default Icon
