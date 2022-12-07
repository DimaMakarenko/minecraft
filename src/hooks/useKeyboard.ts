import { useCallback, useEffect, useState } from "react"


// enum Keys {
//   KeyW = 'KeyW',
//   KeyS = 'KeyS',
//   KeyA = 'KeyA',
//   KeyD = 'KeyD',
//   Space = 'Space',
//   Dirt = 'Dirt',
//   Grass = 'Grass',
//   Glass = 'Glass',
//   Wood = 'Wood',
//   Log = 'Log',
// }
type IKeyActionMap = Record<string, string>

const actionByKey = (key: string) => {
  const keyActionMap: IKeyActionMap = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
    Dirt: 'dirt',
    Grass: 'grass',
    Glass: 'glass',
    Wood: 'wood',
    Log: 'log',
  }

  return keyActionMap[key];
}

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.code)
    if (action) {
      setActions(prev => ({ ...prev, [action]: true }))
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.code)
    if (action) {
      setActions(prev => ({ ...prev, [action]: false }))
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [handleKeyDown, handleKeyUp]);

  return actions
}
