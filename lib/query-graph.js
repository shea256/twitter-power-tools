export const queryGraph = async (
  db, tableName, limit=100, offset=0, sorter='followers_count', direction='ASC'
) => {
  const queryString = `SELECT id,name,username,followers_count,followees_count FROM ${tableName} ORDER BY ${sorter} ${direction} NULLS LAST LIMIT ${limit} OFFSET ${offset}`

  const { rows } = await db.query(queryString)

  return rows
}