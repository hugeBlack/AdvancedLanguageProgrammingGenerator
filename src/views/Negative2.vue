<script setup>

import {computed, ref} from "vue";

const target = ref('1101')

const numFormat = (str) => {
    let ans = ''
    for(let i = str.length - 8; i>=0; i-=8){
        ans = str.slice(i,i+8) + ans
        if(i!==0) ans = ' ' + ans
    }
    ans = str.slice(0, str.length % 8) + ans
    return ans;
}

const digitCount = computed(()=>{
    return rawBinaryStr.value.length
})

const rawBinaryStr = computed(()=>{
    return target.value.replaceAll(" ",'')
})

const targetInt32 = computed(()=> {
    let significant = rawBinaryStr.value.length
    let ans = 0;
    for(let i = 0;i < rawBinaryStr.value.length; i++){
        if(rawBinaryStr.value[i]==='1'){
            ans |= (1 << (rawBinaryStr.value.length - 1 - i))
        }
    }
    console.log(ans, significant)
    for(let i = significant;i<32;i++){
        ans |= (1 << i)
    }

    return ans
})

const minusOne = computed(()=>{
    let ans32Bit = ((targetInt32.value - 1)>>>0).toString(2)
    return numFormat(ans32Bit.slice(32-digitCount.value))
})

const orgBinary = computed(()=>{
    let org = minusOne.value
    org = org.replaceAll('0','#')
    org = org.replaceAll('1','0')
    org = org.replaceAll('#','1')
    return org
})

</script>

<template>
    <el-form class="input" :label-width="100">
        <el-form-item label="二进制表示：">
            <el-input v-model="target"/>
        </el-form-item>
    </el-form>
    <div class="result" :style="{width: (digitCount> 15? digitCount*40: 600)+'px'}">
        <el-row style="margin:20px 0">
            <el-col :span="7">补码-1</el-col>
            <el-col :span="7">原码（取反后得到）</el-col>
            <el-col :span="6">绝对值的十进制表示</el-col>
            <el-col :span="4">结果</el-col>

        </el-row>
        <el-row>
            <el-col :span="7">
                <div class="block2">
                    <div class="upper">
                        <span class="upperRight">-)</span>
                        <div class="upperLeft">
                            <p>{{ numFormat(rawBinaryStr) }}</p>
                            <p>1</p>
                        </div>
                    </div>

                    <p class="lower">
                        <span>{{ minusOne }}</span>
                    </p>
                </div>

            </el-col>
            <el-col :span="7">{{ orgBinary }}</el-col>
            <el-col :span="6">{{ Math.abs(targetInt32) }}</el-col>
            <el-col :span="4">-{{ Math.abs(targetInt32) }}</el-col>



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