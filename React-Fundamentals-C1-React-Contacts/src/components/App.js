import "../css/App.css";
import { ListContacts } from "./ListContacts";
import { useState, useEffect } from "react";
import { getAll, remove, create } from "../utils/ContactsAPI";
import { CreateContact } from "./CreateContact";
import { Routes, Route, useNavigate } from "react-router-dom";

const App = () => {
  let navigate = useNavigate();
  useEffect(() => {
    getAll().then((contactsRes) => setContacts(contactsRes));

    // (with async await)
    //const getContacts = async()=>{
    //   const res = await ContactsAPI.getAll();
    //    setContacts(res)
    // }
    //getContacts()
  }, []);
  const [contacts, setContacts] = useState([]);

  const deleteContact = (selectedContact) => {
    const listWithoutContact = contacts.filter(
      (contact) => contact.id !== selectedContact.id
    );
    setContacts(listWithoutContact);
    remove(selectedContact);
  };

  const createContact = (contact) => {
    console.log("contact", contact);
    const createContacto = async () => {
      const res = await create(contact);
      setContacts(contacts.concat(res));
    };

    createContacto();
    navigate("/");
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <ListContacts contacts={contacts} onDeleteContact={deleteContact} />
        }
      />
      <Route
        path="/create"
        element={<CreateContact onCreateContact={createContact} />}
      />
    </Routes>
  );
};

export default App;
