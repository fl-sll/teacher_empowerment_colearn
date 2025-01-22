require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./config/db.config.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger.config.js");
const cors = require("cors");

const port = process.env.BE_PORT;
// console.log(port);

app.use(express.json());
// app.use(cors());

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(
  cors({
    // ! CHANGE TO FRONTEND LINK
    origin: process.env.FE_LINK,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
require("./routes/metrics.routes.js")(app);
require("./routes/course.routes.js")(app);
require("./routes/class.routes.js")(app);
require("./routes/session.routes.js")(app);
require("./routes/student.routes.js")(app);
require("./routes/sessionStudent.routes.js")(app);
require('./routes/slack.routes.js')(app);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    sequelize.sync().then(() => {
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
