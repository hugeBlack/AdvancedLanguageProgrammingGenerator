<script setup>
import {computed, ref} from "vue";

const baseStr = ref("8")
const target = ref("123")

const getCharValue = (ch) => {
    if(ch>='0' && ch <= '9') return ch.charCodeAt(0) - 48
    else if(ch>='A' && ch <= 'F') return ch.charCodeAt(0) - 55
    else throw "INVALID CHAR"
}

const val = computed(()=> {
    let ans = {
        ls:[],
        upperTarget: target.value.toUpperCase(),
        result: 0
    }
    let baseInt = parseInt(baseStr.value)
    let nowPower = ans.upperTarget.indexOf('.') === -1 ? ans.upperTarget.length - 1 : ans.upperTarget.indexOf('.') - 1
    let rawTarget = ans.upperTarget.replace('.','')
    for(let i = 0; i< rawTarget.length; i++){
        let digit = getCharValue(rawTarget[i])
        ans.ls.push({d:digit, p:nowPower})
        ans.result += digit * Math.pow(baseInt, nowPower)
        nowPower--;
    }
    return ans
})

</script>

<template>
    <el-form class="input" :label-width="80">
        <el-form-item label="输入：">
            <el-input v-model="target" label=""/>
        </el-form-item>
        <el-form-item label="基：">
            <el-input v-model="baseStr"/>
        </el-form-item>
    </el-form>
    <p class="result">
        <span>{{ `(${val.upperTarget})` }}</span><sub>{{ baseStr }}</sub><span> = </span>
        <span v-for="(item,index) in val.ls">
            <span>{{ `${item.d}×${baseStr}` }}</span>
            <sup>{{item.p}}</sup>
            <span v-if="index !== val.ls.length - 1">+</span>
        </span>
        <span> = </span><span>{{ `(${val.result})` }}</span><sub>10</sub>
    </p>
</template>

<style scoped>

</style>