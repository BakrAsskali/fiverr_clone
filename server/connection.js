const { MongoClient } = require("mongodb");

async function main() {
  const uri = process.env.ATLAS_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

/**
 * @param {MongoClient} client A
 */
async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
