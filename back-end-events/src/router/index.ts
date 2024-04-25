import express from "express";

import authentication from "./authentication";
import users from "./users";
import event from "./event";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  event(router);
  return router;
};
