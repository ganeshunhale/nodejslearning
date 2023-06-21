const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// const { constants } = require("../constants");
//des get all contact
//rotes GET /api/contacts
//access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});
//des create contact
//rotes POST /api/contacts
//access public
const createContact = asyncHandler(async (req, res) => {
  console.log("body req", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fiealds are mandatory");
  }
 
    const contact =await Contact.create({
      name,
      email,
      phone
    })
  
  // const contact = await Contact.create({
  //   name,
  //   email,
  //   phone
  // })
  res.status(201).json(contact);
});
//des get contact
//rotes get /api/contacts/:id
//access public
const getContact = asyncHandler(async (req, res) => {
  const contact= await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404) 
    throw new Error("Contact not found")
    
  }
  res.status(200).json(contact);
});
//des update contact
//rotes put /api/contacts/:id
//access public
const updateContact = asyncHandler(async (req, res) => {
  const contact= await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404) 
    throw new Error("Contact not found")
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  )
  res.status(200).json(updatedContact);
});
//des update contact
//rotes put /api/contacts/:id
//access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact= await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404) 
    throw new Error("Contact not found")
  }
  await contact.deleteOne({_id:req.params.id});
  res.status(200).json(contact);
 
});
module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
