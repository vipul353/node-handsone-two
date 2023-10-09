const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    // Get the database and collection
    const database = client.db('Human_Resource');
    const collection = database.collection('employee');

    // Create index on the 'salary' field
    await collection.createIndex({ "salary": 1 });
    console.log('Index created on salary field');

    // Perform CRUD operations here
    // For example, to find all documents
    const allDocuments = await collection.find({}).toArray();
    console.log('All documents:', allDocuments);

    // Find employees with salary more than 30000
    const highSalaryEmployees = await collection.find({ "salary": { $gt: "30000" } }).toArray();
    console.log('Employees with salary more than 30000:', highSalaryEmployees);

    // Update salary of employees with salary greater than 70000 to 65000
    await collection.updateMany({ "salary": { $gt: "70000" } }, { $set: { "salary": "65000" } });
    console.log('Salaries updated for employees with salary greater than 70000');

    // Delete documents where last company is Y
    await collection.deleteMany({ "lastCompany": "Y" });
    console.log('Documents where last company is Y deleted');

  } finally {
    // Close the connection
    await client.close();
  }
}

// Call the main function
main().catch(console.error);
