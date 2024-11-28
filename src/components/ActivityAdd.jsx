import React from 'react';
import { skillLevels } from '../constants/skillLevels';
import graphQLFetch from '../utils/graphQLFetch';

class ActivityAdd extends React.Component {
  state = {
    title: '',
    venue: '',
    date: '',
    startTime: '',
    endTime: '',
    fee: 0,
    maxPlayers: 4,
    minSkillLevel: skillLevels[0].id,
    maxSkillLevel: skillLevels[skillLevels.length - 1].id
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSkillChange = (e) => {
    const { name, value } = e.target;
    const otherField = name === 'minSkillLevel' ? 'maxSkillLevel' : 'minSkillLevel';
    const skillIndex = skillLevels.findIndex(level => level.id === value);
    const otherIndex = skillLevels.findIndex(level => level.id === this.state[otherField]);

    if ((name === 'minSkillLevel' && skillIndex <= otherIndex) ||
        (name === 'maxSkillLevel' && skillIndex >= otherIndex)) {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const mutation = `mutation AddActivity($activity: ActivityInput!) {
      addActivity(activity: $activity) {
        id title venue date startTime endTime
        fee maxPlayers minSkillLevel maxSkillLevel
      }
    }`;

    const activity = {
      ...this.state,
      fee: parseFloat(this.state.fee),
      maxPlayers: parseInt(this.state.maxPlayers)
    };

    try {
      const result = await graphQLFetch(mutation, { activity });
      if (result) {
        this.props.onActivityAdded();
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  render() {
    const { minSkillLevel } = this.state;
    const minSkillIndex = skillLevels.findIndex(level => level.id === minSkillLevel);

    return (
      <div className="activity-add-form">
        <h2>Create New Activity</h2>
        <form onSubmit={this.handleSubmit}>
          {['title', 'venue'].map(field => (
            <div className="form-group" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type="text"
                name={field}
                value={this.state[field]}
                onChange={this.handleChange}
                required
              />
            </div>
          ))}

          {['date'].map(field => (
            <div className="form-group" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type="date"
                name={field}
                value={this.state[field]}
                onChange={this.handleChange}
                required
              />
            </div>
          ))}

          {['startTime', 'endTime'].map(field => (
            <div className="form-group" key={field}>
              <label>{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
              <input
                type="time"
                name={field}
                value={this.state[field]}
                onChange={this.handleChange}
                required
              />
            </div>
          ))}

          {['fee', 'maxPlayers'].map(field => (
            <div className="form-group" key={field}>
              <label>{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
              <input
                type="number"
                name={field}
                value={this.state[field]}
                onChange={this.handleChange}
                min={field === 'maxPlayers' ? 2 : 0}
                max={field === 'maxPlayers' ? 20 : undefined}
                required
              />
            </div>
          ))}

          {['minSkillLevel', 'maxSkillLevel'].map(field => (
            <div className="form-group" key={field}>
              <label>{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
              <select
                name={field}
                value={this.state[field]}
                onChange={this.handleSkillChange}
              >
                {skillLevels.map((level, index) => (
                  <option
                    key={level.id}
                    value={level.id}
                    disabled={field === 'maxSkillLevel' && index < minSkillIndex}
                  >
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button type="submit">Create Activity</button>
        </form>
      </div>
    );
  }
}

export default ActivityAdd;