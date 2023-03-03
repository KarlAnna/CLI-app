const shortid = require("shortid");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

try {
  async function updateListContacts(newContent) {
    return await fs.writeFile(contactsPath, JSON.stringify(newContent), "utf8");
  }

  async function readContactsFile() {
    return await fs.readFile(contactsPath, "utf8");
  }

  async function listContacts() {
    readContactsFile().then(JSON.parse).then(console.table);
  }

  async function getContactById(contactId) {
    const data = await readContactsFile().then(JSON.parse);
    const result = data.find((item) => item.id === contactId);
    if (!result) {
      return null;
    }
    console.table(result);
  }

  async function removeContact(contactId) {
    const data = await readContactsFile().then(JSON.parse);
    const newContent = data.filter((item) => item.id !== contactId);
    updateListContacts(newContent);
  }

  async function addContact(name, email, phone) {
    const data = await readContactsFile().then(JSON.parse);
    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };
    updateListContacts([...data, newContact]);
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };
} catch (error) {
  console.error(error)
}
