import { useThree, useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { FC, useEffect, useRef } from "react";
import { Vector3 } from "three";

interface IPlayer {}

export const Player: FC<IPlayer> = () => {
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mess: 1,
    type: "Dynamic",
    position: [0, 4, 0],
  }));

  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  const position = useRef([0, 0, 0]);

  useEffect(() => {
    api.position.subscribe((p) => (position.current = p));
  }, [api.position]);

  useFrame(() => {
    camera.position.copy(
      new Vector3(position.current[0], position.current[1], position.current[2])
    );

    api.velocity.set(0, 0, 0);
  });
  return <mesh ref={ref}></mesh>;
};
