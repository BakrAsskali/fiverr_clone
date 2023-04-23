import { createBoard } from "@wixc3/react-board";
import { Client } from "../../../pages/client/client";

export default createBoard({
  name: "Client",
  Board: () => <Client />,
});
