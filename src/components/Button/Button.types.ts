export enum ButtonColor {
  basic = 'basic',
  accent = 'accent'
}

export enum ButtonSize {
  one = 1,
  three = 3
}

export interface IButtonEvent {
  title: string
  type: ButtonType
}

export enum ButtonType {
  operand = 'operand',
  action = 'action',
  numeral = 'numeral'
}

