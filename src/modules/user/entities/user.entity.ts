export type User = {
  id: number;
  name: string;
  username: string;
  password?: string;
  isAdmin: boolean;
};

export function selectedFieldUser() {
  return {
    id: true,
    name: true,
    username: true,
    isAdmin: true,
  };
}
