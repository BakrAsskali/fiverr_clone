import { createBoard } from "@wixc3/react-board";
import { App } from "../../../App";

export default createBoard({
  name: "App",
  Board: () => <App />,
  environmentProps: {
    canvasHeight: 638,
    canvasWidth: 1033,
    windowWidth: 1024,
  },
});
