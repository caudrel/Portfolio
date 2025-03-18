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

    const admin = User.create({
        first_name: 'Aurélie',
        last_name: 'Lozach',
        email: 'lozachaurelie@gmail.com',
        password: 'password',
        role: 'admin',
    })

    const bootstrap = Technology.create({
        name: 'Bootstrap',
        src_icon: '/technos_icons/bootstrap.svg',
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

    const cicd = Technology.create({
        name: 'CI-CD',
        src_icon: '/technos_icons/ci-cd.svg',
    })

    const css = Technology.create({
        name: 'CSS',
        src_icon: '/technos_icons/css.svg',
    })

    const docker = Technology.create({
        name: 'Docker',
        src_icon: '/technos_icons/docker.svg',
    })

    const github = Technology.create({
        name: 'GitHub',
        src_icon: '/technos_icons/github.svg',
    })

    const githubactions = Technology.create({
        name: 'GitHub Actions',
        src_icon: '/technos_icons/githubactions.svg',
    })

    const graphql = Technology.create({
        name: 'Graph QL',
        src_icon: '/technos_icons/graphql.svg',
    })

    const html = Technology.create({
        name: 'HTML',
        src_icon: '/technos_icons/html.svg',
    })

    const jest = Technology.create({
        name: 'Jest',
        src_icon: '/technos_icons/jest.svg',
    })

    const laravel = Technology.create({
        name: 'Laravel',
        src_icon: '/technos_icons/laravel.svg',
    })

    const mysql = Technology.create({
        name: 'mySQL',
        src_icon: '/technos_icons/mysql.svg',
    })

    const php = Technology.create({
        name: 'php',
        src_icon: '/technos_icons/php.svg',
    })

    const playwright = Technology.create({
        name: 'Playwright',
        src_icon: '/technos_icons/playwright.svg',
    })

    const postgresql = Technology.create({
        name: 'postgreSQL',
        src_icon: '/technos_icons/postgresql.svg',
    })

    const sass = Technology.create({
        name: 'Sass',
        src_icon: '/technos_icons/sass.svg',
    })

    const symfony = Technology.create({
        name: 'Symfony',
        src_icon: '/technos_icons/symfony.svg',
    })

    const tailwind = Technology.create({
        name: 'Tailwind CSS',
        src_icon: '/technos_icons/tailwind.svg',
    })

    const typescript = Technology.create({
        name: 'TypeScript',
        src_icon: '/technos_icons/typescript.svg',
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

    const olga = TeamMember.create({
        name: 'Olga Kuzkina',
        linkedin: 'https://www.linkedin.com/in/olga-kuzkina/',
        src_icon: '/team_members_pics/olga.jpeg',
    })

    const david = TeamMember.create({
        name: 'David Gibon',
        linkedin: 'https://www.linkedin.com/in/david-gibon/',
        src_icon: '/team_members_pics/david.jpeg',
    })

    const remi = TeamMember.create({
        name: 'Remi Meslin',
        linkedin: 'https://www.linkedin.com/in/r%C3%A9mi-meslin/',
        src_icon: '/team_members_pics/david.jpeg',
    })

    const morgane = TeamMember.create({
        name: 'Morgane Lejeune',
        linkedin: 'https://www.linkedin.com/in/morgane-lejeune33/',
        src_icon: '/team_members_pics/morgane.jpeg',
    })

    const nicolas = TeamMember.create({
        name: 'Nicolas Palay',
        linkedin: 'https://www.linkedin.com/in/palaynicolas/',
        src_icon: '/team_members_pics/nicolas.jpeg',
    })

    const tomas = TeamMember.create({
        name: 'Tomas Spit',
        linkedin: 'https://www.linkedin.com/in/tomasspit/',
        src_icon: '/team_members_pics/tomas.jpeg',
    })

    const aurelie = TeamMember.create({
        name: 'Aurélie Lozach',
        linkedin: 'https://www.linkedin.com/in/aurelielozach/',
        src_icon: '/team_members_pics/aurelie.jpeg',
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

    easygift.technologies = [
        react,
        next,
        node,
        apollo,
        tailwind,
        cicd,
        docker,
        githubactions,
        graphql,
        jest,
        playwright,
        typescript,
    ]
    easygift.team_members = [jeremie, leopold, olga, aurelie, morgane]

    const pr = Project.create({
        title: 'Poupette et Ronron',
        slug: 'poupette-et-ronron',
        completion_date: new Date('2024-07-01'),
        duration: `Sur une période d'1 mois`,
        excerpt: `Site vitrine d'un restaurant`,
        prof_env: false,
        company_name: 'Poupette et Ronron',
        description: `J'ai créé ce site seule pour mon passage de certification Développeur Web et Web Mobile (DWWM) à la fin de ma formation bootcamp de 5 mois en PHP avec Symfony.
Mon mari ayant le projet d'ouvrir un restaurant, je me suis entrainée avec ce site, comme avec un vrai client. J'ai recueilli ses besoins et les ai traduit en une app avec une interface client et un back-office pour gérer plusieurs paramètres dont le menu et les horaires d'ouvertures.`,
        area_of_improvement:
            'Design, le design, le design 😄 UX et UI. Améliorer la gestion des alertes/toasts.',
        src_picture: '/projects_pics/easygift.png',
    })

    await admin.save()

    //technologies
    await apollo.save()
    await bootstrap.save()
    await cicd.save()
    await css.save()
    await docker.save()
    await github.save()
    await githubactions.save()
    await graphql.save()
    await html.save()
    await jest.save()
    await laravel.save()
    await mysql.save()
    await next.save()
    await node.save()
    await php.save()
    await playwright.save()
    await postgresql.save()
    await react.save()
    await sass.save()
    await symfony.save()
    await tailwind.save()
    await typescript.save()

    //team members
    await aurelie.save()
    await david.save()
    await jeremie.save()
    await leopold.save()
    await morgane.save()
    await nicolas.save()
    await olga.save()
    await remi.save()
    await tomas.save()

    //projects
    await easygift.save()
}

main()
