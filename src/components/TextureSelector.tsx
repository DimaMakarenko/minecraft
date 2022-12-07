import { FC, useEffect, useState } from "react";
import { useKeyboard } from "../hooks/useKeyboard";
import { useStore } from "../hooks/useStore";
import { dirtImg, grassImg, glassImg, woodImg, logImg } from "../assets/images";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

export const TextureSelector: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);

  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v)?.[0];
    if (pressedTexture && pressedTexture !== activeTexture) {
      setTexture(pressedTexture);
    }
  }, [setTexture, dirt, grass, glass, wood, log, activeTexture]);

  useEffect(() => {
    console.log("effect");
    setIsVisible(true);

    const visibilityTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  console.log("isVisible", isVisible);
  return (
    <>
      {isVisible && (
        <div className="absolute centered texture-selector">
          {Object.entries(images).map(([key, src]) => 
             <img 
             src={src} 
             alt=""
              key={key} 
              className={`${key === activeTexture  ? "active" : ''}`}/>
          )}
        </div>
      )}
    </>
  );
};
