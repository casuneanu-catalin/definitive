import React from "react";

export default function TestButtons() {
  return (
    <div className="section pt-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Modal 1
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop2"
            >
              Modal 2
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop3"
            >
              Modal 3
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
