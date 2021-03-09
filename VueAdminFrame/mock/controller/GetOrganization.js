const { mock } = require('mockjs')
const List = []
const GetMenuTemplates = []
const count = 50
for (let i = 0; i < count; i++) {
  List.push(
    mock({
      ID: '@id',
      Name: '@ctitle(1, 11)',
      Abbreviation: '@ctitle(1,5)',
      RegisterNo: '@integer(300, 5000)',
      Email: '@email',
      Mobile: '@integer(300, 5000)',
    })
  )
}
for (let i = 0; i < 23; i++) {
  GetMenuTemplates.push(
    mock({
      ID: '@id',
      Name: '@title(1, 10)',
      DisplayName: '@ctitle(4, 5)',
    })
  )
}
module.exports = [
  {
    url: '/GetOrganization/getList',
    type: 'get',
    response: (config) => {
      const { Name, currentPage, pageSize } = config.query

      let mockList = List.filter((item) => {
        if (Name && item.Name.indexOf(Name) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (item, index) =>
          index < pageSize * currentPage &&
          index >= pageSize * (currentPage - 1)
      )

      return {
        code: 200,
        msg: 'success',
        totalCount: mockList.length,
        data: pageList,
      }
    },
  },
  {
    url: '/GetOrganization/doEdit',
    type: 'post',
    response: () => {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/GetOrganization/doDelete',
    type: 'post',
    response: () => {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
  {
    url: '/GetOrganization/GetMenuTemplates',
    type: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: GetMenuTemplates,
      }
    },
  },
]
