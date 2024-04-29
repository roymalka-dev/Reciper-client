export interface recipeType {
  _id: string;
  image: string;
  name: string;
  description: string;
  performingUser: string;
  instructions: string[];
}

export interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}
