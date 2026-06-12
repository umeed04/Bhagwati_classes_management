import React from "react"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer style={styles.footer} className="bg-light">
      © {year} BI. All Rights Reserved.
    </footer>
  )
}

const styles = {
  footer: {
    color: "#111",
    textAlign: "center",
    padding: "10px"
    
  }
}

export default Footer