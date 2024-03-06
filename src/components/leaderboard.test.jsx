import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Leaderboard from './leaderboard';

describe('Leaderboard component', () => {
  it('should can get leaderboard data from component', async () => {
    // Arrange
    const leaderboardPropsData = {
      user: {
        id: 'user-1',
        name: 'Dimas Saputra',
        email: 'dimas@dicoding.com',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
      score: 26,
    };

    // Action
    render(<Leaderboard user={leaderboardPropsData.user} score={leaderboardPropsData.score} />);

    // Assert
    expect(screen.getByText(leaderboardPropsData.user.name)).toBeInTheDocument();
    expect(screen.getByText(leaderboardPropsData.score)).toBeInTheDocument();
  });
});
