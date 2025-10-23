const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #4A00E0, #8E2DE2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif",
    color: "#fff",
    padding: "40px 20px",
    boxSizing: "border-box",
  },

  header: {
    width: "100%",
    maxWidth: "950px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },

  title: {
    fontSize: "1.8rem",
    fontWeight: 700,
  },

  logoutBtn: {
    background: "#FF4B2B",
    color: "#fff",
    border: "none",
    padding: "10px 22px",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: 500,
    transition: "all 0.3s ease",
  },

  logoutBtnHover: {
    background: "#ff6b4b",
  },

  card: {
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
    padding: "40px 50px",
    width: "100%",
    maxWidth: "950px",
    boxSizing: "border-box",
    transition: "transform 0.3s ease",
  },

  cardHover: {
    transform: "translateY(-4px)",
  },

  cardTitle: {
    color: "#4A00E0",
    fontSize: "1.6rem",
    fontWeight: 700,
    marginBottom: "12px",
  },

  cardText: {
    color: "#555",
    fontSize: "1rem",
    marginBottom: "25px",
    lineHeight: 1.6,
  },

  message: {
    marginBottom: "20px",
    fontWeight: 500,
  },

  errorMsg: {
    color: "#e63946",
  },

  successMsg: {
    color: "#2ecc71",
  },

  list: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  listItem: {
    backgroundColor: "#f5f5f5",
    padding: "15px 20px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "all 0.3s ease",
  },

  listItemHover: {
    backgroundColor: "#ececec",
  },

  generateBtn: {
    background: "linear-gradient(135deg, #4A00E0, #8E2DE2)",
    border: "none",
    color: "#fff",
    borderRadius: "25px",
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: 500,
    transition: "all 0.3s ease",
  },

  reportBox: {
    marginTop: "30px",
    backgroundColor: "#fafafa",
    borderRadius: "10px",
    padding: "20px",
    border: "1px solid #ddd",
  },

  reportTitle: {
    color: "#4A00E0",
    fontSize: "1.2rem",
    fontWeight: 600,
    marginBottom: "10px",
  },

  reportOutput: {
    backgroundColor: "#000",
    color: "#0f0",
    padding: "12px",
    borderRadius: "6px",
    maxHeight: "300px",
    overflowY: "auto",
    fontFamily: "monospace",
    fontSize: "14px",
    whiteSpace: "pre-wrap",
  },

  copyBtn: {
    marginTop: "12px",
    background: "#4A00E0",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "0.3s",
  },

  footer: {
    marginTop: "50px",
    textAlign: "center",
    fontSize: "0.9rem",
    opacity: 0.8,
  },

  /* Responsividade */
  "@media (maxWidth: 992px)": {
    card: {
      padding: "30px",
    },
  },

  "@media (maxWidth: 768px)": {
    header: {
      flexDirection: "column",
      gap: "1rem",
      textAlign: "center",
    },
    card: {
      padding: "25px",
    },
    listItem: {
      flexDirection: "column",
      gap: "0.8rem",
      textAlign: "center",
    },
  },

  "@media (maxWidth: 480px)": {
    title: {
      fontSize: "1.4rem",
    },
    generateBtn: {
      width: "100%",
    },
    logoutBtn: {
      width: "100%",
    },
    copyBtn: {
      width: "100%",
    },
  },
};

export default styles;
