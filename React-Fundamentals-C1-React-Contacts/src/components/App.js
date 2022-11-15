import "../css/App.css";
import { ListContacts } from "./ListContacts";
import { useState, useEffect } from "react";
import { getAll, remove } from "../utils/ContactsAPI";

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
    <div>
      <ListContacts contacts={contacts} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App;
