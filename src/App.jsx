import useFetch from "./useFetch";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function App() {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const { data, loading, error, fetchData } = useFetch(
    "https://randomuser.me/api/?results=3",
  );
  return (
    <>
      <div className="container my-4">
        <h1>People Directory</h1>
        {error && <p>Something Went Wrong</p>}
        <button onClick={fetchData} className="btn btn-primary">
          Get People
        </button>
        <div className="row my-4">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            data &&
            data.results.map((person, index) => (
              <div key={index} className="col-md-4">
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={person.picture.large}
                    className="card-img-top"
                    alt="person's Image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {person.name.first} {person.name.last}
                    </h5>
                    <p className="card-text">Age: {person.dob.age}</p>
                    <p className="card-text">Gender: {person.gender}</p>
                    <p className="card-text">
                      username: {person.login.username}
                    </p>
                    <p className="card-text">Email: {person.email}</p>
                    {showMoreInfo && (
                      <>
                        <p>Phone Number: {person.phone}</p>
                        <p>
                          Address: {person.location.street.number},{" "}
                          {person.location.street.name}, {person.location.city},{" "}
                          {person.location.state}, {person.location.country},{" "}
                          {person.location.postcode}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {data && !loading && (
        <div className="text-center">
          {!showMoreInfo ? (
            <button
              onClick={() => setShowMoreInfo(true)}
              type="button"
              className="btn btn-primary btn-lg btn-block"
            >
              Show More Info
            </button>
          ) : (
            <button
              onClick={() => setShowMoreInfo(false)}
              type="button"
              className="btn btn-primary btn-lg btn-block"
            >
              Show Less Info
            </button>
          )}
        </div>
      )}
    </>
  );
}
