# For better understanding

## Structute of data:

- "date" - in most of the cases it's date selected by user. It depends on which month or year is shown on the calendar.

- "data" - array with date data. The first array is responsible for the number of weeks, the second contains the days of the week (items).

- "item" contains date data. Example:

{
    date: new Date(date),
}

- "eventItems" [array] contains event items

- "eventItem" concontains date data and events data. Example:

{
    date: new Date(date)
    events: [
            {
            id: new Date()getTime(),
            title: "Lorem"
            description: "Lorem ipsum"
            time: "09:22"
        }
    ]   
}

- "events" [array] contains event

- "event" contains id, title, description, time. Example:

{
    id: new Date()getTime(),
    title: "Lorem"
    description: "Lorem ipsum"
    time: "09:22"
}

## Short description of files:

- functions.js - contains global functions

- local-store.js - contains functions for working with local storage like: get, set, delete

- constants.js - contains constans value like: month names, name of days...

- context.jsx - passes global data throughout the application

- loader.jsx - display loading date animation

- header.jsx - contains controls for displaying data in the calendar

- date-picker.jsx - when you click on the button, it opens a window that allows you to select the year and month

- add-event-form.jsx - when you click on the button, it opens a form for adding events

- calendar.jsx - displays calendar

- item.jsx - displays the calendar cell

- event.jsx = displays the event inside the calendar cell and the form for changing the event
