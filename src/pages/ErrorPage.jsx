import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigator = useNavigate();

  return (
    <div className="section">
      <h1 className="error">404 Error</h1>
      <div className="page">
        Ooops!!! The page you are looking for is not found,Please Try Again!!!
      </div>
      <a className="back-home" onClick={() => navigator("/home")}>
        Back to home
      </a>
    </div>
  );
};

export default ErrorPage;
