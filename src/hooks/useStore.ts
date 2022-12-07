import create from "zustand";
import { nanoid } from "nanoid";

export type TCube = {
  key: string;
  position: [number, number, number];
  texture: string;
};

interface WorldState {
  texture: string;
  cubes: TCube[];
  addCube: (x: number, y: number, z: number) => void;
}

export const useStore = create<WorldState>((set) => ({
  texture: "dirt",
  cubes: [],
  addCube: (x: number, y: number, z: number) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        {
          key: nanoid(),
          position: [x, y, z],
          texture: prev.texture,
        },
      ],
    }));
  },
  removeCube: () => { },
  setCube: () => { },
  saveWorld: () => { },
  resetWorld: () => { },
}));
