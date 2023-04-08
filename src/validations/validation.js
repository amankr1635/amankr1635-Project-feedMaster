
const isValidEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  const passwordVal = function (password) {
    var strongRegex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/
    );
    /*at least 1 lowercase, at least 1 uppercase,contain at least 1 numeric character,
        at least one special character, range between 8-15*/
    return strongRegex.test(password);
  
  };

  const isValidNo = function (number) {
    const validnumber = /^[6789]\d{9}$/
    return validnumber.test(number);
  };

  module.exports = {isValidEmail,passwordVal,isValidNo}