import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GradStack from './GradStack';

jest.mock('./GradStack.css', () => {});

const IMAGES = [
  '/grad/grad1.jpg',
  '/grad/grad2.jpg',
  '/grad/grad3.jpg',
  '/grad/grad4.jpg',
];

describe('GradStack', () => {

  test('renders the correct number of images', () => {
    render(<GradStack images={IMAGES} />);
    expect(screen.getAllByRole('img')).toHaveLength(IMAGES.length);
  });

  test('no panel is expanded on initial render', () => {
    render(<GradStack images={IMAGES} />);
    document.querySelectorAll('.grad-gallery-item').forEach(item => {
      expect(item).not.toHaveClass('expanded');
    });
  });

  test('clicking a panel adds the expanded class', () => {
    const { container } = render(<GradStack images={IMAGES} />);
    const panels = container.querySelectorAll('.grad-gallery-item');
    fireEvent.click(panels[0]);
    expect(panels[0]).toHaveClass('expanded');
  });

  test('clicking an expanded panel collapses it', () => {
    const { container } = render(<GradStack images={IMAGES} />);
    const panels = container.querySelectorAll('.grad-gallery-item');
    fireEvent.click(panels[0]);
    expect(panels[0]).toHaveClass('expanded');
    fireEvent.click(panels[0]);
    expect(panels[0]).not.toHaveClass('expanded');
  });

  test('clicking a different panel expands it and collapses the previous', () => {
    const { container } = render(<GradStack images={IMAGES} />);
    const panels = container.querySelectorAll('.grad-gallery-item');
    fireEvent.click(panels[0]);
    expect(panels[0]).toHaveClass('expanded');
    fireEvent.click(panels[2]);
    expect(panels[0]).not.toHaveClass('expanded');
    expect(panels[2]).toHaveClass('expanded');
  });

});
