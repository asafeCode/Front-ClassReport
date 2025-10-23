export default function Button({ 
    label = "", 
    loading = false 
}){
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        ...styles.button,
        ...(loading ? styles.buttonDisabled : {}),
      }}
    >
      {loading ? "Entrando..." : label}
    </button>
  );
}

const styles = {
  button: {
    backgroundColor: "#6a11cb",
    color: "#fff",
    border: "none",
    borderRadius: 25,
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
};
