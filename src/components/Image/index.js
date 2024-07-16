import classNames from 'classnames';
import { forwardRef, useState } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss'

const Image = forwardRef(({ src,className, ...props }, ref) => {

  const [fallback, setFallback]= useState('')

  const handleError =()=>{
    setFallback(images.noImage)
  }
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img className={classNames(styles.wrapper, className)} ref={ref} src={fallback || src} {...props} onError={handleError}/>;
});

export default Image