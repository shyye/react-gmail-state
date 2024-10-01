import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);
  const [emails, setEmails] = useState(initialEmails);
  const [isHideRead, setIsHideRead] = useState(false);
  // console.log(emails);

  // TODO: How does functions here automatically have an event if no parameter is given?
  function toggleRead(emailId, isRead) {
    // Copy to update object the correct way: https://react.dev/learn/updating-arrays-in-state#updating-objects-inside-arrays
    setEmails(
      emails.map((email) => {
        if (email.id === emailId) {
          // Create a *new* object with changes
          return { ...email, read: !isRead };
        } else {
          // No changes
          return email;
        }
      })
    );
  }

  function toggleStar(emailId, isStarred) {
    // Copy to update object the correct way: https://react.dev/learn/updating-arrays-in-state#updating-objects-inside-arrays

    // TODO: Duplicated code, refactor?

    setEmails(
      emails.map((email) => {
        if (email.id === emailId) {
          // Create a *new* object with changes
          return { ...email, starred: !isStarred };
        } else {
          // No changes
          return email;
        }
      })
    );
  }

  function handleHideRead() {
    setIsHideRead(!isHideRead);
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={isHideRead}
              // onChange={() => {}}
              onChange={handleHideRead}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {
          /* Render a list of emails here */
          // Reference, event with parameter: https://stackoverflow.com/a/42597619
          // isHideRead === true ? ()
          emails.map((email) =>
            
            // Prevent rendering of read emails if the 'Hide Read' input is ticked
            isHideRead && email.read === true ? (
              ""
            ) : (
              <li
                key={email.id}
                className={email.read ? "email read" : "email"}
              >
                <div className="select">
                  <input
                    className="select-checkbox"
                    type="checkbox"
                    checked={email.read ? true : false}
                    // TODO: What is the correct way to do this? Pass parameters like this or read the 'key' value from parent element
                    onChange={() => toggleRead(email.id, email.read)}
                  />
                </div>
                <div className="star">
                  <input
                    className="star-checkbox"
                    type="checkbox"
                    checked={email.starred ? true : false}
                    onChange={() => toggleStar(email.id, email.starred)}
                  />
                </div>
                <div className="sender">{email.sender}</div>
                <div className="title">{email.title}</div>
              </li>
            )
          )
        }
      </main>
    </div>
  );
}

export default App;
