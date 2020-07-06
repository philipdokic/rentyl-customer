##### Prerequisites

The setups steps expect following tools installed on the system.

- Github
- Node [~> 10.13.0](https://nodejs.org/en)
- Ruby [2.7.1](https://github.com/ruby/ruby)
- Rails [6.0.3](https://github.com/rails/rails)

##### 1. Check out the repository

```bash
git clone git@github.com:vaystays/direct-white-label.git
```

##### 2. Create database.yml file

Copy the sample database.yml file and edit the database configuration as required.

```bash
cp config/database.yml.sample config/database.yml
```

##### 3. Create and setup the database

Run the following commands to create and setup the database.

```ruby
bundle exec rake db:migrate
```

##### 4. Start the Rails server

You can start the rails server using the command given below.

```ruby
bundle exec rails s
```

And now you can visit the site with the URL http://localhost:5000




Issues: 
To generate manifest.js file:
  - $yarn add @rails/webpacker
  - $bundle update webpacker

To read from new database
 - Include `schema_search_path:  ant` in `database.yml` file per environment

 Domain id: 100030000065, url: "cxstaging.getdirect.io", live: true, heroku_wired: true, heroku_dns: "tetrahedral-pony-vdjxij0n5fcfi3ro0enbnono.herokudn...", brand_id: 100030000048, created_at: "2020-02-04 19:26:16", updated_at: "2020-06-05 14:21:45", organization_id: 3

 Domain id: 100030000056, url: "www.directdemohotel.com", live: true, heroku_wired: true, heroku_dns: "www.directdemohotel.com.herokudns.com", brand_id: 100030000049, created_at: "2017-09-05 21:12:11", updated_at: "2018-02-12 06:49:27", organization_id: 3>
