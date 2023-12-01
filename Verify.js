// export default verifyToken = (req, res, next) => {
//     const token = req.headers['Authorization'];
  
//     if (!token) {
//       return res.status(403).json({ message: 'No token provided' });
//     }
  
//     jwt.verify(token, secretKey, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Failed to authenticate token' });
//       }
  
//       req.user = decoded;
//       next();
//     });
//   };