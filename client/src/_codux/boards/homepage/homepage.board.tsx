import { createBoard } from '@wixc3/react-board';
import { Homepage } from '../../../pages/homepage/homepage';

export default createBoard({
    name: 'Homepage',
    Board: () => <Homepage />,
    environmentProps: {
        canvasWidth: 1162,
    },
});
