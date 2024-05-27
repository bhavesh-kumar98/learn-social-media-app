const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center loadingSpinner">
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
