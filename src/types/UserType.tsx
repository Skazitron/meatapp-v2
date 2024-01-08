export interface UserType {
  username: string;
  uuid: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  dob: Date;
}

export const defaultUser: UserType = {
  username: '',
  uuid: '',
  firstName: '',
  lastName: '',
  profilePic:
    'https://firebasestorage.googleapis.com/v0/b/meatapp-9e191.appspot.com/o/usericon.jpeg?alt=media&token=ad4a1dad-0ac0-4227-bcd1-2f945c112aee',
  dob: new Date()
};
