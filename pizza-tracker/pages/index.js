import React from 'react'
import OrderComponent from './OrderComponent'
import PreparationComponent from './PreparationComponent'

import styles from './index.module.css'


export default function Home() {
  return (
    <div className={styles.Home}>
      <OrderComponent />
      <PreparationComponent />
    </div>
  )
}