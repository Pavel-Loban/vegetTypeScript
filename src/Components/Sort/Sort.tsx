import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './sort.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {setSort} from '../../slice/sortSlice';
import { RootState } from 'slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';

type SortItem = {
  name: string;
  sortProperty: string;
};

type PopupClick = MouseEvent & {
  path: Node[];
}

export const menuListVisible: SortItem[] = [
{ name: 'popularity (DESC)', sortProperty: 'rating' },
{ name: 'popularity (ASC)', sortProperty: '-rating' },
{ name: 'price (DESC)', sortProperty: 'price' },
{ name: 'price (ASC)', sortProperty: '-price' },
{ name: 'alphabet (DESC)', sortProperty: 'title' },
{ name: 'alphabet (ASC)', sortProperty: '-title' },];

const Sort = () => {

  const dispatch = useAppDispatch();
  const sort = useAppSelector((state: RootState) => state.sort.sort);

  const [isVisible, setIsVisible] = React.useState(false);

  const sortRef = React.useRef<HTMLDivElement>(null);

  const onSelected = (obj: any) => {
    console.log(obj)
    dispatch(setSort(obj));
    setIsVisible(false);
  }

  React.useEffect(() => {
    const onClickOutsideSort = (e: MouseEvent) => {
      const _e = e as PopupClick
      if(sortRef.current && !_e.path.includes(sortRef.current)){
       setIsVisible(false);
      }
    }
    document.body.addEventListener('click',onClickOutsideSort);
    return () => {
      document.body.removeEventListener('click',onClickOutsideSort);
    };
  },[])

  return (
    <div   className={styles.selectNav}>
      <div ref={sortRef}  className={styles.sort__label}
      >
        <MenuIcon onClick={() => setIsVisible(!isVisible)} />
        <b onClick={() => setIsVisible(!isVisible)}>Select sort:</b>
        <span className={styles.active} onClick={() => setIsVisible(!isVisible)}>{sort.name}</span>
      </div>
      {isVisible && (
        <div className={styles.sort__popup}>
          <ul >
            {menuListVisible.map((obj, i) => <li key={i}
              onClick={() => onSelected(obj)}
              className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
            >
              {obj.name}
            </li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;