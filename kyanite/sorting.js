import concat from 'kyanite/concat'
import values from 'kyanite/values'
import groupBy from 'kyanite/groupBy'
import partition from 'kyanite/partition'
import path from 'kyanite/path'
import pipe from 'kyanite/pipe'
import reduce from 'kyanite/reduce'
import sortBy from 'kyanite/sortBy'

export default list => {
  // Partition out rank 0 so they don't get inserted at the top
  const [noRank, ranked] = partition(x => x.rank === 0, sortBy(x => x.rank, list))
  const safeWaste = path(['waste_type', 'name'])
  const safeSize = path(['size', 'name'])

  return concat([
    pipe([
      groupBy(x => x.rank),
      values,
      reduce((acc, data) => concat([acc, sortBy(x => safeWaste(x), data)]), []),
      groupBy(x => safeWaste(x)),
      values,
      reduce((acc, data) => concat([acc, sortBy(x => parseInt(safeSize(x), 10), data)]), []),
      groupBy(x => safeSize(x)),
      values,
      reduce((acc, data) => concat([acc, sortBy(x => x.rank, data)]), [])
    ], ranked),
    noRank
  ])
}
