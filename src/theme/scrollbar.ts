import { CSSObject } from '@emotion/react';
import { initial } from './theme';

export const scrollbar: CSSObject = {
  '::-webkit-scrollbar': {
    width: '20px',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: initial.palette.neutral[200],
    borderRadius: '20px',
    border: '6px solid transparent',
    backgroundClip: 'content-box',
  },
  '::-webkit-scrollbar-thumb:hover': {
    backgroundColor: initial.palette.neutral[300],
  },
};
