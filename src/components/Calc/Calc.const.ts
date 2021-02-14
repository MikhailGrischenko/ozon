import {ButtonColor, ButtonSize, ButtonType} from '@/components/Button/Button.types';
import {IButtonProps} from '@/components/Button/Button';
import {Action, Numeral, Operand} from '@/components/Calc/Calc.types';

export const BUTTONS_CONFIG: Array<IButtonProps> = [
  {
    title: Numeral.seven,
    type: ButtonType.numeral
  },
  {
    title: Numeral.eight,
    type: ButtonType.numeral
  },
  {
    title: Numeral.nine,
    type: ButtonType.numeral
  },
  {
    title: Action.clear,
    type: ButtonType.action,
    color: ButtonColor.accent
  },
  {
    title: Numeral.four,
    type: ButtonType.numeral
  },
  {
    title: Numeral.five,
    type: ButtonType.numeral
  },
  {
    title: Numeral.six,
    type: ButtonType.numeral
  },
  {
    title: Operand.minus,
    type: ButtonType.operand,
    color: ButtonColor.accent
  },
  {
    title: Numeral.one,
    type: ButtonType.numeral
  },
  {
    title: Numeral.two,
    type: ButtonType.numeral
  },
  {
    title: Numeral.three,
    type: ButtonType.numeral
  },
  {
    title: Operand.plus,
    type: ButtonType.operand,
    color: ButtonColor.accent
  },
  {
    title: Numeral.zero,
    type: ButtonType.numeral,
    width: ButtonSize.three
  },
  {
    title: Action.apply,
    type: ButtonType.action,
    color: ButtonColor.accent
  },
]
