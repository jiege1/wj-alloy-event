
### props 
AlloyEvent(element, triggers, config)

### Example

```js
  import AlloyEvent from 'wj-alloy-event';

  const alloyEvent = new AlloyEvent(
    document.getElementById('eventBox'), {
      onTap: () => {
        console.log('onTap');
      },
      onSingleTap: () => {
        console.log('onSingleTap');
      },
      onDoubleTap: () => {
        console.log('onDoubleTap');
      },
      onLongPress: () => {
        console.log('onLongPress');
      },
      onSwipe: (e) => {
        console.log(e);
      },
    }, {
      swipePercent: 0.02,
    }
  );
```

### triggers
支持的手势事件
```js
 let triggers = {
  onTap: () => {},
  onSingleTap: () => {},
  onDoubleTap: () => {},
  onLongPress: () => {},
  onSwipe: () => {},
 }
```

### config
配置项
```js
  let config = {
    swipePercent: 0.02, // 触发滑动的横向屏比()
    doubleInterval: 200, // 触发双击的间隔时间(ms)
    longPressTime: 500, // 长按触发时间(ms)
  };
```
