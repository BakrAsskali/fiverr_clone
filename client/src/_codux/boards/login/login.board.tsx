import { createBoard } from '@wixc3/react-board';
import { Login } from '../../../pages/login/login';

export default createBoard({
    name: 'Login',
    Board: () => <Login />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080,
    },
});
