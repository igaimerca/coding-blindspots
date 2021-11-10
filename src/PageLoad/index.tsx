import React from 'react';
{
  /* comment out line below to run features.test.js */
}
import GridLoader from 'react-spinners/GridLoader';
import styles from './styles.css';

interface PageLoadProps {
  text: string;
}

const PageLoad = ({ text }: PageLoadProps) => (
  <div className={styles.loaderContainer}>
    {/* comment out line below to run features.test.js */}
    <GridLoader size={8} margin={3} />
    <p className={styles.loaderText}>{text}</p>
  </div>
);

export default PageLoad;
