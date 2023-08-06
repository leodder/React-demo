import styles from './worshipProductsCard.module.sass'
import Image from 'next/image'
export default function WorshipProductsCard({
  src = 'worship/mazu (4).png',
  text = '紅湯圓',
  price = '45',
}) {
  return (
    <div className={`${styles.container} m15px p10px`}>
      {/* 圖片 */}
      <div className={`${styles.image} mb10px`}>
        <Image
          src={`/${src}`}
          alt="image"
          width={150}
          height={150}
          className="shadow"
        />
      </div>
      <div className={`${styles.detailContainer}`}>
        <div className={`${styles.text} fs18px p5px`}> {text}</div>
        <div className={`${styles.price} fwBold fs16px p5px`}>${price}</div>
      </div>
    </div>
  )
}
