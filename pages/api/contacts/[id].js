import dbConnect from "../../../util/mongo";
import contacts from "../../../models/contacts";

dbConnect();

export default async (req, res) => {
    const { method, body, query: {id}} = req;


    switch (method) {
        case "GET":
            try {
                const contact = await contacts.findById(id);
                if (!contact) return res.status(404).json({ msg:"contact not found"});
                return res.status(200).json(contact);
                
            } catch (error) {
                return res.status(500).json({ error: error.message});
                
            }
        
            case "PUT":
                try {
                    const contactUpdate = await contacts.findByIdAndUpdate(id,body, {
                        new: true,
                    });
                    if(!contactUpdate) return res.status(404).json({ msg: "Contact not find"});
                    return res.status(200).json(contact)
                } catch (error) {
                    return res.status(500).json({ error: error.message});
                }     
        case "DELETE":
            try {
                const deleteContact = await contacts.findByIdAndDelete(id);
                if (!deleteContact)
                return res.status(404).json({ msg: "Contact not found"});
                return res.status(204).json();
            } catch (error) {
                return res.status(500).json({ error: error.message});
                
            }
    
        default:
            return res.status(400).json({ msg: "This method is not supported"})
    }

    
};