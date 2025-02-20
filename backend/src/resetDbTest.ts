import db from './db'
import { User } from './entities/user'
import { Technology } from './entities/technology'
import { TeamMember } from './entities/team_member'
import { Project } from './entities/project'

async function clearDB() {
    const runner = db.createQueryRunner()
    await runner.query("SET session_replication_role = 'replica'")
    await Promise.all(
        db.entityMetadatas.map(async entity =>
            runner.query(
                `ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`
            )
        )
    )
    await Promise.all(
        db.entityMetadatas.map(async entity =>
            runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`)
        )
    )
    await runner.query("SET session_replication_role = 'origin'")
    await db.synchronize()
}

async function main() {
    await db.initialize()
    await clearDB()

    const aurelie = User.create({
        first_name: 'John',
        last_name: 'Doe',
        email: 'changeme@gmail.com',
        password: 'changeMe',
        role: 'admin',
    })

    const react = Technology.create({
        name: 'React',
        src_icon: '/technos_icons/react.svg',
    })

    const next = Technology.create({
        name: 'Next',
        src_icon: '/technos_icons/next-js.svg',
    })

    const node = Technology.create({
        name: 'Node',
        src_icon: '/technos_icons/nodejs.svg',
    })

    const apollo = Technology.create({
        name: 'Apollo',
        src_icon: '/technos_icons/apollo.svg',
    })

    const jeremie = TeamMember.create({
        name: 'Jérémie Pourageaux',
        linkedin: 'https://www.linkedin.com/in/jeremie-pourageaux/',
        src_icon: '/team_members_pics/jeremie.jpeg',
    })

    const leopold = TeamMember.create({
        name: 'Léopold Lesaulnier',
        linkedin: 'https://www.linkedin.com/in/leopoldlesaulnier/',
        src_icon: '/team_members_pics/leopold.jpeg',
    })

    const easygift = Project.create({
        title: 'Easy Gift',
        slug: 'easy-gift',
        completion_date: new Date('2024-07-01'),
        duration: 'Sur une période de 6 mois, 7 semaines au total',
        excerpt:
            'Discuter d’idées de cadeaux individuel ou collectif, en groupe',
        prof_env: false,
        company_name: null,
        description:
            'Ce sujet nous a été donné par notre formation. Le principe est de permettre aux membres d’une famille ou d’un groupe d’amis de discuter d’idées de cadeaux sans voir ce que les autres préparent pour soi. Un fil de discussion est consacré à chaque membre, permettant aux autres membres d’échanger des idées de cadeaux individuels ou collectifs.',
        area_of_improvement:
            'Websocket qui fonctionne en prod, design général, SEO, sécurisation renforcé lors de la création de compte et login',
        src_picture: '/projects_pics/easygift.png',
    })

    easygift.technologies = [react, next, node, apollo]
    easygift.team_members = [jeremie, leopold]

    await aurelie.save()
    await react.save()
    await next.save()
    await node.save()
    await apollo.save()
    await jeremie.save()
    await leopold.save()
    await easygift.save()
}

main()
