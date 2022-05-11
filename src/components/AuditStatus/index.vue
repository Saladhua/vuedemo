<template>
  <div>
    <span v-if="data[stateField] == passValue" class="audit-pass">{{passText ? passText : data[stateField]}}</span>
    <el-tooltip v-if="data[stateField] == failValue" effect="dark" placement="top" :content="data[reasonField] ? '不通过原因:'+data[reasonField] : ''" class="audit-fail">
      <span style="cursor:pointer">{{failText ? failText : data[stateField]}}</span>
    </el-tooltip>
    <span v-if=" data[stateField] != passValue && data[stateField] != failValue" :class="defaultClass">{{ data[stateField] }}</span>
  </div>
</template>

<script>
// import { officeWeburl, fileUrl } from "@/api/static-url";
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }, stateField: {
      type: String,
      default: 'state'
    }, reasonField: {
      type: String,
      default: 'rejectReason'
    }, passValue: {
      type: String,
      default: '审核通过'
    }, failValue: {
      type: String,
      default: '审核不通过'
    }, passText: {
      type: String,
      default: ''
    }, failText: {
      type: String,
      default: ''
    }, defaultClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  }
};
</script>
