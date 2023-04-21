import { createBoard } from '@wixc3/react-board';
import { Signup } from '../../../pages/signup/signup';

export default createBoard({
    name: 'Signup',
    Board: () => <Signup />,
    environmentProps: {
        canvasWidth: 1444,
        canvasHeight: 569,
        windowWidth: 1920,
        windowHeight: 1080,
    },
});
