import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);
  const [emails, setEmails] = useState(initialEmails);
  const [filteredEmails, setFilteredEmails] = useState(emails);
  const [isHideRead, setIsHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState("inbox");
  const [numOfEmails, setNumOfEmails] = useState(emails.length);
  const [numOfStarredEmails, setNumOfStarredEmails] = useState(getStarredEmails(emails).length);
  // console.log(emails);

  // TODO: How does functions here automatically have an event if no parameter is given?
  function toggleRead(emailId, isRead) {
    // Copy to update object the correct way: https://react.dev/learn/updating-arrays-in-state#updating-objects-inside-arrays
    
    if (!isRead === true) {
      setNumOfEmails(numOfEmails + 1)
    } else {
      setNumOfEmails(numOfEmails - 1)
    }

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

    setFilteredEmails(
      filteredEmails.map((email) => {
        if (email.id === emailId) {
          return { ...email, read: !isRead };
        } else {
          return email;
        }
      })
    );
  }

  function toggleStar(emailId, isStarred) {

    // TODO: Duplicated code, refactor?

    if (!isStarred === true) {
      setNumOfStarredEmails(numOfStarredEmails + 1)
    } else {
      setNumOfStarredEmails(numOfStarredEmails - 1)
    }

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

    // TODO: This seems unnecessary, how can I avoid?
    setFilteredEmails(
      filteredEmails.map((email) => {
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
    // Set state doesn't update immedately, thereby local variable
    const hideRead = !isHideRead;
    const unreadEmails = getUnreadEmails(emails)

    // Handle filter for each tab. NOTE: Can be improved? Issue if multiple filters
    if (currentTab === 'inbox') {      
      if (hideRead) {
        setFilteredEmails(unreadEmails)
      } else {
        setFilteredEmails(emails)
      }
    }
    else if (currentTab === 'starred') {
      if (hideRead) {
        setFilteredEmails(getStarredEmails(unreadEmails))
      } else {
        setFilteredEmails(getStarredEmails(emails))
      }
    }

    // Update state
    setIsHideRead(hideRead);
  }

  function handleStarredEmails() {
    // TODO: Can be issue, checks isHideRead both here and in handleHideRead, better way to do it?
    if (isHideRead) {
      const unreadEmails = getUnreadEmails(emails)
      setFilteredEmails(getStarredEmails(unreadEmails))
    } else {
      setFilteredEmails(getStarredEmails(emails));
    }
  }

  function handleInboxEmails() {
    if (isHideRead) {
      setFilteredEmails(getUnreadEmails(emails))
    } else {
      setFilteredEmails(emails)
    }
  }

  // function getReadEmails(emailList) {
  //   return emailList.filter((email) => email.read === true);
  // }

  function getUnreadEmails(emailList) {
    return emailList.filter((email) => email.read === false);
  }

  function getStarredEmails(emailList) {
    return emailList.filter((email) => email.starred === true);
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={currentTab === "inbox" ? "item active" : "item"}
            // className="item active"
            onClick={() => {
              setCurrentTab("inbox");
              handleInboxEmails()
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{numOfEmails}</span>
          </li>
          <li
            className={currentTab === "starred" ? "item active" : "item"}
            onClick={() => {
              setCurrentTab("starred"); 
              handleStarredEmails();
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{numOfStarredEmails}</span>
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
          filteredEmails.map((email) => (
            <li key={email.id} className={email.read ? "email read" : "email"}>
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
          ))
        }
      </main>
    </div>
  );
}

export default App;
