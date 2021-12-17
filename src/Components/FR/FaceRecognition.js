import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" alt="" src={imageUrl} width="300" height="auto" />
        {boxes.map((box) => {
          return (
            <div
              key={box.topRow}
              className="bounding_box"
              style={{
                top: box.topRow,
                bottom: box.bottomRow,
                left: box.leftCol,
                right: box.rightCol,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
