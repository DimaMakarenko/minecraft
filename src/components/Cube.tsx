import { FC } from "react";
import { TCube, useStore } from "../hooks/useStore";
import { useBox } from "@react-three/cannon";
import * as textures from "../assets/textures";

interface ICube extends TCube {}

export const Cube: FC<ICube> = ({ position, texture }) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const [addCube] = useStore((state) => [state.addCube]);

  const handleCubeClick = (e: any) => {
    e.stopPropagation();

    const clickedFace = Math.floor(e.faceIndex / 2);
    const { x, y, z } = ref.current.position;

    if (clickedFace === 0) {
      return addCube(x + 1, y, z);
    } else if (clickedFace === 1) {
      return addCube(x - 1, y, z);
    } else if (clickedFace === 2) {
      return addCube(x, y + 1, z);
    } else if (clickedFace === 3) {
      return addCube(x, y - 1, z);
    } else if (clickedFace === 4) {
      return addCube(x, y, z + 1);
    } else if (clickedFace === 5) {
      return addCube(x, y, z - 1);
    }
  };

  // @ts-ignore
  const activeTexture = textures[texture + "Texture"];

  return (
    <mesh ref={ref} onClick={handleCubeClick}>
      <boxGeometry attach="geometry" />

      <meshStandardMaterial attach="material" map={activeTexture} />
    </mesh>
  );
};
