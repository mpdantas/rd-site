# rd_backend/rdseguros/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('contato/', include('contato.urls')), # Este é o único endpoint de API para o frontend
]