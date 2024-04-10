const { GraphQLDefinitionsFactory } = require('@nestjs/graphql');
const path = require('node:path');

const definitionsFactory = new GraphQLDefinitionsFactory();

async function main() {
  await definitionsFactory.generate({
    typePaths: ['./**/*.graphql'],
    path: path.join(process.cwd(), 'src/app/graphql.ts'),
    outputAs: 'class',
    emitTypenameField: true,
  });
}

main().catch(console.error);
