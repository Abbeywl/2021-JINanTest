<template>
  <div class="companyManage-container">
    <div class="panel">
      <div class="panel-heading">
        <h4 class="panel-title">公司</h4>
      </div>
      <div class="panel-body">
        <div class="form-inline">
          <vxe-input
            v-model="tablePage3.Name"
            type="search"
            placeholder="公司搜索"
            @change="findList3"
          ></vxe-input>
          <vxe-button @click="CreateModel = true">
            <i class="vxe-icon--circle-plus"></i>
            创建公司
          </vxe-button>
        </div>
        <vxe-toolbar
          print
          export
          :refresh="{ query: findList3 }"
          custom
        ></vxe-toolbar>
        <vxe-table
          stripe
          highlight-current-row
          highlight-hover-row
          :print-config="{}"
          :export-config="{}"
          :loading="loading3"
          :data="tableData3.rows"
          empty-text="没有更多数据了！"
        >
          <vxe-table-column
            type="seq"
            width="60"
            title="序号"
          ></vxe-table-column>
          <vxe-table-column
            field="Name"
            title="公司名称"
            sortable
          ></vxe-table-column>
          <vxe-table-column
            field="Abbreviation"
            title="公司简写"
            sortable
          ></vxe-table-column>
          <vxe-table-column
            field="RegisterNo"
            title="注册编号"
            sortable
          ></vxe-table-column>
          <vxe-table-column
            field="Email"
            title="邮箱"
            sortable
          ></vxe-table-column>
          <vxe-table-column
            field="Mobile"
            title="联系电话"
            sortable
          ></vxe-table-column>
          <vxe-table-column field="UnderConstruction" title="公司成员" sortable>
            <template #default="{ row }">
              <a href="" target="_black" :rowid="row.ID">查看成员</a>
            </template>
          </vxe-table-column>
          <vxe-table-column field="" title="操作" width="100">
            <template #default="{ row }">
              <vxe-button
                status="primary"
                icon="iconfont iconbianji"
                title="编辑"
                circle
                @click="editRowEvent(row)"
              ></vxe-button>
              <vxe-button
                status="warning"
                icon="iconfont iconshanchu"
                title="删除"
                circle
                @click="removeRowEvent(row)"
              ></vxe-button>
            </template>
          </vxe-table-column>
        </vxe-table>
        <vxe-pager
          background
          size="small"
          :loading="loading3"
          :current-page="tablePage3.currentPage"
          :page-size="tablePage3.pageSize"
          :total="tableData3.totalResult"
          :page-sizes="[
            10,
            20,
            100,
            { label: '大量数据', value: 1000 },
            { label: '全量数据', value: -1 },
          ]"
          :layouts="[
            'PrevPage',
            'JumpNumber',
            'NextPage',
            'FullJump',
            'Sizes',
            'Total',
          ]"
          @page-change="handlePageChange3"
        ></vxe-pager>
      </div>
    </div>
    <vxe-modal
      id="CreateModel"
      v-model="CreateModel"
      :loading="loadCreate"
      width="800"
      height="80vh"
      min-width="460"
      min-height="320"
      resize
      transfer
    >
      <template #title>
        <span style="color: #fff">创建公司</span>
      </template>
      <template #default>
        <vxe-form
          ref="xForm"
          class="my-form"
          title-align="left"
          title-width="100"
          :data="formCreate"
          :rules="ruleCreate"
          @submit="submitEvent2"
          @reset="resetEvent"
        >
          <vxe-form-item title="公司名称" field="Name" span="24">
            <template #default="scope">
              <vxe-input
                v-model="formCreate.Name"
                placeholder="请输入公司名称"
                clearable
                @input="$refs.xForm.updateStatus(scope)"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item title="公司简称" field="Abbreviation" span="24">
            <template #default>
              <vxe-input
                v-model="formCreate.Abbreviation"
                placeholder="请输入公司简称"
                clearable
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item title="注册编号" field="RegisterNo" span="24">
            <template #default>
              <vxe-input
                v-model="formCreate.RegisterNo"
                placeholder="请输入注册编号"
                clearable
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item title="公司描述" field="Note" span="24">
            <template #default>
              <vxe-textarea
                v-model="formCreate.Note"
                placeholder="请输入公司描述"
                clearable
              ></vxe-textarea>
            </template>
          </vxe-form-item>
          <vxe-form-item title="公司地址" field="Address" span="24">
            <template #default>
              <vxe-input
                v-model="formCreate.Address"
                placeholder="请输入公司地址"
                clearable
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item title="公司网站" field="WebAddress" span="24">
            <template #default>
              <vxe-input
                v-model="formCreate.WebAddress"
                placeholder="请输入公司网站"
                clearable
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item title="公司邮箱" field="Email" span="24">
            <template #default>
              <vxe-input
                v-model="formCreate.Email"
                placeholder="请输入公司邮箱"
                clearable
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item title="公司电话" field="Mobile" span="24">
            <template #default>
              <vxe-input
                v-model="formCreate.Mobile"
                placeholder="请输入公司电话"
                clearable
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item title="公司负责人" field="PrincipalDataInfo" span="24">
            <template #default>
              <vxe-form
                ref="xFormPrin"
                class="my-formPrin"
                title-align="left"
                title-width="100"
                :data="formCreate.PrincipalDataInfo"
                :rules="ruleCreate.rulePrin"
              >
                <vxe-form-item title="姓名" field="UserName" span="24">
                  <template #default="scoped">
                    <vxe-input
                      v-model="formCreate.PrincipalDataInfo.UserName"
                      placeholder="请输入姓名"
                      clearable
                      @input="$refs.xFormPrin.updateStatus(scoped)"
                    ></vxe-input>
                  </template>
                </vxe-form-item>
                <vxe-form-item title="电话" field="UserMobilePhone" span="24">
                  <template #default>
                    <vxe-input
                      v-model="formCreate.PrincipalDataInfo.UserMobilePhone"
                      placeholder="请输入电话"
                      clearable
                    ></vxe-input>
                  </template>
                </vxe-form-item>
                <vxe-form-item title="邮箱" field="UserEmail" span="24">
                  <template #default>
                    <vxe-input
                      v-model="formCreate.PrincipalDataInfo.UserEmail"
                      placeholder="请输入邮箱"
                      clearable
                    ></vxe-input>
                  </template>
                </vxe-form-item>
                <vxe-form-item title="账号" field="Account" span="24">
                  <template #default="scoped">
                    <vxe-input
                      v-model="formCreate.PrincipalDataInfo.Account"
                      placeholder="请输入账号"
                      clearable
                      @input="$refs.xFormPrin.updateStatus(scoped)"
                    ></vxe-input>
                  </template>
                </vxe-form-item>
                <vxe-form-item title="密码" field="Password" span="24">
                  <template #default="scoped">
                    <vxe-input
                      v-model="formCreate.PrincipalDataInfo.Password"
                      placeholder="请输入密码"
                      clearable
                      @input="$refs.xFormPrin.updateStatus(scoped)"
                    ></vxe-input>
                  </template>
                </vxe-form-item>
                <vxe-form-item
                  title="再次确认密码"
                  field="CheckPassword"
                  span="24"
                >
                  <template #default="scoped">
                    <vxe-input
                      v-model="formCreate.PrincipalDataInfo.CheckPassword"
                      placeholder="请再次输入密码"
                      clearable
                      @input="$refs.xFormPrin.updateStatus(scoped)"
                    ></vxe-input>
                  </template>
                </vxe-form-item>
              </vxe-form>
            </template>
          </vxe-form-item>
          <vxe-form-item title="可选模块" field="mokuai" span="24">
            <template #default>
              <vxe-checkbox-group v-model="mokuaiItem">
                <vxe-checkbox
                  v-for="(value, index) in menTemplates"
                  :key="index"
                  :label="index"
                  :content="value.DisplayName"
                ></vxe-checkbox>
              </vxe-checkbox-group>
            </template>
          </vxe-form-item>
          <vxe-form-item align="right" span="24">
            <template #default>
              <vxe-button type="submit" status="primary">基本表单</vxe-button>
              <vxe-button type="reset">重置</vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
    </vxe-modal>
  </div>
