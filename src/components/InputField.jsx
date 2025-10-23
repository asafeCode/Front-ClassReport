import{useState} from "react";

export default function InputField({
  type = "text",
  placeholder = "",
  value = "",
  onChange = () => {},
  icon: Icon = null,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={styles.inputGroup}>
      {Icon && <Icon style={styles.icon} />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...styles.input,
          ...(focused ? styles.inputFocus : {}),
        }}
        required
      />
    </div>
  );
}

const styles = {
  inputGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    left: 12,
    color: "#777",
    fontSize: 16,
  },
  input: {
    width: "100%",
    padding: "12px 12px 12px 35px",
    borderRadius: 25,
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    fontSize: 15,
    color: "#333",
    outline: "none",
    transition: "all 0.3s ease",
  },
  inputFocus: {
    borderColor: "#6a11cb",
    backgroundColor: "#fff",
    boxShadow: "0 0 5px rgba(106, 17, 203, 0.3)",
  },
};