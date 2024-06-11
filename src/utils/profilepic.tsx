export const getProfpic = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("profpic");
  }
  return null;
};

export const setProfpic = (profpic: string, value: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(profpic, value);
  }
};

export const removeProfpic = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("profpic");
  }
};
