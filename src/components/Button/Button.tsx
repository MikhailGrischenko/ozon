// external dependency
import { Component, Prop, Emit } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
// types
import {ButtonColor, ButtonSize, ButtonType} from '@/components/Button/Button.types';
// stylesheet
import styles from './Button.css?module'

export interface IButtonProps {
  color?: ButtonColor
  title: string
  type: ButtonType
  width?: ButtonSize
  loading?: boolean
}

@Component
export default class Button extends VueComponent<IButtonProps> {

  @Prop({default: ButtonColor.basic })
  private color!: ButtonColor;
  @Prop()
  private title!: string;
  @Prop()
  private type!: ButtonType;
  @Prop({default: ButtonSize.one})
  private width!: ButtonSize;
  @Prop({default: false})
  private loading!: boolean

  private buttonClick() {
    if (!this.loading) {
      this.emitClick()
    }
  }

  @Emit('buttonClick')
  private emitClick() {
    return {
      title: this.title,
      type: this.type
    }
  }

  render() {
    return (
      <button
        onClick={ this.buttonClick }
        class={[
          styles.button,
          this.color === ButtonColor.accent ? styles.accent : '',
          this.width === ButtonSize.three ? styles.widthThree : '',
          this.loading ? styles.disabled : '',
        ]}
      >
        <div class={styles.title}>{ this.title }</div>
      </button>
    )
  }
}
