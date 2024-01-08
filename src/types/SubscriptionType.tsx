export interface SubscriptionType {
  calendarRef: string;
  userRef: string;
}

export const defaultSubscription: SubscriptionType = {
  calendarRef: '',
  userRef: ''
};
