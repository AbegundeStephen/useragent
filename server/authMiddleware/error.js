const error = (err, req, res, next) => {
    const statusCode = res.status ? res.statusCode : 500;
    console.log("statuscode",statusCode)
  
    res.status(statusCode);
    console.log("error: "+ err.message)
    const stack =  process.env.NODE_ENV === "development" ? err.stack : null
    console.log("stack: "+ stack)

  };

  export default error
  