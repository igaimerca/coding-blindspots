import {render} from '@testing-library/react'
import Featured from './index';
 
describe('Featured Component test', () => {
    it('rendered input', () => {
        const {getByTestId} = render(<Featured />)
        const commentNum = getByTestId('commentNumber')
        expect(commentNum).toBeTruthy();
    })
})