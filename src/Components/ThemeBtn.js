import { useState, useRef } from "react";
import mainTheme from "./Assets/mainTheme.mp3";

export function ThemeBtn() {
  const [music, setMusic] = useState(false);

  const audioRef = useRef(new Audio(mainTheme));

  const theme = () => {
    if (music) {
      setMusic(false);
      audioRef.current.pause();
    } else {
      setMusic(true);
      audioRef.current.play();
    }
  };
  return (
    <>
      <button
        onClick={theme}
        className="bg-starYellow rounded-full px-4 py-1 text-spaceBlack font-bold absolute top-0 right-0 mt-10 mr-10"
      >
        Theme Song
      </button>
    </>
  );
}
