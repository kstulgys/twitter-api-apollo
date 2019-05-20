const { ApolloServer, gql } = require("apollo-server")
const twitterAPI = require("./datasource")
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User{
    id: Int!
    profile_image_url: String!
    screen_name: String!
  }
  type Test {
    testName: String!
  }
  type Query {
    user: User
    test: Test
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    user: async (root, args, { dataSources, authToken }) => {
      console.log("context.authToken", authToken)
      const res = await dataSources.twitterAPI.getUserInfo(authToken)
      console.log(res)
      return res
    },
    test: async (root, args, { dataSources, context }) => {
      const res = await dataSources.twitterAPI.getTestData()
      console.log(res)
      return res
      // const res = await fetch("http://localhost:4000/test").then(r => r.json())
      // console.log(res)
      // return res
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
