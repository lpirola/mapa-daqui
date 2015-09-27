ssh-keygen -t rsa
sudo apt-get update && sudo apt-get dist-upgrade -y
sudo apt-get install vim python-minimal nginx
wget http://download.gna.org/wkhtmltopdf/0.12/0.12.2.1/wkhtmltox-0.12.2.1_linux-trusty-amd64.deb
sudo dpkg -i wkhtmltox-0.12.2.1_linux-trusty-amd64.deb
dpkg-reconfigure tzdata

```
server {
  listen                *:80;

  server_name           new.mapadaqui.org;

  access_log            /var/log/nginx/app.dev.access.log;
  error_log             /var/log/nginx/app.dev.error.log;

  location / {
    proxy_pass http://127.0.0.1:4040;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header X-Forwarded-For $remote_addr;
  }
}
```
