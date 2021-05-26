import { useMemo } from 'react';
import Item from './Item';
import { authService } from 'fbase';
 /** @jsxImportSource @emotion/react */
 import { css, jsx } from '@emotion/react';
import { styles } from './style';

function List({ list, userId }) {
  const userEmail = useMemo(() => authService.currentUser.email, []);

  return (
    <ul>
      {list.map((item, idx) => <Item key={idx} idx={idx} item={item} userEmail={userEmail} />)}
    </ul>
  );
}
export default List;