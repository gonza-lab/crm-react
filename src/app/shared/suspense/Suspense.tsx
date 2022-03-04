import { FC, Suspense as ReactSuspense } from 'react';
import Spinner from '../spinner/Spinner';

const Suspense: FC = ({ children }) => {
  return <ReactSuspense fallback={<Spinner />}>{children}</ReactSuspense>;
};

export default Suspense;
