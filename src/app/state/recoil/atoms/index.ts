import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const cmsDataAtom = atom({
  key: "cmsDataAtom",
  default: {
    modulesLanding: {},
    modulesAbout: {},
  },
  effects_UNSTABLE: [persistAtom],
});
