// Define base styles for the container
const baseContainerStyles = {
  backgroundColor: "white",
  borderColor: "#D9D9D9",
  padding: "15px",
  borderRadius: "10px",
  border: "1.5px solid #ccc", // Lighter border color by default
  flexDirection: "row",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

const styles = {
  container: {
    ...baseContainerStyles,
  },
  containerFocused: {
    ...baseContainerStyles,
    border: "1.5px solid #000", // Darker border color when input is focused
  },
  input: {
    width: "100%",
    height: "100%",
    fontSize: "25px",
    marginLeft: "10px",
    border: "none",
    outline: "none",
  },
};

export default styles;
