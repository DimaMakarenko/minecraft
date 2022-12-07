import { FC, useState } from "react";
import { TCube, useStore } from "../hooks/useStore";
import { useBox } from "@react-three/cannon";
import * as textures from "../assets/textures";

interface ICube extends TCube {}

export const Cube: FC<ICube> = ({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);

  const handleCubeClick = (e: any) => {
    e.stopPropagation();

    const clickedFace = Math.floor(e.faceIndex / 2);
    const { x, y, z } = ref.current.position;

    if (e.altKey) {
      removeCube(x, y, z);
    } else if (clickedFace === 0) {
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

  const handleOnPointMove = (e: any) => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const handleOnPointOut = (e: any) => {
    e.stopPropagation();
    setIsHovered(false);
  };
  return (
    <mesh
      ref={ref}
      onClick={handleCubeClick}
      onPointerMove={handleOnPointMove}
      onPointerOut={handleOnPointOut}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        attach="material"
        map={activeTexture}
        color={isHovered ? "grey" : "white"}
        transparent={true}
        opacity={texture === "glass" ? 0.6 : 1}
      />
    </mesh>
  );
};
