import { createBoard } from '@wixc3/react-board';
import { Navbar } from '../../../components/navbar/navbar';

export default createBoard({
    name: 'Navbar',
    Board: () => <Navbar />,
    environmentProps: {
        canvasWidth: 1945,
        canvasHeight: 1092,
        windowWidth: 1920,
        windowHeight: 1080,
    },
});
