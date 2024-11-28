import React from 'react';
import graphQLFetch from '../utils/graphQLFetch';

class ActivityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activities: [] };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const query = `
      query {
        activitiesList {
          id title venue date startTime endTime
          fee maxPlayers currentPlayers status
          minSkillLevel maxSkillLevel
        }
      }
    `;
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ activities: data.activitiesList });
    }
  };

  render() {
    const { activities } = this.state;
    return (
      <div>
        <h1>Badminton Activities</h1>
        <table className="bordered-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Time</th>
              <th>Fee</th>
              <th>Players</th>
              <th>Skill Level</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity.id}>
                <td>{activity.id}</td>
                <td>{activity.title}</td>
                <td>{activity.venue}</td>
                <td>{activity.date}</td>
                <td>{activity.startTime}-{activity.endTime}</td>
                <td>${activity.fee}</td>
                <td>{activity.currentPlayers}/{activity.maxPlayers}</td>
                <td>{activity.minSkillLevel} - {activity.maxSkillLevel}</td>
                <td>{activity.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ActivityList;
