from rest_framework import serializers
from .models import Course_Classify,Course,Course_Cover
from django.conf import settings





class Course_Classify_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Course_Classify
        fields = ['id','course_classify_name']



class CourseSerializer(serializers.ModelSerializer):
    cover_content = serializers.SerializerMethodField()
    content_img = serializers.SerializerMethodField()
    class Meta:
        model = Course
        fields = ['id','course_name','course_synopsis','cover_content','content_img']

    def get_cover_content(self,obj):
        user_icon = settings.BACKEND_URL + '/media/' + str(obj.cover.course_cover_name)
        return user_icon

    def get_content_img(self,obj):
        imgs = obj.course_img.all()
        comments_text = []
        for img in imgs:
            comments_text.append(settings.BACKEND_URL + '/media/' + str(img.courses_content))
        return comments_text


class ClassifySerializer(serializers.ModelSerializer):
    cover_content = serializers.SerializerMethodField()
    content_img = serializers.SerializerMethodField()
    class Meta:
        model = Course
        fields = ['course_name','course_synopsis','course_price','content_img','cover_content']

    def get_cover_content(self,obj):
        user_icon = settings.BACKEND_URL + '/media/' + str(obj.cover.course_cover_name)
        return user_icon

    def get_content_img(self,obj):
        imgs = obj.course_img.all()
        comments_text = []
        for img in imgs:
            comments_text.append(settings.BACKEND_URL + '/media/' + str(img.courses_content))
        return comments_text



