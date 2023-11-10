const error = (err, req, res, next) => {
    const statusCode = res.status ? res.statusCode : 500;
    console.log("statuscode",statusCode)
  
    res.status(statusCode);
  
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
  };

  export default error
  