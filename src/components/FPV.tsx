import { FC } from "react";
import { useThree } from "@react-three/fiber";
import {PointerLockControls} from '@react-three/drei';

// First Person View
export const FPV: FC = () => {
  const { camera , gl} = useThree();

  // @ts-ignore
  return <PointerLockControls args={[camera, gl.domElement]}/>;
};
