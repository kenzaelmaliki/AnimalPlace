export interface Animal {
  _id: string;
  name: string;
  species: 'chien' | 'chat' | 'lapin' | 'cheval';
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  profilePictureURL?: string;
  description?: string;
  race?: string;
  picturesURL?: string[];
  createdDate: Date;
  location?: string;
  favoriteActivities?: string[];
  matches?: string[]; // Mettez le type approprié ici
  owner?: string;
  animalsLiked?: {
    animal: string;
    date: Date;
  }[];
}
