const styles = {
  container: {
    padding: "12px",
    cursor: "pointer",
    display: "flex",
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  },
  containerHovered: {
    // Define hover styles here
    backgroundColor: "#f0f0f0",
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
  image: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
};

export default styles;
