import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

interface PostAbortionProps {
  moh711Data: any;
}

const PostAbortion: React.FC<PostAbortionProps> = ({ moh711Data }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th colSpan={2}>E. Post Abortion Care (PAC) Services</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>No. of Adolescents (10-19yrs) Receiving PAC Services</td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>No. of Youth 20-24 yrs receiving PAC services</td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>No. Receiving PAC (25 Years plus)</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PostAbortion;
