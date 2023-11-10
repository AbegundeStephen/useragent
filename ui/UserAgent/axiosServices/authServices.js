import axios from "axios";

export const serverUrl = "http://localhost:3000"

export const registerUser = async (userData) => {
    try{
      const response = await axios.post(`${serverUrl}/api/v1/useragent/users/register`,userData,{withCredentials:true})
      if (response.statusText === "OK") {
        console.log("User Registered Sucessfully")
      }
      return response.data
    }catch(err) {
        console.error(err.message)
    }
}

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${serverUrl}/api/v1/useragent/users/login`, userData);
    if (response.statusText === "OK") {
        console.log("Login Successful")
    }

    return response.data
  }catch(error) {
    console.log(error.message)
  }
}


export const logoutUser = async () => {
    try {
      await axios.get(`${serverUrl}/api/v1/useragent/users/logout`);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };
  
  // Forgot Password
  export const forgotPassword = async (userData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/v1/useragent/users/forgotpassword`,
        userData
      );
      toast.success(response.data.message);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };
  
  // Reset Password
  export const resetPassword = async (userData, resetToken) => {
    try {
      const response = await axios.put(
        `${serverUrl}/api/v1/useragent/users/resetpassword/${resetToken}`,
        userData
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };
  
  // Get Login Status
  export const getLoginStatus = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/v1/useragent/users/loggedin`);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };
  // Get User Profile
  export const getUser = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/v1/useragent/users/getuser`);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };
  // Update Profile
  export const updateUser = async (formData) => {
    try {
      const response = await axios.patch(
        `${serverUrl}/api/v1/useragent/users/updateuser`,
        formData
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };