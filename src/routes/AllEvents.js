import _ from 'lodash'
import React, { Component } from 'react'
import LazyLoad from 'react-lazyload'

import { ALL_PARTIES_QUERY } from '../graphql/queries'
import EventCard from '../components/EventList/EventCard'
import EventCardGrid from '../components/EventList/EventCardGrid'
import Loader from '../components/Loader'
import SafeQuery from '../components/SafeQuery'
import { getPartyImage } from '../utils/parties'

class AllEvents extends Component {
  _renderLoading = () => <Loader large />

  render() {
    return (
      <>
        <h2>All events</h2>
        <SafeQuery
          query={ALL_PARTIES_QUERY}
          isLoading={result => !_.get(result, 'data.parties')}
          renderLoading={this._renderLoading}
        >
          {({ data: { parties } }) => {
            return (
              <EventCardGrid>
                {parties.map(party => {
                  party.headerImg = getPartyImage(party.headerImg)
                  return <EventCard party={party} key={party.id} />
                })}
              </EventCardGrid>
            )
          }}
        </SafeQuery>
      </>
    )
  }
}

export default AllEvents
