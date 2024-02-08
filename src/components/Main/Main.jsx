import React, { useState, useEffect } from "react";

const Main = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [dataStore, setDataStore] = useState([]);
  const [updateStore, setUpdateStore] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleInputMessage = (e) => {
    setInputMessage(e.target.value);
  };

  const handleAddClick = () => {
    if (!inputMessage.trim()) {
      alert("Please enter a message...");
    } else {
      setDataStore([...dataStore, inputMessage.trim()]);
      setInputMessage("");
    }
  };

  const handleEndClick = () => {
    if (dataStore.length === 0) {
      setShowSuccessPopup(true);
    } else {
      const interval = setInterval(() => {
        if (dataStore.length === 0) {
          clearInterval(interval);
          setShowSuccessPopup(true);
        }
      }, 1000);
    }
  };

  const handleResetClick = () => {
    setDataStore([]);
    setUpdateStore([]);
    setShowSuccessPopup(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (dataStore.length > 0) {
        setUpdateStore((prevUpdateStore) => {
          const updatedMessage = dataStore[0];
          return [...prevUpdateStore, updatedMessage];
        });
        setDataStore((prevDataStore) => prevDataStore.slice(1));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dataStore]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6">
          <div className="card h-300" style={{ height: "400px" }}>
            <div className="card-body">
              <h4 className="card-title">Input Section</h4>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Message..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={inputMessage}
                  onChange={handleInputMessage}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={handleAddClick}
                >
                  Add
                </button>
              </div>
              <h4 className="mt-4">Messages</h4>
              <ul className="list-group">
                {dataStore.map((message, index) => (
                  <li key={index} className="list-group-item">
                    {message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card h-300" style={{ height: "400px" }}>
            <div className="card-body">
              <h4 className="card-title">Poll Section</h4>
              <ul className="list-group">
                {updateStore
                  ?.slice()
                  .reverse()
                  ?.map((message, index) => (
                    <li key={index} className="list-group-item">
                      {message}
                    </li>
                  ))}
              </ul>
              {showSuccessPopup && (
                <div className="alert alert-success mt-3" role="alert">
                  All elements have been processed successfully.
                </div>
              )}
              <div className="ms-1 mt-3">
                <button className="btn btn-primary" onClick={handleEndClick}>
                  End
                </button>
                <button
                  className=" ms-2 btn btn-danger"
                  onClick={handleResetClick}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
