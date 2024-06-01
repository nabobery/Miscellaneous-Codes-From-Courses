## Steps Used for this Project

1. Installed pipenv
```bash
py -3.12 -m pip install pipenv
```

2. Created a directory for the project
```bash
mkdir django_demo
cd django_demo
```

3. Created a virtual environment and installed Django
```bash
py -3.12 -m pipenv install django
```

4. Activated the virtual environment
```bash
py -3.12 -m pipenv shell
```

5. Created a Django project in the current directory (.)
```bash
django-admin startproject django_demo .
```

6. Use the following command to run the server using the wrapper script(./manage.py)
```bash
python manage.py runserver <port>
```
(Optional) If you want to run the server on a specific port, you can specify the port number after the runserver command. If you don't specify the port number, the server will run on the default port 8000.

7. Set up the Integrated Terminal in VS Code for ease of use
- Open the command palette by pressing `Ctrl+Shift+P`
- Search for `Python: Select Interpreter`
- Select the virtual environment created by pipenv
- Open the Integrated Terminal by pressing 'Ctrl + Shift + `'

8. Create a new app in the Django project
```bash
python manage.py startapp <app_name>
```
9. Setting up Debugging in VS Code for Django
- Install the `Django` extension in VS Code
- Go to the Debugging tab in VS Code
- Click on the gear icon to create a new launch configuration
- Select `Django` as the environment

10. Create a model in the app
- Define the model in the `models.py` file of the app
- Create migrations for the model
```bash
python manage.py makemigrations <app_name>
``` 
- Apply the migrations to the database
```bash
python manage.py migrate <app_name>
```

11. Register the model in the Django admin
- Define the model in the `admin.py` file of the app
- Create a superuser to access the Django admin
```bash
python manage.py createsuperuser
```

12. Create views and templates for the app
- Define views in the `views.py` file of the app
- Create templates in the `templates` directory of the app
- Define URLs in the `urls.py` file of the app
- Include the app URLs in the project URLs

#### References:

- [Django Documentation](https://docs.djangoproject.com/en/5.0/)
- [Video 1](https://youtu.be/rHux0gMZ3Eg?si=1_jYD60d3bfwvRrn)
- [Video 2](https://youtu.be/e1IyzVyrLSU?si=03U8m5rEIbofBlbG)