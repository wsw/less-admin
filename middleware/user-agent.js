import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
const loginUrl = '/login'

window.onload = () => {
  NProgress.configure({ parent: '.n-progress' })
}

export default async ({ $axios, route, store, redirect, next, error }) => {
  const nextPath = route.path

  if (nextPath === '/error' || nextPath === loginUrl) {
    return
  }

  NProgress.start()
  if (store.state.token) {
    if (!store.state.user.userId) {
      try {
        await store.dispatch('currentUser')
      } catch (e) {

      } finally {
        NProgress.done()
      }
    }
  } else {
    NProgress.done()
    return redirect(loginUrl)
  }
  NProgress.done()
}
