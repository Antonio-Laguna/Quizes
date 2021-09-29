# Quizes Web Component ![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

This is a pet project that was born as I saw no libraries to do a Quiz that was OpenSource. 

I intend to use it on my blog where I write FrontEnd tutorials and wanted to create some quiz from time to time. As a result, initially it is very scarce in features and **is unstable**.

As of now, this project status is **being maintained**.

## Using this component

There are three strategies we recommend for using web components built with Stencil.

### Script tag

- Put a script tag similar to this `<script src='https://unpkg.com/quizes@1.0.0/dist/quizes.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules

- Run `npm install quizes --save`
- Import `import { defineCustomElements } from 'quizes';`
- Run `defineCustomElements()`

### In a stencil-starter app

- Run `npm install quizes --save`
- Add an import to the npm packages `import quizes;`
- Then you can use the element anywhere in your template, JSX, html etc

### Usage

The main element is `quiz-es` and has the following parameters:

| Parameter       | Description                                              | Default Value  | Required |
|-----------------|----------------------------------------------------------|----------------|:--------:|
| `questions-key` | Key within the window object where questions are stored. | `"questions"`  |    No    |
| `start-text`    | Text for the button to start the quiz.                   | `"Start quiz"` |    No    |
| `next-text`     | Text for the button to go to the next question.          | `"Next"`       |    No    |
| `count-edges`   | Whether intro and end are counted for progress.          | `false`        |    No    |

The component has the following slots:

| Slot Name          | Description                                   |
|--------------------|-----------------------------------------------|
| `quiz-title`       | Renders as the title of the quiz.             |
| `quiz-description` | Renders as the description of the quiz.       |
| `quiz-result`      | Last screen once the quiz has been completed. |

Questions, should be within an object on the `window` obeject and should have the following structure:

```js
window.questions = [
  {
    title: "", // Title of the question
    choices: [
      ""       // List of possible choices
    ],
    answer: -1 // Index of the correct answer
  },
  ...
]
```

#### Events

The component fires a `quizCompleted` event with the following data as the `detail` of the event:

| Key              | Description                                          |
|------------------|------------------------------------------------------|
| `answers`        | Array of the indexes that matches the answers given. |
| `correctAmount`  | Number of correct answers.                           |
| `correctPercent` | Percent of correct answers.                          |

This is fired right before the content changes which gives you the chance to customise the detail screen. 

## Development

Clone this repo to a new directory:

```bash
git clone git@github.com:Antonio-Laguna/Quizes.git
cd Quizes
```

and run:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```
