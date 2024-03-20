const styles = {
  container: {
    padding: "12px",
    cursor: "pointer",
    display: "flex",
    maxWidth: "100%",
  },
  text: {
    fontSize: 20,
    whiteSpace: "nowrap", // Prevent text from wrapping to a new line
    overflow: "hidden", // Hide overflow content
    textOverflow: "ellipsis", // Show ellipsis for overflow content
    display: "inline", // Ensure text is inline to work with ellipsis
  },
  boldText: {
    fontWeight: "600",
    color: "#242423",
  },
  normalText: {
    fontWeight: "400",
    color: "#242423",
  },
};

export default styles;
