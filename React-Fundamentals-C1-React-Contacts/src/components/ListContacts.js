import PropTypes from "prop-types";
import { useState } from "react";

export const ListContacts = ({ contacts, onDeleteContact }) => {
  const [query, setQuery] = useState("");
  const updateQuery = (query) => {
    setQuery(query.trim());
  };
  const showingContacts =
    query === ""
      ? contacts
      : contacts.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        );

  const clearQuery = () => {
    updateQuery("");
  };
  return (
    <div className="list-contacts">
      <div className="list-contacts-top">
        <input
          className="search-contacts"
          type="text"
          placeholder="Search Contact"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
        />
      </div>
      {showingContacts.lenght !== contacts.length && (
        <div className="showing-contacts">
          <span>
            Now showing {showingContacts.length} of {contacts.length} contacts
          </span>
          <button onClick={() => clearQuery()}>show all</button>
        </div>
      )}
      <ol className="contact-list">
        {showingContacts.map((contact) => (
          <li key={contact.id} className="contact-list-item">
            <div
              className="contact-avatar"
              style={{ backgroundImage: `url(${contact.avatarURL})` }}
            ></div>
            <div className="contact-details">
              <p>{contact.name}</p>
              <p>{contact.handle}</p>
            </div>
            <button
              className="contact-remove"
              onClick={() => onDeleteContact(contact)}
            >
              Remove
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
