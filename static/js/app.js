function mAlert(msg) {
    $('#mMain').html(msg);
    $('#modalAlert').modal('show')
};

function loadContact(id) {
    if (id) {
        loadInfo(id);
        //发送评论
        $('#sendContact').on('click', function () {
            var name = $('#name').val();
            var message = $('#message').val();
            if (!name || name.length <= 0) {
                mAlert('请输入名字或者昵称');
            } else if (!message || message.length <= 0) {
                mAlert('请输入评论的内容');
            } else {
                $.post("../service/blog/addComment", {id: id, name: name, message: message}, function (result) {
                    if (result == 0) {
                        mAlert("留言成功");
                        $('#name').val('');
                        $('#email').val('');
                        $('#message').val('');
                        setTimeout('loadInfo(' + id + ')', 1000)
                    }
                });
            }
        });
    }
}

function loadInfo(id) {
    //阅读数
    $.get("../service/blog/getReadCount", {id: id}, function (result) {
        $('#readCount').html(result.readCount);
    });
    //评论数
    $.get("../service/blog/getCommentCount", {id: id}, function (result) {
        $('#commentCount').html(result);
    });
    //评论内容展示
    $.get("../service/blog/getComments", {id: id}, function (result) {
        $('#Comments').html('');
        for (i in result) {
            var c = result[i];
            if (!c.commentId) {
                var div = '';
                div += '<div class="media comment">';
                div += '<div class="media-left">';
                div += '<a href="#"><img src="image/posts/c3.jpg" alt="" class="img-circle"></a>';
                div += '</div>';
                div += '<div class="media-body">';
                div += '<h4>' + encodeHtml(c.name) + '</h4>';
                div += '<h5 style="letter-spacing:1.5px;color: #808080">' + c.createdDate + '</h5>';
                div += '<p>' + encodeHtml(c.message) + '</p>';
                // 回复
                div += '<div id="com' + c.id + '"></div>';
                div += '</div>';
                div += '</div>';
                $('#Comments').append(div);
            }
        }
        for (i in result) {
            var c = result[i];
            if (c.commentId) {
                var div = '';
                // 加载评论
                div += '<div class="media comment reply">';
                div += '<div class="media-left">';
                div += '<a href="#"><img src="https://cdn1.zzzmh.cn/bz/page/about/author.jpg" alt="" class="img-circle"></a>';
                div += '</div>';
                div += '<div class="media-body">';
                div += '<h4>作者回复</h4>';
                div += '<h5><span class="date">' + c.createdDate + '</span></h5>';
                div += '<p>' + encodeHtml(c.message) + '</p>';
                div += '</div>';
                div += '</div>';
                $('#com' + c.commentId).html(div);
            }
        }
    });
}

// HTML转义函数
function encodeHtml(s) {
    return s.replace(
        /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g,
        function ($0) {
            var c = $0.charCodeAt(0);
            switch (c) {
                case 13:
                    return "<br />";
                case 32:
                    return "&#160;";
                default:
                    return "&#" + c + ";";
            }
        }
    );
};

// replaceAll
function replaceAll(string, s1, s2) {
    return string.replace(new RegExp(s1, "g"), s2);
}

function search() {
    if ($('#post-masonry').length) {
        var $container = $('#post-masonry');
        $container.imagesLoaded(function () {
            $container.isotope({
                filter: function () {
                    var title = $(this).find('.post-title').text();
                    var keys = $('#keyword').val().trim().split(' ');
                    for (var i = 0; i < keys.length; i++) {
                        if (title.search(new RegExp(keys[i], 'i')) != -1)
                            return true;
                    }
                    return false;
                }
            })
        })
    }
}