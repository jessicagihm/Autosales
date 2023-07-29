# CarCar

CarCar is an application for managing the aspects of an automobile dealership. It manages the inventory, automobile sales, and automobile services

Team:

* Jessica - Service
* Tawain - Sales

## How to Run this App
1. Fork the repository for this project
2. Git clone this forked project in your projects directory
3. Build and run the project using Docker with these commands:

docker volume create beta-data
docker-compose build
docker-compose up

4. After running these commands, make sure all of your Docker containers are running
​
- View the project in the browser: http://localhost:3000/


## Design
CarCar is made up of 3 microservices which interact with one another.

- **Inventory**
- **Services**
- **Sales**
![img](/images/CarCarDiagram.png)


 Inventory API


 ### Manufacturers URLS
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List manufacturers | GET | http://localhost:8100/api/manufacturers/
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/ |
| Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/id/
| Update a specific manufacturer | PUT | http://localhost:8100/api/manufacturers/id/
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/id/


Create and Update a manufacturer (SEND THIS JSON BODY):
- You cannot make two manufacturers with the same name
```
{
  "name": "Chrysler"
}
```
The return value of creating, viewing, updating a single manufacturer:
```
{
	"href": "/api/manufacturers/2/",
	"id": 2,
	"name": "Chrysler"
}
```
Getting a list of manufacturers return value:
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```
Create and Update a manufacturer (SEND THIS JSON BODY):
- You cannot make two manufacturers with the same name
```
{
  "name": "Chrysler"
}
```
The return value of creating, viewing, updating a single manufacturer:
```
{
	"href": "/api/manufacturers/2/",
	"id": 2,
	"name": "Chrysler"
}
```
Getting a list of manufacturers return value:
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}

### Vehicle Models:
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List vehicle models | GET | http://localhost:8100/api/models/
| Create a vehicle model | POST | http://localhost:8100/api/models/
| Get a specific vehicle model | GET | http://localhost:8100/api/models/id/
| Update a specific vehicle model | PUT | http://localhost:8100/api/models/id/
| Delete a specific vehicle model | DELETE | http://localhost:8100/api/models/id/
​
Create and update a vehicle model (SEND THIS JSON BODY):
```
{
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com"
  "manufacturer_id": 1
}
```
​
Updating a vehicle model can take the name and/or picture URL:
```
{
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com"
}
```
Return value of creating or updating a vehicle model:
- This returns the manufacturer's information as well
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```
Getting a List of Vehicle Models Return Value:
```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "image.yourpictureurl.com",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```
### Automobiles:
- The **'vin'** at the end of the detail urls represents the VIN for the specific automobile you want to access. This is not an integer ID. This is a string value so you can use numbers and/or letters.
​
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List automobiles | GET | http://localhost:8100/api/automobiles/
| Create an automobile | POST | http://localhost:8100/api/automobiles/
| Get a specific automobile | GET | http://localhost:8100/api/automobiles/vin/
| Update a specific automobile | PUT | http://localhost:8100/api/automobiles/vin/
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/vin/
​
​
Create an automobile (SEND THIS JSON BODY):
- You cannot make two automobiles with the same vin
```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
Return Value of Creating an Automobile:
```
{
	"href": "/api/automobiles/1C3CC5FB2AN120174/",
	"id": 1,
	"color": "red",
	"year": 2012,
	"vin": "777",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "R8",
		"picture_url": "image.yourpictureurl.com",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Audi"
		}
	}
}
```
To get the details of a specific automobile, you can query by its VIN:
example url: http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/
​
Return Value:
```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "green",
  "year": 2011,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "image.yourpictureurl.com",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  }
}
```
You can update the color and/or year of an automobile (SEND THIS JSON BODY):
```
{
  "color": "red",
  "year": 2012
}
```
Getting a list of Automobile Return Value:
```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "image.yourpictureurl.com",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      }
    }
  ]
}
```


Service API
Below you will see they layout as described here.

For the service microservices, I created an AutomobileVO, Technician, and Appointment as my models. I added a foreign key into my Appointment model to get access to my Technician model. I created a poller that created objects for me by polling from the inventory API.

For the back-end for Servies Microservices under views.py (service/api/service_rest/views.py) I created functions for each model so that the backpend dats is stored and created. I went into the urls.py and created paths for the models in my views.py. I used Insomnia to test if the paths I had set up were working properly.




1. Models

    Techinician:
    - first_name
    - last_name
    - employee_id
    Appointment:
    - date_time
    - reason
    - status
    - vin
    - customer
    - technician
    - vip (foreign key)
    AutomobileVO:
    - vin
    - sold

2. URLS/Routes
### Technicians
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List technicians | GET | http://localhost:8080/api/technicians/
| Technician detail | GET | http://localhost:8080/api/technicians/<int:pk>/
| Create a technician | POST | http://localhost:8080/api/technicians/
| Delete a technician | DELETE | http://localhost:8080/api/technicians/<int:pk>/


LIST TECHNICIANS: Following this endpoint will give you a list of all technicians that are currently employed.
Since this is a GET request, you do not need to provide any data.
```
Example:
{
	"technicians": [
		{
			"name": "Donald",
			"employee_number": 1,
			"id": 1
		},
    ]
}
```

TECHNICIAN DETAIL: This is a GET request as well, so no data needs to be provided here either. When you list technicians, you will
see that they are assigned a value of "id". This is the value that will replace "<int:pk>. For example, if you wanted to see the technician
details related to our technician "Donald", you would input the following address: http://localhost:8080/api/technicians/1/
This would then lead to this:

```
{
	"name": "Donald",
	"employee_number": 1,
	"id": 1
}
```
This how our technician detail is displayed. If you want to change the technician, just change the value at the end to match the "id" of the technician you want to display.

CREATE TECHNICIAN - What if we hired a new technician (In this economy even)? To create a technician, you would use the following format to input the data and you would just submit this as a POST request.
```
{
	"name": "Liz",
	"employee_number": 2
}
```
As you can see, the data has the same format. In this example, we just changed the "name" field from "Donald" to "Liz". We also assigned her the "employee_number" value of "2" instead of "1".
Once we have the data into your request, we just hit "Send" and it will create the technician "Liz". To verify that it worked, just select follow the "LIST TECHNICIAN" step from above to show all technicians.
With any luck, both Donald and Liz will be there.
Here is what you should see if you select "LIST TECHNICIAN" after you "CREATE TECHNICIAN" with Liz added in:
```
{
	"technicians": [
		{
			"name": "Donald",
			"employee_number": 1,
			"id": 1
		},
		{
			"name": "Liz",
			"employee_number": 1,
			"id": 2
		},
    ]
}
```

DELETE TECHNICIAN - If we decide to "go another direction" as my first boss told me, then we need to remove the technician from the system. To do this, you just need to change the request type to "DELETE" instead of "POST". You also need to pull the "id" value just like you did in "TECHNICIAN DETAIL" to make sure you delete the correct one. Once they are "promoted to customer" they will no longer be in our page that lists
all technicians.


And that's it! You can view all technicians, look at the details of each technician, and create technicians.
Remember, the "id" field is AUTOMATICALLY generated by the program. So you don't have to input that information. Just follow the steps in CREATE TECHNICIAN and the "id" field will be populated for you.
If you get an error, make sure your server is running and that you are feeding it in the data that it is requesting.
If you feed in the following:
```
{
	"name": "Liz",
	"employee_number": 3,
	"favorite_food": "Tacos"
}

