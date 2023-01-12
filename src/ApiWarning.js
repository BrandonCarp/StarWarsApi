import React from "react";
import { GrClose } from "react-icons/gr";

const modal_styles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "yellow",
  padding: "50px",
  zIndex: 1000,
};

const overlay_styles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export const ApiWarning = ({ modalBtn }) => {
  return (
    <div style={overlay_styles}>
      <div style={modal_styles} className="rounded">
        <button className="fixed top-2 left-2" onClick={modalBtn}>
          <GrClose />
        </button>

        <h1 className="font-bold">
          Browse through to see your beloved starwars characters from the
          movies, or search a character!
        </h1>

        <h1 className="font-bold p-3">
          Disclaimer: This app is currently fetching from the Swapi.dev api, the
          api is apparently no longer being maintained. Server may occasionally
          throw errors.
        </h1>
      </div>
    </div>
  );
};
