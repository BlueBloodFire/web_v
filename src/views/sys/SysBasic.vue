<template>
  <div>
      <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="部门管理" name="first">
              <DepMana>

              </DepMana>
          </el-tab-pane>
          <el-tab-pane label="职位管理" name="second">
              <EcMana>

              </EcMana>
          </el-tab-pane>
          <el-tab-pane label="职称管理" name="third">
              <JobLevelMana>

              </JobLevelMana>
          </el-tab-pane>
          <el-tab-pane label="奖惩规则" name="fourth">
              <PermissionMana>

              </PermissionMana>
          </el-tab-pane>
          <el-tab-pane label="权限组" name="fifth">
              <PosMana>

              </PosMana>
          </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import DepMana from "@/components/sys/basic/DepMana.vue";
import EcMana from "@/components/sys/basic/EcMana.vue";
import JobLevelMana from "@/components/sys/basic/JobLevelMana.vue";
import PermissionMana from "@/components/sys/basic/PermissionMana.vue";
import PosMana from "@/components/sys/basic/PosMana.vue";
export default {
    name: "SysBasic",
    data() {
        return {
            activeName: 'second'
        }
    },
    components : {
      DepMana,
      EcMana,
      JobLevelMana,
      PermissionMana,
      PosMana
    }
}
</script>

<style scoped>

</style>
