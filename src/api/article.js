import request from '@/utils/request'

export const getarticleList = ({ current, pageSize }) => {
  return request.get('/admin/interview/query', {
    params: {
      current,
      pageSize
    }
  })
}
