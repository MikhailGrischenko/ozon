// external dependency
import {Component, Vue} from 'vue-property-decorator';
// custom components
import InputBuffer from '@/components/InputBuffer/InputBuffer';
import Button from '@/components/Button/Button';
import Result from '@/components/Result/Result';
import {delay} from '@/utils/delay';
// types
import {Action, Operand} from './Calc.types'
import {ButtonType, IButtonEvent} from '@/components/Button/Button.types';
// config
import {BUTTONS_CONFIG} from '@/components/Calc/Calc.const';
// stylesheet
import styles from './Calc.css?module'

@Component
export default class Calc extends Vue {

  private buffer: Array<IButtonEvent> = [];
  private result: string = '';
  private readonly timeout: number = 2000;
  private loading: boolean = false;
  private payment: boolean = false;

  private buttonClick(value: IButtonEvent) {
    if (this.payment) {
      this.clear()
      this.payment = false
    }

    switch (value.type) {
      case ButtonType.numeral: this.handlerNumeral(value)
        break
      case ButtonType.operand: this.handlerOperand(value)
        break
      case ButtonType.action: this.handlerAction(value)
        break
    }
  }

  private handlerNumeral(value: IButtonEvent) {
    const lastItem = this.buffer[this.buffer.length - 1]
    if (this.buffer.length && lastItem.type === ButtonType.numeral) {
      lastItem.title = lastItem.title + value.title
    } else {
      this.buffer.push(value)
    }
  }

  private handlerOperand(value: IButtonEvent) {
    const lastItem = this.buffer[this.buffer.length - 1]
    if (this.buffer.length && lastItem.type === ButtonType.numeral) {
      this.buffer.push(value)
    }
  }

  private async handlerAction(value: IButtonEvent) {
    if (value.title === Action.clear) {
      this.clear()
    }
    if (value.title === Action.apply) {
      this.loading = true;
      this.payment = true;
      this.result = await this.fakeServerApply()
      this.loading = false;
    }
  }

  private fakeServerApply(): Promise<string> {
    return delay(this.timeout).then(this.apply)
  }

  private apply(): string {
    let currentOperand: string | null = null
    let sum: number = 0
    this.buffer.forEach((item: IButtonEvent) => {
      if (item.type === ButtonType.operand) {
        currentOperand = item.title
      }
      if (item.type === ButtonType.numeral) {
        sum = this.operation(sum, currentOperand, +item.title)
      }

    })
    return String(sum)
  }

  private operation(sum: number, operand: string | null, current: number): number {
    switch (operand) {
      case Operand.plus: return sum + current
      case Operand.minus: return sum - current
      case null: return current
      default: return NaN
    }
  }

  private clear(): void {
    this.buffer = []
    this.result = ''
  }

  render() {
    return (
      <main class={styles.calc}>
        <InputBuffer
          value={this.buffer}
          payment={this.payment}
        />
        {this.payment ? <Result value={this.result} loading={this.loading}/> : null}
        <div>
          {
            BUTTONS_CONFIG.map(button => {
              return <Button
                title={button.title}
                width={button.width}
                type={button.type}
                color={button.color}
                loading={this.loading}
                on-buttonClick={this.buttonClick}
              />
            })
          }
        </div>
      </main>
    )
  }
}
