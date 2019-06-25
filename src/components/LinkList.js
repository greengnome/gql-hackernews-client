import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag';

import Link from './Link';

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }`;

const LinkList = () => {

  const _updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY })

    const votedLink = data.feed.links.find(link => link.id === linkId)
    votedLink.votes = createVote.link.votes

    store.writeQuery({ query: FEED_QUERY, data })
  }

  return (
    <Query query={FEED_QUERY}>
      {
        ({ loading, error, data }) => {
          if (loading) return <div style={{ margin: 'auto', color: '#ccc' }}>Fetching...</div>
          if (error) return <div style={{ margin: 'auto', color: 'red' }}>Error :(</div>

          const linksToRender = data.feed.links

          return (
            <div>
              {linksToRender.map((link, index) => <Link key={link.id} link={link} index={index} updateStoreAfterVote={_updateCacheAfterVote}/>)}
            </div>
          )
        }
      }
    </Query>
  )
}

export default LinkList