# Portfolio

structure bdd
https://drive.google.com/file/d/1u6R6ZzlKSo3PNgIqG6hK9hjJ7b8RAsfd/view?usp=sharing

This is my Portfolio, showcasing a website build 100% with JavaScript.

## Technology Stack

- Backend: TypeScript, Node.js, Apollo Server, GraphQL/TypeGraphQL, TypeORM
- Frontend: TypeScript, Next.js, Apollo Client, SCSS
- Containerization: Docker
- Deployment: Github worflows, VPS with Hostinger, Datacenter based in France running with 100% renewable energy.

## Project install

To launch the project, clone it, then run the following commands starting from the root of the project :
`cd frontend`  
`npm i`  
`cp .env.example .env`  
`cd ..`  
`cd backend`  
`npm i`  
`cp .env.example .env`  
`cd ..`  
You can now change the necessary variables inside `.env` such as the secret key that needs to be the same in both frontend and backend.
Connect to your docker account and run from the root of the project :
`npm run dev`  
The application is now available on localhost:3000  
The backend Apollo Studio is now available on localhost:4000

## Load a first set of data via Docker

Once the project built, you can seed a first set of data by running the restDbTest file through Docker desktop:
1- modify the backend/src/resetDbTest.ts file with your own name, email and password to create an "admin" profile to have access to all the parts of the project.

2- Click on the backend container in Docker Desktop, go in the Exec section, and key in after "/app #" the following command:  
`npm run resetDbTest`  
You can now connect on the portfolio with an existing account with the email and password you modified.

## Package Information

Name: portfolio  
Version: 1.0.0  
Main File: index.ts  
License: ISC  
Author: Aurélie Lozach - https://github.com/Caudrel

## Repository

Type: git
URL: https://github.com/caudrel/Portfolio

## Homepage Pre-production

URL: https://staging.caudrel.com/

## Homepage Production

URL: https://caudrel.com/
