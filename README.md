# Project Authentication

This application has the functionality to execute user registration, user login, user update, user deletion, user logout commands, and if you are an administrator, you will be able to see all users registered in this application.

This application was built with NodeJS, Express, MongoDB Atlas and EJS.

The project was created with the purpose of: 

- Understand how under-the-table authentication works
- Understand how routes (used with Express) of a Back-End application work.


## Application requirements (locally)
- **MongoDB Atlas:** Account configured 
- **NodeJS:** v14 or higher
- **NPM:** We will use NPM

## Prerequisites
- **NodeJS**
    - [Download NodeJS](https://nodejs.org/en/download/package-manager)
- **MongoDB Atlas**
     - [Create your MongoDb Atlas account](https://www.mongodb.com/pt-br/lp/cloud/atlas/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_retarget-brand_gic-null_amers-all_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=14412646314&adgroup=131761122172&cq_cmp=14412646314&gad_source=1&gclid=CjwKCAjwx4O4BhAnEiwA42SbVKpj-PLsrmH3xpWnAjE0W83voAHsBUIIGlWEk8IGRDi8f6H5eJOJqBoCB7MQAvD_BwE)
     - Configure a cluster and get the connection URL

## Installation Manual (locally)
1. Clone the repository
    ```bash
    git clone https://github.com/cauealb/project-authentication.git
    ```
2. Enter the project folder
    ```bash
    cd project-authentication
    ```

3. Install all dependencies 
    ```bash
    npm install
    ```

## User Manual

1. Execute the Project
    ```bash
    npm run start
    ```

2. Log in to your browser e and open on port 9090
    - [Acesse o Projeto](www.localhost:9090)


## Observations

**Unless you are an administrator or know the administrator password, you will not be able to enter the /admin route.**