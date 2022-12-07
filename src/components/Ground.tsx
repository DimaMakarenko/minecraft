import { FC } from "react";
import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../assets/textures";
import { RepeatWrapping } from "three";
import { useStore } from "../hooks/useStore";
import { useThree } from "@react-three/fiber";

interface IGround {}

const AVAILABLE_DISTANCE = 6;

const canAddCube = (camera: any, ground: any) => {
  const [cx, cy, cz] = camera.position;
  const [gx, gy, gz] = ground.point;
  
  if (
    Math.abs(cx - gx) > AVAILABLE_DISTANCE ||
    Math.abs(cy - gy) > AVAILABLE_DISTANCE ||
    Math.abs(cz - gz) > AVAILABLE_DISTANCE
  ) {
    return false;
  }

  return true;
};

export const Ground: FC<IGround> = () => {
  const [addCube] = useStore((state) => [state.addCube]);

  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  groundTexture.wrapS = RepeatWrapping;
  groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(100, 100);

  const handleGroundClick = (e: any) => {
    e.stopPropagation();
    const [x, y, z] = Object.values(e.point).map((value) =>
      Math.ceil(value as number)
    );
    canAddCube(e.camera, e) && addCube(x, y, z);
    ;
  };

  return (
    <mesh onClick={handleGroundClick} ref={ref} onPointerMove={(e:any) => console.log('e', e)}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};
