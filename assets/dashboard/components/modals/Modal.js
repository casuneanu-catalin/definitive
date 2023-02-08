import React from "react";

export default function Modal({ id = "", content = <></>, dismissAction = () => {} }) {
  return (
    <div
      className="modal modalfade"
      id={id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel2"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <a
            type="button"
            className="text-white ms-3 mb-3"
            data-bs-dismiss="modal"
            onClick={dismissAction}
          >
            <i className="fa-solid fa-circle-arrow-left fa-xl"></i>
          </a>
          <div className="main-box">
            <div className="row">
              <div className="col-lg-12 text-start">{content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
