import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'quiz-es-progress',
  styleUrl: 'quiz-es-progress.css',
})
export class QuizEsProgress {
  @Prop() step: number;
  @Prop() steps: number;
  @Prop() countEdges: boolean = false;

  getPercent() {
    let total = this.steps;
    let current = this.step;

    if (this.countEdges) {
      total += 2; // Start and end
    } else {
      current -= 1;
    }

    const percent = (100 * current) / total;

    return Math.min(Math.max(percent, 0), 100);
  }

  render() {
    const currentPercent = this.getPercent();
    const value = currentPercent ? `${currentPercent}%` : '0';

    return (
      <Host
        class="quiz__progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(currentPercent)}
      >
        <div class="quiz__progress__value" style={{ width: value }} />
      </Host>
    );
  }

}
