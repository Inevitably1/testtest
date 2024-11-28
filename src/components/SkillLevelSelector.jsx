import React from 'react';
import graphQLFetch from '../utils/graphQLFetch';
import { skillLevels } from '../constants/skillLevels';

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

export default SkillLevelSelector;
