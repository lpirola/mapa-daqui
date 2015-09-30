# Mapa Daqui

Sinalização pra deixar a cidade mais colaborativa, caminhável, saudável, segura, e interessante.

O código disponibilizado tem dois principais objetivos:

* apresentar em formato de website (responsivo)_ o Mapa Daqui
* gerar arquivos pdf a partir de templates pré-estabelecidos

## Acompanhe nosso planejamento

[![Stories in Ready](https://badge.waffle.io/lpirola/mapa-daqui.png?label=ready&title=Ready)](http://waffle.io/lpirola/mapa-daqui)

## Dependências

Lista de configurações necessárias para ajudar no desenvolvimento.

* [Zepplin](zepplin.io_) - Design das páginas
* [Meteor](meteor.com) - Framework de programação
* [wkhtmltopdf](wkhtmltopdf.org) - Converter templates HTML em PDF

## Ajude no desenvolvimento

Para configurar o seu computador e ajudar no desenvolvimento você deve rodar os seguintes comando em um terminal. E instalar e baixar [o pacote do wkhtml](http://wkhtmltopdf.org/downloads.html) destinado ao tua arquitetura.

```
git clone git@github.com:lpirola/mapa-daqui.git
cd mapa-daqui
curl https://install.meteor.com/ | sh
meteor
```

## Publicação

O arquivo onde se encontram as configurações para deploy é ```settings.json```.

## Licença

```
Mapa Daqui, website, pdf generator and templates
Copyright (C) 2015 Lucas Pirola

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.


You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```