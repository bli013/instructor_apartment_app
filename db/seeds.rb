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
apartments = [
  {
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
  }
]


test = User.first

apartments.each do |att|
  test.apartments.create att
end