from django.db import models

# Create your models here.
class Question(models.Model):
    # question_text is a CharField with a max_length of 200 characters.
    question_text = models.CharField(max_length=200)
    # pub_date is a DateTimeField.
    pub_date = models.DateTimeField('date published')

    # __str__ is a Python method that is called when you use the print() function on an object. It should return a string representation of the object.
    def __str__(self):
        return self.question_text

class Choice(models.Model):
    # question is a ForeignKey to the Question model with CASCADE delete behavior (i.e., when a Question is deleted, delete all associated Choices).
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    # choice_text is a CharField with a max_length of 200 characters.
    choice_text = models.CharField(max_length=200)
    # votes is an IntegerField with a default value of 0.
    votes = models.IntegerField(default=0)

    # __str__ is a Python method that is called when you use the print() function on an object. It should return a string representation of the object.
    def __str__(self):
        return self.choice_text
