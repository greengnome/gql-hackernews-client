import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import Link from './Link';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
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
  }
`

const Search = ({ client }) => {
    const [filter, setFilter] = useState('');
    const [links, setLinks] = useState([]);

    const _executeSearch = async () => {
        const result = await client.query({
          query: FEED_SEARCH_QUERY,
          variables: filter,
        })
        const fetchedLinks = result.data.feed.links
        setLinks(fetchedLinks)
    }

    return (
        <div style={{padding: '15px'}}>
            <div>
                <input type='text' 
                    onChange={e => setFilter({ filter: e.target.value })} />
                <button onClick={() => _executeSearch()}>Search</button>
            </div>
            {links.map((link, index) => (
                <Link key={link.id} link={link} index={index} />
            ))}
        </div>
    )
}

export default withApollo(Search);
