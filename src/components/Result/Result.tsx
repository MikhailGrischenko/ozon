// external dependency
import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
// stylesheet
import styles from './Result.css?module'

interface Props {
  value: string
  loading: boolean
}

@Component
export default class Result extends VueComponent<Props> {

  @Prop({default: ''})
  private value!: string;

  @Prop({default: false})
  private loading!: boolean;

  private showPrefix() {
    return !this.value ? styles.prefixHidden : styles.prefix
  }

  private showSpinner(): string {
    return !this.value ? styles.spinner : styles.spinnerHidden
  }

  render() {
    return (
      <div class={styles.body}>
        <div class={ this.showPrefix() }>=</div>
        <div class={ styles.value }>{this.value}</div>
        <div class={this.showSpinner()}/>
      </div>)
  }
}
