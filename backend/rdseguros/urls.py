# rd_backend/rdseguros/urls.py

from django.contrib import admin
from django.urls import path, include # Certifique-se que 'include' está importado

urlpatterns = [
    path('admin/', admin.site.urls),
    path('contato/', include('contato.urls')), # DIRECIONA tudo que começa com 'contato/' para o app 'contato'
]