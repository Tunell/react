# react

u

cd to the correct folder.

##to install:

npm install

mkdir target

##To run:

npm start

##To Build:

webpack

##Live server:
http://node-express-env.z7h53zphpv.us-west-2.elasticbeanstalk.com/

Live release:
Cd:a till projektet och kör:
npm build
Committa in allt.
eb deploy

Funkar inte det, kör:
eb init
eb deploy

Följ denna: http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html
Sen denna: http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-configuration.html
För att sätta upp AWS ElasticBeanstalk client, så du kan köra "eb deploy" från din terminal för att deploya


##To follow logs on live-instance
1. Make sure that the johns_new_key_pair.pem is in your .ssh folder
2. Run
```
eb ssh
```
```
jtunell@jtunell:~$ eb ssh
INFO: Attempting to open port 22.
INFO: SSH port 22 open.
INFO: Running ssh -i /home/jtunell/.ssh/johns_new_key_pair.pem ec2-user@52.11.164.219
Last login: Sun Jan 14 11:38:55 2018 from c-c1d671d5.020-464-7570702.cust.bredbandsbolaget.se
 _____ _           _   _      ____                       _        _ _
| ____| | __ _ ___| |_(_) ___| __ )  ___  __ _ _ __  ___| |_ __ _| | | __
|  _| | |/ _` / __| __| |/ __|  _ \ / _ \/ _` | '_ \/ __| __/ _` | | |/ /
| |___| | (_| \__ \ |_| | (__| |_) |  __/ (_| | | | \__ \ || (_| | |   <
|_____|_|\__,_|___/\__|_|\___|____/ \___|\__,_|_| |_|___/\__\__,_|_|_|\_\
                                       Amazon Linux AMI

This EC2 instance is managed by AWS Elastic Beanstalk. Changes made via SSH 
WILL BE LOST if the instance is replaced by auto-scaling. For more information 
on customizing your Elastic Beanstalk environment, see our documentation here: 
http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/customize-containers-ec2.html
[ec2-user@ip-172-31-19-90 ~]$ 

```
2. To tail the node log file
```
tail -n 50 -f /var/log/nodejs/nodejs.log

```
```
[ec2-user@ip-172-31-19-90 ~]$ tail -n 50 -f /var/log/nodejs/nodejs.log
    unit_name: 'kg',
    created: 2017-11-06T10:55:52.000Z,
    changed: 2017-11-06T10:55:52.000Z },
  RowDataPacket {...
```

##To debug deployment
1. ssh into machine
```
eb ssh
```
2. To see elastic beanstalk tool logs
```
tail -n 1000 -f /var/log/eb-tools.log
```
3. To see build logs
```
tail -n 1000 -f /var/log/cfn-init.log
```
```
[ec2-user@ip-172-31-19-90 log]$ tail -n 1000 -f /var/log/cfn-init.log
2018-01-14 11:29:02,627 [INFO] -----------------------Starting build-----------------------
2018-01-14 11:29:02,648 [INFO] Running configSets: _OnInstanceBoot
2018-01-14 11:29:02,648 [INFO] Running configSet _OnInstanceBoot
2018-01-14 11:29:02,651 [INFO] Running config AWSEBBaseConfig
2018-01-14 11:29:02,658 [INFO] Command clearbackupfiles succeeded
2018-01-14 11:29:02,664 [INFO] Running config AWSEBMessageOfTheDay
2018-01-14 11:29:02,668 [INFO] Command 01clearoriginal succeeded
2018-01-14 11:29:02,671 [INFO] Command 02createbanner succeeded
2018-01-14 11:29:02,681 [INFO] Command 03updatebanner succeeded
2018-01-14 11:29:02,689 [INFO] Running config AWSEBULimitConfig
```
