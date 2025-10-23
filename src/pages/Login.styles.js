const styles = {
    container: {
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #e3eaf8, #f7f8fc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
    },

    card: {
        width: "850px",
        height: "500px",
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        display: "flex",
        overflow: "hidden",
    },

    leftPanel: {
        flex: 1,
        padding: "60px 50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },

    rightPanel: {
        flex: 1,
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
        borderTopLeftRadius: "120px",
        borderBottomLeftRadius: "120px",
    },

    title: {
        fontSize: "26px",
        fontWeight: "700",
        marginBottom: "30px",
        color: "#333",
    },

    form: {
        width: "100%",
        maxWidth: "320px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    error: {
        color: "#ff6b6b",
        fontSize: 14,
        marginTop: 10,
        textAlign: "center",
    },
    welcome: {
        fontSize: "28px",
        fontWeight: "700",
        marginBottom: "10px",
    },
    text: {
        textAlign: "center",
        maxWidth: "280px",
        fontSize: "16px",
        lineHeight: "1.5",
    },
};
export default styles;
