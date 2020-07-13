## Prerequisites

The setups steps expect following tools installed on the system.

- Github
- Node [~> 10.13.0](https://nodejs.org/en)
- Ruby [2.7.1](https://github.com/ruby/ruby)
- Rails [6.0.3](https://github.com/rails/rails)

### 1. Check out the repository

```bash
git clone git@github.com:vaystays/direct-white-label.git
```

### 2. Install the gems

Make sure that you have the correct version of Ruby set locally before trying to install the required gems.

```bash
bundle install
```

### 3. Install Yarn depencies

```bash
yarn install --ignore-engines
```

### 4. Setup Webpacker

```bash
yarn add @rails/webpacker --ignore-engines
bundle update webpacker
```

### 5. Add the database URL

Add the database URL from Heroku as an environment variable (ENV).

```bash
DIRECT_DATABASE_URL
```

*DO NOT USE THE DATABASE URL FOR THE PRODUCTION DATABASE!*

### 6. Direct Demo domain

Update the domain of the website you are testing to use localhost from the dashboard or the console.

### 7. Start the Rails server

You can start the rails server using the command given below.

```bash
foreman start -f Procfile.dev
```

And now you can visit the site with the URL http://localhost:5000




##### Notes

To read from new database

 - Include `schema_search_path:  ant` in `database.yml` file per environment

##### TESTING

Domain id: 100030000065, url: "cxstaging.getdirect.io", live: true, heroku_wired: true, heroku_dns: "tetrahedral-pony-vdjxij0n5fcfi3ro0enbnono.herokudn...", brand_id: 100030000048, created_at: "2020-02-04 19:26:16", updated_at: "2020-06-05 14:21:45", organization_id: 3

Domain id: 100030000056, url: "www.directdemohotel.com", live: true, heroku_wired: true, heroku_dns: "www.directdemohotel.com.herokudns.com", brand_id: 100030000049, created_at: "2017-09-05 21:12:11", updated_at: "2018-02-12 06:49:27", organization_id: 3>
