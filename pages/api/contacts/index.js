import dbConnect from "../../../util/mongo";
import contacts from "../../../models/contacts";


export default async function handler(req, res) {
  const { method} = req;

  dbConnect();

  if (method === "GET") {
    try {
      const contact = await contacts.find();
      res.status(200).json(contact);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try{
      const contact = await contacts.create(req.body);
      res.status(201).json(contact);
    }catch(err) {
      res.status(500).json(err);
    }
}

}





