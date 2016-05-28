# Django-React-Project-Template

A starter template using a Django API as the backend of a ReactJS application.

**NOTE:** This is a work in progress and is far from complete. We'll be
building out the frontend functionality for:

- Registration
- Login
- Logout
- View Users
- View Single User
- Edit Profile

Once that's done we'll package this as a Django project template which can be
used as a way to start all new projects in Django and React.

## Installation

Clone the repo:

```
$ git clone git@github.com:dansackett/django-react-project-template.git .
```

Install the Python Requirements:

```
$ pip install -r requirements.txt
```

Then install the NPM Requirements (recommended use Node 4):

```
$ npm install
```

## Running The Application

You should first build the assets with Webpack:

```
$ npm run build
```

Once built, you can run the Django dev server:

```
$ django-admin runserver
```

Now you can access the application at `http://127.0.0.1:8000` and the API at
`http://127.0.0.1:8000/api/v1/`.
