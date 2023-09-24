<script setup>
import {ref} from "vue";
import Stack from "@/components/Stack.vue";

const target = ref('')

const operators = {
    "<<=": {priority: 15, associativity: "right"},
    ">>=": {priority: 15, associativity: "right"},

    "++": {priority: 3, associativity: "right"},
    "--": {priority: 3, associativity: "right"},

    "=": {priority: 15, associativity: "right"},
    "+=": {priority: 15, associativity: "right"},
    "-=": {priority: 15, associativity: "right"},
    "*=": {priority: 15, associativity: "right"},
    "/=": {priority: 15, associativity: "right"},
    "%=": {priority: 15, associativity: "right"},
    "^=": {priority: 15, associativity: "right"},
    "&=": {priority: 15, associativity: "right"},
    "|=": {priority: 15, associativity: "right"},

    "<=": {priority: 8, associativity: "left"},
    ">=": {priority: 8, associativity: "left"},
    "&&": {priority: 13, associativity: "left"},
    "||": {priority: 14, associativity: "left"},

    "<<": {priority: 7, associativity: "left"},
    ">>": {priority: 7, associativity: "left"},
    "==": {priority: 9, associativity: "left"},
    "!=": {priority: 9, associativity: "left"},

    "+": {priority: 6, associativity: "left"},
    "-": {priority: 6, associativity: "left"},
    "*": {priority: 5, associativity: "left"},
    "/": {priority: 5, associativity: "left"},
    "%": {priority: 5, associativity: "left"},
    "^": {priority: 4, associativity: "right"},

    "<": {priority: 8, associativity: "left"},
    ">": {priority: 8, associativity: "left"},

    "!": {priority: 3, associativity: "right"},
    "&": {priority: 10, associativity: "left"},
    "|": {priority: 12, associativity: "left"},
    "~": {priority: 3, associativity: "right"},
    ",": {priority: 16, associativity: "left"},

    "(": {priority: Infinity, associativity: ""},
    ")": {priority: Infinity, associativity: ""},

}

let getNumChar = (num) => {
    if(num > 0 && num < 21) return '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳'[num-1]
    else return '(' + num + ')';
}


const tokenize = (exp) => {
    exp = exp.replaceAll(" ", '')
    let ls = [{str: exp, op: false}]
    for(let op in operators){
        let l = ls.length
        for(let i =0;i<l; i++){
            let now = ls.shift()
            if(now.op){
                ls.push(now)
            } else {
                let breakDown = now.str.split(op)
                let l2 = breakDown.length
                for(let j = 0; j< l2; j++){
                    if(breakDown[j]!=='')
                        ls.push({str:breakDown[j], op: false})
                    if(j !== l2-1) ls.push({str:op, op: true})
                }
            }
        }
    }
    return ls
}

const generate = (tokenizedList) => {
    /*
        要进栈的op优先级高于（值小于）栈顶op，或者等于且栈顶op为right则进栈，或者栈顶是"（"
        要进栈的op优先级低于（值大于）栈顶op，或者等于且栈顶op为left则持续出栈出栈
        要进栈的op为"（"，则直接进栈
        要进栈的op为"）"，则持续出栈，直到遇到"（"，"）"不进栈
     */
    let opStack = [] // 直接存str，不要存对象
    let symbolStack = []

    let process = []
    let snapshots = ref([])

    let idMax = 1
    let maxLine = 5

    const createSnapShot = (desc) => {
        let newSnapshot = {
            op: [...opStack],
            symbol: [...symbolStack],
            desc: desc
        }
        maxLine = Math.max(opStack.length, symbolStack.length, maxLine)
        snapshots.value.push(newSnapshot)
    }

    const pop2Insert1 = () => {
        let a = symbolStack.pop()
        let b = symbolStack.pop()
        let op = opStack.pop()
        function Symbol(){
            this.val ={
                l: b,
                r: a,
                op: op
            }
            this.id = idMax
            this.getDesc = () => {
                return "式" + getNumChar(this.id)
            }
            this.getProcess = () => {
                return this.val.l.getDesc() + " " + op + " " + this.val.r.getDesc()
            }
        }
        let newSymbol = new Symbol()
        symbolStack.push(newSymbol)
        process.push(newSymbol)
        createSnapShot(`计算 ${newSymbol.getProcess()}`)
        idMax += 1
    }

    const insertSimpleToken = (token) => {
        function Symbol(){
            this.val = token
            this.id = -1
            this.getDesc = () => {
                return this.val.str
            }
            this.getProcess = () => {
                return this.val.str
            }
        }
        let newSymbol = new Symbol()
        symbolStack.push(newSymbol)
        createSnapShot(`${token.str} 进栈`)
    }

    const peek = (arr) => arr.length > 0 ? arr[arr.length - 1] : null

    const checkCanPush = (token) => {
        if(opStack.length === 0) return true;
        if (operators[token.str].priority < operators[peek(opStack)].priority) {
            return true
        } else if (operators[token.str].priority > operators[peek(opStack)].priority) {
            return false
        } else {
            return operators[peek(opStack)].associativity === 'right';
        }
    }

    for(let token of tokenizedList){
        if(!token.op) {
            insertSimpleToken(token)
        } else {
            if(token.str==='('){
                opStack.push(token.str)
                createSnapShot("'(' 进栈")
            } else if (token.str===')') {
                while(peek(opStack) !== '('){
                    pop2Insert1()
                }
                opStack.pop()  // 抛弃左括号
                createSnapShot("'(' 出栈")
            } else {
                while(!checkCanPush(token)){
                    pop2Insert1()
                }
                opStack.push(token.str)
                createSnapShot(`${token.str} 进栈`)
            }
        }
    }
    while(opStack.length !== 0){
        pop2Insert1()
    }
    return {
        process: process,
        snapshots: snapshots,
        maxLine: maxLine
    }
}

let val = ref({
    process: [],
    snapshots: [],
    maxLine: 5
})

const start = () => {
    let ls = tokenize(target.value)
    val.value = generate(ls)
}

</script>

<template>
    <p class="desc">说明：只支持双目运算符</p>
    <el-form class="input" :label-width="120">
        <el-form-item label="合法的表达式：">
            <el-input v-model="target" label=""/>
        </el-form-item>
        <el-button @click="start">生成</el-button>
    </el-form>
    <div class="resultProcess">
        <p v-for="item in val.process">{{ `步骤${getNumChar(item.id)}: ${item.getProcess()}    => ${item.getDesc()}`}}</p>
    </div>
    <div class="stackGrid">
        <div v-for="s in val.snapshots">
            <div class="stackHolder">
                <Stack :data="s.symbol" :total-lines="val.maxLine"/>
                <Stack :data="s.op" :total-lines="val.maxLine"/>
            </div>
            <p class="stackDesc">{{ s.desc }}</p>
        </div>

    </div>
</template>

<style scoped>
.resultProcess>p{
    margin: 3px 0;
}

.stackGrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 10px 0;
    row-gap: 30px;
}

.stackHolder {
    text-align: center;
    display: flex;
    width: 100%;
    justify-content: center;
}

.stackDesc {
    margin-top: 10px;
    text-align: center;
}

.stackHolder>* {
    margin: 0 10px;
}
.desc {
    margin-bottom: 10px;
}
</style>