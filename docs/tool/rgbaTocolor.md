# rgba去除透明

思路：使用相近的16进制颜色代替rgba的颜色，具体方法使用加权平均数转换方法；

## 原理

最终颜色取决于透明颜色将应用到的背景。它只是颜色和背景之间的加权平均值，权重是alpha：

```
Color = Color * alpha + Bkg * (1 - alpha);
```


```
// 加权平均数计算公式
加权平均数 = (x1f1 + x2f2 + x3f3 + ... + xnfn) / (f1 + f2 + f3 + ... + fn)
```

三种颜色分别是（假设rgba(0,129,255,.4),背景颜色为白色#fff）：

```
Red = 0 * 0.4 + 255 * 0.6 = 153
Green = 129 * 0.4 + 255 * 0.6 = 204,6
Blue = 255 * 0.4 + 255 * 0.6 = 255
```

## 具体代码

```javascript
// 背景色为白色#fff(rgb(255,255,255))
function hexify(color) {
  let values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');
  let a = parseFloat(values[3] || 1),
      r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
      g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
      b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
  return "#" +
    ("0" + r.toString(16)).slice(-2) +
    ("0" + g.toString(16)).slice(-2) +
    ("0" + b.toString(16)).slice(-2);
}

hexify('rgba(0,129,255,0.4)');
```

## 参考

- [将RGBA颜色转换为16进制的颜色](https://blog.csdn.net/wu_xianqiang/article/details/81587780)
- [如何将RGBA转换为透明调整的十六进制？](https://cloud.tencent.com/developer/ask/39221)

