import { FC } from "react"
import { TCube } from "../hooks/useStore"
import {useBox} from '@react-three/cannon';
import * as  textures  from '../assets/textures';

interface ICube extends TCube{}

export const Cube:FC<ICube> = ({position, texture}) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }));

// @ts-ignore
  const activeTexture = textures[texture + 'Texture'];

  return (
    <mesh ref={ref}>
			<boxGeometry attach="geometry" />

      <meshStandardMaterial attach="material" map={activeTexture}/>
    </mesh>
  )
}
