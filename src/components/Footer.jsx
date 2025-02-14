const Footer = () => {
  return (
    <footer
      style={{
        margin: "10px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <hr style={{ width: "30%" }} />
        <p>
          Designed and Developed By <b>ServeSpoon</b>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
