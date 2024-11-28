async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const result = await response.json();
    return result.data;
  } catch (e) {
    console.error('Error fetching data:', e);
  }
}

class ActivityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activities: [] };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `
      query {
        activitiesList {
          id title venue date startTime endTime
          fee maxPlayers currentPlayers status
        }
      }
    `;
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ activities: data.activitiesList });
    }
  }

  render() {
    const { activities } = this.state;
    return (
      <div>
        <h1>Badminton Activity List</h1>
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
                <td>{activity.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// 使用全局变量的方式渲染
const element = <ActivityList />;
ReactDOM.render(element, document.getElementById('contents'));