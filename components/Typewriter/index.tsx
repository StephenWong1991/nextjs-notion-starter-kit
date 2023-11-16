import * as React from 'react'
import styles from './styles.module.css'

export const Typewriter: React.FC = () => {
  const [text, setText] = React.useState('')
  const actorRef = React.useRef()
  const gushiRef = React.useRef([''])

  React.useEffect(() => {
    const pageCover: HTMLDivElement = document.querySelector(
      '.notion-page-cover-wrapper'
    )
    console.log(pageCover);

    if (!pageCover) {
      return
    }

    // https://www.jinrishici.com
    // https://gushi.ci/
    window
      .fetch(
        'https://v2.jinrishici.com/one.json?client=browser-sdk/1.2&X-User-Token=JpG1JKarm1dfSauhd9zkWTZYkhS%2FrBq%2B'
      )
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        const { title, dynasty, author, content } = res.data.origin
        const gushiList = []
        const regex =
          /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g
        content.forEach((item) => {
          const str = item.replace(regex, ' ')
          const arr = str.split(' ').filter((v) => v !== '')
          gushiList.push(...arr)
        })
        gushiRef.current = gushiList
        console.log('banner 古诗: ')
        console.log(title)
        console.log(dynasty)
        console.log(author)
        console.log(content)
      })
      .catch((err) => {
        console.log(err)
      })

    const actor = actorRef.current

    pageCover.style.position = 'relative'
    pageCover.appendChild(actor)

    let index = 0
    let item = 0
    let flag = true

    function point() {
      const timer = setInterval(() => {
        const text = gushiRef.current[index]
        if (item === text.length) {
          flag = false
        }
        if (flag) {
          setText((t) => (t += text.charAt(item)))
          item++
          if (item === text.length) {
            clearInterval(timer)
            setTimeout(point, 1000)
          }
        } else {
          item--
          setText((t) => t.substring(0, item))
          if (item < 0) {
            flag = true
            index++
            index %= gushiRef.current.length
            item = 0
          }
        }
      }, 150)
    }

    point()
  }, [])

  return (
    <div className={styles.actor} ref={actorRef}>
      <span className={styles.content}>{text}</span>
    </div>
  )
}
