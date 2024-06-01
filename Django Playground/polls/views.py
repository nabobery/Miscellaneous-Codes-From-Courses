from django.shortcuts import render
from .models import Question, Choice
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse

# Create your views here.

# The index view displays the latest 5 poll questions in the system, separated by commas, according to publication date.
def index(request):
    # latest_question_list is a QuerySet containing the last 5 published questions.
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    # context is a dictionary mapping template variable names to Python objects.
    context = {'latest_questions': latest_question_list}
    # render() is a shortcut to load a template, fill a context, and return an HttpResponse object with the result of the rendered template.
    return render(request, 'polls/index.html', context)

# The detail view displays a question text, without results, but with a form to vote.
def detail(request, question_id):
    try:
        # question is a Question object with the ID question_id.
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        # If the question does not exist, an Http404 exception is raised.
        raise Http404("Question does not exist")
    # render() is a shortcut to load a template, fill a context, and return an HttpResponse object with the result of the rendered template.
    return render(request, 'polls/detail.html', {'question': question})

# The results view displays the results of a particular question.
def results(request, question_id):
    # question is a Question object with the ID question_id.
    question = get_object_or_404(Question, pk=question_id)
    # render() is a shortcut to load a template, fill a context, and return an HttpResponse object with the result of the rendered template.
    return render(request, 'polls/results.html', {'question': question})

# The vote view records a vote for a particular choice in a particular question.
def vote(request, question_id):
    # question is a Question object with the ID question_id.
    question = get_object_or_404(Question, pk=question_id)
    try:
        # selected_choice is a Choice object with the ID choice.
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # If the choice does not exist, the detail view is displayed again with an error message.
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        # The vote is recorded and the user is redirected to the results view.
        selected_choice.votes += 1
        selected_choice.save()
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))

