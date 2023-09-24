<script setup>

import {computed, ref} from "vue";
import {ElMessage} from "element-plus";

const target = ref('11111111111111110111111111111010')
const numFormat = (str) => {
    let ans = {
        str: '',
        ls: []
    }
    for(let i = str.length - 8; i>=0; i-=8){
        let now = str.slice(i,i+8)
        ans.str = now + ans.str
        if(i!==0) ans.str = ' ' + ans.str
        ans.ls.push(now)
    }
    let now = str.slice(0, str.length % 8)
    if(now.length>0){
        ans.ls.push(now)
        ans.str = now + ans.str
    }
    ans.ls = ans.ls.reverse()
    return ans;
}

const val = computed(()=>{
    return numFormat(target.value.replaceAll(" ",''))
})

const copyAns = (byteCount) => {
    let len = val.value.ls.length
    if(byteCount> len) byteCount = len;
    let ans =  val.value.ls.slice(len - byteCount,len).join(' ')
    console.log(ans)
    navigator.clipboard.writeText(ans).then(()=>{
        ElMessage.success("Copied to clipboard.")
    })
}
</script>

<template>
    <el-form class="input" :label-width="100">
        <el-form-item label="二进制表示：">
            <el-input v-model="target"/>
        </el-form-item>
    </el-form>
    <div class="result">
        <p>结果</p>
        <p>{{val.str}}</p>
        <p>
            <el-button @click="copyAns(1)">Copy 8</el-button>
            <el-button @click="copyAns(2)">Copy 16</el-button>
            <el-button @click="copyAns(4)">Copy 32</el-button>
            <el-button @click="copyAns(8)">Copy 64</el-button>
        </p>
    </div>
</template>

<style scoped>

</style>