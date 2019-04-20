import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { Button, Header, Grid, Divider, List, Form } from 'semantic-ui-react';
import TinyCalendar from './TinyCalendar';

export default class FilterDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }

  render() {
    const minDate = new Date(-8640000000000000);
    const maxDate = new Date(8640000000000000);
    const buttonStyle = {
      height: '100%',
      width: '100%',
      padding: 0,
      borderRadius: 0,
    };
    const calendarContainerStyle = {
      padding: 0,
    };
    const buttonContainerStyle = {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: '2px',
      paddingRight: 0,
    };
    const leftChevronStyle = {
      height: '100%',
      width: '100%',
      padding: 0,
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px',
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
    };
    const rightChevronStyle = {
      height: '100%',
      width: '100%',
      padding: 0,
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    };
    const style = {
      paddingLeft: '14px',
      paddingRight: '14px',
      marginTop: '5px',
      marginBottom: '30px',
    };
    if (this.props.dateCollapse) {
      style.display = 'none';
    }

    return (
        <List style={{ paddingLeft: '14px', paddingRight: '14px', marginTop: '14px', marginBottom: '14px' }}>
          <List.Item>
            <Header as="h4" style={{ display: 'inline-block', lineHeight: '35px' }}>Date</Header>
            <Button
                icon={this.props.dateCollapse ? 'plus' : 'minus'}
                floated="right"
                style={{
                  backgroundColor: 'Transparent',
                  paddingRight: 0,
                  margin: 0,
                }}
                onClick={this.props.toggleCollapse}
            />
          </List.Item>
          <List.Item style={style}>
            <Grid container style={{ marginBottom: '20px' }}>
              <Grid.Row style={{ display: 'inline-block', paddingBottom: '5px' }}>
                <Header as="h4" textAlign="center">
                  {`${dateFns.format(this.props.month, 'MMMM')}, ${dateFns.format(this.props.month, 'YYYY')}`}
                </Header>
              </Grid.Row>
              <Grid.Row style={calendarContainerStyle}>
                <Grid.Column width={2} style={buttonContainerStyle}>
                  <Button icon="chevron left"
                          style={leftChevronStyle}
                          onMouseEnter={this.props.pressPreviousMonth}
                          onMouseLeave={this.props.mouseLeaveChangeMonth}
                          onMouseUp={this.props.mouseUpChangeMonth}
                          onClick={() => this.props.changeMonth(-1)}/>
                </Grid.Column>
                <Grid.Column width={1} style={buttonContainerStyle}>
                  <Button style={buttonStyle}
                          onMouseDown={() => this.props.setFromDate(minDate)}
                          onMouseEnter={() => this.props.setToDate(minDate)}
                          fluid>
                    {'-\u221E'}
                  </Button>
                </Grid.Column>
                <Grid.Column width={10} style={{ padding: '13px' }}>
                  <TinyCalendar month={this.props.month}
                                isInRange={this.props.isInRange}
                                endDate={this.props.endDate}
                                startDate={this.props.startDate}
                                setFromDate={this.props.setFromDate}
                                setToDate={this.props.setToDate}/>
                </Grid.Column>
                <Grid.Column width={1} style={buttonContainerStyle}>
                  <Button style={buttonStyle}
                          onMouseDown={() => this.props.setFromDate(maxDate)}
                          onMouseEnter={() => this.props.setToDate(maxDate)}
                          fluid>
                    {'\u221E'}
                  </Button>
                </Grid.Column>
                <Grid.Column width={2} style={buttonContainerStyle}>
                  <Button icon="chevron right"
                          style={rightChevronStyle}
                          onMouseEnter={this.props.pressNextMonth}
                          onMouseLeave={this.props.mouseLeaveChangeMonth}
                          onMouseUp={this.props.mouseUpChangeMonth}
                          onClick={() => this.props.changeMonth(1)}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Form onSubmit={this.props.handleDateSubmit}>
              <Form.Group>
                <Form.Input label="From"
                            placeholder={'mm/dd/yyyy'}
                            name="startDateText"
                            value={this.props.startDateText}
                            onChange={this.props.handleChange}
                            width={8}/>
                <Form.Input label="To"
                            placeholder={'mm/dd/yyyy'}
                            name="endDateText"
                            value={this.props.endDateText}
                            onChange={this.props.handleChange}
                            width={8}/>
              </Form.Group>
              <Form.Button style={{ display: 'none' }}></Form.Button>
            </Form>
          </List.Item>
        </List>
    );
  }
}

FilterDate.propTypes = {
  toggleCollapse: PropTypes.func.isRequired,
  dateCollapse: PropTypes.bool.isRequired,
  month: PropTypes.object.isRequired,
  isInRange: PropTypes.func.isRequired,
  setToDate: PropTypes.func.isRequired,
  setFromDate: PropTypes.func.isRequired,
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  pressPreviousMonth: PropTypes.func.isRequired,
  pressNextMonth: PropTypes.func.isRequired,
  mouseUpChangeMonth: PropTypes.func.isRequired,
  mouseLeaveChangeMonth: PropTypes.func.isRequired,
  changeMonth: PropTypes.func.isRequired,
  startDateText: PropTypes.string.isRequired,
  endDateText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDateSubmit: PropTypes.func.isRequired,
};
