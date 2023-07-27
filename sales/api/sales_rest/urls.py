from django.urls import path
from . import views
from .views import AutomobilesView

urlpatterns = [
    path("api/automobiles/", AutomobilesView.as_view()),
    path("salespeople/", views.api_list_salespeople, name="list_salespeople"),
    path(
        "salespeople/<int:id>/",
        views.api_detail_salesperson,
        name="detail_salesperson",
    ),
    path("customers/", views.api_list_customers, name="list_customers"),
    path("customers/<int:id>/", views.api_detail_customer, name="detail_customer"),
    path("sales/", views.api_sales, name="sales"),
    path("sales/<int:id>/", views.api_delete_sale, name="delete_sale"),
    path(
        "automobiles/<str:vin>/",
        views.api_automobile_vo_detail,
        name="detail_automobile",
    ),
]
