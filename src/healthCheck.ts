export const healthCheck = (express) => {
  express.use("/health_check", (req, res) => {
    res.status(200).send("1.0.0");
  });
};
