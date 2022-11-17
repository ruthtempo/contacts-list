import "../css/App.css";
import { ListContacts } from "./ListContacts";
import { useState, useEffect } from "react";
import { getAll, remove } from "../utils/ContactsAPI";
import { CreateContact } from "./CreateContact";
import { Routes, Route } from "react-router-dom";

const App = () => {
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

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <ListContacts contacts={contacts} onDeleteContact={deleteContact} />
        }
      />
      <Route path="/create" element={<CreateContact />} />
    </Routes>
  );
};

export default App;
