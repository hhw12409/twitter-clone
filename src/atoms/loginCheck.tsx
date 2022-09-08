import { atom } from "recoil";

export const loginCheck = atom<boolean>({
  key: "loginCheck",
  default: false,
});
