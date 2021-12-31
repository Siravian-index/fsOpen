browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: initial render (notes, main.css, main.js, data.json, favicon.ico)

note over browser:
User submits a new note on the form
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note

note over browser:
This new POST request causes the note to be sent and stored and the page to be reloaded.
end note

note over browser:
The browser reloads and asks for all the data all over again plus the new_note.
end note

server-->browser: initial render (new_note, notes, main.css, main.js, data.json, favicon.ico)
