export interface MessageType {
  calendarRef: string;
  time: Date;
  userRef: string;
}

export const defaultMessage: MessageType = {
  calendarRef: '',
  time: new Date(),
  userRef: ''
};
