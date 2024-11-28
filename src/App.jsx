import React from 'react';
import ReactDOM from 'react-dom';
import ActivityList from './components/ActivityList';
import SkillLevelSelector from './components/SkillLevelSelector';
import { skillLevels } from './constants/skillLevels';
import ActivityAdd from './components/ActivityAdd';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: null,
      isEditingSkill: false,
      currentView: 'list'
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

  handleActivityAdded = () => {
    this.setState({ currentView: 'list' });
    if (this.activityList) {
      this.activityList.loadData();
    }
  };

  render() {
    const { authenticated, user, isEditingSkill, currentView } = this.state;

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
            {user && (
              <div>
                <div className="view-controls">
                  <button onClick={() => this.setState({ currentView: 'list' })}>
                    View Activities
                  </button>
                  <button onClick={() => this.setState({ currentView: 'add' })}>
                    Create New Activity
                  </button>
                </div>

                {isEditingSkill ? (
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
                ) : currentView === 'list' ? (
                  <ActivityList ref={node => { this.activityList = node; }} />
                ) : (
                  <ActivityAdd onActivityAdded={this.handleActivityAdded} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;