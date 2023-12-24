const error = (err, req, res, next) => {
    const statusCode = res.status ? res.statusCode : 500;
    console.log("statuscode",statusCode)
  
    res.json({message:err.message,status:statusCode,stack: process.env.NODE_ENV === "development" || "production" ? err.stack : null});
    next()
  };

  export default error
  