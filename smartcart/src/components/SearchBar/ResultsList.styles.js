const styles = {
  container: {
    backgroundColor: "#ffffff",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    padding: "10px",
    width: "100%",
    maxHeight: "300px",
    overflowY: "scroll",
    // Apply a mask for the rounded corners
    maskImage: "linear-gradient(to bottom, black 0%, black 100%)",
    maskSize: "100% 100%",
    maskRepeat: "no-repeat",
    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 100%)", // For Safari
    WebkitMaskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    color: "black",
  },
};

export default styles;
