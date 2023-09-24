<script setup>

import {onBeforeMount, ref} from "vue";

const props = defineProps({
    totalLines: Number,
    data: Array
})

const data = ref([])
onBeforeMount(() => {
    for(let i = 0; i < props.totalLines;i++){
        if(i < props.totalLines - props.data.length){
            data.value.push(' ')
        }else{
            let t = props.data[props.totalLines - i - 1]
            data.value.push(t.getProcess ? t.getProcess() : t)
        }
    }
})

</script>

<template>
<div class="stackItemHolder">
    <p v-for="i in data">{{i}}</p>
</div>
</template>

<style scoped>
.stackItemHolder {
    display: block;
    text-align: center;
    padding: 0 5px 5px 5px;
    border-left: 2px #000 solid;
    border-right: 2px #000 solid;
    border-bottom: 2px #000 solid;
}

.stackItemHolder>p{
    margin-top: 5px;
    width: 100px;
    height: 1.25em;
}
</style>