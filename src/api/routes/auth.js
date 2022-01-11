import Container from "typedi";

import { Router } from "express";
import { Types } from "mongoose";

import { Authentication, Responses } from "../middleware";

const router = Router();

const authRoutes = (api) => {
  api.use("/auth", router);

  router.post("/login", Authentication.passportLocal, Responses.Auth.login);

  router.get("/who", Authentication.authWall(), Responses.Auth.me);
};

export default authRoutes;
