import {
  Component,
  State,
  Prop,
  Listen,
  Host,
  Element,
  h,
  Event,
  EventEmitter
} from '@stencil/core';
import tinybounce from 'tinybounce';
import classNames from 'classnames';

type Question = {
  title: string;
  choices: string[];
  answer: number;
}

@Component({
  tag: 'quiz-es',
  styleUrl: 'quiz-es.css',
})
export class QuizEs {

  @Prop() questionsKey: string = 'questions';
  @Prop() countEdges: boolean = false;
  @Prop() startText: string = 'Start quiz';
  @Prop() nextText: string = 'Next';

  @State() questions: Question[] = [];
  @State() step: number = 0;
  @State() resultIndex: number = 0;

  @Element() el: HTMLElement;

  @Event() quizCompleted: EventEmitter;

  private steps: HTMLElement[];
  private stepsEl: HTMLElement;
  private stepsWrapperEl: HTMLElement;
  private bounds: number[];
  private answers: number[] = [];

  componentWillLoad() {
    const questionsValue = window[this.questionsKey];
    const questionsValueType = typeof questionsValue;

    if (questionsValueType === 'string') {
      // Assume this is a JSON string version for now
      // todo: Add support for remote with async
      this.questions = JSON.parse(window[this.questionsKey]);
    } else if (questionsValueType !== 'undefined') {
      this.questions = questionsValue;
    }

    this.resultIndex = this.questions.length + 1;
  }

  componentDidLoad() {
    // Leaving time for all of the things to render
    setTimeout(() => {
      this.steps = Array.from(this.el.querySelectorAll('.quiz__step'));
      this.bounds = this.steps.map(el => el.offsetHeight);
      this.stepsEl = this.el.querySelector('.quiz__steps');
      this.stepsWrapperEl = this.el.querySelector('.quiz__steps__wrapper');

      this.shrinkToStep();

      requestAnimationFrame(() => this.el.classList.add('is-ready'));
    });

    window.addEventListener('resize', tinybounce(this.handleWindowResize.bind(this), 250));
  }

  handleWindowResize() {
    this.bounds = this.steps.map(el => el.offsetHeight);
    this.shrinkToStep();
  }

  shrinkToStep(step = this.step) {
    this.stepsEl.style.height = `${this.bounds[step]}px`;
  }

  transformFromIndex(index) {
    let transform = 0;

    for (let i = 0; i < this.bounds.length && i < index; i++) {
      transform -= this.bounds[i];
    }

    return transform;
  }

  getRightAnswers() {
    return this.answers.reduce((
      accumulator,
      answer,
      index
    ) => {
      if (this.questions[index].answer === answer) {
        return accumulator + 1;
      }

      return accumulator;
    }, 0);
  }

  getCorrectPercent() {
    const totalQuestions = this.questions.length;
    const rightAnswers = this.getRightAnswers();

    return (rightAnswers / totalQuestions) * 100;
  }

  goToNext() {
    const nextIndex = this.step + 1;
    const isLastStep = this.steps ? nextIndex === this.steps.length - 1 : false;

    if (isLastStep) {
      this.quizCompleted.emit({
        answers: this.answers,
        correctAmount: this.getRightAnswers(),
        correctPercent: this.getCorrectPercent()
      });
    }

    this.stepsWrapperEl.style.transform = `translate3d(0, ${this.transformFromIndex(nextIndex)}px, 0)`;
    this.shrinkToStep(nextIndex);

    this.step += 1;
  }

  @Listen('questionCompleted')
  questionCompletedHandler(event) {
    const { answer } = event.detail;
    this.answers.push(answer);

    this.goToNext();
  }

  render() {
    const isLastStep = this.steps ? this.step === this.steps.length - 1 : false;
    const correctPercent = isLastStep ? this.getCorrectPercent() : 0;
    const percentString = Math.round(correctPercent);
    const cn = classNames('quiz', `quiz--${this.step + 1}`, {
      'quiz--end': isLastStep,
      [`quiz--result-${percentString}`]: isLastStep
    });

    return (
      <Host class="quiz-es">
        <div class={cn}>
          <quiz-es-progress
            countEdges={this.countEdges}
            step={this.step}
            steps={this.questions.length}
          />

          <div class="quiz__steps">
            <div class="quiz__steps__wrapper">
              <quiz-es-step step={0} currentStep={this.step} type="intro">
                <slot name="quiz-title" />
                <slot name="quiz-description" />
                <button type="button" onClick={() => this.goToNext()}>{this.startText}</button>
              </quiz-es-step>
              {this.questions.map((question, index) =>
                (
                  <quiz-es-question
                    step={index + 1}
                    choices={question.choices}
                    currentStep={this.step}
                    nextText={this.nextText}
                    question={question.title}
                    key={index}
                  />
                )
              )}
              <quiz-es-step step={this.resultIndex} currentStep={this.step} type="result">
                <slot name="quiz-result" />
              </quiz-es-step>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
