import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { BookResolver, AuthorResolver } from './resolvers';

async function main() {
  try {
    await createConnection();
  } catch(err) {
    console.error('Establishing DB connection issue:', err.message);
  }

  try {
    const schema = await buildSchema({
      resolvers: [BookResolver, AuthorResolver]
    });
    const server = new ApolloServer({ schema });
    await server.listen(4000);
    console.log('Server has started!');
  } catch(err) {
    console.error('Server running issue:', err.message);
  }
}

main();
