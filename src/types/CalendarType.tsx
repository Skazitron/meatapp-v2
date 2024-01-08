export interface CalendarType {
  id: string;
  startDate: Date;
  adminRef: string;
  title: string;
}

export const defaultCalendar: CalendarType = {
  id: '',
  startDate: new Date(),
  adminRef: '',
  title: ''
};
