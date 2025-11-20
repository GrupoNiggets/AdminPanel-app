import React, { useState, useEffect } from 'react'
import { Box, Container, Stack, Grid, Alert, Snackbar } from '@mui/material'
import { getPosts, createPost, updatePost, deletePost } from './data'
import PostsHeader from '../../components/postComponents/PostsHeader'
import PostsEmptyState from '../../components/postComponents/PostsEmptyState'
import PostCard from '../../components/postComponents/PostCard'
import PostFormDialog from '../../components/postComponents/PostFormDialog'
import DeletePostDialog from '../../components/postComponents/DeletePostDialog'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [formData, setFormData] = useState({
    userId: '',
    content: '',
    coordinates: {
      type: 'Point',
      coordinates: [0, 0] // [longitud, latitud]
    }
  })
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = () => {
    getPosts().then(data => {
      if (data) {
        setPosts(data)
      }
    })
  }

  const handleOpenCreate = () => {
    setFormData({
      userId: '',
      content: '',
      coordinates: {
        type: 'Point',
        coordinates: [0, 0] // [longitude, latitude]
      }
    })
    setOpenCreateDialog(true)
  }

  const handleOpenEdit = (post) => {
    setSelectedPost(post)
    setFormData({
      userId: post.userId || '',
      content: post.content || '',
      coordinates: post.coordinates || {
        type: 'Point',
        coordinates: [0, 0]
      }
    })
    setOpenEditDialog(true)
  }

  const handleOpenDelete = (post) => {
    setSelectedPost(post)
    setOpenDeleteDialog(true)
  }

  const handleCreate = () => {
    createPost(formData).then(result => {
      if (result) {
        setSnackbar({ open: true, message: 'Post creado exitosamente', severity: 'success' })
        setOpenCreateDialog(false)
        loadPosts()
      } else {
        setSnackbar({ open: true, message: 'Error al crear el post', severity: 'error' })
      }
    })
  }

  const handleUpdate = () => {
    if (selectedPost) {
      updatePost(selectedPost.postId || selectedPost._id, formData).then(result => {
        if (result) {
          setSnackbar({ open: true, message: 'Post actualizado exitosamente', severity: 'success' })
          setOpenEditDialog(false)
          setSelectedPost(null)
          loadPosts()
        } else {
          setSnackbar({ open: true, message: 'Error al actualizar el post', severity: 'error' })
        }
      })
    }
  }

  const handleDelete = () => {
    if (selectedPost) {
      deletePost(selectedPost.postId || selectedPost._id).then(result => {
        if (result !== null) {
          setSnackbar({ open: true, message: 'Post eliminado exitosamente', severity: 'success' })
          setOpenDeleteDialog(false)
          setSelectedPost(null)
          loadPosts()
        } else {
          setSnackbar({ open: true, message: 'Error al eliminar el post', severity: 'error' })
        }
      })
    }
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <PostsHeader totalPosts={posts.length} onCreate={handleOpenCreate} />

          {posts.length === 0 ? (
            <PostsEmptyState onCreate={handleOpenCreate} />
          ) : (
            <Grid container spacing={3}>
              {posts.map(post => {
                return (
                  <Grid item xs={12} md={6} lg={4} key={post.postId || post._id}>
                    <PostCard post={post} onEdit={handleOpenEdit} onDelete={handleOpenDelete} />
                  </Grid>
                )
              })}
            </Grid>
          )}
        </Stack>
      </Container>

      <PostFormDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        title="Nueva Publicación"
        submitLabel="Crear"
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreate}
      />

      <PostFormDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        title="Editar Publicación"
        submitLabel="Guardar"
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleUpdate}
      />

      <DeletePostDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
        selectedPost={selectedPost}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
