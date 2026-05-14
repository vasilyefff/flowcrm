import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/app/store'
import { addDeal } from '@/entities/deal/model/dealSlice'
import { DealList } from './DealList'

export const DealsPage = () => {
  const deals = useSelector((state: RootState) => state.deals.items)

  const dispatch = useDispatch()

  return (
    <div>
      <h1>{deals.length}</h1>

      <DealList deals={deals} />

      <button
        onClick={() =>
          dispatch(
            addDeal({
              title: 'Test deal',
              clientId: '1',
              value: 5000,
              stage: 'lead',
              comment: 'Test comment',
            }),
          )
        }
      >
        Add test deal
      </button>
    </div>
  )
}
