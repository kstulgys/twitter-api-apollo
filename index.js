const { ApolloServer, gql } = require("apollo-server")
const twitterAPI = require("./datasource")
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    id: String!
    profile_image_url: String!
    screen_name: String!
    name: String!
    location: String!
  }
  type Tweet {
    id: String!
    profile_image_url: String!
    name: String!
    text: String!
    screen_name: String!
    favorited: Boolean
  }
  type Query {
    user: User
    tweets: [Tweet]
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    user: async (root, args, { dataSources, authToken }) => {
      const res = await dataSources.twitterAPI.getUserInfo(authToken)
      console.log(res, "user")
      return res
    },

    tweets: async (root, args, { dataSources, authToken }) => {
      const res = await dataSources.twitterAPI.getFeed(authToken)
      console.log(res, "tweets")
      return res
    }
  }
}

const context = ({ req }) => {
  // simple auth check on every request
  const authToken = (req.headers && req.headers.authorization) || ""
  // console.log("req.headers.authorization", authToken)
  return { authToken }
}

const server = new ApolloServer({
  cors: {
    origin: "*", // <- allow request from all domains
    credentials: true
  },
  context,
  typeDefs,
  resolvers,
  dataSources: () => ({
    twitterAPI: new twitterAPI()
  })
})

server.listen(5000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
