export const queryGraph = async (
  db, tableName, limit=100, offset=0, sorter='followers_count', direction='ASC'
) => {
  const queryString = `
  SELECT id,name,username,followers_count,followees_count,
    count(*) OVER() AS full_count,
    count(CASE WHEN username <> '' THEN 1 END) OVER() AS resolved_count
  FROM ${tableName}
  ORDER BY ${sorter} ${direction} NULLS LAST
  LIMIT ${limit}
  OFFSET ${offset}`

  const { rows } = await db.query(queryString)

  const count = rows.length ? rows[0].full_count : 0

  const resolvedCount = rows.length ? rows[0].resolved_count : 0

  return {
    users: rows,
    count,
    resolvedCount
  }
}