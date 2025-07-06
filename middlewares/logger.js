export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Important pour passer à la suite
};
