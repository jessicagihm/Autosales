from django.urls import path
from .views import (
    api_list_technicians,
    api_detail_technician,
    api_list_appointments,
    api_detail_appointment,
    api_cancel_appointment,
    api_finish_appointment,
)


urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:pk>/",
         api_detail_technician, 
         name="api_detail_technician"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:pk>/",
         api_detail_appointment,
         name="api_detail_appointment"),
    path("appointments/<int:id>/cancel/", api_cancel_appointment),
    path("appointments/<int:id>/finish/", api_finish_appointment),

]
