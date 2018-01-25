# ejpage
一款小巧方便的分页插件，包括前台分页和后台分页

一款非常方便的轻量级分页插件！支持前台分页和后台分页

# 1.构造参数

参数名称 | 类型 | 说明 
:-: | :-: | :-: 
id |string| 存放分页插件的容器id 必填（）
type| number| 1前台分页，2后台分页  (默认1)
count| number| 每页显示条数  (默认5)
current|number| 当前页  (默认1)
data|array| 前台分页数据（前台分页必填）
pages|number| 最大显示页数（默认5）
totalCount|number| 数据总数（后台分页必填）
fun|function| 回调函数，每次数据改变后执行 （必填）

# 2.公共方法

参数名称 | 说明 
:-: |  :-: 
getCount | 获取每页条数
getCurrent| 获取当前页
getPages| 获取最大显示页数
getTotalCount| 获取总条数
getTotalPage| 获取总页数
next| 向后翻页
pre|向前翻页
toPage|跳转到某一页
refresh|新数据刷新
changeCount|修改每页显示条数

# 使用方法

## 前台分页

基本使用只需构造一个 ejpage对象，传入构造参数（数据数组必填），在回调函数中就会得到每次分解的结果以及分页参数。

```
        var page;
        $(function () {
            var arr = [];
            for (let i = 0; i < 2000000; i++) {
                arr.push(i);
            }

            page = new ejpage({
                id: "ejpage",      //ul的id
                count: 50,         //每页条数
                current: 1,       //当前页
                data: arr,         //数据
                pages: 5,          //最多显示多少页
                fun: function (data, pageParam) {
                    var info = `当前页：${pageParam.current},每页条数:${pageParam.count},最大显示页数：${pageParam.pages},总条数：${pageParam.totalCount},总页数：${pageParam.totalPage}`;
                    $("#info").text(info);
                    $("#data").text(data.toString());
                }
            });
            
        });

        function changePages() {
            page.changeCount($("#sPageCount").val());
        }

        function refresh(){
            var arr = [];
            for (let i = 0; i < 40000; i++) {
                arr.push("new"+i);
            }
            page.refresh(arr,1);
        }
```

```
    <div class="pagination">
        <div id="data">
        </div>
        <ul class="ejpage" id="ejpage"></ul>
        <div id="info">
        </div>
    </div>

    <div class="change">
        每页显示条数
        <select id="sPageCount" onchange="changePages()">
            <option>100</option>
            <option selected>50</option>
            <option>40</option>
            <option>30</option>
            <option>20</option>
        </select>
        <button onclick="refresh()">刷新数据</button>
    </div>
```

![这里写图片描述](http://img.blog.csdn.net/20180125200807470?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzQxNDk4MDU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

后台分页传入数据总条数，回调函数可获得每次分页的参数。

```
        var page;
        $(function () {
            var arr = [];
            for (let i = 0; i < 2000000; i++) {
                arr.push(i);
            }

            page = new ejpage({
                id: "ejpage",      //ul的id
                type:2,
                count: 50,         //每页条数
                current: 1,       //当前页
                totalCount: 405,         //数据
                pages: 5,          //最多显示多少页
                fun: function (pageParam) {
                    var info = `当前页：${pageParam.current},每页条数:${pageParam.count},最大显示页数：${pageParam.pages},总条数：${pageParam.totalCount},总页数：${pageParam.totalPage}`;
                    $("#info").text(info);
                }
            });
        });

        function changePages() {
            page.changeCount($("#sPageCount").val());
        }

        function refresh(){
            alert("总条数变为1000条，从第二页开始");
            page.refresh(1000,2);
        }
```

