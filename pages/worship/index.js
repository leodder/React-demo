import styles from './worship.module.sass'
import Image from 'next/image'
import { Container, Row, Col } from 'react-bootstrap'
import Head from 'next/head'

// hooks
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// svg
import nav from '@/assets/nav.svg'
import Rightgod from '@/assets/worshipRGod.svg'
import Leftgod from '@/assets/worshipLGod.svg'
import Cloud from '@/assets/worshipCloud.svg'
import WorshipLogo from '@/assets/worshipLogo.svg'
import Time from '@/assets/worshipTime.svg'
import selectedTime from '@/assets/selectedTime.svg'
import Arrow from '@/assets/arrow_calendar.svg'
// components
import Title from '@/components/common/title/WorshipTitle'
import God from '@/components/common/cards/WorshipGod'
import Button from '@/components/common/button'
import ArrowRight from '@/components/common/arrow/arrowRight'
import ArrowLeft from '@/components/common/arrow/arrowLeft'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules'

export default function Worship() {
  const router = useRouter()

  const stylesTime = {
    selectedTime_1: {
      transform: 'rotate(0deg)',
      top: '146px',
      left: '258px',
    },
    selectedTime_2: {
      transform: 'rotate(30deg)',
      top: '121px',
      left: '390px',
    },
    selectedTime_3: {
      transform: 'rotate(60deg)',
      top: '165.5px',
      left: '518px',
    },
    selectedTime_4: {
      transform: 'rotate(90deg)',
      top: '268px',
      left: '607.5px',
    },
    selectedTime_5: {
      transform: 'rotate(120deg)',
      top: '400px',
      left: '633px',
    },
    selectedTime_6: {
      transform: 'rotate(150deg)',
      top: '528px',
      left: '589px',
    },
    selectedTime_7: {
      transform: 'rotate(180deg)',
      top: '617.5px',
      left: '486.1px',
    },
    selectedTime_8: {
      transform: 'rotate(210deg)',
      top: '643px',
      left: '354px',
    },
    selectedTime_9: {
      transform: 'rotate(240deg)',
      top: '599px',
      left: '226px',
    },
    selectedTime_10: {
      transform: 'rotate(270deg)',
      top: '497px',
      left: '137px',
    },
    selectedTime_11: {
      transform: 'rotate(300deg)',
      top: '364px',
      left: '111px',
    },
    selectedTime_12: {
      transform: 'rotate(330deg)',
      top: '235px',
      left: '155px',
    },
  }

  const godInfo = [
    {
      text: '媽祖',
      pic: 'mazuGod',
      wordLeft: '母恩似海共霑恩',
      wordRight: '聖德如天同景仰',
    },
    {
      text: '月老',
      pic: 'loveGod',
      wordLeft: '姻緣天定情長久',
      wordRight: '花好月圓喜滿樓',
    },
    {
      text: '文昌',
      pic: 'studyGod',
      wordLeft: '才華照耀瑞風光',
      wordRight: '學道有成展宏願',
    },
  ]

  // 選擇的神明
  const [god, setGod] = useState('')

  // 月曆
  const month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 一般
  const month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 閏年
  const month_name = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ] //全部月份

  const [calendar, setCalendar] = useState([])
  const [days, setDays] = useState([])
  const [month, setMonth] = useState()
  const [year, setYear] = useState()

  const myDate = new Date() // 今天 (Sat Aug 05 2023 13:47:47 GMT+0800 (台北標準時間))
  const [myDay, setMyDay] = useState(myDate.getDate())
  const [myMonth, setMyMonth] = useState(myDate.getMonth())
  const [myYear, setMyYear] = useState(myDate.getFullYear())

  const [day, setDay] = useState(
    `${myYear}/${myMonth + 1 < 10 ? '0' : ''}${myMonth + 1}/${
      myDay < 10 ? '0' : ''
    }${myDay}`
  )

  // 某年某月某一天是星期幾
  const dayStart = (month, year) => {
    const tmpDate = new Date(year, month, 2)
    return tmpDate.getDay()
  }

  // 判斷是否為閏年並獲得總天數
  const getDay = (month, year) => {
    const tmp = year % 4
    if (tmp == 0) {
      return month_olympic[month]
    } else {
      return month_normal[month]
    }
  }

  // 刷新日曆
  const refreshDate = () => {
    setCalendar([])
    setDays([])
    const totalDay = getDay(myMonth, myYear) // 獲取該月總天數
    const firstDay = dayStart(myMonth, myYear) // 獲取該月第一天是星期幾

    // 為起始日之前創造空白節點
    for (let i = 1; i < firstDay; i++) {
      calendar.push('')
    }
    for (let i = 1; i <= totalDay; i++) {
      calendar.push(i)
    }
    // 日曆顯示
    setDays(calendar)
    // 月份顯示
    setMonth(month_name[myMonth])
    // 年份顯示
    setYear(myYear)
  }

  useEffect(() => {
    refreshDate() // 刷新日曆
  }, [router.query, myMonth, myYear])

  const handleDayClick = (date) => {
    setDay(date)
  }

  return (
    <Container className={`${styles.worship}`}>
      {/* <Head>
        <title>民俗論壇</title>
      </Head> */}
      {/* section1 */}
      <Row>
        <Col>
          <div className={`${styles.background}`}>
            <div className={`${styles.place}`}>
              <div className={`${styles.flex_row}`}>
                <div className={`${styles.gods}`}>
                  <Image src={Leftgod} alt="leftgod" width={750} />
                  <div className={`${styles.flex}`}>
                    <div className={`${styles.logo}`}>
                      <Image src={WorshipLogo} alt="worshipLogo" height={300} />
                    </div>
                    <div className={`${styles.cloud}`}>
                      <Image src={Cloud} alt="cloud" width={1800} />
                    </div>
                  </div>
                  <Image src={Rightgod} alt="rightgod" width={750} />
                </div>
              </div>
              <div className={`${styles.floor}`}>
                <Image src={nav} width={1990} alt="nav" />
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* section2: 選擇神明 */}
      <Row>
        <Col>
          <Title text="1." text2="選擇神明" />
        </Col>
        <Col>
          <div className={`${styles.swiper}`}>
            <Swiper
              loop={true}
              spaceBetween={30}
              effect={'fade'}
              modules={[EffectFade, Navigation, Pagination]}
              className="mySwiper"
            >
              {godInfo.map((v, i) => {
                const foundGod = v.text === god
                return (
                  <SwiperSlide key={i}>
                    <God
                      text={v.text}
                      pic={v.pic}
                      wordLeft={v.wordLeft}
                      wordRight={v.wordRight}
                      setGod={setGod}
                      foundGod={foundGod}
                    />
                  </SwiperSlide>
                )
              })}
              <div className={`${styles.arrowContainer}`}>
                <div className={`${styles.arrowLeft} swiper-button-prev`}>
                  <ArrowLeft />
                </div>
                <div className={`${styles.arrowRight} swiper-button-next`}>
                  <ArrowRight />
                </div>
              </div>
            </Swiper>
          </div>
        </Col>
        <Col>
          <div className={`${styles.choseGod} fs28px fwBold`}>
            已選擇： <span className={`${styles.pink}`}>{god}</span>
          </div>
        </Col>
        <Col></Col>
      </Row>

      {/* section3: 挑選日期 */}
      <Row>
        <Col>
          <Title text="2." text2="挑選日期" />
        </Col>
        <Col className="mt100px mb100px">
          {/* 月曆 */}
          <div className={`${styles.calendarContainer}`}>
            <div className={`${styles.calendar}`}>
              <div className={`${styles.titleContainer} fwBold`}>
                {/* 月份 */}
                <div className={`${styles.title}`}>
                  {/* 上個月 */}
                  <Image
                    src={Arrow}
                    alt="prevMonth"
                    width={45}
                    className={`${styles.arrow} ${styles.prev}`}
                    style={{
                      cursor:
                        myMonth === myDate.getMonth() ? 'default' : 'pointer',
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      // 從這個月開始不能往前選 (今年這個月以後)||(未來)
                      if (
                        (myYear === myDate.getFullYear() &&
                          myMonth - 1 >= myDate.getMonth()) ||
                        myYear > myDate.getFullYear()
                      ) {
                        setMyMonth(myMonth - 1)
                        if (myMonth < 1) {
                          setMyYear(myYear - 1)
                          setMyMonth(11)
                        }
                      }
                    }}
                  />
                  <div className={`${styles.pink} p30px fs72px`} id="month">
                    {month}
                  </div>
                  {/* 下個月 */}
                  <Image
                    src={Arrow}
                    alt="NextMonth"
                    width={45}
                    className={`${styles.arrow}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setMyMonth(myMonth + 1)
                      if (myMonth > 10) {
                        setMyYear(myYear + 1)
                        setMyMonth(0)
                      }
                    }}
                  />
                </div>
                {/* 年份 */}
                <div className={`${styles.title}`}>
                  {/* 上一年 */}
                  <Image
                    src={Arrow}
                    alt="prevYear"
                    width={45}
                    className={`${styles.arrow} ${styles.prev}`}
                    style={{
                      cursor:
                        myYear === myDate.getFullYear() ? 'default' : 'pointer',
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      // 只能選到今年
                      if (myYear - 1 >= myDate.getFullYear()) {
                        if (
                          myYear - 1 === myDate.getFullYear() &&
                          myMonth < myDate.getMonth()
                        ) {
                          setMyMonth(myDate.getMonth())
                        }
                        setMyYear(myYear - 1)
                      }
                    }}
                  />
                  <div className={`${styles.pink} p30px fs56px`} id="year">
                    {year}
                  </div>
                  {/* 下一年 */}
                  <Image
                    src={Arrow}
                    alt="NextYear"
                    width={45}
                    className={`${styles.arrow}`}
                    id="nextYear"
                    onClick={(e) => {
                      e.preventDefault()
                      setMyYear(myYear + 1)
                    }}
                  />
                </div>
              </div>
              <div className={`${styles.body}`}>
                <div
                  className={`${styles.week} ${styles.lightgrey} fwBold fs20px`}
                >
                  <ul>
                    <li>日</li>
                    <li>一</li>
                    <li>二</li>
                    <li>三</li>
                    <li>四</li>
                    <li>五</li>
                    <li>六</li>
                  </ul>
                </div>
                <div className={`${styles.body_list}`}>
                  <ul>
                    {days.map((v, i) => {
                      let state = false
                      let pastDay = false

                      // 以前的
                      if (
                        v < myDay &&
                        myYear == myDate.getFullYear() &&
                        myMonth == myDate.getMonth()
                      ) {
                        pastDay = true
                      }
                      const key = `${myYear}/${myMonth + 1 < 10 ? '0' : ''}${
                        myMonth + 1
                      }/${v < 10 ? '0' : ''}${v}`
                      if (day === key) {
                        state = true
                      }
                      return v ? (
                        <li
                          role="presentation"
                          key={`${myYear}/${myMonth + 1}/${v}`}
                          className={`${
                            v
                              ? pastDay
                                ? styles.pastDay
                                : state
                                ? styles.chooseDay
                                : styles.day
                              : ''
                          } fs20px`}
                          onClick={() => {
                            handleDayClick(key)
                          }}
                        >
                          {v}
                        </li>
                      ) : (
                        <li key={`empty-${i}`}></li>
                      )
                    })}
                  </ul>
                </div>
              </div>
              <div className={`${styles.choseDay} fs28px fwBold`}>
                已選擇： <span className={`${styles.pink}`}>{day}</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* section4: 預約時辰 */}
      <Row className={`${styles.flex_col}`}>
        <Col>
          <Title text="3." text2="預約時辰" />
        </Col>
        <Col className={`${styles.timeContainer}`}>
          <div className={`${styles.selectedTime}`}>
            {Array(12)
              .fill(1)
              .map((v, i) => {
                const key = i
                return (
                  <Image
                    key={i}
                    src={selectedTime}
                    alt="choose time"
                    className={`${styles.timePieces}`}
                    onMouseEnter={() => {}}
                    style={stylesTime[`selectedTime_${i + 1}`]}
                  />
                )
              })}
          </div>
          <div>
            <Image src={Time} alt="choose time" />
          </div>
        </Col>
      </Row>

      {/* section5: 下一步 */}
      <Row>
        <Col>
          <div className={`${styles.button}`}>
            <Button
              text="下一步：選擇供品"
              width="100%"
              btnColor="hot_pink"
              padding="15px 60px"
              fontSize="24px"
              link={() => {}}
            />
          </div>
        </Col>
      </Row>
    </Container>
  )
}
