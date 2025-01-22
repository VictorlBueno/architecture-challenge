.PHONY: deploy clean logs status

# Variáveis
K8S_DIR = $(shell pwd)/k8s
K8S_FILES = db-config.yaml app-config.yaml db-secret.yaml db-deployment.yaml db-service.yaml app-deployment.yaml app-service.yaml app-hpa.yaml

# Entrar na pasta k8s e fazer deploy
deploy:
	   @echo "🚀 Mudando para o diretório k8s..."
	   @cd k8s && \
	   echo "1️⃣  Criando ConfigMaps e Secrets..." && \
	   kubectl apply -f db-config.yaml && \
	   kubectl apply -f app-config.yaml && \
	   kubectl apply -f db-secret.yaml && \
	   echo "2️⃣  Criando deployment do Postgres..." && \
	   kubectl apply -f db-deployment.yaml && \
	   kubectl apply -f db-service.yaml && \
	   echo "3️⃣  Aguardando Postgres ficar pronto..." && \
	   kubectl wait --for=condition=ready pod -l app=fiap-db --timeout=60s || true && \
	   echo "4️⃣  Criando deployment da aplicação..." && \
	   kubectl apply -f app-deployment.yaml && \
	   kubectl apply -f app-service.yaml && \
	   echo "5️⃣  Configurando HPA..." && \
	   kubectl apply -f app-hpa.yaml && \
	   echo "6️⃣  Aguardando aplicação ficar pronta..." && \
	   kubectl wait --for=condition=ready pod -l app=fiap-app --timeout=60s || true && \
	   echo "✅ Deploy completo!"
	   @make status

# Limpar todos os recursos
clean:
	   @echo "🧹 Removendo todos os recursos..."
	   @cd k8s && kubectl delete -f . || true
	   @echo "✅ Limpeza completa!"

# Ver logs da aplicação
logs:
	   @echo "📋 Logs da aplicação:"
	   kubectl logs -f deployment/nest-app -c nest-app || true

# Ver status dos recursos
status:
	   @echo "📊 Status dos pods:"
	   kubectl get pods
	   @echo "\n📊 Status dos serviços:"
	   kubectl get services
	   @echo "\n📊 Status do HPA:"
	   kubectl get hpa
	   @echo "\n🌐 URL da aplicação:"
	   minikube service nest-app-service --url
	   @echo "\n🌐 Documentação da aplicação (Swagger):"
	   @URL=$$(minikube service nest-app-service --url); echo "$$URL/api"

# Recriar o ambiente
recreate: clean deploy

# Ajuda
help:
	   @echo "Comandos disponíveis:"
	   @echo "  make deploy     - Fazer deploy completo da aplicação"
	   @echo "  make clean      - Remover todos os recursos"
	   @echo "  make logs       - Ver logs da aplicação"
	   @echo "  make status     - Ver status dos recursos"
	   @echo "  make recreate   - Recriar todo o ambiente"