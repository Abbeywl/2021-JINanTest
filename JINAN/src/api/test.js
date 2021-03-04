import { get } from '../utils/request'

export default {
  getData(params) {
    return get('/api/Project/HasProject/', params)
  }

}