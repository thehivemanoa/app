import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const _ = require('underscore');

export default class SearchResults extends React.Component {
  render() {
    const iteratee = function (session) {
      const startTime = session.startTime;
      const endTime = session.endTime;
      const formattedStartTime = `${dateFns.format(startTime, 'h')}:${dateFns.format(startTime, 'mm')}` +
          ` ${dateFns.format(startTime, 'a')}`;
      const formattedEndTime = `${dateFns.format(endTime, 'h')}:${dateFns.format(endTime, 'mm')}` +
          ` ${dateFns.format(endTime, 'a')}`;
      const formattedDate = `${dateFns.format(startTime, 'M')}-${dateFns.format(startTime, 'D')}-` +
          `${dateFns.format(startTime, 'YY')}`;
      return (
          <Table.Row key={`${session.owner}: ${session.title}`}>
            <Table.Cell>{session.title}</Table.Cell>
            <Table.Cell>{session.course}</Table.Cell>
            <Table.Cell>{formattedDate}</Table.Cell>
            <Table.Cell>{formattedStartTime}</Table.Cell>
            <Table.Cell>{formattedEndTime}</Table.Cell>
            <Table.Cell>0</Table.Cell>
            <Table.Cell>1</Table.Cell>
           </Table.Row>
      );
    };

    const sessions = _.map(this.props.sessions, iteratee);

    return (
        <Table singleLine fluid>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Course</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Start Time</Table.HeaderCell>
              <Table.HeaderCell>End Time</Table.HeaderCell>
              <Table.HeaderCell>Worker Bees</Table.HeaderCell>
              <Table.HeaderCell>Royal Bees</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sessions}
          </Table.Body>
        </Table>
    );
  }
}

SearchResults.propTypes = {
  sessions: PropTypes.array.isRequired,
};
