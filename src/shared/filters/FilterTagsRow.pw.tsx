import React from 'react';

import { test, expect } from 'playwright/lib';

import FilterTagsRow from './FilterTagsRow';

const Demo = () => {
  const [ tags, setTags ] = React.useState([ { key: 'chain' as const, name: 'Chain', value: 'Gnosis' } ]);

  return (
    <FilterTagsRow
      tags={ tags }
      onClear={ () => setTags([]) }
      onClearAll={ () => setTags([]) }
      placeholderTags={ <span>No active filters</span> }
    />
  );
};

test('Reset all is in the Tab order and responds to Enter', async({ render, page }) => {
  await render(<Demo/>);
  await page.getByRole('button', { name: 'Close' }).focus();
  await page.keyboard.press('Tab');

  const reset = page.getByRole('button', { name: 'Reset all filters' });
  await expect(reset).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(reset).toHaveCount(0);
  await expect(page.getByText('No active filters')).toBeVisible();
});

test('Reset all responds to Space', async({ render, page }) => {
  await render(<Demo/>);
  const reset = page.getByRole('button', { name: 'Reset all filters' });
  await reset.focus();
  await page.keyboard.press('Space');
  await expect(reset).toHaveCount(0);
});
