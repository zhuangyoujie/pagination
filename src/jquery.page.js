;(function () {
    var Page = function () {
        // this.defaults = {
        //     totalPages: 9,//总页数
        //     liNums: 9,//分页的数字按钮数(建议取奇数)
        //     activeClass: 'active',//active类
        //     hasFirstPage: true,//是否有首页按钮
        //     hasLastPage: true,//是否有末页按钮
        //     hasPrv: true,//是否有前一页按钮
        //     hasNext: true,//是否有后一页按钮
        //     callBack: function (page) {
        //         //回调，page选中页数
        //     }
        // };
    };
    Page.prototype = {
        init: function () {
            // var CFG = $.extend(this.defaults, cfg);
            var  currentPage = 4;
            var  totalPage = 20;
            var paginationStr =this.getPage(currentPage, totalPage);
            $('.pagination-container').append(paginationStr);
            return this;
            this.bindEvent();
        },
        getPage: function (currentPage, totalPage) {
            //显示：第一页，当前页，当前页的前后两页，最后一页
            //以当前页为分割点，分别得到当前页前面的页码和后面的页码
            var pageStr = '<a class="active">' + currentPage + '</a>';
            // 将当前页前后2页的页码展示出来
            for (var i = 1; i <= 2; i++) {
                //得到当前页前两页的的页码
                //其中的1指第一页
                if (currentPage > i + 1) {
                    pageStr = '<a>' + (currentPage - i) + '</a>' + pageStr;
                }
                //得到当前页后两页的页码
                if (currentPage + i < totalPage) {
                    pageStr = pageStr + '<a>' + (currentPage + i) + '</a>';
                }
            }
            //得到当前页前面用...表示的页码
            //两个1分别表示第一页，和当前页
            if (currentPage > 2 + 1 + 1) {
                pageStr = ' ... ' + pageStr;
            }

//        //得到上一页
            if (currentPage > 1) {
                pageStr = '<a class="prePage">上一页</a><a>1</a>' + pageStr;
            }

//        //得到当前页后面用...表示的页码
//        //其中1表示最后一页，当前页已经在前面计算过，这里不再计算
            if (currentPage + 2 + 1 < totalPage) {
                pageStr = pageStr + ' ... ';
            }

//        //得到下一页
            if (currentPage < totalPage) {
                pageStr = pageStr + '<a>' + totalPage + '</a><a class="lastPage">下一页</a>';
            }

            return pageStr;
        },
        bindEvent: function () {
            var that = this;
            $(document).off('click', '.pagination-container a').on('click', '.pagination-container a', function() {
                var $this = $(this);
                var pageNum;
                var currentPage = $('.pagination-container a.active').text();

                if( $this.hasClass('prePage') ) {
                    //点击【上一页】
                    pageNum = currentPage - 1;
                } else if( $this.hasClass('lastPage') ) {
                    //点击【下一页】
                    pageNum = currentPage + 1;
                } else {
                    pageNum = $this.text();
                }
                var pageHtml = that.getPage(pageNum, totalPage);
                $('.pagination-container').html(pageHtml);
            });
        }

    };

    window.pager = new Page;


})();