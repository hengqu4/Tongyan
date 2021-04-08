import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack'
]

const avatar = ['https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png'
]

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png'
]

const owner = [
  '付小小',
  '吴加好',
  '周星星',
  '林东东',
  '曲丽丽'
]

const content = '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。'
// const description = '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
const href = 'https://ant.design'
const description = [
  '堆，英文是 heap，在内存管理的语境下，指的是动态分配内存的区域。这个堆跟数据结构里的堆不是一回事。这里的内存，被分配之后需要手工释放，否则，就会造成内存泄漏。C++ 标准里一个相关概念是自由存储区，英文是 free store，特指使用 `new` 和 `delete` 来分配和释放内存的区域,。一般而言，这是堆的一个子集：',
  '即使在堆上面，现代化的高级语言也会有一些桎梏让你并不能随意的，随时随地的释放你认为可以释放的内存，很多语法概念中都蕴含了“栈”的概念。例如，一个C++的对象X，他有数据成员a和b, 现在我知道我不再使用X.a了，但是我还会使用X.b，有没有办法去“浅释放”X.a所占的sizeof(X.a)的内存呢？抱歉不行，你只能先释放X，在释放X的过程中去释放X.a和X.b（不能只释放一个）。而且这和X在堆还是在栈上分配没有任何关系。',
  '栈让你分配和释放简单化，但是他有一个重大缺点：释放的次序是固定的，必须是分配次序的反序。假设栈上对象分配次序是ABCDEF。 可能在某些情况时，我释放F的时候，A可以释放了但其他对象都不能释放；某些情况时我释放F的时候，B可以释放了但其他对象都不能释放.... 对不起 这些栈上对象都不能提前释放：ABCD必须等待F和E释放了之后才能释放。'
]
const article = (options) => {
  const queryParameters = getQueryParameters(options)
  console.log('queryParameters', queryParameters)
  if (queryParameters && !queryParameters.count) {
    queryParameters.count = 5
  }
  const data = []
  const likNum = 264,starNum = 30
  for (let i = 0; i < queryParameters.count; i++) {
    const tmpKey = i + 1
    const num = parseInt(Math.random() * (4 + 1), 10)
    data.push({
      id: tmpKey,
      avatar: avatar[num],
      owner: owner[num],
      content: content,
      // star: Mock.mock('@integer(1, 999)'),
      percent: Mock.mock('@integer(1, 999)'),
      // like: Mock.mock('@integer(1, 999)'),
      star: starNum - 7*i,
      like: likNum - (57*i),
      message: 2,
      // message: Mock.mock('@integer(1, 999)'),
      description: description[i%3],
      href: href,
      title: titles[ i % 8 ],
      updatedAt: Mock.mock('@datetime'),
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
          id: 'member1'
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
          id: 'member2'
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
          id: 'member3'
        }
      ],
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)]
    })
  }
  return builder(data)
}

Mock.mock(/\/list\/article/, 'get', article)
