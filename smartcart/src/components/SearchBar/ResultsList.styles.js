const styles = {
  container: {
    backgroundColor: "#ffffff",
    position: "absolute",
    top: "100%", // Align the top of the container with the bottom of the SearchInput
    left: 0,
    right: 0,
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    maxHeight: "300px",
    width: "100%", // Adjust this if you need the width to match the SearchInput specifically
    maxWidth: "700px", // Ensure this matches the width of the SearchInput if necessary
    overflowY: "scroll",
    // Apply a mask for the rounded corners
    maskImage: "linear-gradient(to bottom, black 0%, black 100%)",
    maskSize: "100% 100%",
    maskRepeat: "no-repeat",
    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 100%)", // For Safari
    WebkitMaskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D9D9D9",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    color: "black",
  },
};

export default styles;
