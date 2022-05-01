# Pluto Frontend Assignment

## HackerNews auto complete search box (combobox)

### Background

[Hacker News](https://news.ycombinator.com/) has massive posts and the posts are updated so often it's pain to find something I'm interested in.  
So, we will make a search box that autocompletes the search text lie below.

[Example]  
![Example Screenshot](/public/example_screenshot_1.png)

### Requirements

1. A user can type a search text in InputBox.
2. A user can find "title matching" posts.
3. A user can select a post.
4. When a user selects the post, you should display the below information.

- title (with link to the original article)
- author
- points
- 1st depth comments (content only)

### Non-goal

1. It doesn't matter which library or framework you use. Feel free to use tools.
2. Design (UI) is not a part of the evaluation. However, it should behave as the user expects.

### Resources

You can use Items & Search API from [Algolia](https://www.algolia.com/).

```
GET https://hn.algolia.com/api/v1/items/:id
GET https://hn.algolia.com/api/v1/search?query=...
```

[Full API Document](https://hn.algolia.com/api)

### Bonus

1. If making a request for every typing, it may overload the API server or hit the [rate limit]. So, if you can "postpone" requests until a user ends the typing, it's good for both a user and the server.

2. Keyboard interaction (change select with ARROW keys, and submit a query with ENTER key) will be a bonus point.

### Due date

in a week

## Submission

Make an online repository(Github, BitBucket, etc.) and submit the address via Email.

### Q&A

contact us via email.
<recruit@pluto.im>
