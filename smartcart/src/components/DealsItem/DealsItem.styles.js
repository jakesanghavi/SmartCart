const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: 200, // Set a max-width for larger screens
    height: "auto",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "10px",
    margin: "0 auto",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "150px", // Adjust based on your preference
    objectFit: "cover",
    borderRadius: "10px",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginTop: "10px",
    textAlign: "center",
  },
  detail: {
    fontSize: "1rem",
    marginTop: "5px",
  },
  decrease: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "green",
    marginTop: "5px",
  },
  cheaperThan: {
    fontSize: "1rem",
    color: "#616161",
    marginTop: "5px",
  },
  buttonNotInCart: {
    cursor: "pointer",
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid green",
    backgroundColor: "white",
    outline: "none",
    marginTop: "10px",
  },
  buttonInCart: {
    cursor: "pointer",
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid green",
    backgroundColor: "green",
    outline: "none",
    marginTop: "10px",
  },
};

export default styles;
