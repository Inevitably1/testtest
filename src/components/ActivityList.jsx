import React from 'react';
import graphQLFetch from '../utils/graphQLFetch';
import './ActivityList.css';

class ActivityList extends React.Component {
  state = { activities: [] };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const query = `query {
      activitiesList {
        id title venue date startTime endTime
        fee maxPlayers currentPlayers status
        minSkillLevel maxSkillLevel
      }
    }`;
    
    const data = await graphQLFetch(query);
    if (data) {
      // 按日期和时间排序
      const sortedActivities = data.activitiesList.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.startTime}`);
        const dateB = new Date(`${b.date} ${b.startTime}`);
        return dateA - dateB;
      });
      this.setState({ activities: sortedActivities });
    }
  };

  formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'upcoming': return 'status-upcoming';
      case 'full': return 'status-full';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  render() {
    const { activities } = this.state;
    
    return (
      <div className="activities-container">
        <h1>Badminton Activities</h1>
        <div className="activities-grid">
          {activities.map(activity => (
            <div key={activity.id} className="activity-card">
              <div className={`status-badge ${this.getStatusColor(activity.status)}`}>
                {activity.status}
              </div>
              
              <div className="activity-date">
                {this.formatDate(activity.date)}
              </div>
              
              <h2 className="activity-title">{activity.title}</h2>
              
              <div className="activity-details">
                <div className="detail-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{activity.venue}</span>
                </div>
                
                <div className="detail-item">
                  <i className="far fa-clock"></i>
                  <span>{activity.startTime} - {activity.endTime}</span>
                </div>
                
                <div className="detail-item">
                  <i className="fas fa-dollar-sign"></i>
                  <span>${activity.fee}</span>
                </div>
                
                <div className="detail-item">
                  <i className="fas fa-users"></i>
                  <span>{activity.currentPlayers}/{activity.maxPlayers} players</span>
                </div>
                
                <div className="detail-item">
                  <i className="fas fa-trophy"></i>
                  <span>{activity.minSkillLevel} - {activity.maxSkillLevel}</span>
                </div>
              </div>

              <button 
                className="join-button"
                disabled={activity.status === 'full' || activity.status === 'cancelled'}
              >
                Join Activity
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ActivityList;
