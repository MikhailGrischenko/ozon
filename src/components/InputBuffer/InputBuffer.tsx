// external dependency
import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
// types
import {IButtonEvent} from '@/components/Button/Button.types';
// stylesheet
import styles from './InputBuffer.css?module'

interface IInputBufferProps {
  value: Array<IButtonEvent>
  payment: boolean
}

@Component
export default class InputBuffer extends VueComponent<IInputBufferProps> {

  @Prop({default:() => []})
  private value!: Array<IButtonEvent>;
  @Prop({default: false})
  private payment!: boolean;

  viewStyle() {
    return !this.payment ? styles.buffer : styles.bufferResult
  }

  render() {
    return (
      <div class={this.viewStyle()}>
        {
          this.value.map(item => {
            return <div class={styles.bufferItem}>{item.title}</div>
          })
        }
      </div>
    )
  }
}
