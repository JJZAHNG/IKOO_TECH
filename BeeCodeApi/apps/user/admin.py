from django.contrib import admin
from .models import Post,Comment,Like,PostImage,Reply


admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(PostImage)
admin.site.register(Reply)
