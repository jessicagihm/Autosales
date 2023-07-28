from django.db import models
from django.urls import reverse
from django.utils import timezone
import uuid


class Salesperson(models.Model):
    first_name = models.CharField(max_length=200, verbose_name="First name")
    last_name = models.CharField(max_length=200, verbose_name="Last name")
    employee_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    custom_id = models.CharField(max_length=200, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.employee_id:
            self.employee_id = str(uuid.uuid4())
        super().save(*args, **kwargs)

    def get_api_url(self):
        return reverse("api_show_salesperson", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Customer(models.Model):
    first_name = models.CharField(max_length=200, verbose_name="First name")
    last_name = models.CharField(max_length=200, verbose_name="Last name")
    address = models.CharField(max_length=400, verbose_name="Address")
    phone_number = models.CharField(max_length=200, verbose_name="Phone number")
    customer_id = models.CharField(
        max_length=200, unique=True, blank=True, verbose_name="Customer ID"
    )

    def save(self, *args, **kwargs):
        if not self.customer_id:
            self.customer_id = str(uuid.uuid4())
        super().save(*args, **kwargs)

    def get_api_url(self):
        return reverse("api_show_customer", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200, verbose_name="VIN")
    sold = models.BooleanField(default=False, verbose_name="Sold")

    def __str__(self):
        return self.vin


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        on_delete=models.CASCADE,
        related_name="sales",
        verbose_name="Automobile",
    )
    salesperson = models.ForeignKey(
        Salesperson,
        on_delete=models.CASCADE,
        related_name="sales",
        verbose_name="Salesperson",
    )
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="sales",
        verbose_name="Customer",
    )
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Price")
    sale_id = models.CharField(
        max_length=200, unique=True, blank=True, verbose_name="Sale ID"
    )
    sale_date = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        if not self.sale_id:
            self.sale_id = str(uuid.uuid4())

        if not self.pk:
            self.automobile.sold = True
            self.automobile.save()

        super().save(*args, **kwargs)

    def get_api_url(self):
        return reverse("api_show_sale", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.automobile} sold by {self.salesperson} to {self.customer} for {self.price} on {self.sale_date}"
