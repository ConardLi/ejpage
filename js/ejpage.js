/**
 * 作者 李世奇
 * 日期 2017/1/24
 * 版本 1.0
 */

(function (global) {



    var ejpage = function (options) {
        this.init(options);
    };

    ejpage.prototype = {
        constructor: this,
        options: {
            id: "ejpage",      //ul的id
            type: 1,           // 1 前台分页，需要输入data  2 后台分页 需要输入totalCount
            count: 5,         //每页条数
            current: 1,       //当前页
            data: [],         //数据
            pages: 5,          //最多显示多少页
            totalCount: 0,     //总条数
            fun: function () { }
        },
        _def: {
            _totalPage: 0,      //总页数
            _currentData: [],   //当前分页数据
            _start: 0,           //起始数字
            _end: 0              //结束数字
        },
        init: function (options) {
            if (!this.options.fun || !this.options.data) {
                alert("参数错误！");
                return;
            }
            _extend(this.options, options, true);
            this._o();
            this._d();
        },
        getCount: function () {
            //获取每页条数
            return this.options.count;
        },
        getCurrent: function () {
            //获取当前页
            return this.options.current;
        },
        getPages: function () {
            //获取最大显示页数
            return this.options.pages;
        },
        getTotalCount: function () {
            //获取总条数
            return this.options.totalCount;
        },
        getTotalPage: function () {
            //获取总页数
            return this._def._totalPage;
        },
        next: function () {
            if (this.options.current < this._def._totalPage) {
                this.options.current++;
                this._o();
                this._d();
            }
        },
        pre: function () {
            //向前翻页
            if (this.options.current > 1) {
                this.options.current--;
                this._o();
                this._d();
            }
        },
        toPage: function (page) {
            //跳转到某一页
            if (page >= 1 && page <= this._def._totalPage) {
                this.options.current = page;
                this._d();
                this._o();
            }
        },
        refresh: function (data, current, count) {
            //新数据刷新
            if (data) {
                if (this.options.type === 1) {
                    this.options.data = data;
                }
                else if (this.options.type === 2) {
                    this.options.totalCount = data;
                }
            }
            if (current) {
                this.options.current = current;
            }
            if (count) {
                this.options.count = count;
            }
            this._d();
            this._o();
        },
        changeCount(count) {
            //修改每页显示条数
            if (count > 0) {
                this.options.count = count;
                this._d();
                this._o();
            } else {
                alert("参数错误！");
            }
        },
        _o: function () {
            //执行数据计算
            this._def._start = this.options.count * (this.options.current - 1);
            this._def._end = this.options.count * this.options.current;
            if (this.options.type === 1) {
                this.options.totalCount = this.options.data.length;
                this._def._totalPage = Math.ceil(this.options.totalCount / this.options.count);
                this._def._currentData = this.options.data.slice(this._def._start, this._def._end);
                var pageParam = { current: this.options.current, count: this.options.count, pages: this.options.pages, totalCount: this.options.totalCount, totalPage: this._def._totalPage };
                this.options.fun(this._def._currentData, pageParam);
            } else if (this.options.type === 2) {
                this._def._totalPage = Math.ceil(this.options.totalCount / this.options.count);
                var pageParam = { current: this.options.current, count: this.options.count, pages: this.options.pages, totalCount: this.options.totalCount, totalPage: this._def._totalPage };
                this.options.fun(pageParam);
            } else {
                alert("参数错误");
            }

        },
        _d: function () {
            //dom
            var dpre = `<li class="p-pre"><a href="#">&laquo;</a></li>`
            var dcount = '';
            var dnext = `<li class="p-next"><a href="#">&raquo;</a></li>`
            var arr = [];
            if (this.options.current <= this.options.pages) {
                if (this._def._totalPage < this.options.pages) {
                    l = this._def._totalPage;
                }
                else {
                    l = this.options.pages;
                }
                for (let i = 1; i <= l; i++) {
                    if (i === this.options.current) {
                        dcount += `<li class="p-count p-active"><a href="#">${i}</a></li>`;
                    } else {
                        dcount += `<li class="p-count"><a href="#">${i}</a></li>`;
                    }

                }
            } else {
                for (let i = this.options.current - this.options.pages + 1; i <= this.options.current; i++) {
                    if (i === this.options.current) {
                        dcount += `<li class="p-count p-active"><a href="#">${i}</a></li>`;
                    } else {
                        dcount += `<li class="p-count"><a href="#">${i}</a></li>`;
                    }
                }
            }
            var dom = dpre + dcount + dnext;
            document.getElementById(this.options.id).innerHTML = dom;
            this._e();
        },
        _e: function () {
            //事件监听
            let that = this;
            $('.p-pre').click(() => {
                this.pre();
            });
            $('.p-next').click(() => {
                this.next();
            })
            $('.p-count').click(function () {
                that.toPage(parseInt($(this).text()));
            })
        }
    }


    function _extend(o, n, override) {
        for (var key in n) {
            if (n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
                o[key] = n[key];
            }
        }
        return o;
    }

    global.ejpage = ejpage;


})(window);