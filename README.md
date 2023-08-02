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
 ![img]/(images/Automobiles.png)
 ![img]/(images/AutomobileCreate.png)
 ![img]/(images/AutomobileSpecific.png)
 ![img]/(images/Customer.png)
 ![img]/(images/Manufacturers.png)
 ![img]/(images/Manufacturersreturn.png)
 ![img]/(images/Automobiles.png)
 ![img]/(images/Sales.png)
 ![img]/(images/Salesperson.png)

Service API

Inventory API
1. Manufacturers URLS
![img](/images/Manufacturers.png)
![img](/images/Manufacturersreturn.png)
2. Vehicle Modles URLS
![img](/images/Vehicle.png)
![img](/images/VehicleReturn.png)
3. Automobile URLS
![img](/images/Automobiles.png)
![img](images/AutomobileSpecific.png)
![img](/images/AutomobileCreate.png)

Service API
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
![img](/images/Technicians&Appointments.png)

 ### Manufacturers URLS

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
