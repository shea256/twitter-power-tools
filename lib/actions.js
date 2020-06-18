import { useSelector, useDispatch } from 'react-redux'

export const useTwitterClient = () => {
  const twitterClient = useSelector(state => state.twitterClient)
  const dispatch = useDispatch()
  const setTwitterClient = ({
    consumerKey, consumerSecret, accessToken, accessTokenSecret
  }) => {

    let newTwitterClient = Object.assign({}, twitterClient)
    if (consumerKey !== undefined) {
      newTwitterClient = Object.assign({}, newTwitterClient, { consumerKey })
    }
    if (consumerSecret !== undefined) {
      newTwitterClient = Object.assign({}, newTwitterClient, { consumerSecret })
    }
    if (accessToken !== undefined) {
      newTwitterClient = Object.assign({}, newTwitterClient, { accessToken })
    }
    if (accessTokenSecret !== undefined) {
      newTwitterClient = Object.assign({}, newTwitterClient, { accessTokenSecret })
    }

    dispatch({
      type: 'SET_TWITTER_CLIENT',
      twitterClient: newTwitterClient
    })
  }

  return [twitterClient, setTwitterClient]
}

export const useDatabase = () => {
  const database = useSelector(state => state.database)
  const dispatch = useDispatch()
  const setDatabase = ({ string, redis /*, postgresql*/ }) => {
    let newDatabase = Object.assign({}, database)
    if (string !== undefined) {
      newDatabase = Object.assign({}, newDatabase, { string })
    }
    if (redis !== undefined) {
      newDatabase = Object.assign({}, newDatabase, { redis })
    }
    /*if (postgresql !== undefined) {
      newDatabase = Object.assign({}, newDatabase, { postgresql })
    }*/
    dispatch({
      type: 'SET_DATABASE',
      database: newDatabase,
    })
  }

  return [database, setDatabase]
}

export const useTwitterUsername = () => {
  const twitterUsername = useSelector(state => state.twitterUsername)
  const dispatch = useDispatch()
  const setTwitterUsername = (twitterUsername) => {
    dispatch({
      type: 'SET_TWITTER_USERNAME',
      twitterUsername,
    })
  }

  return [twitterUsername, setTwitterUsername]
}

export const useQuerySettings = () => {
  const querySettings = useSelector(state => state.querySettings)
  const dispatch = useDispatch()
  const setQuerySettings = ({ cursor, limit, offset }) => {
    let newQuerySettings = Object.assign({}, querySettings)
    if (cursor !== undefined) {
      newQuerySettings = Object.assign({}, newQuerySettings, { cursor })
    }
    if (limit !== undefined) {
      newQuerySettings = Object.assign({}, newQuerySettings, { limit })
    }
    if (offset !== undefined) {
      newQuerySettings = Object.assign({}, newQuerySettings, { offset })
    }
    dispatch({
      type: 'SET_QUERY_SETTINGS',
      querySettings: newQuerySettings,
    })
  }

  return [querySettings, setQuerySettings]
}

/*export const useTwitterConsumerKey = () => {
  const twitterClient = useSelector(state => state.twitterClient)
  const dispatch = useDispatch()
  
  const setTwitterConsumerKey = (consumerKey) => {
    dispatch({
      type: 'SET_TWITTER_CLIENT',
      twitterClient: Object.assign({}, twitterClient, { consumerKey })
    })
  }

  const twitterConsumerKey = twitterClient.consumerKey
  return [twitterConsumerKey, setTwitterConsumerKey]
}

export const useTwitterConsumerSecret = () => {
  const twitterClient = useSelector(state => state.twitterClient)
  const dispatch = useDispatch()
  
  const setTwitterConsumerSecret = (consumerSecret) => {
    dispatch({
      type: 'SET_TWITTER_CLIENT',
      twitterClient: Object.assign({}, twitterClient, { consumerSecret })
    })
  }

  const twitterConsumerSecret = twitterClient.consumerSecret
  return [twitterConsumerSecret, setTwitterConsumerSecret]
}*/
