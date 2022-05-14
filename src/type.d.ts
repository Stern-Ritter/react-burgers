declare module "*.module.css";

type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
};

type TIngredients = {
  bun: TIngredient | null;
  main: Array<TIngredient>;
};

type TOrder = {
  _id: string;
  number: number;
  name: string;
  createdAt: string;
  status: 'created' | 'pending' | 'done';
  ingredients: Array<string>;
};

type TResetPasswordForm = {
  password: string;
  token: string;
};

type TForgotPasswordForm = {
  email: string;
};

type TRegisterForm = {
  email: string;
  password: string;
  name: string;
};

type TLoginForm = {
  email: string;
  password: string;
};

type TUpdateUserForm = {
  name: string;
  email: string;
  password: string;
};
