import Container from "typedi";

import { events } from "declarations";

export default class BroadcastService {
  constructor() {
    this.publisher = Container.get("EventHandler");
  }

  login = (user) => {
    this.publisher.emit(events.auth.LOGIN, { user });
  };
}
