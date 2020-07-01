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
## Add Models
- $ ``` rails generate resource Apartment street:string city:string zipcode:string state:string country:string user_id:integer```
- $ ```rails db:migrate```
- In app/controllers/apartments_controller.rb Add
```ruby
before_action :authenticate_user!, only: [:update, :destroy, :create]
skip_before_action :verify_authenticity_token
```
- In app/models/apartment.rb Add
```ruby
belongs_to :user
```
- In app/models/user.rb Add
```ruby
has_many :apartments
```
## Add Validations
- In app/models/apartment.rb Add
```ruby
validates :street, :city, :state, :zipcode, :country, presence: true
```
- In app/models/user.rb Add
```ruby
validates :name, :phonenumber, :hours, presence: true
```
## Add Customization to Devise
- In config/initializers/devise.rb
```ruby
# ==> Scopes configuration
# Turn scoped views on. Before rendering "sessions/new", it will first check for
# "users/sessions/new". It's turned off by default because it's slower if you
# are using only default views.
config.scoped_views = true
```
- $ ```rails generate migration add_info_columns_to_users```
- In new migration file Add
```ruby
def change
 add_column :users, :name, :string
 add_column :users, :phonenumber, :string
 add_column :users, :hours, :string
end
```
- $ ``` rails db:migrate```
- In app/controllers/application_controller.rb Add
```ruby
protect_from_forgery with: :exception
before_action :configure_permitted_parameters, if: :devise_controller?
protected
  def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:name, :email, :phonenumber, :hours, :password)}
      devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:name, :email, :phonenumber, :hours, :password, :current_password)}
  end
```
- In app/views/devise/registration/new AND app/views/devise/registration/edit Add
```xml
<div class="field">
   <%= f.label :name %><br />
   <%= f.text_field :name, autofocus: true %>
</div>
<div class="field">
   <%= f.label :phone_number %><br />
   <%= f.text_field :phonenumber, autofocus: true %>
</div>
<div class="field">
   <%= f.label :hours %><br />
   <%= f.text_field :hours, autofocus: true %>
</div>
```
## Create Seed file
- In db/seeds.rb Add
```ruby
user = [{
    email: "testuser1@test.com",
    password: "testtest",
    password_confirmation: "testtest",
    name: "Tester",
    phonenumber: "619-553-6578",
    hours: "10am-4pm"
}]
user.each do |v|
    User.create v
end
apartments = [{
    street: '123 Imfakestreet',
    city: 'San Diego',
    zipcode: '92102',
    state: 'CA',
    country: 'United States'
  },
  {
    street: '123 ABC Street',
    city: 'San Diego',
    zipcode: '92119',
    state: 'CA',
    country: 'United States'
  }]

test = User.first

apartments.each do |att|
  test.apartments.create att
end
```
- $ ``` rails db:seed```



