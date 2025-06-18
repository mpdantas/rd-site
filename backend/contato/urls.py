# rd_backend/contato/urls.py

from django.urls import path
from . import views # Importa as funções (views) do arquivo views.py dentro do mesmo diretório

urlpatterns = [
    path('enviar/', views.enviar_mensagem, name='enviar_mensagem'),
    # Define a URL 'contato/enviar/' que será tratada pela função 'enviar_mensagem' no views.py
]