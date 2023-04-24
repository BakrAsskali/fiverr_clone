import { createBoard } from '@wixc3/react-board';
import { Freelancer } from '../../../pages/freelancer/freelancer';

export default createBoard({
    name: 'Freelancer',
    Board: () => <Freelancer />
});
