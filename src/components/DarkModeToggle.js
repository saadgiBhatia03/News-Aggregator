import React, { Component } from "react";

export class DarkModeToggle extends Component {
  render() {
    // Access the props passed from the parent
    const { isDarkMode, toggleMode } = this.props;

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "5vh",
          transition: "background 0.5s ease",
        }}
      >
        {/* Toggle button */}
        <div
          style={{
            position: "relative",
            width: "50px", // Adjusted width
            height: "25px", // Adjusted height
            background: isDarkMode ? "#222" : "#ccc",
            borderRadius: "15px", // Adjusted for smaller dimensions
            boxShadow: isDarkMode
              ? "0 0 10px #ffcc00, inset 0 0 7px #ffcc00"
              : "inset 0 0 3px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
          }}
          onClick={toggleMode} // Trigger the toggleMode function when clicked
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: isDarkMode ? "calc(100% - 20px)" : "3px", // Adjusted for dark mode
              transform: "translateY(-50%)",
              width: "20px", // Adjusted circle size
              height: "20px", // Adjusted circle size
              background: "#fff", // White circle for toggle
              borderRadius: "50%",
              transition: "left 0.3s ease",
            }}
          ></div>
        </div>

        {/* Label for the toggle */}
        <span
          style={{
            marginLeft: "10px", // Add spacing between toggle and label
            fontSize: "14px",
            color: isDarkMode ? "#ffcc00" : "white",
            transition: "color 0.3s ease",
          }}
        >
          {isDarkMode ? "Dark mode" : "Light mode"}
        </span>
      </div>
    );
  }
}

export default DarkModeToggle;