You will get an error because the system doesn't know what what to do with "Tacos" because we aren't ever asking for that data. We can only send in data that Json is expecting or else it will get angry at us.

```


### Service Appointments: We'll keep you on the road and out of our waiting room

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List service appointments | GET | http://localhost:8080/api/serviceappointment/
| Service appointment detail | GET | http://localhost:8080/api/serviceappointment/<int:id>
| Service appointment history | GET | http://localhost:8080/api/servicehistory/<int:vin (OPTIONAL)>
| Create service appointment | POST | http://localhost:8080/api/serviceappointment/
| Delete service appointment | DELETE | http://localhost:8080/api/serviceappointment/<int:id>


LIST SERVICE APPOINTMENT: This will return a list of all current service appointment.
This is the format that will be displayed.

{
	"service_appointment": [
		{
			"id": 1,
			"vin": "1222",
			"customer_name": "Barry",
			"time": "12:30:00",
			"date": "2021-07-14",
			"reason": "mah tires",
			"vip_status": false,
			"technician": "Liz"
		},
    ]
}
```
SERVICE APPOINTMENT DETAIL: This will return the detail of each specific service appointment.
```
{
	"id": 1,
	"vin": "1222",
	"customer_name": "Barry",
	"time": "12:30:00",
	"date": "2021-07-14",
	"reason": "mah tires",
	"vip_status": false,
	"technician": "Liz"
}
```
SERVICE APPOINTMENT HISTORY: This will show the detail based on the "VIN" that is input. You will see ALL service appointments for the vehicle associated with the "vin" that you input.
At the end of the URL, tack on the vin associated with the vehicle that you wish to view. If you leave this field blank, it will show all service history for all vehicles.
```
{
	"service_history": [
		{
			"id": 1,
			"vin": "1222",
			"customer_name": "Barry",
			"time": "12:30:00",
			"date": "2021-07-14",
			"reason": "mah tires",
			"vip_status": false,
			"technician": "Liz"
		},
		{
			"id": 6,
			"vin": "1222",
			"customer_name": "Gary",
			"time": "12:30:00",
			"date": "2021-07-11",
			"reason": "new car",
			"vip_status": false,
			"technician": "Caleb"
		}
	]
}
```
If we add "1222" to the request (eg. http://localhost:8080/api/servicehistory/1222), then it will show the above. If you put a vin that does not exist in the system, it will return a blank list.


CREATE SERVICE APPOINTMENT - This will create a service appointment with the data input. It must follow the format. Remember, the "id" is automatically generated, so don't fill that in. To verify
that it was added, just look at your service appointment list after creating a service appointment and it should be there.
```
		{
			"id": 6,
			"vin": "1222",
			"customer_name": "Gary",
			"time": "12:30:00",
			"date": "2021-07-11",
			"reason": "new car",
			"vip_status": false,
			"technician": "Caleb"
		}

```
DELETE SERVICE APPOINTMENT - Just input the "id" of the service appointment that you want to delete at the end of the url. For example, if we wanted to delete the above service history appointment for Barry
because we accidently input his name as "Gary", we would just enter 'http://localhost:8080/api/serviceappointment/6' into the field and send the request. We will receive a confirmation message saying that
the service appointment was deleted.


## Sales microservice

Explain your models and integration with the inventory
microservice, here.

CarCar is an app for Client-end management of an automobile service.
-It manages Inventory, Sales, and Service, along with the staff in said departments.
-Structurally the app is built on RestfulApi's for each service with intergrated polling on the service and sales branchs to allow for continuous updating of and fetching from the database. We used a react front end, designed to be new-user friendly and technician friendly, easily customizable to fit future client demands.

The Sales models include, their fields and enpoints are below:
-Salesperson

First name
Last name
Employee_Id (unique)- (a uuid number auto-generated to attend to possible privacy or authentication needs)
The custom_id (unique) (optional) excepts both text and numbers, or can be left blank. It can be assigned by the user to better suit their needs.

Customer
First name,
Last Name,
Address,
Phone Number,
and Customer_id (unique) (auto-assigned if there is no entry)

Sale

ForeignKeys:
AutomobileVo-maintains vins and automobile sold, not sold status
salsesperson,
price- the price of the sale
sale id- a unique, optional field, not used within the app, provided for future client upgrades
sale_date - a auto-generated field, that marks times of the sale. Provided for client specific needs.

The app is designed to allow both sales and services ends to run continuosly, while constantly fetching and updating the database with essential updates. Each service has it's own poller allowing individual departments service endpoints faster response time from the server.

The endpoints follow with links to request input examples:

Salespeople:
-List/Create                                                 http://localhost:8090/api/salespeople/


-Delete
http://localhost:8090/api/salespeople/:id


Customers:
-List/Create
http://localhost:8090/api/customers/


-Delete
http://localhost:8090/api/customers/:id


Sales:
List/Create
http://localhost:8090/api/sales/


-Delete
http://localhost:8090/api/sales/:id


Models:
List/Create
http://localhost:8100/api/models/


-Delete
http://localhost:8100/api/models/:id/


Automobiles:
List/Create
http://localhost:8100/api/automobiles/


-Delete
http://localhost:8100/api/automobiles/:vin/


I've added images of all models, there behaviors, input requirements and expected outputs in the Images file of the main directory.
