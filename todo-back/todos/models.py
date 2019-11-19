from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser # 유저모델 커스텀하기 위해 상속받아 쓰기 위해
# Create your models here.

class User(AbstractUser):
    # 유저는 커스텀 유저를 사용
    # 디폴트 유저를 사용하더라고 장고에서는 강력히 커스텀 유저를 사용하라고 권장
    pass

class Todo(models.Model):
   user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
   title = models.CharField(max_length=50)
   completed = models.BooleanField(default=False)
   def __str__(self):
       return self.title