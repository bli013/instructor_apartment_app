apartments = [
  {
    street: '1111 Boring Avenue',
    city: 'San Diego',
    zipcode: '92102',
    state: 'CA',
    country: 'United States'
  },
  {
    street: '2222 Faking Street',
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