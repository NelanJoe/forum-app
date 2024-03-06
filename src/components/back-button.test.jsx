import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import BackButton from './back-button';

describe('Back Button component', () => {
  it('should can get value from component', async () => {
    // Action
    render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText('Back')).toBeInTheDocument();
  });
});
