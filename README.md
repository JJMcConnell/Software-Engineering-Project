# Team Composition:

 <p>Joseph McConnell - jjmcconnell17</p>
 <p>Danny Sepler - dsepler</p>
 <p>Diandra D'Achille - ddachille</p>
 <p>Clarence Hwang - clarence.hwang</p>
 <p>Trevor Owens - trevorkowens</p>
 <p>Yanina Yegorova - yanayeg</p>

# Project Description:
##### An online calendar application, as requested by Dr. Pickeral, the director of operations of the UF School of Music. The web application should be able to show a schedule of all music department functions for any given day, and faculty members should be able to request a block on the schedule. Each request should go to Dr. Pickeral for his approval, and if approved it should be added to the schedule.

# Hosting:
Our project is hosted through [DigitalOcean](https://www.digitalocean.com). You can reach it by going to http://104.236.8.6:3000/#!/. We should have an actual domain name soon. DigitalOcean is typically a $5/month service, but Github has a deal where students get 20 months of hosting there for free. We should probably ask the School of Music to pay for hosting and the domain name.

So. How do you update the domain?

1. `ssh root@104.236.8.6`
2. The password is: `admin1234`
3. `cd /srv/Software-Engineering-Project/mean-master`
4. `screen -r`
5. Kill the current session ('ctrl' and 'c')
6. `git pull`
7. `nodejs server.js`
8. Hit 'ctrl', 'a', and 'd' keys  simultaneously. VERY IMPORTANT. This keeps the session going, but detaches you from it.
9. `exit`
10. That's it. Good job!
