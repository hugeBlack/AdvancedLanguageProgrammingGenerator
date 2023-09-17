<script setup>

import {computed, ref} from "vue";

const digitCount = ref('16')
const target = ref('123')

const numFormat = (str) => {
    let ans = ''
    for(let i = str.length - 8; i>=0; i-=8){
        ans = str.slice(i,i+8) + ans
        if(i!==0) ans = ' ' + ans
    }
    ans = str.slice(0, str.length % 8) + ans
    return ans;
}

const absBinary = computed(()=>{
    return numFormat(parseInt(target.value).toString(2))
})

const orgBinary = computed(() => {
    let org = parseInt(target.value).toString(2)
    while(org.length<parseInt(digitCount.value)){
        org = '0' + org
    }
    return numFormat(org)
})

const complementBinary = computed(()=> {
    let org = parseInt(target.value).toString(2)
    org = org.replaceAll('0','#')
    org = org.replaceAll('1','0')
    org = org.replaceAll('#','1')
    while(org.length<parseInt(digitCount.value)){
        org = '1' + org
    }
    return numFormat(org)
})

const resultBinary = computed(()=>{
    let dCount = parseInt(digitCount.value)
    let org = ((~(parseInt(target.value)) + 1)>>>0).toString(2)
    while(org.length<dCount){
        org = '0' + org
    }
    if(org.length>dCount){
        org = org.slice(org.length-dCount, org.length)
    }
    return numFormat(org)
})

</script>

<template>
    <el-form class="input" :label-width="80">
        <el-form-item label="绝对值：">
            <el-input v-model="target"/>
        </el-form-item>
        <el-form-item label="位数：">
            <el-input v-model="digitCount"/>
        </el-form-item>
    </el-form>
    <div class="result" :style="{width: (digitCount> 15? digitCount*40: 600)+'px'}">
        <el-row style="margin:20px 0">
            <el-col :span="4">数值</el-col>
            <el-col :span="6">绝对值的二进制表示</el-col>
            <el-col :span="7">原码</el-col>
            <el-col :span="7">补码</el-col>
        </el-row>
        <el-row>
            <el-col :span="4">-{{target}}</el-col>
            <el-col :span="6">{{ absBinary }}</el-col>
            <el-col :span="7">{{ orgBinary }}</el-col>
            <el-col :span="7">
                <div class="block2">
                    <div class="upper">
                        <span class="upperRight">+)</span>
                        <div class="upperLeft">
                            <p>{{ complementBinary }}</p>
                            <p>1</p>
                        </div>
                    </div>

                    <p class="lower">
                        <span>{{resultBinary}}</span>
                    </p>
                </div>

            </el-col>
        </el-row>
    </div>



</template>

<style scoped>
.input {
    margin-bottom: 10px;
}

.upper {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    column-gap: 5px;
    border-bottom: 2px #000 solid;
}

.block2 p {
    text-align: end;
    margin-block-start: 0 !important;
    margin-block-end: 0 !important;
}
</style>