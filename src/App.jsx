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

class SkillLevelSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLevel: props.currentLevel || ''
    };
  }

  async handleSkillLevelChange(level) {
    try {
      const mutation = `
        mutation UpdateSkillLevel($skillLevel: String!) {
          updateUserSkillLevel(skillLevel: $skillLevel) {
            googleId
            skillLevel
          }
        }
      `;
      
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'credentials': 'include'
        },
        body: JSON.stringify({
          query: mutation,
          variables: { skillLevel: level }
        })
      });
      
      const result = await response.json();
      if (!result.errors) {
        this.setState({ selectedLevel: level });
        if (this.props.onSkillLevelChange) {
          this.props.onSkillLevelChange(level);
        }
      } else {
        console.error('GraphQL errors:', result.errors);
      }
    } catch (error) {
      console.error('Error updating skill level:', error);
    }
  }

  render() {
    const skillLevels = [
      { id: 'low_beginner', label: 'Low Beginners', description: 'Just started playing, learning to serve and hit shuttles accurately.' },
      { id: 'mid_beginner', label: 'Mid Beginners', description: 'Able to accurately hit shuttles consistently but not able to clear and smash.' },
      { id: 'high_beginner', label: 'High Beginners', description: 'Able to clear, smash and play net but unable to cover all corners of court and inconsistent in shots.' },
      { id: 'low_intermediate', label: 'Low Intermediate', description: 'Achieved certain level of consistency in play with regards to smash, clear and net. Able to do basic strategies in game and cover all corners of court.' },
      { id: 'mid_intermediate', label: 'Mid Intermediate', description: 'Able to place shots strategically with smash and cross-net accuracy, consistency in drop shots and clears.' },
      { id: 'high_intermediate', label: 'High Intermediate - Advance', description: 'Used to play competitively either at zone or international level with high level of stamina.' }
    ];

    return (
      <div className="skill-level-selector">
        <h3>Select Your Skill Level</h3>
        <div className="skill-levels">
          {skillLevels.map(level => (
            <div 
              key={level.id} 
              className={`skill-level-card ${this.state.selectedLevel === level.id ? 'selected' : ''}`}
              onClick={() => this.handleSkillLevelChange(level.id)}
            >
              <h4>{level.label}</h4>
              <p>{level.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: null,
      isEditingSkill: false
    };
  }

  componentDidMount() {
    this.checkAuthStatus();
  }

  async checkAuthStatus() {
    try {
      const response = await fetch('/api/auth/status');
      const data = await response.json();
      this.setState({
        authenticated: data.authenticated,
        user: data.user
      });
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  }

  async handleLogout(e) {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/logout');
      if (response.ok) {
        this.setState({
          authenticated: false,
          user: null
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  render() {
    const { authenticated, user } = this.state;
    const skillLevels = [
      { id: 'low_beginner', label: 'Low Beginners', description: 'Just started playing, learning to serve and hit shuttles accurately.' },
      { id: 'mid_beginner', label: 'Mid Beginners', description: 'Able to accurately hit shuttles consistently but not able to clear and smash.' },
      { id: 'high_beginner', label: 'High Beginners', description: 'Able to clear, smash and play net but unable to cover all corners of court and inconsistent in shots.' },
      { id: 'low_intermediate', label: 'Low Intermediate', description: 'Achieved certain level of consistency in play with regards to smash, clear and net. Able to do basic strategies in game and cover all corners of court.' },
      { id: 'mid_intermediate', label: 'Mid Intermediate', description: 'Able to place shots strategically with smash and cross-net accuracy, consistency in drop shots and clears.' },
      { id: 'high_intermediate', label: 'High Intermediate - Advance', description: 'Used to play competitively either at zone or international level with high level of stamina.' }
    ];

    return (
      <div>
        {!authenticated ? (
          <div className="login-section">
            <h2>Please log in to continue</h2>
            <a href="/auth/google" className="google-login-btn">
              Login with Google
            </a>
          </div>
        ) : !user?.skillLevel ? (
          <div className="skill-selection-section">
            <h2>Please Select Your Badminton Skill Level</h2>
            <p>Please select your skill level before continuing</p>
            <SkillLevelSelector 
              currentLevel={user?.skillLevel}
              onSkillLevelChange={(level) => {
                const updatedUser = { ...this.state.user, skillLevel: level };
                this.setState({ user: updatedUser });
              }}
            />
          </div>
        ) : (
          <div className="user-section">
            <div className="user-header">
              <div className="user-info">
                <p>Welcome, {user?.displayName}</p>
                <div className="skill-level-info">
                  <p>Current Level: {skillLevels.find(level => level.id === user?.skillLevel)?.label}</p>
                  <button 
                    className="edit-skill-btn"
                    onClick={() => this.setState({ isEditingSkill: true })}
                  >
                    Edit Level
                  </button>
                </div>
              </div>
              <a href="#" onClick={this.handleLogout.bind(this)} className="logout-btn">
                Logout
              </a>
            </div>
            {this.state.isEditingSkill ? (
              <div className="edit-skill-section">
                <h3>Update Your Badminton Skill Level</h3>
                <SkillLevelSelector 
                  currentLevel={user?.skillLevel}
                  onSkillLevelChange={(level) => {
                    const updatedUser = { ...this.state.user, skillLevel: level };
                    this.setState({ 
                      user: updatedUser,
                      isEditingSkill: false 
                    });
                  }}
                />
                <button 
                  className="cancel-edit-btn"
                  onClick={() => this.setState({ isEditingSkill: false })}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <ActivityList />
            )}
          </div>
        )}
      </div>
    );
  }
}

// 使用全局变量的方式渲染
const element = <App />;
ReactDOM.render(element, document.getElementById('contents'));