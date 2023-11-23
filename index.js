const { ApolloServer } = require("apollo-server"); // Import Apollo Server 
const { importSchema } = require("graphql-import"); // Import graphql-import to load schema
const EtherDataSource = require("./datasource/ethDatasource"); // Import custom EtherDataSource

const typeDefs = importSchema("./schema.graphql"); // Load schema from file

require("dotenv").config(); // Load environment variables from .env file

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Resolver to get ether balance for an address
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Resolver to get total ether supply
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Resolver to get latest eth price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Resolver to get average block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Create EtherDataSource instance
  }), 
});

server.timeout = 0; // Set no timeout
server.listen("9000").then(({ url }) => { // Start Apollo Server
  console.log(`🚀 Server ready at ${url}`); 
});