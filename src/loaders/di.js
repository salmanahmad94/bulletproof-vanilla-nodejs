import Container from "typedi";
import EventEmitter from "eventemitter3";

import Winston from "config/winston";

import BroadcastService from "../services/broadcast";
import SchedulerService from "../services/scheduler";
import AuthService from "../services/auth";

export default async (agenda) => {
  Container.set("Logger", Winston);
  Container.set("EventHandler", new EventEmitter());
  Container.set("BroadcastService", new BroadcastService());
  Container.set("SchedulerService", new SchedulerService(agenda));

  Container.set(
    "AuthService",
    new AuthService(require("db/models/user").default, Winston)
  );
};
