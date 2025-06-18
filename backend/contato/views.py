# rd_backend/contato/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt # Temporariamente para teste, REMOVA em produção
from django.core.mail import send_mail
from django.conf import settings
import json

@csrf_exempt # ATENÇÃO: Desabilita CSRF. APENAS para testes iniciais.
             # Em produção, implemente proteção CSRF adequada!
def enviar_mensagem(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body) # Recebe os dados JSON do frontend

            # Coleta os dados do formulário
            nome = data.get('name')
            email = data.get('email')
            assunto = data.get('subject') # 'subject' agora vem do dropdown
            mensagem = data.get('message')

            # Validação básica
            if not all([nome, email, assunto, mensagem]):
                return JsonResponse({'success': False, 'message': 'Todos os campos são obrigatórios.'}, status=400)

            # Monta e-mail
            email_subject = f"Mensagem de Contato do Site: {assunto}"
            email_body = f"Nome: {nome}\n" \
                         f"Email: {email}\n" \
                         f"Assunto: {assunto}\n" \
                         f"Mensagem:\n{mensagem}"

            # Envia o e-mail
            send_mail(
                email_subject,
                email_body,
                settings.EMAIL_HOST_USER,
                [settings.DEFAULT_TO_EMAIL],
                fail_silently=False,
            )

            return JsonResponse({'success': True, 'message': 'Mensagem enviada com sucesso!'})

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Formato de requisição inválido (JSON esperado).'}, status=400)
        except Exception as e:
            # Log do erro no console do servidor para depuração
            print(f"Erro no envio de e-mail: {e}")
            return JsonResponse({'success': False, 'message': f'Erro ao enviar mensagem: {str(e)}'}, status=500)
    else:
        return JsonResponse({'success': False, 'message': 'Método não permitido.'}, status=405)