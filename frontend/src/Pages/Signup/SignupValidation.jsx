function SignUpValidation(values){
    let error = {};
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (values.username === ""){
        error.username = "Username must not be empty";
    } else if (values.username.length < 3) {
        error.username = "Username must be at least 3 characters long";
    } else {
        error.username = "";
    }

    if (values.email === ""){
        error.email = "Email must not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Please enter a valid email address";
    } else {
        error.email = "";
    }

    if (values.password === ""){
        error.password = "Password must not be empty";
    } else if(!password_pattern.test(values.password)){
        error.password = "Password must contain at least one uppercase, one lowercase, one number and more than 8 characters.";
    } else {
        error.password = "";
    }

    if (values.confirmPassword === ""){
        error.confirmPassword = "Please confirm your password";
    } else if (values.password !== values.confirmPassword) {
        error.confirmPassword = "Passwords do not match";
    } else {
        error.confirmPassword = "";
    }

    if (values.fullName && values.fullName.length < 2) {
        error.fullName = "Full name must be at least 2 characters long";
    } else {
        error.fullName = "";
    }

    return error;
}

export default SignUpValidation;