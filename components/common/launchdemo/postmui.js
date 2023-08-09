import * as React from 'react'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import AddIcon from '@mui/icons-material/Add'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import styles from '@/components/common/launchdemo/postmui.module.sass'
import BasicTextFields from '@/components/common/launchdemo/textfield'
import BasicTextFields2 from '@/components/common/launchdemo/textfield2'
import ForumButton from '@/components/common/button/'
import TextArea from '@/components/common/inputBox/textarea'
import ImgUpload from '@/components/common/imgupload/imgupload'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialogSlide({ page = 1 }) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const [inputTitle, setInputTitle] = React.useState('')
  const [inputContent, setInputContent] = React.useState('')

  const addData = (title, content) => {
    const reqData = {
      title: title,
      content: content,
    }

    fetch(`${process.env.API_SERVER}/forum/${router.query.category}/add`, {
      method: 'POST',
      body: JSON.stringify({ requestData: reqData }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log('data:', data)
        // setData(data[0])
        // setTotalPages(data[1])
      })
  }

  // if(!data) return <Loading />

  return (
    <div>
      <Button
        variant="text"
        onClick={handleClickOpen}
        className={`${styles.no_underline}`}
      >
        <AddIcon />
        新增貼文
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="md"
      >
        <form>
          <DialogTitle>{/* {"Use Google's location service?"} */}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div className={`${styles.container}`}>
                {/* <div className={`${styles.center}`}> */}
                <div className={`${styles.row3}`}>
                  <div className={`${styles.row1}`}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 77, height: 77 }}
                    />
                    <div className={`${styles.column1}`}>
                      <div className={`${styles.userid}`}>5678</div>
                      <div className={`${styles.row2}`}>
                        <div className={`${styles.forumcategory}`}>5678</div>
                        <div>·</div>
                        <div className={`${styles.posttime}`}>5678</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
                <div className={`${styles.col2}`}>
                  <p className={`${styles.title}`}>文章標題</p>
                  <div className={`${styles.col2}`}>
                    <TextArea
                      height="40px"
                      value={inputTitle}
                      onChange={
                        (e) => {
                          setInputTitle(e.target.value)
                        }
                        // console.log('Input value changed:', e.target.value)
                      }
                      placeholder="請輸入標題"
                      autoComplete="off"
                      id="title"
                      required
                    />
                    {/* <BasicTextFields /> */}
                  </div>
                  <p className={`${styles.title}`}>文章內容</p>
                  <div className={`${styles.col2}`}>
                    <TextArea
                      type="text"
                      height="500px"
                      value={inputContent}
                      onChange={
                        (e) => {
                          setInputContent(e.target.value)
                        }
                        // console.log('Input value changed:', e.target.value)
                      }
                      placeholder="請輸入內容"
                      autoComplete="off"
                      id="content"
                      required
                      lineheight="32px"
                    />
                    {/* <BasicTextFields2 /> */}
                  </div>
                </div>
              </div>
            </DialogContentText>
            <div className={`${styles.row2}`}>
              <ImgUpload />
            </div>
          </DialogContent>
          <DialogActions>
            <div className={`${styles.row2}`}>
              <ForumButton
                btnColor="hot_pink"
                text="取消"
                link={() => {
                  console.log('Cancel button clicked')
                  handleClose()
                }}
              />
              <ForumButton
                btnColor="green"
                text="發文"
                link={() => {
                  handleClose()
                  //               console.log('page:', page)
                  // console.log('category:', router.query.category)
                  router.push(`/forum/gossip?page=3`)
                  addData(inputTitle, inputContent)
                }}
              />
              {/* <Button onClick={handleClose} color="error">
              取消
            </Button>
            <Button onClick={handleClose}>發文</Button> */}
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
