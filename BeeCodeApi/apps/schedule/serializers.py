from rest_framework import serializers
from .models import Course_Classify,Course,Course_Cover






class Course_Classify_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Course_Classify
        fields = ['id','course_classify_name']



class CourseSerializer(serializers.ModelSerializer):
    course_content_user = serializers.SerializerMethodField()

    class Meta:
        model = Course_Cover
        fields = ['id', 'course_cover_name', 'course_content_user']

    def get_course_content_user(self, obj):
        res = [course.course_content for course in obj.course_set.all()]
        image_urls = [image.url for image in res]
        return image_urls
