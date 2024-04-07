from django.contrib import admin
from .models import Post,Comment,PostImage


admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(PostImage)

