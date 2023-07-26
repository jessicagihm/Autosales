from django.http import JsonResponse
from django.shortcuts import render
from .models import Salesperson, Customer, Sale, AutomobileVO
import json
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.forms.models import model_to_dict
from django.core.serializers.json import DjangoJSONEncoder


class AutomobileVODetailEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, AutomobileVO):
            return {
                "vin": obj.vin,
                "sold": obj.sold,
            }
        return super().default(obj)


class SaleEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Sale):
            return {
                "id": obj.id,
                "automobile": obj.automobile.vin,
                "salesperson": obj.salesperson.employee_id,
                "sale_date": obj.sale_date.isoformat(),
                "price": obj.price,
            }
        return super().default(obj)


class SalesPersonDetailEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "employee_id",
        "first_name",
        "last_name",
    ]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "customer_id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        try:
            customers = Customer.objects.all()
            return JsonResponse(
                {"customers": list(customers.values())},
                encoder=CustomerDetailEncoder,
                safe=False,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Could not get customers: {str(e)}"},
                status=400,
            )
    else:  # POST request
        try:
            content = json.loads(request.body)
            # Remove the customer_id from the content if it's empty
            if not content.get("customer_id"):
                del content["customer_id"]
            customer = Customer.objects.create(**content)
            return JsonResponse(
                model_to_dict(customer),
                encoder=CustomerDetailEncoder,
                safe=False,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Could not create customer: {str(e)}"},
                status=400,
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_detail_customer(request, id):
    try:
        customer = Customer.objects.get(id=id)
    except Customer.DoesNotExist:
        return JsonResponse({"message": "Customer does not exist"}, status=404)

    if request.method == "GET":
        try:
            return JsonResponse(
                model_to_dict(customer),
                encoder=CustomerDetailEncoder,
                safe=False,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Could not get customer details: {str(e)}"},
                status=400,
            )
    elif request.method == "DELETE":
        try:
            customer.delete()
            return JsonResponse({"message": "Customer deleted"})
        except Exception as e:
            return JsonResponse(
                {"message": f"Could not delete customer: {str(e)}"},
                status=400,
            )
    else:  # PUT request
        try:
            content = json.loads(request.body)
            for key, value in content.items():
                setattr(customer, key, value)
            customer.save()
            return JsonResponse(
                model_to_dict(customer),
                encoder=CustomerDetailEncoder,
                safe=False,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Could not update customer: {str(e)}"},
                status=400,
            )


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        try:
            salespeople = Salesperson.objects.all()
            return JsonResponse(
                {"salespeople": list(salespeople.values())},
                safe=False,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Could not get salespeople: {str(e)}"},
                status=400,
            )
    else:  # POST request
        try:
            content = json.loads(request.body)
            # Remove the employee_id from the content if it's empty
            if not content.get("employee_id"):
                del content["employee_id"]
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                model_to_dict(salesperson),
                encoder=SalesPersonDetailEncoder,
                safe=False,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Could not create salesperson: {str(e)}"},
                status=400,
            )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_detail_salesperson(request, id):
    try:
        salesperson = Salesperson.objects.get(id=id)
    except Salesperson.DoesNotExist:
        return JsonResponse({"message": "Salesperson does not exist"}, status=404)

    if request.method == "GET":
        try:
            return JsonResponse(
                model_to_dict(salesperson),
                safe=False,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Could not get salesperson details: {str(e)}"},
                status=400,
            )
    elif request.method == "DELETE":
        try:
            salesperson.delete()
            return JsonResponse({"message": "Salesperson deleted"})
        except Exception as e:
            return JsonResponse(
                {"message": f"Could not delete salesperson: {str(e)}"},
                status=400,
            )
    else:  # PUT request
        try:
            content = json.loads(request.body)
            for key, value in content.items():
                setattr(salesperson, key, value)
            salesperson.save()
            return JsonResponse(
                model_to_dict(salesperson),
                encoder=SalesPersonDetailEncoder,
                safe=False,
            )
        except Exception as e:
            return JsonResponse(
                {"message": f"Could not update salesperson: {str(e)}"},
                status=400,
            )


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": [model_to_dict(sale) for sale in sales]},
            safe=False,
        )
    else:
        content = json.loads(request.body)
    try:
        # Get the instances of the associated models
        automobile = AutomobileVO.objects.get(vin=content.pop("automobile_vin"))
        salesperson = Salesperson.objects.get(id=content.pop("salesperson_id"))
        customer = Customer.objects.get(id=content.pop("customer_id"))
    except (
        AutomobileVO.DoesNotExist,
        Salesperson.DoesNotExist,
        Customer.DoesNotExist,
    ) as e:
        return JsonResponse(
            {"message": f"Invalid foreign key reference: {str(e)}"},
            status=400,
        )

    # Create a new Sale object
    try:
        sale = Sale.objects.create(
            automobile=automobile,
            salesperson=salesperson,
            customer=customer,
            **content,  # Other fields (like 'price') go here
        )
    except Exception as e:
        return JsonResponse(
            {"message": f"Could not create the sale: {str(e)}"},
            status=400,
        )

    return JsonResponse(
        model_to_dict(sale),
        encoder=SaleEncoder,
        safe=False,
    )


@require_http_methods(["DELETE"])
def api_delete_sale(request, id):
    try:
        sale = Sale.objects.get(id=id)
        sale.delete()
        return JsonResponse({"message": "Sale deleted"})
    except Sale.DoesNotExist:
        return JsonResponse({"message": "Sale does not exist"}, status=404)


@require_http_methods(["GET"])
def api_automobile_vo_detail(request, vin):
    try:
        automobile_vo_detail = AutomobileVO.objects.get(vin=vin)
        return JsonResponse(
            automobile_vo_detail, encoder=AutomobileVODetailEncoder, safe=False
        )
    except AutomobileVO.DoesNotExist:
        response = JsonResponse({"message": "Does not exist"})
        response.status_code = 404
        return response
