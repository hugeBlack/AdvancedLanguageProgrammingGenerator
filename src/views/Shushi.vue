<script setup>
import {computed, ref} from "vue";

const baseStr = ref('2');
const target = ref('123.45')
const precise = 6

const removeZeros = (num) => {
    let formatted = num.toFixed(6).replace(/0+$/, '').replace(/\.+$/, '');
    return formatted;
}

const chars = '0123456789ABCDEF'

const val = computed(()=>{
    let ans = {
        intList:[],
        decList:[],
        final: -1,
        maxLength: 0,
        text: ''
    };

    let base = parseInt(baseStr.value)
    if(base < 2) return ans

    let t = parseFloat(target.value)
    let intPart = Math.floor(t)
    let decPart = t % 1

    let now = intPart
    ans.intList.push({v: ""+intPart, r: -1})

    while(now >= base){
        // v=value r=remainders
        let nextNow = Math.floor(now / base)
        let remainders = now % base;

        let valueText = removeZeros(nextNow)
        ans.intList.push({v: valueText, r:remainders})
        if(valueText.length > ans.maxLength) ans.maxLength = valueText.length
        ans.text = ('' + chars[remainders]) + ans.text
        now = nextNow
    }
    ans.text = ('' + chars[now]) + ans.text
    ans.final = now
    let decPartNow = decPart
    let nowPrecise = precise
    if(removeZeros(decPartNow)!=='0'){
        ans.text += '.'
    }
    while(nowPrecise > 0 && removeZeros(decPartNow)!=='0'){
        let result = decPartNow * base
        ans.decList.push({v:removeZeros(decPartNow), r:result})
        decPartNow = result % 1
        nowPrecise--;
        ans.text += '' + chars[Math.floor(result)]
    }
    return ans
})
</script>

<template>
    <el-form class="input" :label-width="100">
        <el-form-item label="10进制输入：">
            <el-input v-model="target" label=""/>
        </el-form-item>
        <el-form-item label="基：">
            <el-input v-model="baseStr"/>
        </el-form-item>
    </el-form>
    <div class="intPart" v-if="val.intList.length > 1 || val.final > 0">
        <div>整数部分：</div>
        <div class="vertical">
            <div class="block1" v-for="(item,index) in val.intList">
                <div>
                    <span class="divider">{{ baseStr }}</span>
                    <span class="number" :style="{padding: '2px ' + (5*(val.intList.length - index) + 2) + 'px', width: val.maxLength * 10 + 'px'}">{{ item.v }}</span>
                    <span class="result">{{ item.r === -1 ? ' ' : item.r }}</span>
                </div>
            </div>
            <div class="block1">
                <span class="final" :style="{width: val.maxLength * 10 + 'px'}">0</span>
                <span class="result">{{val.final}}</span>
            </div>
        </div>
    </div>
    <div class="decPart" v-if="val.decList.length > 0">
        <div>小数部分：</div>
        <div v-for="item in val.decList" class="block2">
            <div class="upper">
                <span class="upperRight">×</span>
                <div class="upperLeft">
                    <p>{{item.v}}</p>
                    <p>{{baseStr}}</p>
                </div>
            </div>

            <p class="lower">
                <span class="intPart">{{Math.floor(item.r)}}</span>
                <span>{{(removeZeros(item.r % 1)).slice(1)}}</span>
            </p>
        </div>
    </div>
    <div class="finalResult">
        <span>{{`(${target})`}}</span><sub>10</sub><span>{{`=(${val.text})`}}</span><sub>{{baseStr}}</sub>
    </div>
</template>

<style scoped>
.vertical {
    align-items: end;
    display: inline-flex;
    flex-direction: column;
}
.block1 .number{
    border-left: 2px solid #000;
    border-bottom: 2px solid #000;
    margin: 0 5px;
    display: inline-block;
}
.block1 .result{
    width: 20px;
    display: inline-block;
}
.block1 .final{
    margin: 0 5px;
    padding: 2px 5px;
    display: inline-block;
}

.decPart {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    justify-content: center;
}

.intPart {
    text-align: center;
}

.decPart p{
    margin: 0;
    text-align: end;
}

.upper {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    column-gap: 5px;
    border-bottom: 2px #000 solid;
}

.lower .intPart{
    font-weight: bold;
}

.finalResult {
    margin-top: 20px;
    font-weight: bold;
}

.input {
    margin-bottom: 10px;
}
</style>