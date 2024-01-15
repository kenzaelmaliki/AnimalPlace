export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  registrationDate: Date;
  address: string;
  animals: string[]; // Animal IDs
  role: 'admin' | 'user';
  location: {
    type: string;
    coordinates: [number, number];
  };
  profilePictureURL: string;
}

