# CarCar

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

## Design
- **Inventory**
- **Services**
- **Sales**
![img](/images/CarCarDiagram.png)

## Service microservice
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


## Sales microservice

Explain your models and integration with the inventory
microservice, here.
