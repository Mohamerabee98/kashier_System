import connectDB from "./db/connect.js";
import authController from "./modules/auth/auth.controller.js";
const bootstrap = async (app, express) => {
  app.use(express.json());

   await connectDB()

     app.use("/auth", authController);
};
export default bootstrap;
