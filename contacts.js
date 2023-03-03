const shortid = require("shortid")
const fs = require("fs").promises
const path = require("path")
const contactsPath = path.resolve('./db/contacts.json')

async function updateListContacts(newContent) {
  try {
    return await fs.writeFile(contactsPath, JSON.stringify(newContent), "utf8")
  } catch (error) {
    console.error(error)
  }
}

async function readContactsFile() {
  try {
    return await fs.readFile(contactsPath, 'utf8')
  } catch (error) {
    console.error(error)
  }
}



async function listContacts() {
  try {
    readContactsFile().then(JSON.parse).then(console.table)
  } catch (error) {
    console.error(error)
  }
}

async function getContactById(contactId) {
  try {
    const data = await readContactsFile().then(JSON.parse)
    const result = data.find(item => item.id === contactId)
    if (!result) {
      return null
    }
    console.table(result)
  } catch (error) {
    console.error(error)
  }
}

async function removeContact(contactId) {
  try {
    const data = await readContactsFile().then(JSON.parse)
    const newContent = data.filter(item => item.id !== contactId)
    updateListContacts(newContent)
  } catch (error) {
    console.error(error)
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await readContactsFile().then(JSON.parse)
    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone
    }
    updateListContacts([...data, newContact])
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}