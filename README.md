#Frutaria
Sistema de gerenciamento de venda de frutas(processo seletivo).
Este é front-end do sistema, desenvolvido com VueJs o mesmo funciona em 
conjunto com a api "frutaria-api".\
[DEMO ONLINE](https://danieldesa.com/project/frutaria/)\
##Tecnologias do projeto
 - Vuejs
 - Vue-Cli(Linha de comando do VueJs)
 - Vue-Auth(Autenticação)
 - Vue-Router(para SPA)
 - WebSanova(jwt authetication)
 - Node-Sass(Compilador sass)
 - Bootstrap-vue(estilização)
 - Axios(requisições ajax)
 - Vue-the-mask(Criar mascara em inputs ex: cpf, cnpj)
 - V-money(Mascara para entrada de valor monetário)
 - AdminLTE(Dashboard admin template)
 - NProgress(Loading em requisições)
##Requisitos do Sistema
Sistema Operacional: Linux(preferencial Deepin OS), Windows 10 pro.\
NPM: Ultima versão estável\
NodeJs: ^10.0.0\
Git: Versão estável

##Instalação
- Fazer o clone do projeto.

```
git clone https://github.com/danielsa97/frutaria.git
```

- Abrir a pasta do projeto e instalar os módulos da aplicação.
```
npm install
```
- Abra o arquivo `env.js` na raiz do projeto, altere as variáveis de ambiente para 
se adequar ao cenário de sua infraestrutura.\
 É de suma importancia configurar a variável `HOST_API` para correto funcionamento do sistema, por padrão, o host para teste é:
 ```
     https://frutaria-api.danieldesa.com
 ```


#Build e Desenvolvimento

Para testar o sistema, execute o comando abaixo para executar o modo de desenvolvimento.
```
npm run serve
```
Para gerar o build do sistema execute o comando abaixo.
```
    npm run build
```

Será gerado uma pasta `dist` na raiz do projeto com os arquivos preparados para deploy da aplicação.

