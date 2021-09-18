import { Component, Host, Prop, h } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'quiz-es-step',
  styleUrl: 'quiz-es-step.css',
})
export class QuizEsStep {
  @Prop() step: number;
  @Prop() currentStep: number;
  @Prop() type: string;

  getIsRenderable(): boolean {
    // One step ahead
    return this.currentStep === this.step || this.currentStep === this.step - 1;
  }

  render() {
    const isRenderable = this.getIsRenderable();
    const isCurrent = this.currentStep === this.step;

    const cn = classNames('quiz__step', {
      [`quiz__step--${this.type}`]: !!this.type,
      'is-visible': isCurrent,
      'is-rendered': isRenderable,
      'is-next': isRenderable && !isCurrent,
    });

    return (
      <Host class={cn}>
        <slot/>
      </Host>
    );
  }

}
