import {
    MemberInput,
    useCreateTeamMemberMutation,
    useTeamMembersQuery,
} from '@/graphql/generated/schema'
import { FormEvent } from 'react'
import Layout from '@/components/Layout'
import Image from 'next/image'

export default function Technologies() {
    const {
        data: membersData,
        loading: membersLoading,
        error: membersError,
        refetch,
    } = useTeamMembersQuery({})

    const [createTeamMember] = useCreateTeamMemberMutation()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const formJSON: any = Object.fromEntries(formData.entries())
        await createTeamMember({ variables: { data: { ...formJSON } } })
        await refetch()
    }

    if (membersLoading) return <p>Loading...</p>
    if (membersError) return <p>Error...</p>
    return (
        <Layout title='Admin Members - Portfolio CAudrel'>
            <section className='members-page'>
                <h1>Co-équipiers</h1>
                <div className='display-member-icons'>
                    {membersData?.teamMembers?.map(member => (
                        <div className='member-container' key={member.id}>
                            <Image
                                className='member-pic'
                                src={
                                    member.src_icon ||
                                    '/projects_pics/default-image.png'
                                }
                                alt={`Photo de ${member.name || 'non spécifiée'}`}
                                width={60}
                                height={60}
                            />
                            <p>{member.name}</p>
                        </div>
                    )) || <p>{"Aucun membre d'équipe disponible."}</p>}
                </div>
                <h2>{"Ajouter un membre d'équipe"}</h2>
                <div className='form-frame'>
                    <form onSubmit={handleSubmit} className='form'>
                        <div className='labels'>
                            <div>
                                <label className='label' htmlFor='name'>
                                    <span className=''>Nom</span>
                                </label>
                                <input
                                    required
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Aurélie Lozach'
                                    className=''
                                    autoComplete='on'
                                />
                            </div>

                            <div>
                                <label className='label' htmlFor='src_icon'>
                                    <span className='label-text'>Photo</span>
                                </label>
                                <input
                                    type='text'
                                    name='src_icon'
                                    id='src_icon'
                                    required
                                    placeholder='aurelie.jpeg'
                                    className=''
                                    autoComplete='on'
                                />
                            </div>

                            <div>
                                <label className='label' htmlFor='linkedin'>
                                    <span className='label-text'>Linkedin</span>
                                </label>
                                <input
                                    type='text'
                                    name='linkedin'
                                    id='linkedin'
                                    required
                                    placeholder='https://www.linkedin.com/in/aurelielozach/'
                                    className=''
                                    autoComplete='on'
                                />
                            </div>
                        </div>

                        <div className='form-validation'>
                            <button className='btn-secondary'>
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    )
}
