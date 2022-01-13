import connectDb from './config/db.js'
import { getParams } from './utils/getParams.js'
import { generateNewContact, logContactList } from './controllers/contactControllers.js'

const init = async () => {
  // getParams
  const params = getParams()
  // connects to Mongo
  await connectDb(params)
  // decide between display list or adding one
  if (params.length === 1) {
    // display list of contacts
    logContactList()
  } else {
    // generate new contact and log result
    generateNewContact(params)
  }
}

init()
