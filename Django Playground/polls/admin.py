from django.contrib import admin
from .models import Question, Choice

# Register your models here.
# admin.site.register(Question)

# admin.site.register(Choice)

admin.site.site_header = "Polls Admin"
admin.site.site_title = "Polls Admin Area"
admin.site.index_title = "Welcome to the Polls Admin Area"


# Choice objects are edited on the Question admin page. 
# By default, provide enough fields for 3 choices.
# Extending TabularInline class to display the Choice objects in the Question admin page.
class ChoiceInline(admin.TabularInline):
    # model is the model that this inline is going to edit.
    model = Choice
    # extra is the number of extra fields to display in the inline form.
    extra = 3

# Question objects have an admin interface where you can create, edit, and delete Questions.
# Extending ModelAdmin class to customize the Question admin page.
class QuestionAdmin(admin.ModelAdmin):
    # fields is a list of field names to display on the change list page.
    fieldsets = [
        (None, {'fields': ['question_text']}),
        ('Date Information', {'fields': ['pub_date']}),
    ]
    # inlines is a list of Inline classes to include in addition to the standard Question fields.
    inlines = [ChoiceInline]

# Register the Question model with the QuestionAdmin options.
admin.site.register(Question, QuestionAdmin)

