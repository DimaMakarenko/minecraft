import { useStore } from "../hooks/useStore";
import { Cube } from "./Cube";

export const Cubes: any = () => {
  const [cubes] = useStore((state) => [state.cubes]);

  return cubes.map(({ key, position, texture }) => (
    <Cube key={key} position={position} texture={texture} />
  ));
};
