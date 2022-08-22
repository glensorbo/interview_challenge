# Interview Challenge

## Deploy a chat website with the following demands:

- User gets greeted with a message "Welcome to chat" or similar
- User gets a random generated name fetched from [SSB name API](https://www.ssb.no/statbank/table/10467/tableViewLayout1/)
- Firstname is either female or male
- Lastname is a random firstname with ending "-dottir" if female and "-sen" if male firstname
- If user is unhappy with random generated name they should be able to pick a new name
- If user is happy with their generated name they should be able to continue to chatwindow

- Chatwindow is public for everyone who access the site
- Username should be displayed in front of their message
- Under chatwindow there should be an input to write messages

- There's no demands in design but is a plus if it looks ok
- There's no demands in login or security

- The chat application needs to be in real time. Firebase Firestore or API/websockets can be a solution for this.
