import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({
  onInputChange,
  onButtonSubmit,
  boxes,
  imageUrl,
  istestLinkVisible,
}) => {
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
      {istestLinkVisible ? (
        <p className="imageLinkForm__testLink">
          Test Link:
          "https://techcrunch.com/wp-content/uploads/2019/02/which1.png"
        </p>
      ) : null}

      <div className="imageLinkForm__image">
        <div className="relative mt2">
          <img
            id="inputImage"
            alt=""
            src={imageUrl}
            // width="300"
            // height="auto"
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
