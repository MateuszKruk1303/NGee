import React, { useState } from 'react'
import { validationSchema } from './AddNewPost.utils'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  Typography,
  MenuItem,
  IconButton,
  Menu,
  Paper,
} from '@material-ui/core'
import {
  Select,
  TextField,
  FormControl,
  Chip,
  SelectFile,
  Wrapper,
} from './AddNewPost.style'
import { Formik } from 'formik'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/types'
import { addNewPost, editPost } from '../../../store/posts/thunks'
import { Category } from '@material-ui/icons'

interface IAddNewPost {
  onClose: () => void
  title?: string
  content?: string
  existingTags?: string[]
  existingCategory?: string
  postId?: string
}

export default ({
  onClose,
  title,
  content,
  existingTags,
  existingCategory,
  postId,
}: IAddNewPost) => {
  const userId = useSelector((state: RootState) => state.login.userId)
  const [selectedFile, setSelectedFile] = useState<null | FileList>(null)
  const [tags, setTags] = useState<string[]>(existingTags ? existingTags : [])
  const [tag, setTag] = useState<string>('')
  const [category, setCategory] = useState<string>(
    existingCategory ? existingCategory : 'Automation'
  )
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)
  const dispatch = useDispatch()

  const onSubmitAdd = ({
    title,
    content,
  }: {
    title: string
    content: string
  }) => {
    const fd = new FormData()

    if (selectedFile) {
      const files = Array.prototype.slice.call(selectedFile)
      for (const file of files) {
        fd.append('postImage', file, `${file.name}`)
      }
    }
    fd.append('title', title)
    fd.append('content', content)
    fd.append('userId', userId!)
    fd.append('tags', tags.join('-'))
    fd.append('category', category)
    dispatch(addNewPost({ dto: fd }))
  }
  const onSubmitEdit = ({
    title,
    content,
  }: {
    title: string
    content: string
  }) => {
    if (userId && postId)
      dispatch(
        editPost({
          dto: {
            userId,
            postId,
            title,
            content,
            category,
            tags,
          },
        })
      )
  }
  const handleAddTag = (e: any) => {
    if (tag?.length > 0 && !tags.includes(e) && tags.length < 5) {
      setTags([...tags, e])
      setTag('')
    }
  }

  const handleTagDelete = (value: string) => {
    setTags(tags.filter(item => item !== value))
  }

  const initialValues = {
    title: title ? title : '',
    content: content ? content : '',
  }

  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data, { resetForm }) => {
          resetForm()
          postId ? onSubmitEdit(data) : onSubmitAdd(data)
          onClose()
        }}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              spacing={2}
            >
              <Grid item>
                <Typography variant="subtitle1">Title</Typography>
                <TextField
                  variant="outlined"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  value={values.title}
                  onChange={handleChange}
                  name="title"
                  placeholder="title"
                ></TextField>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Describe your problem
                </Typography>
                <TextField
                  variant="outlined"
                  error={touched.content && Boolean(errors.content)}
                  helperText={touched.content && errors.content}
                  value={values.content}
                  onChange={handleChange}
                  name="content"
                  multiline
                  placeholder="content"
                  rows={4}
                ></TextField>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Select category</Typography>
                <Select
                  value={category}
                  onChange={e => setCategory(e.target.value as string)}
                >
                  <MenuItem value="Automation">Automation</MenuItem>
                  <MenuItem value="Robotics">Robotics</MenuItem>
                  <MenuItem value="College">College</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </Grid>
              <Grid item>
                {tags.length ? (
                  tags.map((value, index) => (
                    <Chip
                      deleteIcon={<CloseIcon />}
                      onDelete={() => handleTagDelete(value)}
                      key={value}
                      index={index}
                      label={value}
                    />
                  ))
                ) : (
                  <Typography variant="body1">No tags selected</Typography>
                )}
              </Grid>
              <Grid item>
                <Menu
                  open={isMenuOpen}
                  anchorEl={anchorEl}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={() => {}}>
                    <TextField
                      autoFocus
                      value={tag}
                      onChange={e => setTag(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleAddTag(tag)
                      }}
                    />
                    <IconButton
                      onClick={() => {
                        handleAddTag(tag)
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </MenuItem>
                </Menu>
                <Button
                  variant="contained"
                  onClick={e => setAnchorEl(e.currentTarget)}
                >
                  Add tag
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Add photos</Typography>
              </Grid>
              <Grid item>
                {!postId && (
                  <SelectFile
                    type="file"
                    onChange={e => {
                      setSelectedFile(e.target.files)
                    }}
                    name="profileimage"
                    multiple
                  ></SelectFile>
                )}
              </Grid>
              <Grid item>
                <Grid container justify="center" spacing={3}>
                  <Grid item>
                    <Button onClick={() => onClose()}>Cancel</Button>
                  </Grid>
                  <Grid item>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Wrapper>
  )
}
