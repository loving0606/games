var games = document.querySelector('#main .games');
//选取所有item元素

for (var i = 0; i < 16; i++) {
    var item = document.createElement('li')
    item.setAttribute('class', 'item')
    item.setAttribute('data-id', i)
    games.appendChild(item)
}
//获取开始按钮，点击按钮开始游戏
var btn = document.getElementById('btn')
btn.addEventListener('click', start);
//接收键盘上下左右键

// function keys(e) {
//     alert(e.keyword)
// }


//开始游戏
var items = document.getElementsByClassName('item');
var activeNum
var activeKey
var largeNum = [0, 1, 2, 3, 4, 7, 8, 11, 12, 13, 14, 15]
var smallNum = [5, 6, 9, 10]

function start() {
    //设置开始按钮失效
    btn.removeEventListener('click', start)
    btn.setAttribute('class', 'no')
        //产生随机数字，从这个开始
    var num = parseInt(Math.random() * 16)
    items[num].setAttribute('class', 'item active')
    activeNum = num;
    // console.log(activeNum)
    var doc = document.body
    doc.addEventListener('keydown', function(e) {
        activeKey = e.key


        // ArrowLeft

        if (activeKey.toUpperCase() === 'ARROWLEFT') {
            if (activeNum === 0 || activeNum === 4 || activeNum === 8 || activeNum === 12) {
                console.log('已经到最左边，不能按左键')
                return
            }
            activeNum--;
            changeBgs(activeNum)
        } else if (activeKey.toUpperCase() === 'ARROWRIGHT') {
            if (activeNum === 3 || activeNum === 7 || activeNum === 11 || activeNum === 15) {
                console.log('已经到最右边，不能按右键')
                return
            }
            activeNum++
            changeBgs(activeNum)
        } else if (activeKey.toUpperCase() === 'ARROWUP') {
            if (activeNum === 0 || activeNum === 1 || activeNum === 2 || activeNum === 3) {
                console.log('已经到最上边，不能按上键')
                return
            }
            activeNum = (activeNum - 4)
            changeBgs(activeNum)

        } else if (activeKey.toUpperCase() === 'ARROWDOWN') {
            if (activeNum === 12 || activeNum === 13 || activeNum === 14 || activeNum === 15) {
                console.log('已经到最下边，不能按下键')
                return
            }
            activeNum = (activeNum + 4)
            changeBgs(activeNum)
        }
    })

}
//设置格子背景，点到哪个哪个就变色
function changeBgs(activeNum) {
    var activeClass = items[activeNum].getAttribute('class')
    if (activeClass === 'item') {
        items[activeNum].setAttribute('class', 'item active')
    } else if (activeClass === 'item active') {
        items[activeNum].setAttribute('class', 'item')
    }
    setTimeout(() => {
        if (duibi()) {
            alert('游戏成功！')

            // btn.addEventListener('click', start);
            // btn.setAttribute('class', 'a')
            // for (var i = 0; i < 16; i++) {
            //     items[i].setAttribute('class', 'item')
            // }
        }
    }, 0);
}


//检查游戏是否成功
var flag1;
var flag2;

function duibi() {
    flag1 = check(largeNum)
    console.log(flag1 + '  da')
    flag2 = check(smallNum)
    console.log(flag2 + '  xiao')
    if (flag1 && flag2) {
        return true
    } else {
        return false
    }
}

function check(arr) {
    var flags = true
    var att = items[arr[0]].getAttribute('class')
    for (var i = 1; i < arr.length; i++) {
        // console.log(items[arr[i]].getAttribute('class'), arr[i])
        if (att !== items[arr[i]].getAttribute('class')) {
            flags = false;
            return flags
        }
    }
    // console.log(flags)
    return flags
}