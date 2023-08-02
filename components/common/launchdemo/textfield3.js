import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function BasicTextFields3() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label="今天想要找什麼呢～"
        variant="standard"
        autofocus
      />
    </Box>
  )
}
