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
    await admin.save()

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

    const githubactions = Technology.create({
        name: 'GitHub Actions',
        src_icon: '/technos_icons/githubactions.svg',
    })

    const graphql = Technology.create({
        name: 'Graph QL',
        src_icon: '/technos_icons/graphql.svg',
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
        name: 'PHP',
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

    const twig = Technology.create({
        name: 'Twig',
        src_icon: '/technos_icons/twig.svg',
    })

    const typescript = Technology.create({
        name: 'TypeScript',
        src_icon: '/technos_icons/typescript.svg',
    })

    //technologies
    await apollo.save()
    await bootstrap.save()
    await cicd.save()
    await css.save()
    await docker.save()
    await githubactions.save()
    await graphql.save()
    await jest.save()
    //await laravel.save()
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
    await twig.save()
    await typescript.save()

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
        src_icon: '/team_members_pics/remi.jpeg',
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

    const coline = TeamMember.create({
        name: 'Coline Guerin',
        linkedin: 'https://www.linkedin.com/in/coline-guerin-2804a9139/',
        src_icon: '/team_members_pics/coline.jpeg',
    })

    const gilda = TeamMember.create({
        name: 'Gilda Marboeuf',
        linkedin: 'https://www.linkedin.com/in/gilda-marboeuf/',
        src_icon: '/team_members_pics/gilda.jpeg',
    })

    const kevin = TeamMember.create({
        name: 'Kévin Davoust',
        linkedin: 'https://www.linkedin.com/in/kevin-davoust-319214276/',
        src_icon: '/team_members_pics/kevin.jpeg',
    })

    const jeremy = TeamMember.create({
        name: 'Jeremy Castaing',
        linkedin: 'https://www.linkedin.com/in/jeremy-castaing/',
        src_icon: '/team_members_pics/jeremy.jpeg',
    })

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
    await gilda.save()
    await coline.save()
    await jeremy.save()
    await kevin.save()

    const portfolio = Project.create({
        title: 'Caudrel Portfolio',
        slug: 'caudrel-portfolio',
        completion_date: new Date('2025-03-01'),
        duration: 'Sur 4 mois',
        excerpt: "Présenter les différents projets auxquels j'ai contribué.",
        prof_env: false,
        company_name: null,
        description:
            "Caudrel Portfolio est un site web visant à me présenter, démontrer mes compétences techniques, et mettre en avant les projets auxquels j'ai contribué",
        area_of_improvement:
            "Finir l'authentification en faisant fonctionner GoogleAuth en prod. Finir d'intégrer ReCaptcha pour le formulaire de contact. Classer les technologies par catégories. Ajouter une page quiz ludique sur moi disponible à l'authentification avec une gamification et un classement. SEO. UX et UI toujours...",
        src_picture: '/projects_pics/portfolio.png',
    })

    portfolio.technologies = [
        typescript,
        react,
        next,
        node,
        postgresql,
        graphql,
        apollo,
        docker,
        githubactions,
        sass,
    ]
    portfolio.team_members = [aurelie]

    const easygift = Project.create({
        title: 'Easy Gift',
        slug: 'easy-gift',
        completion_date: new Date('2024-07-01'),
        duration: 'Sur une période de 6 mois, 7 semaines au total',
        excerpt:
            'Discuter d’idées de cadeaux individuel ou collectif, en groupe.',
        prof_env: false,
        company_name: null,
        description:
            "EasyGift est une application créée en groupe à la fin de ma formation en Next / Node / GraphQl / Docker. Elle m'a servi de support pour mon passage de titre de Concepteur Développeur d'Application (CDA). Son objectif est de permettre aux membres d'une famille ou à un groupe d'amis de discuter des idées de cadeaux sans voir ce que les autres préparent pour soi. Lors de la création d'un groupe, autant de fils de discussions qu'il y a de membres sont créés, permettant aux autres membres d'échanger des idées pour des cadeaux individuels ou collectifs.",
        area_of_improvement:
            "Gestion des erreurs, websocket qui ne fonctionne pas en prod, UX UI, SEO, sécurisation renforcée lors de la création de compte et login, pouvoir mettre plusieurs emails à la fois lors de la création d'un groupe",
        src_picture: '/projects_pics/easygift.png',
        src_video:
            'https://www.youtube.com/embed/qpGP20y5pnE?si=mcrrUPYbwNk0agGA',
    })

    easygift.technologies = [
        typescript,
        react,
        next,
        node,
        postgresql,
        graphql,
        apollo,
        cicd,
        docker,
        githubactions,
        jest,
        playwright,
        tailwind,
    ]
    easygift.team_members = [jeremie, leopold, olga, aurelie, morgane]

    const poupette = Project.create({
        title: 'Poupette et Ronron',
        slug: 'poupette-et-ronron',
        completion_date: new Date('2024-07-01'),
        duration: `Sur une période d'1 mois`,
        excerpt: `Site vitrine d'un restaurant.`,
        prof_env: false,
        company_name: 'Poupette et Ronron',
        description: `J'ai créé ce site pour mon passage de certification Développeur Web et Web Mobile (DWWM) à la fin de ma formation bootcamp de 5 mois en PHP avec Symfony à la Wild Code School.
Mon mari ayant le projet d'ouvrir un restaurant, je me suis entrainée avec ce site, comme avec un vrai client. J'ai recueilli ses besoins et les ai traduit en une app comportant une interface client et un back-office pour gérer la modification de plusieurs paramètres dont le menu et les horaires d'ouvertures.`,
        area_of_improvement:
            'Le design, le design, le design 😄 UX et UI. Améliorer la gestion des alertes/toasts. SEO',
        src_picture: '/projects_pics/poupette-et-ronron.png',
        src_video:
            'https://www.youtube.com/embed/YgiawWFl4Yg?si=r4MvmKPBJ8eAtl6R',
    })

    poupette.technologies = [symfony, bootstrap, sass, php, mysql, twig]
    poupette.team_members = [aurelie]

    const luggadvisor = Project.create({
        title: 'LuggAdvisor',
        slug: 'lugg-advisor',
        completion_date: new Date('2023-05-01'),
        duration: `Sur 24 heures`,
        excerpt: `Assistant intelligent pour ne rien oublier dans sa valise.`,
        prof_env: false,
        company_name: null,
        description:
            "LuggAdvisor est un projet d'application mobile que nous avons développé lors d'un hackathon durant notre formation en PHP à la Wild Code School. Nous avions 24 heures, en équipe de 4, pour livrer une application intégrant une API. Nous avons intégré une API de météo.",
        area_of_improvement:
            'Design, le design, le design 😄 UX et UI. Améliorer la gestion des alertes/toasts. SEO',
        src_picture: '/projects_pics/luggadvisor.png',
        src_video:
            'https://www.youtube.com/embed/kfIqB9iXSjY?si=u-PGQGFTS1c_A2hr',
    })

    luggadvisor.technologies = [php, css, twig, mysql]
    luggadvisor.team_members = [aurelie, gilda, coline, david]

    const clubwild = Project.create({
        title: 'ClubWild',
        slug: 'club-wild',
        completion_date: new Date('2023-04-01'),
        duration: `Sur 4 semaines`,
        excerpt: `Platforme musicale.`,
        prof_env: false,
        company_name: null,
        description:
            "ClubWild est un projet que nous avons développé en 4 semaines avec un groupe de 4 personnes, 2 mois après le début de notre bootcamp en PHP à la Wild Code School. Un visiteur peut écouter 10 secondes de tout le catalogue. Membre ou admin peut écouter tout le catalogue sans restriction de temps. Nous l'avons codé en PHP 8.2 native avec un design pattern architecturale classique MVC.",
        area_of_improvement: 'UX et UI. Authentification...',
        src_picture: '/projects_pics/clubwild.png',
        src_video:
            'https://www.youtube.com/embed/j7zJP4YhPeE?si=wBnmTGrpBCnB7I6H',
    })

    clubwild.technologies = [php, css, twig, mysql]
    clubwild.team_members = [aurelie, kevin, jeremy]

    const inovin = Project.create({
        title: 'Ino Vin',
        slug: 'ino-vin',
        completion_date: new Date('2023-06-01'),
        duration: `Sur 4 semaines`,
        excerpt: `Application de tasting de cépages.`,
        prof_env: false,
        company_name: null,
        description:
            "Ce projet de fin d'année a été réalisé en équipe pour un client réel. Notre client propose des ateliers de dégustation de cépages, où les participants peuvent créer des assemblages personnalisés en fonction de leurs préférences. Il avait besoin d'une plateforme d'administration pour gérer ses ateliers et sa base de données incluant des cépages, arômes, couleurs, régions, utilisateurs, et bien plus encore. L'objectif principal était de permettre aux participants d'utiliser des tablettes durant les ateliers et de s'inscrire directement sur l'application depuis ces appareils. Les fonctionnalités demandées comprenaient la possibilité pour les utilisateurs de créer un compte, la possibilité pour les utilisateurs connectés de remplir des fiches de dégustation de vins et de découvrir leur profil de dégustation, déterminé par l'application. Pour ce projet, nous avons utilisé les technologies suivantes : PHP avec Symfony, Twig, GrumPHP et le bundle EasyAdmin, permettant ainsi une gestion intuitive et une interface conviviale.",
        area_of_improvement: 'Gestion des erreurs. Alertes.',
        src_picture: '/projects_pics/inovin.png',
        src_video:
            'https://www.youtube.com/embed/yp4p9iy0TjQ?si=xLDNRfSZ0F03T9Jm',
    })

    inovin.technologies = [php, symfony, sass, twig, mysql]
    inovin.team_members = [aurelie, remi, nicolas, david]

    //projects
    await easygift.save()
    await poupette.save()
    await luggadvisor.save()
    await clubwild.save()
    await portfolio.save()
    await inovin.save()
}

main()
