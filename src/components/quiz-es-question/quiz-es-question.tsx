import { Component, h, Prop, State, Event, EventEmitter, Host } from '@stencil/core';

@Component({
  tag: 'quiz-es-question',
  styleUrl: 'quiz-es-question.css',
})
export class QuizEsQuestion {
  @Prop() step: number;
  @Prop() currentStep: number;
  @Prop() question: string;
  @Prop() choices: string[];
  @Prop() nextText: string = 'Next';

  @State() answer: number = -1;

  @Event() questionCompleted: EventEmitter;
  questionCompletedHandler() {
    this.questionCompleted.emit({ index: this.step, answer: this.answer });
  }

  handleInputChange(index: number) {
    this.answer = index;
  }

  render() {
    const questionIndex = `question-${this.step}`;

    return (
      <Host class="quiz__question">
        <quiz-es-step
          step={this.step}
          current-step={this.currentStep}
          type="question"
        >
          <h3 class="question__title">{this.question}</h3>

          <div class="question__choices">
          {
            this.choices.map((choice, index) => (
              <label class="question__label">
                {choice}
                <input
                  class="question__input"
                  type="radio"
                  value={index}
                  name={questionIndex}
                  onChange={() => this.handleInputChange(index)}
                />
              </label>
            ))
          }
          </div>

          <button
            type="button"
            class="question__button"
            disabled={this.answer < 0}
            onClick={() => this.questionCompletedHandler()}>
            {this.nextText}
          </button>
        </quiz-es-step>
      </Host>
    );
  }
}
