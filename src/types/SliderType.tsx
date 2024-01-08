export interface SliderType {
  calendarRef: string;
  dateRef: string;
  repeatable: boolean;
  userRef: string;
}

export const defaultSlider: SliderType = {
  calendarRef: '',
  dateRef: '',
  repeatable: false,
  userRef: ''
};
