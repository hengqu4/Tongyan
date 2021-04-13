[TOC]

# 注水区

## 2021.4.7

### 学习VUE

《1天速出VUE：从入门到放弃》

## 2021.4.8

### VUE父子组件

> https://blog.csdn.net/qq_37994886/article/details/98742513

三种传值方法，数组传值最简单

### 寻找富文本

1.wangEditor 

> https://doc.wangeditor.com/

## 2021.4.9

### VUE获取元素属性

获取元素DOM

要在mounted中使用，因为只有在执行mounted的时候，vue已经渲染了dom节点，这个时候是可以获取dom节点的，vue中尽量不去操作dom元素，选用ref操作属性获取

```
 m
```

获取元素CSS

```

```



### 处理长文本

#### 只是省略

组件\<ellipsis>

```vue
<ellipsis :length="160" tooltip>
	{{ description }}
</ellipsis>
```

filter过滤器

```vue
<template>
	<slot>
        {{ description | capitalize }}
    </slot>
</template>

<script>
export default {
	filters: {
    capitalize: function (value) {
      if(!value) 
        return ''
      value = value.toString()
      if(value.length > 100) {
        return value.substr(0,100)
      } else {
        return value
      }
    }
  }
}
</script>
```

#### 展开&折叠

> https://blog.csdn.net/Mr_carry/article/details/100080032
>
> https://blog.csdn.net/weixin_39584405/article/details/111136864

```vue
<template>
  <div>
  <div :class="{'text-ellipsis': !isExpend}" class="text-expend">
    {{ longText }} 
  </div>
  <el-button 
    type="text" 
    :icon="isExpend?'el-icon-arrow-up':'el-icon-arrow-down'"
    @click="expendClick" 
  >
    {{isExpend? '收起': '展开' }}
  </el-button>
  </div>
</template>

<script>
export default {
  name: 'ListContent',
  props: {
    longText: {
      type: String,
      default: ''
    }
  },
  data(){
    return{
      isExpend: false
    }
  },
  methods:{
    expendClick(){
      this.isExpend = !this.isExpend
    }
  }
}

</script>

<style lang="less" scoped>
.text-ellipsis{
  line-height: 22px;
  white-space:pre-line;
  overflow: hidden;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.text-expend {
  line-height: 22px;
}
.expend-btn{
  float:right;
}
</style>
```

### VUE生命周期

> https://blog.csdn.net/Sheng_zhenzhen/article/details/104623260
>
> https://www.jianshu.com/p/672e967e201c

| 生命周期               | 触发时间                                                     | 备注 |
| ---------------------- | ------------------------------------------------------------ | ---- |
| beforeCreate           | 实例初始化之前，数据观测和事件配置之前。el 和 data 并未初始化，无法访问methods， data， computed等函数，el，data，message 都是 underfined。 |      |
| created                | 完成了data、methods 数据的初始化，el没有。 挂载阶段还没有开始。可以调用methods中的方法，改变data中的数据，并且修改可以通过vue的响应式绑定体现在页面上。通常**初始化数据**。 |      |
| beforeMount            | 已经编译模板，把data里面的数据和模板生成html，完成了el和data 初始化。挂载开始之前，此时还没有挂在html到页面上。 |      |
| mounted                | 挂载完成，模板中的HTML渲染到HTML页面。此时一般可以做ajax操作，mounted只会执行一次。**发送请求数据**。 |      |
| beforeUpdate           | 在数据更新之前被调用，发生在虚拟DOM重新渲染和打补丁之前，可以在该钩子中进一步地更改状态，不会触发附加地重渲染过程。 |      |
| updated                | 由于数据更改、导致虚拟DOM重新渲染和打补丁时会调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作，然后在大多是情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环，该钩子在服务器端渲染期间不被调用 |      |
| beforeDestroy          | 实例销毁之前调用，实例仍然完全可用。可以用this来获取实例；通常做一些重置的操作，比如清除掉组件中的定时器和监听的dom。 |      |
| destroyed              | 实例销毁之后调用，调用后，所以的事件监听器会被移出，所有的子实例也会被销毁，该钩子在服务器端渲染期间不被调用。 |      |
| activated              | keep-alive 缓存组件被显示出来时                              |      |
| deactivated            | 缓存的组件隐藏时                                             |      |
| errorCaptured(a, b, c) | 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。 |      |

![生命周期图.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9jZG4ubmxhcmsuY29tL3l1cXVlLzAvMjAyMC9wbmcvNTMwNzY0LzE1ODIxMTM2NzcxNTctMThmZjMzM2QtODdlNC00NjQ3LWI0ZWEtNzdjZGZkOTEwMWYwLnBuZw?x-oss-process=image/format,png#align=left&display=inline&height=745&name=%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE.png&originHeight=3039&originWidth=1200&size=77677&status=done&style=none&width=294)

### next

