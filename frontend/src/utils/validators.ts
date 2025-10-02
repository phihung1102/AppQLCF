export const validateEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    if(!email) return "Email không được để trống!";
    if(!regex.test(email)) return "Email không hợp lệ";
    return "";
};

export const validatePassword = (password: string) => {
    if(!password) return "Mật khẩu không được để trống!";
    if(password.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự!";
    if(!/[A-Z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ in hoa!";
    if(!/[a-z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ thường!";
    if(!/[0-9]/.test(password)) return "Mật khẩu phải có ít nhất 1 số!";
    if(!/[!@#$%^&*]/.test(password)) return "Mật khẩu phải có ít nhất 1 ký tự đặc biệt!";
    return "";
};

export const validateName = (name: string) => {
    if(!name) return "Tên tài khoản không được để trống!";
    if (name.length < 2) return "Tên tài khoản phải có ít nhất 2 ký tự";
    return "";
}

// user
export const validateFullname = (fullname: string) => {
  if (!fullname) return "Họ và tên không được để trống!";
  if (fullname.length < 5) return "Họ và tên phải có ít nhất 5 ký tự";
  return "";
};

export const validatePhone = (phone: string) => {
  if (!phone) return "Số điện thoại không được để trống!";
  const regex = /^[0-9]{10}$/;
  if (!regex.test(phone)) {
    return "Số điện thoại phải có đúng 10 chữ số!";
  }
  return "";
};


export const validateGender = (gender: string) => {
  if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
    return "Giới tính không hợp lệ!";
  }
  return "";
};

export const validateAddress = (address: string) => {
  if (address && address.length < 5) {
    return "Địa chỉ quá ngắn!";
  }
  return "";
};
