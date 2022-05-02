# Search-box-app

## Deployment

https://search-box-app.netlify.app/

## Install & Run

```shell
git clone https://github.com/cksdnr3/search-box-app.git
cd search-box-app
npm install
npm start
```

## Language

ES6 (with typescript)

## Library

- React (with CRA)
- Styled-Components
- React-Query
- Axios

## Requirements

- [x] 1. A user can type a search text in InputBox.

- [x] 2. A user can find "title matching" posts.
- [x] 3. A user can select a post.
- [x] 4. When a user selects the post, you should display the below information.
- [x] 5. If making a request for every typing, it may overload the API server or hit the [rate limit]. So, if you can "postpone" requests until a user ends the typing, it's good for both a user and the server.
- [x] 6. Keyboard interaction (change select with ARROW keys, and submit a query with ENTER key) will be a bonus point.
