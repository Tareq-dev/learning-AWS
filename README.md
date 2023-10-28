
## Documentation

https://console.aws.amazon.com



## Lessons Learned

* S3

* IAM

* getObejct

* putObject

* User access

* create folder



# Installation


### Install AWS with node

```bash
✅ Step -1 
initialized project 

  npm init --y



✅ Step -2 

  npm install @aws-sdk/client-s3

  npm install @aws-sdk/s3-request-presigner



✅ Step -3 
create s3client

    const s3Client = new S3Client({
    region: "****",
        credentials: {
        accessKeyId: "*****",
        secretAccessKey: "*****",
    },
    });


✅ GET Obejct function

    async function getObjectURL(key) {
        const command = new GetObjectCommand({
        Bucket: "Bucket_name",
        Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}


✅ PUT Object function

async function putObject(filename, contentType) {
        const command = new PutObjectCommand({
        Bucket: "private-trk",
        Key: `key_path`,
        ContentType: contentType,
        });
  const url = await getSignedUrl(s3Client, command);
  return url;
}





async function init() {
  // console.log("url for image", await getObjectURL("apple-touch-icon.png"));

  //--------------------GET upload Image

  //   console.log(
  //     "url for image",
  //     await getObjectURL("/uploads/user-uploads/image-1692896837257.jpg")
  //   );

  //--------------------GET upload video

//   console.log(
//     "url for image",
//     await getObjectURL("uploads/user-uploads/video-1692897516734.mp4")
//   );

  //--------------------upload image

//   console.log(
//     "url for uploading",
//     await putObject(`image-${Date.now()}.jpg`, "image / jpg")
//   );

  //--------------------upload video

    // console.log(
    //   "url for uploading",
    //   await putObject(`video-${Date.now()}.mp4`, "video/mp4")
    // );
}
init();
```







    
# Node.js Deployment

> Steps to deploy a Node.js app to DigitalOcean using PM2, NGINX as a reverse proxy and an SSL from LetsEncrypt

## 1. Create Free AWS Account
Create free AWS Account at https://aws.amazon.com/

## 2. Create and Lauch an EC2 instance and SSH into machine
I would be creating a t2.medium ubuntu machine for this demo.

## 3. Install Node and NPM
```
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

node --version
```

## 4. Clone your project from Github
```
git clone https://github.com/piyushgargdev-01/short-url-nodejs
```

## 5. Install dependencies and test app
```
sudo npm i pm2 -g
pm2 start index

# Other pm2 commands
pm2 show app
pm2 status
pm2 restart app
pm2 stop app
pm2 logs (Show log stream)
pm2 flush (Clear logs)

# To make sure app starts when reboot
pm2 startup ubuntu
```

## 6. Setup Firewall
```
sudo ufw enable
sudo ufw status
sudo ufw allow ssh (Port 22)
sudo ufw allow http (Port 80)
sudo ufw allow https (Port 443)
```

## 7. Install NGINX and configure
```
sudo apt install nginx

sudo nano /etc/nginx/sites-available/default
```
Add the following to the location part of the server block
```
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:8001; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
```
# Check NGINX config
sudo nginx -t

# Restart NGINX
sudo nginx -s reload
```

## 8. Add SSL with LetsEncrypt
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
```
