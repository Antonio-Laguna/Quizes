# quiz-es



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type      | Default        |
| -------------- | --------------- | ----------- | --------- | -------------- |
| `countEdges`   | `count-edges`   |             | `boolean` | `false`        |
| `nextText`     | `next-text`     |             | `string`  | `'Next'`       |
| `questionsKey` | `questions-key` |             | `string`  | `'questions'`  |
| `startText`    | `start-text`    |             | `string`  | `'Start quiz'` |


## Events

| Event           | Description | Type               |
| --------------- | ----------- | ------------------ |
| `quizCompleted` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [quiz-es-progress](../quiz-es-progress)
- [quiz-es-step](../quiz-es-step)
- [quiz-es-question](../quiz-es-question)

### Graph
```mermaid
graph TD;
  quiz-es --> quiz-es-progress
  quiz-es --> quiz-es-step
  quiz-es --> quiz-es-question
  quiz-es-question --> quiz-es-step
  style quiz-es fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
