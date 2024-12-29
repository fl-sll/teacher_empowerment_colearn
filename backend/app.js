require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./config/db.config.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger.config.js");

app.use(express.json());

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

require("./routes/course.routes.js")(app);
require("./routes/class.routes.js")(app);
require("./routes/session.routes.js")(app);
require("./routes/student.routes.js")(app);
require("./routes/sessionStudent.routes.js")(app);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    sequelize.sync().then(() => {
      app.listen(5000, () => {
        console.log("Server is running on port 5000");
      });
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
