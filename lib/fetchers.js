import fetch from 'isomorphic-unfetch'

export const dbGraphFetcher = (url, dbString, twitterClient, table, limit, offset) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dbString,
      twitterClient,
      table,
      limit,
      offset
    })
  })
  .then(r => r.json())
