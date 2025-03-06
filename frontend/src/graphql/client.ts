import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const devApiUrl =
    process.env.NEXT_PUBLIC_APOLLO_URI || 'http://localhost:4000/graphql'

const link = createHttpLink({
    uri: devApiUrl,
    credentials: 'include', // Permet d'envoyer les cookies (indispensable pour l'auth)
})

const client = new ApolloClient({
    link,
    credentials: 'include',
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
})

export default client
