# Instuctor Apartment App
## Set-Up Devise
- $ ```rails new apartment_app -d postgresql -T```
- $ ```cd apartment_app```
- $ ```bundle add devise```
- $ ```rails generate devise:install```
- In config/environments/development.rb Add
```config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }```
- $ ```rails generate devise User```
- $ ```rails generate devise:views```
- $ ```rails db:create```
- $ ```rails db:migrate```
## Set-Up React
- $ ```bundle add react-rails```
- $ ```bundle install```
- $ ```rails webpacker:install```
- $ ```rails webpacker:install:react```
- $ ```rails generate react:install```
- $ ```yarn install```
- $ ```rails generate react:component App```
## Create Homepage
- $ ```rails generate controller Home```
- In ./config/routes.rb Add 
```get '*path', to: 'home#root', constraints: ->(request){ request.format.html? } root to: 'home#root'```
- In ./app/views/home Create new file called ```root.html.erb```
- Add in new file root.html.erb
```xml
<%= react_component("App", { logged_in: user_signed_in?, sign_inroute: new_user_session_path, sign_out_route: destroy_user_session_path, edit_user_route: edit_user_registration_path, current_user: current_user }) %>
```
- In ./app/controllers/home_controller.rb Add
```ruby
def root 
end 
``` 
- In ./config/initializers/devise.rb Change 
```ruby
config.sign_out_via = :delete 
```
To 
```ruby
config.sign_out_via = :get
```
- 