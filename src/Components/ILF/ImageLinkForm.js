import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit, boxes, imageUrl }) => {
  return (
    <div className="f4 imageLinkForm">
      <p className="imageLinkForm__text">
        This app will detect faces in your pictures, give it a try :)
      </p>
      <div className="imageLinkForm__form">
        <input
          className="imageLinkForm__form--input"
          type="text"
          placeholder="Enter Image Link"
          onChange={onInputChange}
        />
        <button
          className="imageLinkForm__form--button"
          onClick={onButtonSubmit}
        >
          Detect
        </button>
      </div>
      <p className="imageLinkForm__testLink">
        Test Link:
        "https://cdn.vox-cdn.com/thumbor/zcdhPZbwtnwiator3LCNdKmGihw=/1400x788/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/13762264/fake_ai_faces.png"
      </p>

      <div className="imageLinkForm__image">
        <div className="relative mt2">
          <img
            id="inputImage"
            alt=""
            src={imageUrl}
            width="300"
            height="auto"
          />
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
    </div>
  );
};

export default ImageLinkForm;
