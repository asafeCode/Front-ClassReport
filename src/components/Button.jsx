export default function Button({ 
    label = "Button", 
    onClick = () => {}, 
    loading = false 
}){
  return (
    <button
      type="submit"
      onClick={onClick}
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
