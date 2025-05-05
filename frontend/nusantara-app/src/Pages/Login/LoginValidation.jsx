function Validation(values){
    let error = {};
    const password_pattern =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.username === ""){
        error.username = "Username must not be empty";
    }
    else {
        error.username = "";
    }
    if (values.password === ""){
        error.password = "Password must not be empty";
    } else if(!password_pattern.test(values.password)){
        error.password = "Password must contain at least one uppercase, one lowercase, one number and more than 8 characters."
    }
    else {
        error.password = "";
    }
    return error;
}
export default Validation;