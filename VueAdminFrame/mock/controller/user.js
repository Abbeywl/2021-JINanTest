const accessTokens = {
  admin: 'admin-accessToken',
  editor: 'editor-accessToken',
  test: 'test-accessToken',
}

module.exports = [
  {
    url: '/publicKey',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          mockServer: true,
          publicKey:
            'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBT2vr+dhZElF73FJ6xiP181txKWUSNLPQQlid6DUJhGAOZblluafIdLmnUyKE8mMHhT3R+Ib3ssZcJku6Hn72yHYj/qPkCGFv0eFo7G+GJfDIUeDyalBN0QsuiE/XzPHJBuJDfRArOiWvH0BXOv5kpeXSXM8yTt5Na1jAYSiQ/wIDAQAB',
        },
      }
    },
  },
  {
    url: '/connect/token',
    type: 'post',
    response(config) {
      const { username } = config.body
      const accessToken = accessTokens[username]
      if (!accessToken) {
        return {
          code: 500,
          msg: '帐户或密码不正确。',
        }
      }
      return {
        code: 200,
        msg: 'success',
        access_token: accessToken,
      }
    },
  },
  {
    url: '/register',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟注册成功',
      }
    },
  },
  {
    url: '/api/abp/application-configuration',
    type: 'get',
    response(config) {
      //const { accessToken } = config.body
      const accessToken = 'admin-accessToken'
      let permissions = {}
      let username = ''
      if ('admin-accessToken' === accessToken) {
        permissions = {
          'BIMPlatform.Attendance.Manage': true,
          'BIMPlatform.Attendance.Leave.Default': true,
          'BIMPlatform.Attendance.SheWolf.Manage': true,
          'BIMPlatform.Equipment.Manage': true,
          'BIMPlatform.Equipment.Video.Default': true,
          'BIMPlatform.Equipment.Environment.Default': true,
          'BIMPlatform.Equipment.Car.Default': true,
          'BIMPlatform.Equipment.TowerCrane.Default': true,
          'BIMPlatform.Equipment.Loadometer.Default': true,
          'BIMPlatform.Equipment.Elevator.Default': true,
          'BIMPlatform.Equipment.HighModulus.Default': true,
          'BIMPlatform.Equipment.DeepExcavation.Default': true,
          'BIMPlatform.QualityIssue.Manage': true,
          'BIMPlatform.SafetyIssue.Manage': true,
          'BIMPlatform.SupervisorLog.Manage': true,
          'BIMPlatform.EfficiencyAnalysis.Manage': true,
          'BIMPlatform.EfficiencyAnalysis.Default': true,
          BIMPlatform: true,
          'BIMPlatform.KnowledgeBase.Manage': true,
          'BIMPlatform.KnowledgeBase.QA.Default': true,
          'BIMPlatform.KnowledgeBase.Regulation.Default': true,
          'BIMPlatform.Document.Manage': true,
          'AbpTenantManagement.Tenants.ManageFeatures': true,
          'AbpTenantManagement.Tenants.ManageFeatures': true,
          'BIMPlatform.Project.Delete': true,
          'BIMPlatform.Project.Manage': true,
        }
        username = 'admin'
      }
      if ('editor-accessToken' === accessToken) {
        permissions = { editor: true }
        username = 'editor'
      }
      if ('test-accessToken' === accessToken) {
        permissions = { admin: true, editor: true }
        username = 'test'
      }
      return {
        code: 200,
        msg: 'success',
        auth: {
          grantedPolicies: permissions,
        },
        currentTenant: {
          id: null,
          name: '',
          isAvailable: false,
        },
        currentUser: {
          userName: username,
          id: null,
          email: '',
        },
        imgSrc: {
          'avatar|1': [
            'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
            'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
          ],
        },
      }
    },
  },
  {
    url: '/logout',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
  {
    url: '/api/abp/multi-tenancy/tenants/by-name/baidu',
    type: 'get',
    response() {
      return {
        name: 'baidu',
        success: false,
        tenantId: '4abcd-5asdf-6qwerr',
      }
    },
  },
]