</template>

<script>
  import { getList, getMenuTemplates } from '@/api/GetOrganization'
  import { isCheckForm } from '@/utils/validate'
  export default {
    name: 'CompanyManage',
    components: {},
    data() {
      return {
        nodeEnv: process.env.NODE_ENV,
        loading3: false,
        loadCreate: false,
        CreateModel: false,
        tableData3: {
          rows: [],
          totalResult: 0,
        },
        tablePage3: {
          currentPage: 1,
          pageSize: 10,
          Name: '',
        },
        formCreate: {
          Name: '',
          Abbreviation: '',
          RegisterNo: '',
          Note: '',
          Address: '',
          WebAddress: '',
          Email: '',
          Mobile: '',
          PrincipalDataInfo: {
            UserName: '',
            UserMobilePhone: '',
            UserEmail: '',
            Account: '',
            Password: '',
            CheckPassword: '',
          },
        },
        ruleCreate: {
          Name: [
            { required: true, message: '请输入公司名称' },
            { min: 3, message: '长度在 3 到 5 个字符' },
          ],
          rulePrin: {
            UserName: [{ required: true, message: '请输入姓名' }],
            Account: [{ required: true, message: '请输入账号' }],
            Password: [{ required: true, message: '请输入密码' }],
            CheckPassword: [{ required: true, message: '请再次输入密码' }],
          },
        },
        menTemplates: [],
      }
    },
    created() {
      this.findList3()
      this.findGetMenuTemplates()
    },
    mounted() {},
    methods: {
      async findList3() {
        this.loading3 = true
        var data = await getList(this.tablePage3)
        this.tableData3.rows = data.data
        this.tableData3.totalResult = data.totalCount
        this.loading3 = false
      },
      handlePageChange3({ currentPage, pageSize }) {
        this.tablePage3.currentPage = currentPage
        this.tablePage3.pageSize = pageSize
        this.findList3()
      },
      async submitEvent2() {
        this.loadCreate = true
        var isCheck = await isCheckForm(this, ['xForm', 'xFormPrin'])
        if (isCheck) {
          this.loadCreate = false
          this.$XModal.message({ message: '验证成功', status: 'success' })
        } else {
          this.loadCreate = false
          return
        }
      },
      resetEvent() {
        this.$XModal.message({ message: '重置事件', status: 'info' })
      },
      async findGetMenuTemplates() {
        const { data } = await getMenuTemplates()
        this.menTemplates = data
      },
    },
  }
</script>
<style lang="scss" scoped>
  .companyManage-container {
    .panel > .panel-heading {
      display: flex;
      flex: 1;
      flex-wrap: nowrap;
      align-items: center;
      padding: 10px 15px;
      margin: -20px -20px 0px -20px;
      color: #fff;
      background: #1d2226;
      border: none;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      .panel-title {
        flex: 1;
        margin-top: 0;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 20px;
        color: inherit;
      }
    }
    .form-inline {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }
    ::v-deep {
      .el-card__body {
        > div {
          min-height: 220px;
          padding: 20px;

          > ul {
            > li {
              line-height: 30px;
            }
          }

          > img {
            display: block;
            margin: 40px auto;
            border: 1px solid #dedede;
          }
        }
      }
    }
  }
  ::v-deep {
    .my-formPrin.vxe-form {
      padding: 0.7em 0;
      border: 1px solid #dcdfe6;
      .vxe-form--item.is--title:not(.is--required) {
        .vxe-form--item-title {
          padding-left: 20px;
        }
      }
    }
    .vxe-checkbox-group {
      width: 100%;
      .vxe-checkbox {
        width: 25%;
        margin: 0;
        line-height: 30px;
      }
    }
  }
</style>
